import Notifications from "../../../models/Notifications.js";
import Users from "../../../models/Users.js";

// Lấy tất cả thông báo có status là true
export const getAllActiveNotifications = async () => {
  return await Notifications.find({ status: true });
};

// Đổi status của thông báo thành false (xóa thông báo)
export const deleteNotification = async (id) => {
  return await Notifications.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );
};

// Chỉnh sửa thông báo (nội dung và phạm vi)
export const updateNotification = async (id, updates) => {
  return await Notifications.findByIdAndUpdate(id, updates, { new: true });
};

// Tạo thông báo đến tất cả mọi người
export const createNotificationToAll = async (message, userIdCreated) => {
  return await Notifications.create({
    user_id_created: userIdCreated,
    user_id_receive: null, // null nghĩa là gửi đến tất cả
    message,
  });
};

// Tạo thông báo đến những người có role khác nhau
export const createNotificationByRole = async (
  message,
  userIdCreated,
  role
) => {
  // Thay đổi logic lấy user theo role tùy theo cấu trúc dữ liệu
  const users = await Users.find({ role });
  const notifications = users.map((user) => ({
    user_id_created: userIdCreated,
    user_id_receive: user._id,
    message,
  }));

  return await Notifications.insertMany(notifications);
};
