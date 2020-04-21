const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');

router.get('/orders', async (req, res) => {
  try {
    const result = await Order
      .find()
      .sort({created: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/orders/basket', async (req, res) => {
  if (req.session.basketId) {
    try {
      const result = await Order
        .find({basketId: req.session.basketId, status: 'basket'});
      if(!result) res.json({});
      else res.json(result);
    }
    catch(err) {
      res.status(500).json(err);
    }
  } else res.json({});
});

router.post('/orders/basket/:id', async (req, res) => {
  const { imie, nazwisko, ulica, nrDomu, nrMieszkania, kodPocztowy, miejscowosc, email } = req.body;

  if(imie && nazwisko && ulica && nrDomu && kodPocztowy && miejscowosc && email) {
    await Order.updateOne({ _id: (req.params.id) }, { $set: { status: 'confirmed', imie: imie, nazwisko: nazwisko, ulica: ulica, nrDomu: nrDomu, kodPocztowy: kodPocztowy, miejscowosc: miejscowosc, nrMieszkania: nrMieszkania }});
    const ord = await Order.findById(req.params.id);
    console.log('Zmienione zamówienie', ord);
    res.send('Zamówienie zostało wysłane');
  }
  else {
    res.send('Zostawiłes puste wymagane pola!');
  }
});

router.get('/orders/basket', async (req, res) => {
  if (req.session.basketId) {
    try {
      const result = await Order
        .find({basketId: req.session.basketId, status: 'basket'});
      if(!result) res.json({});
      else res.json(result);
    }
    catch(err) {
      res.status(500).json(err);
    }
  } else res.json({});
});


router.get('/orders/:id', async (req, res) => {
  try {
    const result = await Order
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/orders/basket', async (req, res) => {
  req.session.basket= {
    id: req.body.basketId,
  };
  res.json(req.session);
});


router.put('/orders/basket', async (req, res) => {
  const { products, status, basketId } = req.body;

  if (status && basketId && !products) {
    try {
      await Order.updateOne({ basketId: (req.session.basketId) }, { $set: { status: status}});
      // const result = await Order.find({ basketId: req.session.basketId });
      res.redirect('/formula/' + basketId);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  } else{
    try {
      await Order.updateOne({ basketId: (req.session.basketId) }, { $set: { products: products}});
      const result = await Order.find({ basketId: req.session.basketId });
      res.json(result);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  }

});

router.post('/orders', async (req, res) => {
  const { product, basketId } = req.body;
  req.session.basketId = basketId;
  if (!req.session.basket) {
    try {
      const newOrder = new Order({ products: product, status: 'basket',  basketId: basketId });
      await newOrder.save();
      res.json(newOrder);
    } catch(err) {
      res.status(500).json({ message: err });
    }
  } else res.json({to: req.session.basket});
});

router.put('/orders/:id', async (req, res) => {
  const {products} = req.body;

  try {
    await Order.updateOne({ _id: (req.params.id) }, { $set: { products: products  } });
    res.json({ message: 'OK' });    }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
