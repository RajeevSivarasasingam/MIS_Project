const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Event', EventSchema);
//
// This code defines a Mongoose schema for an 
// Event model in a University Event Management System (UEMS). 
// The schema includes fields for the event's title, description, date, location,
// and the date the event was created. The title, description, date, and location fields are required.  