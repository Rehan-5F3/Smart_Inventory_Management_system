import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";
import SalesChart from "../components/SalesChart";
import InventoryPieChart from "../components/InventoryPieChart";
import Sidebar from "../components/Sidebar";
function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalStock: 0,
    lowStock: 0,
    inventoryValue: 0,
    lowStockProducts: [],
    recentSales: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

 const fetchDashboard = async () => {
  try {
    const response = await getDashboard();

   console.log(response.data);

    console.log("Before:", stats);

setStats({
  totalProducts: response.data.totalProducts,
  totalStock: response.data.totalStock,
  lowStock: response.data.lowStock,
  inventoryValue: response.data.inventoryValue,
  lowStockProducts: response.data.lowStockProducts,
});

console.log("Response:", response.data);
    console.log("Stats state:", response.data);
    <h1>{JSON.stringify(stats)}</h1>
  } catch (error) {
    alert(error.response?.data?.message || error.message);
    console.log(error);
  }
};

  const greeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning ☀️";
    if (hour < 18) return "Good Afternoon 🌤️";
    return "Good Evening 🌙";
  };
  <h3 className="text-danger">
  {stats.totalProducts} | {stats.totalStock} | {stats.lowStock}
</h3>

  return (
    <>
      <Sidebar/>

      <div className="p-4"
        style={{
          marginLeft: "260px",
          width: "calc(100% - 260px)",
        }}
      >
        {/* Heading */}

        <div className="mb-4">
          <h2 className="fw-bold">
            {greeting()}, {JSON.parse(localStorage.getItem("user"))?.name} 👋
          </h2>
          
          <p className="text-muted">
            Welcome back! Here's today's inventory summary.
          </p>
        </div>

        {/* Cards */}

        <div className="row g-4">

          {/* Total Products */}

          <div className="col-lg-3 col-md-6">
            <div
              className="card text-white border-0 shadow-lg"
              style={{
                borderRadius: "20px",
                background:
                  "linear-gradient(135deg,#4facfe,#00f2fe)",
              }}
            >
              <div className="card-body">

                <h5>📦 Total Products</h5>

                <h1 className="display-5 fw-bold">
                  {stats.totalProducts}
                </h1>

                <p className="mb-0">
                  Products Available
                </p>

              </div>
            </div>
          </div>

          {/* Total Stock */}

          <div className="col-lg-3 col-md-6">
            <div
              className="card text-white border-0 shadow-lg"
              style={{
                borderRadius: "20px",
                background:
                  "linear-gradient(135deg,#43e97b,#38f9d7)",
              }}
            >
              <div className="card-body">

                <h5>📦 Total Stock</h5>

                <h1 className="display-5 fw-bold">
                  {stats.totalStock}
                </h1>

                <p className="mb-0">
                  Items In Inventory
                </p>

              </div>
            </div>
          </div>

          {/* Inventory Value */}

          <div className="col-lg-3 col-md-6">
            <div
              className="card text-white border-0 shadow-lg"
              style={{
                borderRadius: "20px",
                background:
                  "linear-gradient(135deg,#fa709a,#fee140)",
              }}
            >
              <div className="card-body">

                <h5>💰 Inventory Value</h5>

                <h2 className="fw-bold">
                  ₹
                  {Number(stats.inventoryValue).toLocaleString(
                    "en-IN"
                  )}
                </h2>

                <p className="mb-0">
                  Total Inventory Worth
                </p>

              </div>
            </div>
          </div>

          {/* Low Stock */}

          <div className="col-lg-3 col-md-6">
            <div
              className="card text-white border-0 shadow-lg"
              style={{
                borderRadius: "20px",
                background:
                  "linear-gradient(135deg,#ff758c,#ff7eb3)",
              }}
            >
              <div className="card-body">

                <h5>⚠ Low Stock</h5>

                <h1 className="display-5 fw-bold">
                  {stats.lowStock}
                </h1>

                <p className="mb-0">
                  Needs Restocking
                </p>

              </div>
            </div>
          </div>

        </div>

        {/* Second Row */}

        <div className="row mt-5">

          <div className="col-lg-8 mb-4">
            <div
              className="card shadow border-0"
              style={{ borderRadius: "20px" }}
            >
              <div className="card-body">

                <h4 className="fw-bold d-flex align-items-center mb-4">
                  <i className="bi bi-bar-chart-fill text-primary me-2"></i>
                  Inventory Overview
                </h4>

                <div className="mt-3">
                  <SalesChart />
                </div>

              </div>
            </div>
          </div>

          <div className="col-lg-4 mb-4">
            <div className="card shadow border-0"
              style={{
                borderRadius: "20px",
                padding: "10px"
              }}
            >
            <div className="card-body">
              <h4 className="fw-bold mb-3">
                ⚠ Low Stock Products
              </h4>

              {stats.lowStockProducts.length > 0 ? (
              stats.lowStockProducts.map((item) => (
             <div key={item._id} className="d-flex justify-content-between align-items-center border-bottom py-2">
              <div>
                <strong>{item.productName}</strong>
                <br />
                <small className="text-muted">{item.category}</small>
              </div>

              <span className="badge bg-danger">
                Stock: {item.stock}
              </span>
             </div>
             ))
             ) : (
            <p className="text-success mb-0">
               🎉 All products have sufficient stock.
            </p>
            )}
          </div>
        </div>
      </div>

      </div>

      </div>
      {/* </Layout> */}
    </>
  );
}

export default Dashboard;