import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const { Schema } = mongoose;
const ItemSchema = new mongoose.Schema(
  {
    product_id: {
      // type: ObjectId,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      trim: true,
      required: true,
    },
    user_id: {
      type: ObjectId,
      trim: true,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity can not be less then 1.']
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    rating: {
      type: Number,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

const CartSchema = new Schema({
  items: [ItemSchema],
  subTotal: {
    default: 0,
    type: Number
  }
}, {
  timestamps: true
})

export default mongoose.model("Cart", CartSchema);
