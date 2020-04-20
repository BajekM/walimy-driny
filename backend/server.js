const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const passportConfig = require('../config/passport');
const MongoStore = require('connect-mongo')(session);

const drinksRoutes = require('./routes/drinks.routes');
const ordersRoutes = require('./routes/orders.routes');
const productsRoutes = require('./routes/products.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

/* MONGOOSE */
mongoose.connect('mongodb://localhost:27017/walimyDriny', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

// init session mechanism
app.use(session({
  secret: 'drinks!',
  store: new MongoStore({ mongooseConnection: db }),
}));

// init passport
app.use(passport.initialize());
app.use(passport.session());

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('*/images',express.static('public/images'));


/* API ENDPOINTS */
app.use('/api', drinksRoutes);
app.use('/api', ordersRoutes);
app.use('/api', productsRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);



/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ post: 'Not found...' });
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, '../build')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});



/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: '+port);
});
