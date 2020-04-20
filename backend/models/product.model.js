const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  carousel: { type: Array, required: true },
  status: { type: String, required: true },
  params: { type: Array },
  price: {type: Number, required: true },
  category: { type: String, required: true },
});

module.exports = mongoose.model('Product', productSchema);
