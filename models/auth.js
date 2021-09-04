import mongoose from 'mongoose';

const authSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  img: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  isLoggedIn: Boolean,
  randomString: String,

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const auth = mongoose.model('auth', authSchema);

export default auth;
