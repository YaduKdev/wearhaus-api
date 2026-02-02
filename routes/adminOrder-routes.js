import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import {
  cancelOrderForAdmin,
  confirmOrderForAdmin,
  deleteOrderForAdmin,
  deliverOrderForAdmin,
  getAllOrdersForAdmin,
  shipOrderForAdmin,
} from "../controllers/adminOrder-controller.js";

const adminOrderRouter = express.Router();

adminOrderRouter.get("/", authenticate, getAllOrdersForAdmin);
adminOrderRouter.put("/:orderId/confirm", authenticate, confirmOrderForAdmin);
adminOrderRouter.put("/:orderId/ship", authenticate, shipOrderForAdmin);
adminOrderRouter.put("/:orderId/deliver", authenticate, deliverOrderForAdmin);
adminOrderRouter.put("/:orderId/cancel", authenticate, cancelOrderForAdmin);
adminOrderRouter.put("/:orderId/delete", authenticate, deleteOrderForAdmin);

export default adminOrderRouter;
