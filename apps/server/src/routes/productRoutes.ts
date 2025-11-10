import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productControllers.js";
import { validate } from "../utils/validate.js";
import { baseProductSchema } from "@repo/validation";

const router = express.Router();

// router.post("/by-ids", getProductByIds);

router
  .route("/")
  .get(getProducts)
  .post(validate(baseProductSchema), createProduct);
router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);
export default router;
