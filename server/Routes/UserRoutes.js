import express from "express";
import asyncHandler from "express-async-handler";
import User from "./../model/userSchema.js";
import { protect, admin } from "../Middleware/AuthMiddleware.js";
// import asyncHandler from "express-async-handler";
// import generateToken from "../utils/generateToken.js";

const userRoute = express.Router();

userRoute.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.match(password))) {
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new error("invalid credentials");
    }
    // res.json(products);
  })
);

//profile
userRoute.post(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

//register
userRoute.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("user already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        // createdAt: user.createdAt,
      });
    } else {
      res.status(400);
      throw new Error("Invalid User data");
    }
  })
);

//update user profile
userRoute.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

userRoute.get(
  "/",
  protect,
  asyncHandler(async (res, req) => {
    const users = await User.find({});
    res.json(users);
  })
);

userRoute.get(
  "/",
  admin,
  asyncHandler(async (res, req) => {
    const users = await User.find({});
    res.json(users);
  })
);

export default userRoute;
