const express = require('express');
const router = express.Router();

router.get('/logged', (req, res) => {
  res.redirect('/');
});

router.get('/no-permission', (req, res) => {
  res.send('No');
});

router.get('/', (req, res) => {
  res.json(req.user);
});

module.exports = router;
