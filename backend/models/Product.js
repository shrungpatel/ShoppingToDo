const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  storeName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true
  }
});
// creates an index on the store name
productSchema.index({ storeName: 1 });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;