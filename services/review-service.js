import Review from "../models/Review";
import { findProductById } from "./product-service";

export const createReview = async (reviewData, user) => {
  try {
    const product = await findProductById(reviewData.productId);

    const review = new Review({
      user: user._id,
      product: product._id,
      review: reviewData.review,
      createdAt: new Date(),
    });

    await product.save();

    return await review.save();
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getAllReviews = async (productId) => {
  try {
    const product = await findProductById(productId);

    return await Review.find({ product: product._id }).populate("user");
  } catch (e) {
    throw new Error(e.message);
  }
};
