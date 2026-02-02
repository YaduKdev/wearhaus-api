import { addCartItem, findUserCart } from "../services/cart-service.js";

export const findUsersCart = async (req, res) => {
  const user = await req.user;

  try {
    const cart = await findUserCart(user._id);

    return res.status(200).send(cart);
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

export const addItemToCart = async (req, res) => {
  const user = await req.user;

  try {
    const cartItem = await addCartItem(user._id, req.body);

    return res.status(200).send(cartItem);
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};
