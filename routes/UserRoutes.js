import { Router } from "express";

import {
  getUsers,
  postUsers,
  updateUsers,
  deleteUser,
  loginUser,
  signUpUser,
} from "../controllers/userController.js";

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

export default userRouter;
