const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); // Make sure you create this model

//const { ensureAuthenticated } = require('../middleware/auth');
const { ensureAuthenticated, ensureRole } = require('../middleware/auth');

 

// Protect all event routes
router.get('/', ensureAuthenticated, async (req, res) => {
  const events = await Event.find({});
  res.render('events/index', { events });
});

// Only organizer or admin can access create page
router.get('/new', ensureAuthenticated, ensureRole('organizer'), (req, res) => {
  res.render('events/new');
});


// GET: List all events
router.get('/', async (req, res) => {
  const events = await Event.find().sort({ date: -1 });
  res.render('pages/events/index', { events });
});

// GET: Show form to create a new event
router.get('/new', (req, res) => {
  res.render('pages/events/new');
});

// POST: Create a new event
router.post('/', async (req, res) => {
  const { title, description, date, location } = req.body;
  const newEvent = new Event({ title, description, date, location });

  try {
    await newEvent.save();
    req.flash('success_msg', 'Event created successfully');
    res.redirect('/events');
  } catch (err) {
    req.flash('error_msg', 'Error creating event');
    res.redirect('/events/new');
  }
});

// GET: Show edit form
router.get('/:id/edit', async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.render('pages/events/edit', { event });
});

// PUT: Update an event
router.put('/:id', async (req, res) => {
  const { title, description, date, location } = req.body;
  try {
    await Event.findByIdAndUpdate(req.params.id, { title, description, date, location });
    req.flash('success_msg', 'Event updated successfully');
    res.redirect('/events');
  } catch (err) {
    req.flash('error_msg', 'Error updating event');
    res.redirect('/events');
  }
});

// DELETE: Delete an event
router.delete('/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Event deleted');
    res.redirect('/events');
  } catch (err) {
    req.flash('error_msg', 'Error deleting event');
    res.redirect('/events');
  }
});

module.exports = router;

// This code defines routes for managing events in a University Event Management System (UEMS).
// It includes routes to list all events, create a new event, edit an existing event, update an event, and delete an event. 