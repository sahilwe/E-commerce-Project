import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authmiddleware.js";
import {
  creatcategoryController,
  deletecategoryController,
  getSingleCategory,
  getcategoryController,
  updatecategoryController,
} from "../controllers/categoryController.js";

const route = express.Router();

route.post("/create-category", creatcategoryController);

route.put(
  "/update-category/:id",

  updatecategoryController
);

//get All category

route.get("/get-category", getcategoryController);

route.get("/single-category/:slug", getSingleCategory);

route.delete(
  "/delete-categroy/:id",

  deletecategoryController
);
export default route;
