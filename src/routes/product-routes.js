import express from "express";
import { authenticate } from "../middlewares/authenticate";
import {
  findProductByIdForUser,
  getAllProductsForUser,
} from "../controllers/product-controller";

const productRouter = express.Router();

productRouter.get("/", getAllProductsForUser);
productRouter.get("/id/:productId", findProductByIdForUser);

export default productRouter;
