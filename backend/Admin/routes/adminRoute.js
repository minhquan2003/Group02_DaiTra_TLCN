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
  getNotifications,
  deleteNotificationbyId,
  updateNotificationbyId,
  createNotificationAll,
  createNotificationRole,
} from "../controllers/notification/adminNotificationController.js";

import {
  getRegulations,
  addRegulation,
  editRegulation,
  removeRegulation,
} from "../controllers/regulation/adminRegulationController.js";

import { getStatisticsByTimeController } from "../controllers/chart/adminChartController.js";

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

adminRouter.post("/notification-role/", createNotificationRole);
adminRouter.post("/notification-all/", createNotificationAll);
adminRouter.delete("/notification/:id", deleteNotificationbyId);
adminRouter.put("/notification/:id", updateNotificationbyId);
adminRouter.get("/notifications/", getNotifications);

adminRouter.get("/regulations/", getRegulations);
adminRouter.post("/regulation/", addRegulation);
adminRouter.put("/regulation/:id", editRegulation);
adminRouter.delete("/regulation/:id", removeRegulation);

adminRouter.get("/statistics-by-time", getStatisticsByTimeController);

export default adminRouter;
