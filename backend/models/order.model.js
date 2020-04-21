const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: { type: Array },
  status: { type: String },
  basketId: { type: String },
  imie: { type: String },
  nazwisko: { type: String },
  ulica: { type: String },
  nrDomu: { type: String },
  nrMieszkania: { type: String },
  kodPocztowy: { type: String },
  miejscowosc: { type: String },
  telefon: { type: String },
  email: { type: String },
});

module.exports = mongoose.model('Order', orderSchema);
