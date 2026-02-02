import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import {
  createPaymentLinkForUser,
  updatePaymentInformation,
} from "../controllers/payment-controller.js";

const paymentRouter = express.Router();

paymentRouter.post("/:id", authenticate, createPaymentLinkForUser);
paymentRouter.get("/", authenticate, updatePaymentInformation);

export default paymentRouter;
