const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: { type: Array },
  status: { type: String },
  basketId: { type: String },
});

module.exports = mongoose.model('Order', orderSchema);
