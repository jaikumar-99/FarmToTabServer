import Joi from "joi";
import cropModel from "../models/crop.js";
import { parseBody, parseOutput } from "./shared.service.js";



// save crops
export const postcrops = async (req, res, next) => {
  let data = req.body;
  const payload = await parseBody(req.body);
    console.log(payload);
    const response = {
      success: true,
      message: "",
    };

    const schema = Joi.object({
      croptype: Joi.string().min(3),
      cropname: Joi.string().min(3),
      cropcode: Joi.string().min(3)
    });

    const value = await schema.validateAsync(payload);
    console.log("user Input", );

  console.log(data, "check");
  const CropDetails = await cropModel.findOne({ cropcode:payload.cropcode });
    console.log(CropDetails, 'CropDetails')
    if(!CropDetails?.cropname) {
  await cropModel
    .insertMany([value])
    .then(async (result) => {
      response.success = true;
      response.message = "Crop Added Successfully!!!"
      console.log(result, "resss");
    })
    .catch(async (err) => {
      response.success = false;
      response.message = "Crop adding failed!!!"
      console.log(err);
    });
  } else {
    response.success = false;
    response.message = "Crop already exists!!!"
  }
  const output = await parseOutput(response);
  res.status(200).send(output);
};

// fetch crops
export const croplist = async (req, res, next) => {
  const response = {
    success: true,
    message: "",
    accessToken: "",
    data: [],
  };
  await cropModel.find().then(async (result) => {
    console.log(result, "result");
    response.message = "Crops fetched successfully";
      response.data = result;
  }).catch(async (err) => {
    response.success = false;
    response.message = "Crops fetching failed";
    response.data = [];
  });;
  const output = await parseOutput(response);
  res.status(200).send(output);
};

// update Crops
export const updatecrops = async (req,res,next) => {
  const response = {
    success: true,
    message: "",
  };
  try {
    const payload = await parseBody(req.body);
    console.log(payload);
    const schema = Joi.object({
      croptype: Joi.string().min(3),
      cropname: Joi.string().min(3),
    });

    const value = await schema.validateAsync(payload.data);
    console.log("user Input", value);

    let obj = req.body.data;
    let cropId = req.body.id;
    console.log(req.body, 'body')
    const CropDetails = await cropModel.findOne({ _id:cropId });
    console.log(CropDetails, 'CropDetails')
    if(!CropDetails?.cropname) {
    await cropModel.updateOne({_id:cropId},{$set: obj}).then(async(resp) => {
      response.message = "Updated crops successfully!!!";
      // response.data = result;
    }).catch((err)=> {
      response.success = false;
      response.message = "Unable to update the details!!!";
      console.log(err);
    })
  } else {
    response.success = false;
    response.message = "Crop name already exists!!!";
  }
  } catch (err) {
    console.log(err);
    response.success = false;
    response.message = "Unable to update the details!!!";
  }
  const output = await parseOutput(response);
  res.status(200).send(output);
}

// delete user
export const deleteCrop = async (req, res, next) => {
  const response = {
    success: true,
    message: "",
  };
  let payload = await parseBody(req.body);
  let cropId = payload.id;
  console.log("Entered Route", cropId);
  await cropModel.deleteOne({ _id: cropId }).then(async (result) => {
    response.message = "Crops deleted successfully!!!";
      // response.data = result;
      
  }).catch((err) => {
    response.success = false;
    response.message = "Crops deletion failed!!!";
  });
  const output = await parseOutput(response);
      res.status(200).send(output);
};