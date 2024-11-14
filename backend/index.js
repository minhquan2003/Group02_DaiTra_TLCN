import express from "express";
import { PORT, mongodbconn } from "./config.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // Frontend URL
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/auth", authRoute);
app.use("/users", userRoute);

mongoose
  .connect(mongodbconn)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
