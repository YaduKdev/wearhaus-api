import CartItem from "../models/CartItem.js";
import { findUserCart } from "./cart-service.js";
import { findUserById } from "./user-service.js";

export const updateCartItem = async (userId, cartItemId, cartItemData) => {
  const item = await findCartItemById(cartItemId);

  if (!item) {
    throw new Error(`Could Not Find Any Cart Item With Id ${cartItemId}.`);
  }

  const user = await findUserById(userId);

  if (!user) {
    throw new Error(`Could Not Find Any User With Id ${userId}.`);
  }

  if (user._id.toString() === userId.toString()) {
    item.quantity = cartItemData.quantity;
    item.price = item.quantity * item.product.price;
    item.discountedPrice = item.quantity * item.product.discountedPrice;

    const updatedCartItem = await item.save();

    const updatedCart = await findUserCart(userId);

    return { cartItem: updatedCartItem, cart: updatedCart };
  } else {
    throw new Error("Cart Item Cannot Be Updated.");
  }
};

export const removeCartItem = async (userId, cartItemId) => {
  const item = await findCartItemById(cartItemId);
  const user = await findUserById(userId);

  if (user._id.toString() === item.userId.toString()) {
    return await CartItem.findByIdAndDelete(cartItemId);
  } else {
    throw new Error("Cannot Remove Another User's Item.");
  }
};

export const removeAllCartItems = async (userId) => {
  const user = await findUserById(userId);

  if (user._id) {
    await CartItem.deleteMany({ userId: userId });

    return "All Cart Items Removed Successfully.";
  } else {
    throw new Error("Cannot Remove Cart Items.");
  }
};

export const findCartItemById = async (cartItemId) => {
  const item = await CartItem.findById(cartItemId).populate("product");

  if (item) {
    return item;
  } else {
    throw new Error(`Could Not Find Cart Item With Id ${cartItemId}.`);
  }
};
