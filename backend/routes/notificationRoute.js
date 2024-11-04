import express from 'express';
import {addNotification, 
    getNotifications, 
    getNotificationsUserId, 
    removeNotification} from '../controllers/notificationController.js';

const notificationRoute = express.Router();

notificationRoute.post('/', addNotification);
notificationRoute.get('/', getNotifications);
notificationRoute.get('/user/:userId', getNotificationsUserId);
notificationRoute.delete('/:id', removeNotification);

export default notificationRoute;