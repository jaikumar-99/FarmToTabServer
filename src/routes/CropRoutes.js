import { Router } from "express";

import {
  croplist,
  postcrops,
  deleteCrop,
  updatecrops,
} from "../controllers/CropController.js";

const cropRouter = Router();

// fetch crops
cropRouter.post("/getcropslist", croplist);
// add users
cropRouter.post("/addcrop", postcrops);
// update users
cropRouter.post("/updatecrop", updatecrops);
// delete user
cropRouter.post("/deletecrop", deleteCrop);

export default cropRouter;
