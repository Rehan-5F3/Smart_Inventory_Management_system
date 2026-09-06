import { useEffect, useState } from "react";
import { getSales } from "../services/saleService";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function SalesHistory() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await getSales();
      setSales(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch sales history");
    }
  };

  return (
    <>
      <Sidebar />

      <div className="p-4"
        style={{
          marginLeft: "260px",
          width: "calc(100% - 260px)",
        }}
      >
        <h2 className="mb-4">📜 Sales History</h2>

        <table className="table table-bordered table-hover shadow">
          <thead className="table-dark">
            <tr>
              <th>Date</th>
              <th>Product</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Total Amount</th>
              <th>Sold By</th>
            </tr>
          </thead>

          <tbody>
            {sales.length > 0 ? (
              sales.map((sale) => (
                <tr key={sale._id}>
                  <td>
                    {new Date(sale.createdAt).toLocaleDateString()}
                  </td>

                  <td>{sale.product?.productName}</td>

                  <td>{sale.product?.category}</td>

                  <td>{sale.quantity}</td>

                  <td>₹{sale.totalAmount}</td>

                  <td>{sale.soldBy?.name || "Admin"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No Sales Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default SalesHistory;