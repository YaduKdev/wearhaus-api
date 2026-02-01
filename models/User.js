import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "CUSTOMER",
  },
  mobileNo: {
    type: String,
  },
  addresses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addresses",
    },
  ],
  paymentInfo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "payment_info",
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
      ref: "ratings",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("users", userSchema);
