import { razorpay } from "../config/razorpay";
import { findOrderById } from "./order-service";

export const createPaymentLink = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    const paymentLinkRequest = {
      amount: order.totalDiscountedPrice * 100,
      currency: "INR",
      customer: {
        name: order.user.firstName + " " + order.user.lastName,
        email: order.user.email,
      },
      notify: {
        sms: true,
        email: true,
      },
      reminder_enable: true,
      callback_url: `http://localhost:4200/payments/${orderId}`,
      callback_method: "get",
    };

    const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);

    const paymentLinkId = paymentLink.id;
    const payment_link_url = paymentLink.short_url;

    const resData = {
      paymentLinkId,
      payment_link_url,
    };

    return resData;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updatePaymentInfo = async (reqData) => {
  const paymentId = reqData.payment_id;
  const orderId = reqData.order_id;

  try {
    const order = await findOrderById(orderId);
    const payment = await razorpay.payments.fetch(paymentId);

    if (payment.status == "captured") {
      order.paymentDetails.paymentId = paymentId;
      order.paymentDetails.status = "COMPLETED";
      order.orderStatus = "PLACED";

      await order.save();
    }

    const resData = {
      message: "Your Order Has Been Placed",
      success: true,
    };

    return resData;
  } catch (e) {
    throw new Error(e.message);
  }
};