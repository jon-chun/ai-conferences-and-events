import React from 'react';
import { format } from 'date-fns';

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  return (
    <div className="event-card">
      <h3 className="event-title">{event.title}</h3>
      <div className="event-details">
        <p><strong>Dates:</strong> {formatDate(event.dates.start)} - {formatDate(event.dates.end)}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Distance:</strong> {event.distance} miles</p>
        <p><strong>Website:</strong> <a href={event.website} target="_blank" rel="noopener noreferrer">{event.website}</a></p>
        <p className="event-description">{event.description}</p>
        <span className={`event-type ${event.type}`}>{event.type.toUpperCase()}</span>
      </div>
    </div>
  );
};

export default EventCard;