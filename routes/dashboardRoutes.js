const express = require("express");

const { getDashboard, getReport, getMonthlySales} = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getDashboard);
router.get("/report", protect, getReport);
router.get("/monthly-sales", protect, getMonthlySales);


module.exports = router;