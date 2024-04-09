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

userRouter.get("/", (req, res) => {
  res.send("Farm To Table is running!");
});

// fetch users
userRouter.post("/getuser",authenticateToken, getUsers);
// add users
userRouter.post("/addUser",authenticateToken, postUsers);
// update users
userRouter.post("/updateUser",authenticateToken, updateUsers);
// delete user
userRouter.post("/deleteUser",authenticateToken, deleteUser);

// login user
userRouter.post("/user/login", loginUser);
userRouter.post("/user/signup", signUpUser);
userRouter.post("/user/details", authenticateToken, fetchUserDetails);
userRouter.post("/user/profile_update", authenticateToken, updateUserProfile);

export default userRouter;
