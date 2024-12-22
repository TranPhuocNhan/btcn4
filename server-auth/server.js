const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const PORT_AUTH = process.env.PORT_AUTH;

const authRoutes = require('./routes/authRoutes');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Passport setup
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);

// Run the server
app.listen(PORT_AUTH, () => {
  console.log(`Server Auth running on port ${PORT_AUTH}`);
});
