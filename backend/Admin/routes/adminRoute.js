// routes.js
import express from "express";
import { loginAdmin } from "../controllers/auth/adminAuthController.js";
import {
  getAllUsers,
  getUsersWithPartnerRole,
  getAllBannedUsers,
  deleteUserAccount,
  banUserAccount,
  unbanUserAccount,
  searchUsersByKeyword,
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
  fetchAllNotifications,
  postNotification,
} from "../controllers/notification/adminNotificationController.js";

import {
  getRegulations,
  addRegulation,
  editRegulation,
  removeRegulation,
} from "../controllers/regulation/adminRegulationController.js";

import { getUserStatistics } from "../controllers/chart/adminChartController.js";

import {
  fetchTopSellingProducts,
  fetchOrderStats,
  fetchAllOrders,
  searchOrders,
} from "../controllers/order/adminOrderController.js";

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);

adminRouter.get("/all-users", getAllUsers);
adminRouter.get("/all-partners", getUsersWithPartnerRole);
adminRouter.get("/all-banner", getAllBannedUsers);
adminRouter.put("/ban-user/:userId", banUserAccount);
adminRouter.put("/unban-user/:userId", unbanUserAccount);
adminRouter.delete("/delete-account/:id", deleteUserAccount);
adminRouter.get("/search", searchUsersByKeyword);

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

adminRouter.get("/notifications/", fetchAllNotifications);
adminRouter.post("/notifications/", postNotification);

adminRouter.get("/regulations/", getRegulations);
adminRouter.post("/regulation/", addRegulation);
adminRouter.put("/regulation/:id", editRegulation);
adminRouter.delete("/regulation/:id", removeRegulation);

adminRouter.get("/statistics/yearly-users", getUserStatistics);

adminRouter.get("/top-selling-products", fetchTopSellingProducts);
adminRouter.get("/order-stats", fetchOrderStats);
adminRouter.get("/orders", fetchAllOrders);
adminRouter.get("/search-orders", searchOrders);

export default adminRouter;
