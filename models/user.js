import { Schema, Types, model } from "mongoose";

const userSchema = new Schema(
  {
    // userId: {
    //   type: Types.ObjectId,
    // },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      required: true,
    },
    status: { type: Number, required: true, default: 1 },
  },
  { timestamps: true }
);

const usersModel = model("user", userSchema);
export default usersModel;
