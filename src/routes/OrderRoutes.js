import { Router } from "express";

import {
  addOrders,fetchOrders
} from "../controllers/OrderController.js";
import { authenticateToken } from "../middlewares.js";

const OrdersRouter = Router();

// add products
OrdersRouter.post("/user/addorder",authenticateToken, addOrders);

// fetch products
OrdersRouter.post("/user/fetchorder",authenticateToken, fetchOrders);
// update users
// cropRouter.post('/updatecrop', updatecrops);

export default OrdersRouter;
