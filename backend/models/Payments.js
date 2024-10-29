import mongoose from 'mongoose';

// Định nghĩa schema cho Payment
const paymentSchema = new mongoose.Schema({
    // payment_id: {
    //     type: String,
    //     required: true,
    //     unique: true, // Đảm bảo payment_id là duy nhất
    // },
    type: {
        type: String,
        required: true,
        enum: ['Credit Card', 'PayPal', 'Bank Transfer', 'Cash'], // Các loại thanh toán có thể
    },
    order_id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    total_price: {
        type: Number,
        required: true,
    },
    status_payment: {
        type: String,
        required: true,
        enum: ['Pending', 'Completed', 'Failed'], // Các trạng thái thanh toán có thể
    },
}, {
    timestamps: true, // Tự động thêm createdAt và updatedAt
});

// Tạo model từ schema
const Payments = mongoose.model('Payments', paymentSchema);

export default Payments;