import express from "express";
import { authenticate } from "../middlewares/authenticate";
import {
  createMultipleProductsForUser,
  createProductForUser,
  deleteProductForUser,
  updateProductForUser,
} from "../controllers/product-controller";

const adminProductRouter = express.Router();

adminProductRouter.post("/", authenticate, createProductForUser);
adminProductRouter.post(
  "/creates",
  authenticate,
  createMultipleProductsForUser
);
adminProductRouter.delete("/:id", authenticate, deleteProductForUser);
adminProductRouter.put("/:id", authenticate, updateProductForUser);

export default adminProductRouter;
