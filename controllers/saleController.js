const Sale = require("../models/Sale");
const Product = require("../models/Product");

const createSale = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        message: "Insufficient stock",
      });
    }

    product.stock -= quantity;

    await product.save();

    const sale = await Sale.create({
      product: product._id,
      quantity,
      sellingPrice: product.sellingPrice,
      totalAmount: quantity * product.sellingPrice,
      soldBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Sale completed",
      sale,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("product", "productName category material")
      .populate("soldBy", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createSale,
  getSales,
};