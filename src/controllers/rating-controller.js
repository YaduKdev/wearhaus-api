import { createRating, getProductRatings } from "../services/rating-service";

export const createRatingForUser = async (req, res) => {
  const user = req.user;

  try {
    const rating = await createRating(req.body, user);

    return res.status(201).send(rating);
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

export const getAllRatingsForUser = async (req, res) => {
  const productId = req.params.productId;

  try {
    const ratings = await getProductRatings(productId);

    return res.status(200).send(ratings);
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};
