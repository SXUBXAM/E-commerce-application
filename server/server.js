import express from "express";
import products from "./data/Products.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import ImportData from "./DataImport.js";
import productRoute from "./Routes/ProductRoutes.js";
import userRoute from "./Routes/UserRoutes.js";
import orderRoute from "./Routes/OrderRoutes.js";
// import ImportData from "./DataImport.js";

dotenv.config();
const app = express();
const db = process.env.MONGO_URL;
const PORT = process.env.PORT;
app.use(express.json());

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.get("/api/paypal", (req, res) => {
  res.json(process.env.CLIENT_ID);
});

app.get("/", (req, res) => {
  res.send(`API is running on ${PORT}`);
});

app.listen(PORT, console.log(`server running on ${PORT}`));
mongoose.connect(db).then(() => console.log("connected"));

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);

  res.json(product);
});
