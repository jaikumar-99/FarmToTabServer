import { Router } from "express";

import {
  getUsers,
  postUsers,
  updateUsers,
  deleteUser,
  loginUser,
  signUpUser,
  fetchUserDetails,
  updateUserProfile,
} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares.js";

const userRouter = Router();

// fetch users
userRouter.post("/getuser", getUsers);
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
userRouter.post("/user/profile_update", authenticateToken, updateUserProfile);

export default userRouter;
