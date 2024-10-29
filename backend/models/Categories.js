import mongoose from 'mongoose';

// Định nghĩa schema cho Categories
const categorySchema = new mongoose.Schema({
    // category_id: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // },
    category_name: {
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

const Categories = mongoose.model('Categories', categorySchema);

export default Categories;