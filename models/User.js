const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'organizer', 'student'],
    default: 'student'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);

// This code defines a Mongoose schema for a User model in a University Event Management System (UEMS).
// The schema includes fields for the user's name, email, password, role (admin, organizer, or student),  
// and the date the user was created. The email field is unique and the role defaults to 'student'.
// The schema is then exported as a Mongoose model named 'User'.