import React, { useEffect, useState } from 'react';
import api from '../api';

function EventList({ filter }) {
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    try {
      // Determine endpoint based on filter value
      const endpoint = filter === 'upcoming' ? '/events/upcoming' : '/events';
      const response = await api.get(endpoint);

      // Sort events by date (ascending order)
      const sortedEvents = response.data.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setEvents(sortedEvents);
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  // Reload events when filter changes
  useEffect(() => {
    loadEvents();
  }, [filter]);

  return (
    <ul className="list-group">
      {events.map((event) => (
        <li key={event._id} className="list-group-item">
          <h5>{event.title}</h5>
          <p>{event.description}</p>
          <small>{new Date(event.date).toLocaleDateString()}</small>
        </li>
      ))}
    </ul>
  );
}

export default EventList;
