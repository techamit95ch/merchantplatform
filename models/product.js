import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  mediaFile: {
    type: String,
    trim: true,
  },
  variantDetails: {
    type: Array,
    default: [],
  },
  variantImg: {
    type: Array,
    default: [],
  },

  seoTitle: {
    type: String,
    trim: true,
  },
  seoDescription: {
    type: String,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const product = mongoose.model('product', productSchema);

export default product;
