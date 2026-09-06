import { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function SalesChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchMonthlySales();
  }, []);

  const fetchMonthlySales = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/dashboard/monthly-sales",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ];

      const chartData = monthNames.map((month, index) => {
        const found = response.data.find(
          (item) => item._id === index + 1
        );

        return {
          month,
          sales: found ? found.sales : 0,
        };
      });

      setData(chartData);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 10,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip
          formatter={(value) => [
            `₹${Number(value).toLocaleString("en-IN")}`,
            "Sales",
          ]}
        />
        <Bar
          dataKey="sales"
          fill="#0d6efd"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SalesChart;