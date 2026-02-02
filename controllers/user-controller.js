import {
  findAllUsers,
  getUserProfileByToken,
} from "../services/user-service.js";

export const getUserProfile = async (req, res) => {
  try {
    const jwt = req.headers.authorization?.split(" ")[1];

    if (!jwt) {
      return res.status(404).send({ error: "Token Not Found." });
    }

    const user = await getUserProfileByToken(jwt);

    return res.status(200).send(user);
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await findAllUsers();

    return res.status(200).send(users);
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};
