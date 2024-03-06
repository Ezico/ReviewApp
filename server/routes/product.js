import express from "express";
import {
  getProducts,
  updateProduct,
  deleteProduct,
  addProduct,
  getProductData,
  getReviews,
  addReview,
  premiumOrder,
  getOrders,
  approveOrder,
  updateBank,
  getBank,
  checkStatus,
} from "../controllers/product.js";

const router = express.Router();
router.get("/", getProducts);
router.get("/orders", getOrders);
router.get("/orders/:id", checkStatus);
router.put("/orders", approveOrder);
router.post("/premium/:id", premiumOrder);
router.get("/:id", getProductData);
router.get("/reviews/:id", getReviews);
router.post("/reviews/:id", addReview);
router.post("/", addProduct);
router.put("/bank", updateBank);
router.get("/bank/data", getBank);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
