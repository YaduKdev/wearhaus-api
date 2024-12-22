import Cart from "../models/Cart";
import CartItem from "../models/CartItem";
import Product from "../models/Product";

export const createCart = async (user) => {
  try {
    const cart = new Cart({ user });
    const createdCart = await cart.save();

    return createdCart;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const findUserCart = async (userId) => {
  try {
    let cart = await Cart.findOne({ user: userId });
    let cartItems = await CartItem.find({ cart: cart._id }).populate("product");

    cart.cartItems = cartItems;

    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItems = 0;

    for (let cartItem of cart.cartItems) {
      totalPrice += cartItem.price;
      totalDiscountedPrice += cartItem.discountedPrice;
      totalItems += cartItem.quantity;
    }

    cart.totalPrice = totalPrice;
    cart.totalItems = totalItems;
    cart.discount = totalDiscountedPrice;
    cart.totalDiscountedPrice = totalPrice - totalDiscountedPrice;

    return cart;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const addCartItem = async (userId, productData) => {
  try {
    const cart = await Cart.findOne({ user: userId });
    const product = await Product.findById(productData.productId);
    console.log("cart===>", cart);
    const isPresent = await CartItem.findOne({
      cart: cart._id,
      product: product._id,
      userId,
    });

    if (!isPresent) {
      const cartItem = new CartItem({
        product: product._id,
        cart: cart._id,
        quantity: 1,
        userId,
        price: product.price,
        size: productData.size,
        discountedPrice: product.discountedPrice,
      });

      const createdCartItem = await cartItem.save();
      cart.cartItems.push(createdCartItem);
      await cart.save();

      return "Item Added To Cart.";
    }
  } catch (e) {
    throw new Error(e.message);
  }
};
