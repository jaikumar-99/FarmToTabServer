import { Schema, Types, model } from "mongoose";

const ProductSchema = new Schema(
  {
    ProductID: {
      type: Types.ObjectId,
    },
    productname: {
      type: String,
      required: true,
    },
    cropcode: {
      type: String,
      required: true,
    },
    producttype: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {type: String, required: true, ref:'user'},
    price: { type: Number, required: true},
    qty: { type: Number, required: true},
    profilename: { type: String, required: true },
    mobile: { type: Number, required: true },
    pincode: { type: String, required: true },
    landmark: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, requires: true },
    totalland: { type: Number, required: true },
  },
  { timestamps: true }
);

const ProductModel = model("products", ProductSchema);
export default ProductModel;