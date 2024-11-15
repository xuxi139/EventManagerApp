const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const Event = require('./models/event');

mongoose
  .connect('mongodb://localhost:27017/EventManager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(cors());

// Route to add a new event
app.post('/api/events', async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const event = new Event({ title, description, date });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to get all events, sorted by date (new addition)
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get all upcoming events, sorted by date
app.get('/api/events/upcoming', async (req, res) => {
  try {
    const today = new Date();
    const events = await Event.find({ date: { $gte: today } }).sort({
      date: 1,
    });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
