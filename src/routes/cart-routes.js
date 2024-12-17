import express from "express";
import { authenticate } from "../middlewares/authenticate";
import { addItemToCart, findUsersCart } from "../controllers/cart-controller";

const cartRouter = express.Router();

cartRouter.get("/", authenticate, findUsersCart);
cartRouter.put("/add", authenticate, addItemToCart);

export default cartRouter;
