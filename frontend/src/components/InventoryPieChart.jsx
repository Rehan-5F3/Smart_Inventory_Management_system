import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

function InventoryPieChart({ products }) {

  const gold = products.filter(
    (p) => p.material === "Gold"
  ).length;

  const silver = products.filter(
    (p) => p.material === "Silver"
  ).length;

  const oneGram = products.filter(
    (p) => p.material === "One Gram"
  ).length;

  const data = [
    { name: "Gold", value: gold },
    { name: "Silver", value: silver },
    { name: "One Gram", value: oneGram },
  ];

  const COLORS = [
    "#FFD700",
    "#C0C0C0",
    "#FF8C00",
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>

        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={90}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />

      </PieChart>
    </ResponsiveContainer>
  );
}

export default InventoryPieChart;