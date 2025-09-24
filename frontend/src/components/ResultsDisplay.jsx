import React from 'react';
import EventCard from './EventCard';

const ResultsDisplay = ({ events, loading, error }) => {
  if (loading) {
    return (
      <div className="results-display loading">
        <div className="loading-spinner"></div>
        <p>Searching for AI conferences and events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="results-display error">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="results-display no-results">
        <p>No events found. Try adjusting your search criteria.</p>
      </div>
    );
  }

  const conferences = events.filter(event => event.type === 'conference');
  const otherEvents = events.filter(event => event.type === 'event');

  return (
    <div className="results-display">
      {conferences.length > 0 && (
        <div className="results-section">
          <h2>Conferences</h2>
          <div className="events-grid">
            {conferences.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {otherEvents.length > 0 && (
        <div className="results-section">
          <h2>Events</h2>
          <div className="events-grid">
            {otherEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;