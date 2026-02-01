import app from ".";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";

dotenv.config();

const { PORT = 8200 } = process.env;

// app.listen(PORT, async () => {
//   await connectDb();
//   return console.log(`WEARHAUS app is running on port ${PORT}`);
// });

app.listen(PORT, async () => {
  try {
    await connectDb();
    console.log(`WEARHAUS app is running on port ${PORT}`);
  } catch (err) {
    console.error("Database connection failed:", err);
  }
});
