const mongoose = require('mongoose'); 

const productSchema = mongoose.Schema({  
  
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  media: {
    type: String,
    trim: true,
  },

  variants:{
      type: Array,
      default:[]
  },

  seoMeta: {
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

const product = mongoose.model("product", productSchema);

module.exports = product