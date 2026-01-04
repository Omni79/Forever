import express from "express";
import cors from "cors";
import "dotenv/config";
import serverless from "serverless-http";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();

// connect once (important)
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// health check (VERY IMPORTANT)
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// 👇 EXPORT — do NOT listen
export default serverless(app);
