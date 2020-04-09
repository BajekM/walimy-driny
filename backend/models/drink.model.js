const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model('Drink', drinkSchema);
