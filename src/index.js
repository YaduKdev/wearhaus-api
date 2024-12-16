import express from "express";
import cors from "cors";
import authRouter from "./routes/auth-route";
import userRouter from "./routes/user-route";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) =>
  res.status(200).send({ message: "Welcome to Wearhaus api", status: true })
);

app.use("/auth", authRouter);
app.use("/api/users", userRouter);

export default app;
