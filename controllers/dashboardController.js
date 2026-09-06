const Product = require("../models/Product");
const Sale = require("../models/Sale");

const getDashboard = async (req, res) => {
  console.log("🔥 Dashboard API HIT");

  try {

    const totalProducts = await Product.countDocuments();

    const products = await Product.find();
    console.log("Products found:", products);
    const totalStock = products.reduce(
      (sum, product) => sum + product.stock,
      0
    );

   const lowStockProducts = products.filter(
  (product) => product.stock < 5
);



const lowStock = lowStockProducts.length;

    const inventoryValue = products.reduce(
      (sum, product) =>
        sum + product.stock * product.purchasePrice,
      0
    );
    const recentSales = await Sale.find()
  .populate("product", "productName")
  .sort({ createdAt: -1 })
  .limit(5);
    console.log("Total Products:", totalProducts);
    console.log("Low Stock:", lowStock);
    res.status(200).json({
      totalProducts,
      totalStock,
      lowStock,
      inventoryValue,
      lowStockProducts,
      recentSales,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getReport = async (req, res) => {
  try {
    const totalRevenueResult = await Sale.aggregate([
      {
        $group: {
          _id: null,
          revenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalSales = await Sale.countDocuments();
    const today = new Date();

  today.setHours(0, 0, 0, 0);

  const todayRevenueResult = await Sale.aggregate([
  {
    $match: {
      createdAt: {
        $gte: today,
      },
    },
  },
  {
    $group: {
      _id: null,
      revenue: {
        $sum: "$totalAmount",
      },
    },
  },
]);

const todayRevenue =
  todayRevenueResult.length > 0
    ? todayRevenueResult[0].revenue
    : 0;
    const bestSellingProductResult = await Sale.aggregate([
  {
    $group: {
      _id: "$product",
      totalSold: {
        $sum: "$quantity",
      },
    },
  },
  {
    $sort: {
      totalSold: -1,
    },
  },
  {
    $limit: 1,
  },
  {
    $lookup: {
      from: "products",
      localField: "_id",
      foreignField: "_id",
      as: "product",
    },
  },
  {
    $unwind: "$product",
  },
]);
    const bestSellingProduct =
  bestSellingProductResult.length > 0
    ? bestSellingProductResult[0].product.productName
    : "No Sales Yet";
    res.status(200).json({
      totalRevenue:
        totalRevenueResult.length > 0
          ? totalRevenueResult[0].revenue
          : 0,
      totalSales,
      todayRevenue,
      bestSellingProduct,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getMonthlySales = async (req, res) => {
  try {
    const monthlySales = await Sale.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          sales: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: { "_id": 1 },
      },
    ]);

    res.status(200).json(monthlySales);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
  getReport,
  getMonthlySales,
};