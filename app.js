const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// DB Config
require('./config/db')();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Sessions & Flash
app.use(session({
  secret: 'uemsSecret',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

// Global Variables for Flash Messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// Routes
const authRoutes = require('./routes/auth');
console.log('authRoutes:', authRoutes); // <== ADD THIS LINE
app.use('/', authRoutes);

// Event Routes
app.use('/events', require('./routes/event'));

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
