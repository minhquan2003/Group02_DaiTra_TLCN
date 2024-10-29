import mongoose from 'mongoose';

// Định nghĩa schema cho Notifications
const notificationSchema = new mongoose.Schema({
    // notification_id: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // },
    user_id_created: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
    },
}, {
    timestamps: true,
});

const Notifications = mongoose.model('Notifications', notificationSchema);

export default Notifications;