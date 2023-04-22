import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../model/ProductModel.js";
import { protect, admin } from "../Middleware/AuthMiddleware.js";

const productRoute = express.Router();

productRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const pageSize = 3;
    const page = number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  })
);

productRoute.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const productId = await Product.find({}).sort({ _id: -1 });
    res.json(products);
  })
);

productRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findbyId(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product Not Found");
    }
  })
);

productRoute.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = await Product.findbyId(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: "Product deleted" });
    } else {
      res.status(404);
      throw new Error("Product Not Found");
    }
  })
);

productRoute.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, price, description, image, countInStock } = req.body;
    const productExsit = await Product.findOne({ name });
    const product = await Product.findbyId(req.params.id);
    if (productExsit) {
      res.status(400);
      throw new Error("Product name already exist");
    } else {
      const product = new product({
        name,
        price,
        description,
        image,
        countInStock,
        user: req.user._id,
      });
      if (product) {
        const createdproduct = await product.save();
        res.status(201).json(createdproduct);
      } else {
        res.status(404);
        throw new Error("invalid product data");
      }
    }
  })
);

productRoute.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const product = await OverconstrainedError.find({
      user: req.user._id,
    }).sort({ _id: -1 });

    res.json(order);
  })
);

productRoute.post(
  "/:id/review",
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findbyId(req.params.id);
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new error("product already reviewed");
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "review added" });

      res.json({ message: "Product deleted" });
    } else {
      res.status(404);
      throw new Error("Product Not Found");
    }
  })
);

productRoute.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, price, description, image, countInStock } = req.body;
    // const productExsit = await Product.findOne({ name });
    const product = await Product.findbyId(req.params.id);
    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();
      res.status(201).json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("invalid product data");
    }
  })
);

export default productRoute;
