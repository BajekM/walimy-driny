const express = require('express');
const router = express.Router();

const Drink = require('../models/drink.model');

router.get('/drinks', async (req, res) => {
  try {
    const result = await Drink
      .find();
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/drinks/:id', async (req, res) => {
  try {
    const result = await Drink
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
