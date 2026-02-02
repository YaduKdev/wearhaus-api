import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import {
  createReviewForUser,
  getAllReviewsForUser,
} from "../controllers/review-controller.js";

const reviewRouter = express.Router();

reviewRouter.post("/create", authenticate, createReviewForUser);
reviewRouter.get("/product/:productId", authenticate, getAllReviewsForUser);

export default reviewRouter;
