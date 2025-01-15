import express from "express";
import cors from "cors";
import authRouter from "./routes/auth-routes";
import userRouter from "./routes/user-routes";
import productRouter from "./routes/product-routes";
import adminProductRouter from "./routes/adminProduct-routes";
import cartRouter from "./routes/cart-routes";
import cartItemRouter from "./routes/cartItem-routes";
import orderRouter from "./routes/order-routes";
import adminOrderRouter from "./routes/adminOrder-routes";
import ratingRouter from "./routes/rating-routes";
import reviewRouter from "./routes/review-routes";
import paymentRouter from "./routes/payment-routes";

const app = express();

app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:4200", "https://yourdomain.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 86400, // 24 hours
};

app.use(cors(corsOptions));

app.get("/", (req, res) =>
  res.status(200).send({ message: "Welcome to Wearhaus api", status: true })
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
