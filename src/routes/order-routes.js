import express from "express";
import { authenticate } from "../middlewares/authenticate";
import {
  createOrderForUser,
  findOrderByIdForUser,
  orderHistoryForUser,
} from "../controllers/order-controller";

const orderRouter = express.Router();

orderRouter.post("/", authenticate, createOrderForUser);
orderRouter.get("/user", authenticate, orderHistoryForUser);
orderRouter.get("/:id", authenticate, findOrderByIdForUser);

export default orderRouter;
