import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: true,
  },
  discountPercent: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  sizes: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  imageUrl: {
    type: String,
    required: true,
  },
  samplePics: [
    {
      type: String,
      required: true,
    },
  ],
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ratings",
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviews",
    },
  ],
  totalRatings: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("products", productSchema);
