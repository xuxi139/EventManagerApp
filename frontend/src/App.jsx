import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddEventForm from './components/AddEventForm';
import EventList from './components/EventList';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [filter, setFilter] = useState('all'); // "all" by default

  const handleEventAdded = () => {
    setRefresh(!refresh); // Re-fetch events after adding
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="container">
      <h1 className="my-4">Event Manager</h1>
      <AddEventForm onEventAdded={handleEventAdded} />

      <div className="d-flex justify-content-between align-items-center my-4">
        <h2>Events</h2>
        <div className="form-group">
          <select
            className="form-control"
            onChange={handleFilterChange}
            value={filter}
          >
            <option value="all">All Events</option>
            <option value="upcoming">Upcoming Events</option>
          </select>
        </div>
      </div>

      <EventList key={refresh} filter={filter} />
    </div>
  );
}

export default App;
