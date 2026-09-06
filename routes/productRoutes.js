const express = require("express");

const { 
  addProduct, 
  getProducts, 
  updateProduct, 
  deleteProduct 
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

router.post(
  "/",
  protect,
  upload.single("image"),
  (req, res, next) => {
    console.log("MULTER BODY:", req.body);
    console.log("MULTER FILE:", req.file);
    next();
  },
  addProduct
);

router.get("/", getProducts);

router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateProduct
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("Owner"),
  deleteProduct
);

module.exports = router;