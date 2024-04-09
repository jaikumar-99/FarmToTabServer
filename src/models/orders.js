import { Schema, Types, model } from "mongoose";

const OrdersSchema = new Schema(
  {
    OrderID: {
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
    productId: {
      type: String,
      required: true,
    },
    pownerId: { type: String, required: true, ref: "user" },
    consumerId: { type: String, required: true, ref: "user" },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    profilename: { type: String, required: true },
    mobile: { type: Number, required: true },
    pincode: { type: String, required: true },
    landmark: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, requires: true },
  },
  { timestamps: true }
);

const OrdersModel = model("orders", OrdersSchema);
export default OrdersModel;
