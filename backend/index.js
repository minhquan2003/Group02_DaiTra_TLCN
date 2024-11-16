import express from "express";
import { PORT, mongodbconn } from "./config.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import feedbackRoute from "./routes/feedbackRoute.js";
import notificationRoute from "./routes/notificationRoute.js";
import regulationRoute from "./routes/regulationRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import orderRoute from "./routes/orderRoute.js";
import orderDetailRoute from "./routes/orderDetailRoutes.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // Frontend URL
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(cors());

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/categories", categoryRoute);
app.use("/feedbacks", feedbackRoute);
app.use("/notifications", notificationRoute);
app.use("/regulations", regulationRoute);
app.use("/reviews", reviewRoute);
app.use("/payments", paymentRoute);
app.use("/orders", orderRoute);
app.use("/orderDetails", orderDetailRoute);

mongoose
  .connect(mongodbconn)
  .then((conn) => {
    console.log("App connected to database");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
