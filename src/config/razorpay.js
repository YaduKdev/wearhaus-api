import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

const { RAZOR_ID, RAZOR_SECRET } = process.env;

export const razorpay = new Razorpay({
  key_id: RAZOR_ID,
  key_secret: RAZOR_SECRET,
});
