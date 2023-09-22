import express from "express";
import formidable from "express-formidable";
import { isAdmin, requireSignIn } from "../middlewares/authmiddleware.js";
import {
  braintreepaymentController,
  braintreetokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleController,
  photoController,
  productCountController,
  productFilterController,
  productListController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
const route = express.Router();

route.post(
  "/create-product",

  formidable(),
  createProductController
);

route.put("/update-product/:id", updateProductController);
//
route.get("/get-product", getProductController);
route.get("/get-product/:slug", getSingleController);
route.get("/product-photo/:pid", photoController);
route.delete("/delete/:pid", deleteProductController);

route.post("/product-filters", productFilterController);
route.get("/product-count", productCountController);

route.get("/product-list/:page", productListController);

route.get("/search/:keyword", searchProductController);

route.get("/related-product/:pid/:cid", relatedProductController);

//payment route
//token from braintree
route.get("/braintree/token", braintreetokenController);

//payments
route.post("/braintree/payment", requireSignIn, braintreepaymentController);

export default route;
