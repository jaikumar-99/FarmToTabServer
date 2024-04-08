import cors from "cors";
import express from "express";
import { config } from "dotenv";
import { connect } from "mongoose";
import bodyparser from "body-parser";
import userRouter from "./routes/UserRoutes.js";
import cropRouter from "./routes/CropRoutes.js";

config();
const { DB_ACCESS, PORT } = process.env;
console.log("Db url", DB_ACCESS);
const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(userRouter, cropRouter);

connect(DB_ACCESS)
  .then(() => {
    app.listen(PORT);
    console.log("server is running");
  })
  .catch((err) => {
    console.log("Unable to run the server", err);
  });
