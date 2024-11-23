import {createNotification, 
    getActiveNotifications, 
    getActiveNotificationsByUserId, 
    deleteNotification} from '../services/notificationService.js';

const addNotification = async (req, res) => {
    try {
        const notification = await createNotification(req.body);
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNotifications = async (req, res) => {
    try {
      const notifications = await getActiveNotifications();
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

const getNotificationsUserId= async (req, res) => {
    const { userId } = req.params;
  
    try {
      const notifications = await getActiveNotificationsByUserId(userId);
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const removeNotification = async (req, res) => {
    const { notificationId } = req.params;
  
    try {
      const updatedNotification = await deleteNotification(notificationId);
      res.status(200).json(updatedNotification);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

export {addNotification, getNotifications, getNotificationsUserId, removeNotification}