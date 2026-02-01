import Rating from "../models/Rating";
import { findProductById } from "./product-service";

export const createRating = async (ratingData, user) => {
  try {
    const product = await findProductById(ratingData.productId);

    const rating = new Rating({
      product: product._id,
      user: user._id,
      rating: ratingData.rating,
      createdAt: new Date(),
    });

    return await rating.save();
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getProductRatings = async (productId) => {
  try {
    return await Rating.find({ product: productId });
  } catch (e) {
    throw new Error(e.message);
  }
};
