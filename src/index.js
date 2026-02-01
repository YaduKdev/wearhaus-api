import express from "express";
import cors from "cors";
import authRouter from "./routes/auth-routes.js";
import userRouter from "./routes/user-routes.js";
import productRouter from "./routes/product-routes.js";
import adminProductRouter from "./routes/adminProduct-routes.js";
import cartRouter from "./routes/cart-routes.js";
import cartItemRouter from "./routes/cartItem-routes.js";
import orderRouter from "./routes/order-routes.js";
import adminOrderRouter from "./routes/adminOrder-routes.js";
import ratingRouter from "./routes/rating-routes.js";
import reviewRouter from "./routes/review-routes.js";
import paymentRouter from "./routes/payment-routes.js";
import dotenv from "dotenv";

dotenv.config();

const { VIEW_URL } = process.env;

const app = express();

app.use(express.json());

const corsOptions = {
  origin: [VIEW_URL],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 86400, // 24 hours
};

app.use(cors(corsOptions));

app.get("/", (req, res) =>
  res.status(200).send({ message: "Welcome to Wearhaus api", status: true }),
);

app.use("/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/admin/products", adminProductRouter);
app.use("/api/cart", cartRouter);
app.use("/api/cart_items", cartItemRouter);
app.use("/api/orders", orderRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/ratings", ratingRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/payments", paymentRouter);

export default app;
