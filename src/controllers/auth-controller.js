import { createUser, getUserByEmail } from "../services/user-service";
import { createCart } from "../services/cart-service";
import { generateToken } from "../config/jwtProvider";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const user = await createUser(req.body);
    const jwt = generateToken(user._id);

    await createCart(user);

    return res
      .status(200)
      .send({ jwt, message: "You Have Signed Up Successfully." });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

export const login = async (req, res) => {
  const { password, email } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res
        .status(404)
        .send({ message: `No User Found For This Email ${email}.` });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .send(
          "The Given Password Is Invalid. Please Check Your Password And Try Again."
        );
    }

    const jwt = generateToken(user._id);

    return res
      .status(200)
      .send({ jwt, message: "You Have Signed In Successfully." });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};
