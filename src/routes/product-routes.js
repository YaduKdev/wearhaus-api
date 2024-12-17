import express from "express";
import { authenticate } from "../middlewares/authenticate";
import {
  findProductByIdForUser,
  getAllProductsForUser,
} from "../controllers/product-controller";

const productRouter = express.Router();

productRouter.get("/", authenticate, getAllProductsForUser);
productRouter.get("/:id/:id", authenticate, findProductByIdForUser);

export default productRouter;
