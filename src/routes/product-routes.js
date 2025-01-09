import express from "express";
import { authenticate } from "../middlewares/authenticate";
import {
  findProductByIdForUser,
  getAllProductsForUser,
  getHomeProductsForUser,
  searchProductsForUser,
  searchProductsWithFiltersForUser,
} from "../controllers/product-controller";

const productRouter = express.Router();

productRouter.get("/", getAllProductsForUser);
productRouter.get("/home", getHomeProductsForUser);
productRouter.get("/id/:productId", findProductByIdForUser);
productRouter.get("/search", searchProductsForUser);
productRouter.get("/search/filters", searchProductsWithFiltersForUser);

export default productRouter;
