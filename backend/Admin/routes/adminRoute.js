// routes.js
import express from "express";
import {
  getAllUsers,
  getUsersWithPartnerRole,
  getAllBannedUsers,
  deleteUserAccount,
  banUserAccount,
  unbanUserAccount,
} from "../controllers/user/adminUserController.js";

import {
  approveProduct,
  getAllProducts,
  hideProduct,
  removeProduct,
  getPendingProducts,
} from "../controllers/product/adminProductController.js";

import { getFeedbacks } from "../controllers/feedback/adminFeedbackController.js";

import {
  getCategories,
  createCategory,
  editCategory,
  removeCategory,
} from "../controllers/category/adminCategoryController.js";

import {
  addNotification,
  removeNotification,
  editNotification,
  getNotifications,
} from "../controllers/notification/adminNotificationController.js";

import {
  getRegulations,
  addRegulation,
  editRegulation,
  removeRegulation,
} from "../controllers/regulation/adminRegulationController.js";

const adminRouter = express.Router();

adminRouter.get("/all-users", getAllUsers);
adminRouter.get("/all-partners", getUsersWithPartnerRole);
adminRouter.get("/all-banner", getAllBannedUsers);
adminRouter.put("/ban-user/:userId", banUserAccount);
adminRouter.put("/unban-user/:userId", unbanUserAccount);
adminRouter.delete("/delete-account/:id", deleteUserAccount);

adminRouter.put("/approve-product/:productId", approveProduct);
adminRouter.delete("/delete-product/:productId", removeProduct);
adminRouter.get("/products", getAllProducts);
adminRouter.put("/hide-product/:productId", hideProduct);
adminRouter.get("/pending-products", getPendingProducts);

adminRouter.get("/all-feedback", getFeedbacks);

adminRouter.get("/categories", getCategories);
adminRouter.post("/category/", createCategory);
adminRouter.put("/category/:id", editCategory);
adminRouter.delete("/category/:id", removeCategory);

adminRouter.post("/notification/", addNotification);
adminRouter.delete("/notification/:id", removeNotification);
adminRouter.put("/notification/:id", editNotification);
adminRouter.get("/notifications/", getNotifications);

adminRouter.get("/regulations/", getRegulations);
adminRouter.post("/regulation/", addRegulation);
adminRouter.put("/regulation/:id", editRegulation);
adminRouter.delete("/regulation/:id", removeRegulation);

export default adminRouter;
