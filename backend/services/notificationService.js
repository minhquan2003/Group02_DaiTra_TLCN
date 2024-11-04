import Notifications from "../models/Notifications.js";

const createNotification = async (notificationData) => {
    const notification = new Notifications(notificationData);
    return await notification.save();
};

const getActiveNotifications = async () => {
    return await Notifications.find({ status: true });
};

const getActiveNotificationsByUserId = async (userId) => {
    try {
      return await Notifications.find({ user_id_receive: userId, status: true });
    } catch (error) {
      throw new Error(`Unable to fetch notifications for user: ${error.message}`);
    }
};

const deleteNotification = async (notificationId) => {
    return await Notifications.findByIdAndUpdate(
        notificationId,
        { status: false },
        { new: true }
      );
};

export {createNotification, getActiveNotifications, getActiveNotificationsByUserId, deleteNotification}