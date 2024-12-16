import CartItem from "../models/CartItem";
import { findUserById } from "./user-service";

export const updateCartItem = async (userId, cartItemId, cartItemData) => {
  try {
    const item = await findCartItemById(cartItemId);

    if (!item) {
      throw new Error(`Could Not Find Any Cart Item With Id ${cartItemId}.`);
    }

    const user = await findUserById(cartItemId);

    if (!user) {
      throw new Error(`Could Not Find Any User With Id ${userId}.`);
    }

    if (user._id.toString() === userId.toString()) {
      item.quantity = cartItemData.quantity;
      item.price = item.quantity * item.product.price;
      item.discountedPrice = item.quantity * item.product.discountedPrice;

      const updatedCartItem = await item.save();

      return updatedCartItem;
    } else {
      throw new Error("Cart Item Cannot Be Updated.");
    }
  } catch (e) {
    throw new Error({ error: e.message });
  }
};

export const removeCartItem = async (userId, cartItemId) => {
  try {
    const item = await findCartItemById(cartItemId);

    if (user._id.toString() === item.userId.toString()) {
      await CartItem.findByIdAndDelete(cartItemId);
    } else {
      throw new Error("Cannot Remove Another User's Item.");
    }
  } catch (e) {
    throw new Error({ error: e.message });
  }
};

export const findCartItemById = async (cartItemId) => {
  try {
    const item = await findCartItemById(cartItemId);

    if (item) {
      return item;
    } else {
      throw new Error(`Could Not Find Cart Item With Id ${cartItemId}.`);
    }
  } catch (e) {
    throw new Error({ error: e.message });
  }
};
