import { Schema, Types, model } from "mongoose";

const CropSchema = new Schema(
  {
    CropId: {
      type: Types.ObjectId,
    },
    CropType: {
      type: String,
      required: true,
    },
    CropName: {
      type: String,
      required: true,
    },
    CropImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const cropModel = model("Crops", CropSchema);
export default cropModel;
