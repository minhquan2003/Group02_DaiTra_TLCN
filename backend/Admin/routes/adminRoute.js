// routes.js
import express from "express";
import {
  getAllUsers,
  getUsersWithPartnerRole,
  deleteUserAccount,
} from "../controllers/user/adminUserController.js";

import { approveProduct } from "../controllers/product/adminProductController.js";

const adminRouter = express.Router();

adminRouter.get("/all-users", getAllUsers);
adminRouter.get("/all-partners", getUsersWithPartnerRole);
adminRouter.delete("/delete-account/:id", deleteUserAccount);

adminRouter.post("/approve-product/:id", approveProduct);

export default adminRouter;
