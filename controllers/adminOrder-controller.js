import {
  cancelOrder,
  confirmOrder,
  deleteOrder,
  deliverOrder,
  getAllOrders,
  shipOrder,
} from "../services/order-service";

export const getAllOrdersForAdmin = async (req, res) => {
  try {
    const orders = await getAllOrders();

    return res.status(200).send(orders);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

export const confirmOrderForAdmin = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const orders = await confirmOrder(orderId);

    return res.status(200).send(orders);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

export const shipOrderForAdmin = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const orders = await shipOrder(orderId);

    return res.status(200).send(orders);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

export const deliverOrderForAdmin = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const orders = await deliverOrder(orderId);

    return res.status(200).send(orders);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

export const cancelOrderForAdmin = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const orders = await cancelOrder(orderId);

    return res.status(200).send(orders);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

export const deleteOrderForAdmin = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const orders = await deleteOrder(orderId);

    return res.status(200).send(orders);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};
