import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env;

export const generateToken = (userId) => {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "48h" });

  return token;
};

export const getUserIdFromToken = (token) => {
  const decodedToken = jwt.verify(token, JWT_SECRET);

  return decodedToken.userId;
};
