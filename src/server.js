import app from ".";
import { connectDb } from "./config/db";

const PORT = 8200;

app.listen(PORT, async () => {
  await connectDb();
  return console.log(`WEARHAUS app is running on port ${PORT}`);
});
