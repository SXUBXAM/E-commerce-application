import express from "express";
import User from "./model/userSchema.js";
import users from "./data/users.js";
import Product from "./model/ProductModel.js";
// import products from "./data/Products.js";
import asyncHandler from "express-async-handler";
import products from "./data/Products.js";

const ImportData = express.Router();

ImportData.post(
  "/users",
  asyncHandler(async (req, res) => {
    // await User.Remove({});
    const importUser = await User.insertMany(users);
    res.send({ importUser });
  })
);

ImportData.post(
  "/products",
  asyncHandler(async (req, res) => {
    // await Product.Remove({});
    const importProducts = await Product.insertMany(products);
    // console.log({ importProduct });
    res.send({ importProducts });
  })
);

export default ImportData;
