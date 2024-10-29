import mongoose from 'mongoose';

// Định nghĩa schema cho Orders
const orderSchema = new mongoose.Schema({
    // order_id: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // },
    user_id_buyer: {
        type: String,
        required: true,
    },
    user_id_seller: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    total_amount: {
        type: Number,
        required: true,
    },
    status_order: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
        required: true,
    },
    note: {
        type: String,
        default: '',
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
    },
}, {
    timestamps: true, 
});

const Orders = mongoose.model('Orders', orderSchema);

export default Orders;