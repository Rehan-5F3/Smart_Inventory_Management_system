import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getReport } from "../services/reportService";

function Reports() {
    const [report, setReport] = useState({
  totalRevenue: 0,
  totalSales: 0,
  todayRevenue: 0,
  bestSellingProduct: " ",
});

useEffect(() => {
  fetchReport();
}, []);

const fetchReport = async () => {
  try {
    const response = await getReport();
    setReport(response.data);
  } catch (error) {
    console.log(error);
    alert("Failed to load reports");
  }
};
  return (
    <>
      <Sidebar/>

      <div
        className="p-4"
        style={{
          marginLeft: "260px",
          width: "calc(100% - 260px)",
        }}
      >
        <h2 className="mb-4">📊 Reports</h2>

        <div className="row">

          <div className="col-md-6 mb-4">
            <div className="card shadow p-4">
              <h5>💰 Total Revenue</h5>
              <h2>₹{report.totalRevenue.toLocaleString("en-IN")}</h2>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card shadow p-4">
              <h5>🛒 Total Sales</h5>
              <h2>{report.totalSales}</h2>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card shadow p-4">
              <h5>📅 Today's Revenue</h5>
              <h2>₹{report.todayRevenue.toLocaleString("en-IN")}</h2>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card shadow p-4">
             <h5>🏆 Best Selling Product</h5>
             <h4>{report.bestSellingProduct}</h4>
            </div>
          </div>

        </div>

      </div>

    </>
  );
}

export default Reports;