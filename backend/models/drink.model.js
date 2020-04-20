const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: Array, required: true },
  actions: { type: Array, required: true },
  video: { type: String, required: true },
  image: { type: String, required: true },
  carousel: { type: Array, required: true },
  tags: { type: Array, required: true },
});

module.exports = mongoose.model('Drink', drinkSchema);
