import { Router } from "express";

import {
  getUsers,
  postUsers,
  updateUsers,
  deleteUser,
  loginUser,
  signUpUser,
  fetchUserDetails,
} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares.js";

const userRouter = Router();

// fetch users
userRouter.get("/getuser", getUsers);
// add users
userRouter.post("/addUser", postUsers);
// update users
userRouter.post("/updateUser", updateUsers);
// delete user
userRouter.post("/deleteUser", deleteUser);

// login user
userRouter.post("/user/login", loginUser);
userRouter.post("/user/signup", signUpUser);
userRouter.post("/user/details", authenticateToken, fetchUserDetails);

export default userRouter;
