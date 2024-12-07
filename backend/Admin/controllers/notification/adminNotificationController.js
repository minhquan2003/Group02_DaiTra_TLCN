import {
  getAllActiveNotifications,
  deleteNotification,
  updateNotification,
  createNotificationToAll,
  createNotificationByRole,
} from "../../services/notification/adminNotificationService.js";

// Lấy tất cả thông báo có status là true
export const getNotifications = async (req, res) => {
  try {
    const notifications = await getAllActiveNotifications();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa thông báo (đổi status thành false)
export const deleteNotificationbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await deleteNotification(id);
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Chỉnh sửa thông báo
export const updateNotificationbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedNotification = await updateNotification(id, updates);
    res.status(200).json(updatedNotification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Tạo thông báo đến mọi người
export const createNotificationAll = async (req, res) => {
  try {
    const { message } = req.body;
    const userIdCreated = req.user._id; // Lấy user từ middleware auth
    const notification = await createNotificationToAll(message, userIdCreated);
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Tạo thông báo đến những người có role khác nhau
export const createNotificationRole = async (req, res) => {
  try {
    const { message, role } = req.body;
    const userIdCreated = req.user._id; // Lấy user từ middleware auth
    const notifications = await createNotificationByRole(
      message,
      userIdCreated,
      role
    );
    res.status(201).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
