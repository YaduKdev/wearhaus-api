import app from ".";
import dotenv from "dotenv";
import { connectDb } from "./config/db";

dotenv.config();

const { PORT } = process.env;

app.listen(PORT, async () => {
  await connectDb();
  return console.log(`WEARHAUS app is running on port ${PORT}`);
});
