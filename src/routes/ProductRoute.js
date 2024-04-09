import { Router } from "express";

import {
  addproducts, fetchproducts,
} from "../controllers/ProductController.js";
import { authenticateToken } from "../middlewares.js";
const ProductsRouter = Router();

// add products
ProductsRouter.post("/user/addproducts",authenticateToken, addproducts);

// fetch products
ProductsRouter.post("/user/fetchProducts",authenticateToken, fetchproducts);
// update users
// cropRouter.post('/updatecrop', updatecrops);

export default ProductsRouter;
