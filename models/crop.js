import { Schema, Types, model } from "mongoose";

const CropSchema = new Schema(
  {
    CropId: {
      type: Types.ObjectId,
    },
    croptype: {
      type: String,
      required: true,
    },
    cropname: {
      type: String,
      required: true,
    },
    cropcode: {
      type: String,
      required: true,
    },
    CropImage: {
      type: String
    },
  },
  { timestamps: true }
);

const cropModel = model("Crops", CropSchema);
export default cropModel;
