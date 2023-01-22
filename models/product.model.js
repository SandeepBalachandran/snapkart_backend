import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please Include the product name"],
    },
    rating: {
      type: Number,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "Please Include the product price"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
// module.exports = mongoose.model("Product", productSchema);
