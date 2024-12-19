import { removeCartItem, updateCartItem } from "../services/cartItem-service";

export const updateItemInCart = async (req, res) => {
  const user = await req.user;

  try {
    const updatedCartItem = await updateCartItem(
      user._id,
      req.params.id,
      req.body
    );

    return res.status(200).send(updatedCartItem);
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

export const removeItemInCart = async (req, res) => {
  const user = await req.user;

  try {
    await removeCartItem(user._id, req.params.id);

    return res.status(200).send({ message: "Cart Item Removed Successfully." });
  } catch (e) {
    console.log("ERROR", JSON.stringify(e));
    return res.status(500).send({ error: e.message });
  }
};
