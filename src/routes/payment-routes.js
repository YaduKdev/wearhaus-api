import express from "express";
import { authenticate } from "../middlewares/authenticate";
import {
  createPaymentLinkForUser,
  updatePaymentInformation,
} from "../controllers/payment-controller";

const paymentRouter = express.Router();

paymentRouter.post("/:id", authenticate, createPaymentLinkForUser);
paymentRouter.get("/", authenticate, updatePaymentInformation);

export default paymentRouter;
