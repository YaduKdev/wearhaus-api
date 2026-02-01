import { getUserIdFromToken } from "../config/jwtProvider";
import { findUserById } from "../services/user-service";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(404).send({ error: "Token Not Found" });
    }

    const userId = getUserIdFromToken(token);
    const user = findUserById(userId);

    req.user = user;
  } catch (e) {
    return res.status(404).send({ error: e.message });
  }

  next();
};
