import Joi from "joi";
import ProductModel from "../models/product.js";
import { parseBody, parseOutput } from "./shared.service.js";


export const addproducts = async (req, res, next) => {
    const response = { success: true, message: "", accessToken: "" };
    try {
      const payload = await parseBody(req.body);
      console.log(payload);
  
      const schema = Joi.object({
        productname: Joi.string().required(),
        cropcode: Joi.string().required(),
        producttype: Joi.string().required(),
        description: Joi.string().required().max(1000),
        price: Joi.number().required(),
        qty: Joi.number().required(),
        userId: Joi.string().required(),
        profilename: Joi.string().required(),
        mobile: Joi.number().required(),
        pincode: Joi.number().required(),
        landmark: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        totalland: Joi.number().required(),
      });
  
      const value = await schema.validateAsync(payload);
      console.log("user Input", value);
    //   console.log(data, "check");
  await ProductModel
    .insertMany([value])
    .then((result) => {
      response.success = true;
      response.message = "Product Added Successfully!!!"
      console.log(result, "resss");
      res.status(200).send(response);
    })
    .catch((err) => {
      response.success = false;
      response.message = "Product adding failed!!!"
      console.log(err);
    });
    } catch (error) {
      console.log(error);
      response.success = false;
      response.message = "Unable to add products";
      res.status(200).send(response);
    }
  };


  // fetch crops
export const fetchproducts = async (req, res, next) => {
    const response = {
      success: true,
      message: "",
      accessToken: "",
      data: [],
    };
    await ProductModel.find().then(async (result) => {
      console.log(result, "result");
      response.message = "Products fetched successfully";
        response.data = result;
        const output = await parseOutput(response);
        res.status(200).send(output);
    }).catch((err) => {
      response.success = false;
      response.message = "Products fetching failed";
      response.data = [];
    });;
  };