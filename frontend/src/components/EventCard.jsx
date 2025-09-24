import React from 'react';
import { format } from 'date-fns';

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    if (!dateString || dateString === 'Dates not available') {
      return dateString;
    }
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  const formatDates = (dates) => {
    if (!dates || dates === 'Dates not available') {
      return dates;
    }

    // Handle different date formats
    if (typeof dates === 'string') {
      // If it contains "to" or "-", it might be a date range
      if (dates.includes(' to ') || dates.includes(' - ')) {
        return dates;
      }
      // Try to format as a single date
      return formatDate(dates);
    }

    // Handle object format (for future compatibility)
    if (dates.start && dates.end) {
      return `${formatDate(dates.start)} - ${formatDate(dates.end)}`;
    }

    return dates;
  };

  const formatWebsite = (website) => {
    if (!website || website === '') {
      return 'Website not available';
    }
    return website;
  };

  return (
    <div className="event-card">
      <h3 className="event-title">{event.title}</h3>
      <div className="event-details">
        <p><strong>Dates:</strong> {formatDates(event.dates)}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Distance:</strong> {event.distance}</p>
        <p><strong>Website:</strong> <a href={event.website} target="_blank" rel="noopener noreferrer">{formatWebsite(event.website)}</a></p>
        <p className="event-description">{event.description}</p>
        <span className={`event-type ${event.type}`}>{event.type.toUpperCase()}</span>
      </div>
    </div>
  );
};

export default EventCard;