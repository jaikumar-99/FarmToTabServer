import { Router } from "express";

import {
  addOrders,fetchOrders
} from "../controllers/OrderController.js";

const OrdersRouter = Router();

// add products
OrdersRouter.post("/user/addorder", addOrders);

// fetch products
OrdersRouter.post("/user/fetchorder", fetchOrders);
// update users
// cropRouter.post('/updatecrop', updatecrops);

export default OrdersRouter;
