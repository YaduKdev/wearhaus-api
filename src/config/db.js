import mongoose from "mongoose";

const dbUrl =
  "mongodb+srv://yadukdeveloper:YcOWUyqxKA292jjA@cluster0.xytpc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const connectDb = () => {
  return mongoose.connect(dbUrl);
};
