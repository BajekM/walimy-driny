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
  console.log('To jest reqsesion na poczatku', req.session.basketId);
  if (req.session.basketId) {
    try {
      const result = await Order
        .find({basketId: req.session.basketId});
      if(!result) res.status(404).json({ post: 'Not found' });
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
  // console.log('body', req.body);
  req.session.basket= {
    id: req.body.basketId,
  };
  // console.log('To', req.session.basket.id);
  res.json(req.session);
});


router.put('/orders/basket', async (req, res) => {
  console.log('To jest reqsesion pozniej', req.session.basketId);
  const { products } = req.body;
  try {
    await Order.updateOne({ basketId: (req.session.basketId) }, { $set: { products: products}});
    const result = await Order.find({ basketId: req.session.basketId });
    res.json(result);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

router.post('/orders', async (req, res) => {
  const { product, basketId } = req.body;
  req.session.basketId = basketId;
  console.log('ustawiono', req.session.id);
  if (!req.session.basket) {
    try {
      // console.log('req body do zmowienia', req.body);
      const newOrder = new Order({ products: [product], status: 'basket',  basketId: basketId });
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
