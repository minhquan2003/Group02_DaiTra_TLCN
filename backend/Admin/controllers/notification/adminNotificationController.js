import {
  createNotification,
  deleteNotification,
  updateNotification,
  getAllNotifications,
} from "../../services/notification/adminNotificationService.js";

// Thêm mới thông báo
const addNotification = async (req, res) => {
  try {
    const notification = await createNotification(req.body);
    res.status(201).json({
      message: "Notification created successfully",
      data: notification,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create notification",
      error: error.message,
    });
  }
};

// Xóa thông báo
const removeNotification = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteNotification(id);
    res.status(200).json({
      message: "Notification deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete notification",
      error: error.message,
    });
  }
};

// Sửa thông báo
const editNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedNotification = await updateNotification(id, req.body);
    res.status(200).json({
      message: "Notification updated successfully",
      data: updatedNotification,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update notification",
      error: error.message,
    });
  }
};

// Lấy tất cả thông báo có phân trang
const getNotifications = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const result = await getAllNotifications(parseInt(page), parseInt(limit));

    res.status(200).json({
      success: true,
      total: result.total,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      data: result.notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
      error: error.message,
    });
  }
};

export {
  addNotification,
  removeNotification,
  editNotification,
  getNotifications,
};
