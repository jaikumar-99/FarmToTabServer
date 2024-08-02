import Joi from "joi";
import usersModel from "../models/user.js";
import { parseBody, parseOutput } from "./shared.service.js";
import jwt from "jsonwebtoken";
import { compare, compareSync, hash } from "bcrypt";
import { config } from "dotenv";

config();

// encryption
const salt = 11.4;
const { ENC_KEY } = process.env;

// save users
export const postUsers = async (req, res, next) => {
  let data = req.body.data;
  console.log(data, "check");
  await usersModel
    .insertMany(data)
    .then((result) => {
      console.log(result, "resss");
      res.status(200).json({ message: "User added successfully!!!" });
    })
    .catch((err) => {
      console.log(err);
    });
};

// fetch users
export const getUsers = async (req, res, next) => {
  const response = {
    success: true,
    message: "",
    accessToken: "",
    data: [],
  };
  await usersModel
    .find({ role: { $ne: 3 } })
    .then(async (result) => {
      console.log(result, "result");
      response.message = "Users fetched successfully";
      response.data = result;
    })
    .catch((err) => {
      response.success = false;
      response.message = "Users fetching failed";
      response.data = [];
    });
  const output = await parseOutput(response);
  res.status(200).send(output);
};

// update users
export const updateUsers = async (req, res, next) => {
  let obj = req.body.data;
  let userId = req.body.id;
  console.log(req.body, "body");
  await usersModel.updateOne({ _id: userId }, { $set: obj }).then((result) => {
    console.log(result, "result");
    res.status(200).json({ final: result });
  });
};

// delete user
export const deleteUser = async (req, res, next) => {
  let payload = await parseBody(req.body);
  let userId = payload.id;
  const response = {
    success: true,
    message: "",
    accessToken: "",
  };
  console.log("Entered Route", userId);
  await usersModel
    .deleteOne({ _id: userId })
    .then(async (result) => {
      console.log(result, "result");
      response.message = "User deleted successfully";
      // response.data = result;
    })
    .catch((err) => {
      response.success = false;
      response.message = "Users deletion failed";
    });
  const output = await parseOutput(response);
  res.status(200).send(output);
};

// login users
export const loginUser = async (req, res, next) => {
  const result = {
    success: true,
    message: "",
    accessToken: "",
    data: {},
  };
  try {
    const payload = await parseBody(req.body);
    console.log(payload);

    const schema = Joi.object({
      username: Joi.string().min(4).max(30),
      password: Joi.string().min(8).max(20),
    });

    const value = await schema.validateAsync(payload);
    console.log("user Input", value);

    const userDetails = await usersModel.findOne({ email: value.username });
    if (userDetails?.email) {
      const passCheck = await compare(value.password, userDetails.password);
      if (passCheck) {
        const tokenCreds = {
          email: userDetails.email,
          userId: userDetails._id,
          role: userDetails.role,
        };
        result.data = {
          email: userDetails.email,
          role: userDetails.role,
        };
        result.accessToken = await generateToken(tokenCreds);
        result.message = "Login successfully!";
      } else {
        console.log("pass miss match");
        result.success = false;
        result.message = "Username or Password mismatch!";
      }
    } else {
      console.log("User notfound!");
      result.success = false;
      result.message = "Username or Password mismatch!";
    }
  } catch (error) {
    console.log(error, "error");
    result.success = false;
    result.message = "Unable to login!";
  }
  const output = await parseOutput(result);
  res.send(output);
};

export const signUpUser = async (req, res, next) => {
  const result = { data: {}, success: true, message: "", accessToken: "" };
  try {
    const payload = await parseBody(req.body);
    console.log(payload);

    const schema = Joi.object({
      username: Joi.string().min(4).max(30),
      password: Joi.string().min(8).max(20),
      confpassword: Joi.ref("password"),
    });

    const value = await schema.validateAsync(payload);
    console.log("user Input", value);

    const userDetails = await usersModel.findOne({ email: value.username });

    if (!userDetails?.email) {
      console.log("check", value);

      const enc_password = await encPass(value.password);

      const newUser = new usersModel({
        email: value.username,
        password: enc_password,
        role: 1,
        status: 1,
      });
      const newUserDetails = await newUser.save();
      console.log(newUserDetails);
      result.userId = `${newUserDetails._id}`;

      const tokenCreds = {
        email: newUserDetails.email,
        userId: newUserDetails._id,
        role: newUserDetails.role,
      };
      result.data = {
        email: newUserDetails.email,
        role: newUserDetails.role,
      };

      result.accessToken = await generateToken(tokenCreds);
      result.message = "Signup successfully!";
    } else {
      result.success = false;
      result.message = "User already exists!";
    }
  } catch (error) {
    console.log(error);
    result.success = false;
    result.message = "Unable to signup!";
  }
  const output = await parseOutput(result);
  res.send(output);
};

export const fetchUserDetails = async (req, res, next) => {
  const result = {
    success: true,
    message: "",
    data: {},
  };

  try {
    const userCredentials = req.user;
    const userDetails = await usersModel.findOne(
      { email: userCredentials.email },
      { password: 0 }
    );
    result.data = userDetails;
    result.message = "User details fetched!";
  } catch (error) {
    result.success = false;
    result.message = "Unable to fetch the details!";
  }

  const output = await parseOutput(result);
  res.send(output);
};

export const updateUserProfile = async (req, res, next) => {
  const result = {
    success: true,
    message: "",
    data: {},
  };

  try {
    const payload = await parseBody(req.body);
    console.log(payload);

    const schema = Joi.object({
      profilename: Joi.string().min(4),
      mobile: Joi.string().min(4),
      pincode: Joi.string().min(4),
      landmark: Joi.string().min(4),
      state: Joi.string().min(2),
      role: Joi.number().required(),
      country: Joi.string().min(2),
      totalland: Joi.number(),
    });

    const value = await schema.validateAsync(payload);
    console.log("user Input", value);

    const userCredentials = req.user;
    const userDetails = await usersModel.findOne(
      { email: userCredentials.email },
      { password: 0 }
    );

    if (userDetails?.email) {
      await userDetails.updateOne({
        profilename: value.profilename,
        mobile: value.mobile,
        pincode: value.pincode,
        landmark: value.landmark,
        role: value.role,
        state: value.state,
        country: value.country,
        totalland: value.totalland,
      }).where({_id: userCredentials.userId});
    }

    const updatedDetails = await usersModel.findOne(
      { email: userCredentials.email },
      { password: 0 }
    );

    console.log(updatedDetails);

    result.data = updatedDetails;
    result.message = "User details updated!";
  } catch (error) {
    console.log(error);
    result.success = false;
    result.message = "Unable to update the details!";
  }

  const output = await parseOutput(result);
  res.send(output);
};

const encPass = async (password) => {
  return await hash(password, salt);
};

const generateToken = async (tokenCreds) => {
  return jwt.sign(tokenCreds, ENC_KEY, { expiresIn: "48h" });
};
