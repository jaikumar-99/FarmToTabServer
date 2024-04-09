import { Router } from "express";

import {
  croplist,
  postcrops,
  deleteCrop,
  updatecrops,
} from "../controllers/CropController.js";

import { authenticateToken } from "../middlewares.js";

const cropRouter = Router();

// fetch crops
cropRouter.post("/getcropslist",authenticateToken, croplist);
// add users
cropRouter.post("/addcrop",authenticateToken, postcrops);
// update users
cropRouter.post("/updatecrop",authenticateToken, updatecrops);
// delete user
cropRouter.post("/deletecrop",authenticateToken, deleteCrop);

export default cropRouter;
