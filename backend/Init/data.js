const mongoose = require('mongoose');
const data = require('./init.json'); // Import initial event data from JSON file
const Event = require('../models/event'); // Import the Event model

async function main() {
  await mongoose.connect('mongodb://localhost:27017/EventManager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

main()
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const initData = async () => {
  try {
    await Event.deleteMany(); // Clear existing events if needed

    const events = data.map((event) => new Event(event)); // Map JSON data to Event models
    const savedEvents = await Promise.all(events.map((event) => event.save())); // Save each event to MongoDB
    console.log('Events successfully saved:', savedEvents);

    mongoose.disconnect(); // Close connection after completion
  } catch (err) {
    console.error('Error saving events:', err);
  }
};

// Run the initialization function
initData();
