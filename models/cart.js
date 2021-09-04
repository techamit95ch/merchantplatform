import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
  product: {
    type: mongoose.SchemaTypes.Mixed,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const cart = mongoose.model('cart', cartSchema);

export default cart;
