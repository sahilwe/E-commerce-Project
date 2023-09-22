import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const creatcategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        message: "Name is Required",
      });
    }
    const existcategory = await categoryModel.findOne({ name });
    if (existcategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exist",
      });
    }

    const addcategory = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "New Category Add Successfully!",
      addcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Category",
      error,
    });
  }
};

export const updatecategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category Updated",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating ",
    });
  }
};

export const getcategoryController = async (req, res) => {
  try {
    const getcategory = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Categoryies List",
      getcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting All category",
    });
  }
};

export const getSingleCategory = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get Single Category",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error",
      error,
    });
  }
};

export const deletecategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully!",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Deletion",
      error,
    });
  }
};
