import React from 'react';
import EventCard from './EventCard';

const ResultsDisplay = ({ events, loading, error }) => {
  console.log('ResultsDisplay props:', { events, loading, error });

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

  if (!events || events.length === 0) {
    return (
      <div className="results-display no-results">
        <p>No events found. Try adjusting your search criteria.</p>
      </div>
    );
  }

  console.log('Events data:', events);

  // Make sure all events have a valid type
  const processedEvents = events.map(event => ({
    ...event,
    type: event.type || 'event',
    id: event.id || Math.random().toString(36).substr(2, 9)
  }));

  const conferences = processedEvents.filter(event => event.type === 'conference');
  const otherEvents = processedEvents.filter(event => event.type === 'event');

  console.log('Processed events:', { conferences: conferences.length, otherEvents: otherEvents.length });

  return (
    <div className="results-display">
      <h2>AI Conferences & Events</h2>

      {conferences.length > 0 && (
        <div className="results-section">
          <h3>Conferences ({conferences.length})</h3>
          <div className="events-grid">
            {conferences.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {otherEvents.length > 0 && (
        <div className="results-section">
          <h3>Events ({otherEvents.length})</h3>
          <div className="events-grid">
            {otherEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {conferences.length === 0 && otherEvents.length === 0 && (
        <div className="no-results">
          <p>No conferences or events found in the search results.</p>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;