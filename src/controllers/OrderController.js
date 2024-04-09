import Joi from "joi";
// import Orders from "../models/orders.js";
import { parseBody, parseOutput } from "./shared.service.js";
import OrdersModel from "../models/orders.js";
import * as _ from 'underscore'
import ProductModel from "../models/product.js";


export const addOrders = async (req, res, next) => {
    const response = { success: true, message: "", accessToken: "" };
    try {
      const payload = await parseBody(req.body);
      console.log(payload);

      let ids = _.pluck(payload,'productId')

  
      const schema = Joi.object({
        productname: Joi.string().required(),
        cropcode: Joi.string().required(),
        producttype: Joi.string().required(),
        price: Joi.number().required(),
        qty: Joi.number().required(),
        pownerId: Joi.string().required(),
        productId: Joi.string().required(),
        consumerId: Joi.string().required(),
        profilename: Joi.string().required(),
        mobile: Joi.number().required(),
        pincode: Joi.number().required(),
        landmark: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
      });

      const values = Joi.array().items(schema)
  
      const value = await values.validateAsync(payload);
      console.log("user Input", value);
    //   console.log(data, "check");
  await OrdersModel
    .insertMany(value)
    .then(async (result) => {
        await ProductModel.deleteMany({_id: {$in: ids}}).then((res) => {
            console.log(res, "res");
        }).catch((err) => {
            response.success = false;
            response.message = "Products deletion failed!!!"
        })
      response.success = true;
      response.message = "Products purchased Successfully!!!"
      console.log(result, "resss");
    })
    // .catch((err) => {
    //   response.success = false;
    //   response.message = "Products purchasing failed!!!"
    //   console.log(err);
    // });
    } catch (error) {
      console.log(error);
      response.success = false;
      response.message = "Unable to purchase products";
    }
    const output = await parseOutput(response);
    res.status(200).send(output);
  };


  // fetch orders
export const fetchOrders = async (req, res, next) => {
    const response = {
      success: true,
      message: "",
      accessToken: "",
      data: [],
    };
    await OrdersModel.find().then(async (result) => {
      console.log(result, "result");
      response.message = "Orders fetched successfully!!!";
        response.data = result;
    }).catch(async (err) => {
      response.success = false;
      response.message = "Orders fetching failed!!!";
      response.data = [];
    });
    const output = await parseOutput(response);
    res.status(200).send(output);
  };