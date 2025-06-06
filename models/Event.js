const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  location: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  registeredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});
module.exports = mongoose.model('Event', EventSchema);

// This code defines a Mongoose schema for an Event model in a University Event Management System (UEMS).
// The schema includes fields for the event title, description, date, location, the user who created the event,
// and the users who have registered for the event. 