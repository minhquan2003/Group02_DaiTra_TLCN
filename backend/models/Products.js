import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    // product_id: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    category_id: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
    brand: {
      type: String,
      required: true, // Bắt buộc
    },
    condition: {
      type: String,
      required: false, // Mặc định là 'new'
    },
    origin: {
      type: String,
      required: false, // Không bắt buộc
    },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model('Products', productSchema);

export default Products;