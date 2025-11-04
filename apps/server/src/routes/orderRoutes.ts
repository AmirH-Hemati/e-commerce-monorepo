import express from "express";
import {
  createOrder,
  deleteOrder,
  getMonthlySales,
  getMyOrder,
  getOrder,
  getOrders,
  getOrderStatus,
  getRecentOrders,
  orderProduct,
  stripeWebhookHandler,
  updateOrder,
} from "../controllers/orderControllers.js";
import { protect, restrictTo } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/checkout/webhooks", stripeWebhookHandler);
router.use(protect);
router.post("/checkout/sessions", orderProduct);

router.get("/myOrders", getMyOrder);

// router.use(restrictTo("admin"));

router.get("/stats/monthlySales", getMonthlySales);
router.get("/stats/orderStatus", getOrderStatus);
router.get("/recentOrder/:userId", getRecentOrders);
router.route("/").get(getOrders).post(createOrder);
router.route("/:id").get(getOrder).patch(updateOrder).delete(deleteOrder);

export default router;
