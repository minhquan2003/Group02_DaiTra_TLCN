import Notifications from "../../../models/Notifications.js";

// Thêm mới một thông báo
const createNotification = async (data) => {
  try {
    const notification = new Notifications(data);
    await notification.save();
    return notification;
  } catch (error) {
    throw new Error("Error creating notification: " + error.message);
  }
};

// Xóa một thông báo theo ID
const deleteNotification = async (notificationId) => {
  try {
    const result = await Notifications.findByIdAndDelete(notificationId);
    if (!result) {
      throw new Error("Notification not found");
    }
    return result;
  } catch (error) {
    throw new Error("Error deleting notification: " + error.message);
  }
};

// Sửa thông báo theo ID
const updateNotification = async (notificationId, data) => {
  try {
    const notification = await Notifications.findByIdAndUpdate(
      notificationId,
      data,
      { new: true }
    );
    if (!notification) {
      throw new Error("Notification not found");
    }
    return notification;
  } catch (error) {
    throw new Error("Error updating notification: " + error.message);
  }
};

// Lấy tất cả thông báo với phân trang
const getAllNotifications = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;

    const notifications = await Notifications.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Sắp xếp theo thời gian mới nhất

    const totalNotifications = await Notifications.countDocuments();

    return {
      notifications,
      total: totalNotifications,
      totalPages: Math.ceil(totalNotifications / limit),
      currentPage: page,
    };
  } catch (error) {
    throw new Error("Error fetching notifications: " + error.message);
  }
};

export {
  createNotification,
  deleteNotification,
  updateNotification,
  getAllNotifications,
};
