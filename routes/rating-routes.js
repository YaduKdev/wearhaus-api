import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import {
  createRatingForUser,
  getAllRatingsForUser,
} from "../controllers/rating-controller.js";

const ratingRouter = express.Router();

ratingRouter.post("/create", authenticate, createRatingForUser);
ratingRouter.get("/product/:productId", authenticate, getAllRatingsForUser);

export default ratingRouter;
