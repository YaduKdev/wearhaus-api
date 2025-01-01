import Address from "../models/Address";
import Order from "../models/Order";
import OrderItem from "../models/OrderItem";
import { findUserCart } from "./cart-service";

export const createOrder = async (user, shipAddress) => {
  try {
    let address;

    if (shipAddress._id) {
      let existingAddress = await Address.findById(shipAddress._id);
      address = existingAddress;
    } else {
      address = new Address(shipAddress);

      await address.save();

      user.addresses.push(address);

      await user.save();
    }

    const cart = await findUserCart(user._id);
    const orderItems = [];

    for (let item of cart.cartItems) {
      const orderItem = new OrderItem({
        price: item.price,
        product: item.product,
        quantity: item.quantity,
        size: item.size,
        userId: item.userId,
        discountedPrice: item.discountedPrice,
      });

      const createdOrderItem = await orderItem.save();
      orderItems.push(createdOrderItem);
    }

    const createdOrder = new Order({
      user,
      orderItems,
      totalPrice: cart.totalPrice,
      totalDiscountedPrice: cart.totalDiscountedPrice,
      discount: cart.discount,
      totalItems: cart.totalItems,
      shippingAddress: address,
    });

    const savedOrder = await createdOrder.save();

    return savedOrder;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const placeOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    order.orderStatus = "PLACED";
    order.paymentDetails.status = "COMPLETED";

    return await order.save();
  } catch (e) {
    throw new Error(e.message);
  }
};

export const confirmOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    order.orderStatus = "CONFIRMED";

    return await order.save();
  } catch (e) {
    throw new Error(e.message);
  }
};

export const shipOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    order.orderStatus = "SHIPPED";

    return await order.save();
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deliverOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    order.orderStatus = "DELIVERED";

    return await order.save();
  } catch (e) {
    throw new Error(e.message);
  }
};

export const cancelOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    order.orderStatus = "CANCELLED";

    return await order.save();
  } catch (e) {
    throw new Error(e.message);
  }
};

export const findOrderById = async (orderId) => {
  try {
    const order = await Order.findById(orderId)
      .populate("user")
      .populate({ path: "orderItems", populate: { path: "product" } })
      .populate("shippingAddress");

    return order;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getUserOrderHistory = async (userId) => {
  try {
    const orders = await Order.find({ user: userId, orderStatus: "PLACED" })
      .populate({ path: "orderItems", populate: "product" })
      .lean();

    return orders;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getAllOrders = async () => {
  try {
    return await Order.find()
      .populate({ path: "orderItems", populate: "product" })
      .lean();
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    await Order.findByIdAndDelete(order._id);

    return order;
  } catch (e) {
    throw new Error(e.message);
  }
};
