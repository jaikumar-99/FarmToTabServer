import { Router } from "express";

import {
  croplist,
  postcrops,
  deleteCrop,
} from "../controllers/CropController.js";

const cropRouter = Router();

// fetch crops
cropRouter.get("/getcropslist", croplist);
// add users
cropRouter.post("/addcrop", postcrops);
// update users
// router.post('/updateUser', cropController.updateUsers);
// delete user
cropRouter.post("/deletecrop", deleteCrop);

export default cropRouter;
