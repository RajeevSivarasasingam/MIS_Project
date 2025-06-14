const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/User');

// GET: Registration form
router.get('/register', (req, res) => {
  res.render('pages/register');
});

// POST: Handle Registration
router.post('/register', async (req, res) => {
  const { name, email, password, password2, role } = req.body;
  let errors = [];

  // Basic validations
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('pages/register', { errors, name, email, password, password2, role });
  } else {
    const user = await User.findOne({ email: email });
    if (user) {
      errors.push({ msg: 'Email already registered' });
      res.render('pages/register', { errors, name, email, password, password2, role });
    } else {
      const newUser = new User({ name, email, password, role });

      // Hash password
      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          await newUser.save();
          req.flash('success_msg', 'You are now registered and can log in');
          res.redirect('/login');
        })
      );
    }
  }
});

// GET: Login form
router.get('/login', (req, res) => {
  res.render('pages/login');
});

// POST: Handle Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    req.flash('error_msg', 'Email is not registered');
    return res.redirect('/login');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    req.flash('error_msg', 'Incorrect password');
    return res.redirect('/login');
  }

  // Store user in session
  req.session.user = user;
  req.flash('success_msg', `Welcome, ${user.name}`);
  res.redirect('/events'); // redirect to event page after login
});

// GET: Logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) throw err;
    res.redirect('/login');
  });
});

module.exports = router;
