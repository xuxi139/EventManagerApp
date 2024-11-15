import React, { useState } from 'react';
import api from '../api';

function AddEventForm({ onEventAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEvent = { title, description, date };
      await api.post('/events', newEvent); // Will use the proxy to `/api/events`
      onEventAdded();
      setTitle('');
      setDescription('');
      setDate('');
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <label>Event Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Event
      </button>
    </form>
  );
}

export default AddEventForm;
