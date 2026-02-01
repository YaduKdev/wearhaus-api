import express from "express";
import { getAllUsers, getUserProfile } from "../controllers/user-controller";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/profile", getUserProfile);

export default userRouter;
