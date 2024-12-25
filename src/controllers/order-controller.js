import {
  createOrder,
  findOrderById,
  getUserOrderHistory,
} from "../services/order-service";

export const createOrderForUser = async (req, res) => {
  const user = await req.user;

  try {
    let createdOrder = await createOrder(user, req.body);

    return res.status(201).send(createdOrder);
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

export const findOrderByIdForUser = async (req, res) => {
  const user = await req.user;
  try {
    let order = await findOrderById(req.params.id);

    return res.status(200).send(order);
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

export const orderHistoryForUser = async (req, res) => {
  const user = await req.user;
  try {
    let orderHistory = await getUserOrderHistory(user._id);

    return res.send(200).send(orderHistory);
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};
