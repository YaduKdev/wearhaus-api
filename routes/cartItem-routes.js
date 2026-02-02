import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import {
  removeItemInCart,
  updateItemInCart,
} from "../controllers/cartItem-controller.js";

const cartItemRouter = express.Router();

cartItemRouter.put("/:id", authenticate, updateItemInCart);
cartItemRouter.delete("/:id", authenticate, removeItemInCart);

export default cartItemRouter;
