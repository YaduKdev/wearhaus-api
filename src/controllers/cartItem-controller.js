import { removeCartItem, updateCartItem } from "../services/cartItem-service";

export const updateItemInCart = async (req, res) => {
  const user = req.user;

  try {
    const updatedCartItem = await updateCartItem(
      user._id,
      req.params.id,
      req.body
    );

    return res.send(200).send(updatedCartItem);
  } catch (error) {
    return res.status(500).send({ error: e.message });
  }
};

export const removeItemInCart = async (req, res) => {
  const user = req.user;

  try {
    await removeCartItem(user._id, req.params.id);

    return res.send(200).send({ message: "Cart Item Removed Successfully." });
  } catch (error) {
    return res.status(500).send({ error: e.message });
  }
};
