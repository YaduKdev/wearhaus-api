import { createReview, getAllReviews } from "../services/review-service.js";

export const createReviewForUser = async (req, res) => {
  const user = req.user;

  try {
    const review = await createReview(req.body, user);

    return res.status(201).send(review);
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

export const getAllReviewsForUser = async (req, res) => {
  const productId = req.params.productId;

  try {
    const reviews = await getAllReviews(productId);

    return res.status(200).send(reviews);
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};
