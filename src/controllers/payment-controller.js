import {
  createPaymentLink,
  updatePaymentInfo,
} from "../services/payment-service";

export const createPaymentLinkForUser = async (req, res) => {
  try {
    const paymentLink = await createPaymentLink(req.params.id);

    return res.status(200).send(paymentLink);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

export const updatePaymentInformation = async (req, res) => {
  try {
    await updatePaymentInfo(req.query);

    return res
      .status(200)
      .send({ message: "Payment Information Updated", status: true });
  } catch (e) {
    return res.status(500).send(e.message);
  }
};
