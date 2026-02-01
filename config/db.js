import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { DB_URL } = process.env;

export const connectDb = () => {
  return mongoose.connect(DB_URL);
};
