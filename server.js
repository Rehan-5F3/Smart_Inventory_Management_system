require("dotenv").config();
console.log("ENV FILE TEST:");
console.log(process.env);
console.log("ENV TEST:", process.env.CLOUDINARY_CLOUD_NAME);
const express = require("express");
const cors= require("cors");
const authRoutes=require("./routes/authRoutes");
const productRoutes=require("./routes/productRoutes");
const dashboardRoutes=require("./routes/dashboardRoutes");
const saleRoutes=require("./routes/saleRoutes");
const connectDB=require("./config/db");
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products",productRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/sales",saleRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Smart Inventory API is Running 🚀");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.log("SERVER ERROR:", err);

  res.status(500).json({
    message: err.message,
  });
});

