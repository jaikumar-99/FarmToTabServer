import { Router } from "express";

import {
  addproducts, fetchproducts,
} from "../controllers/ProductController.js";

const ProductsRouter = Router();

// add products
ProductsRouter.post("/user/addproducts", addproducts);

// fetch products
ProductsRouter.post("/user/fetchProducts", fetchproducts);
// update users
// cropRouter.post('/updatecrop', updatecrops);

export default ProductsRouter;
