import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import ResultsDisplay from './components/ResultsDisplay';
import { dummyEvents } from './data/dummyEvents';
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchCriteria) => {
    setLoading(true);
    setError(null);

    // Simulate API call with dummy data
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Filter dummy events based on search criteria
      // For now, we'll just return all events within the distance range
      const filteredEvents = dummyEvents.filter(event =>
        event.distance <= parseInt(searchCriteria.milesRange)
      );

      // Limit to top 10 events (5 conferences + 5 other events)
      const conferences = filteredEvents.filter(e => e.type === 'conference').slice(0, 5);
      const otherEvents = filteredEvents.filter(e => e.type === 'event').slice(0, 5);

      setSearchResults([...conferences, ...otherEvents]);
    } catch (err) {
      setError('Failed to search for events. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI Conference Finder</h1>
        <p>Discover AI conferences and events near you</p>
      </header>

      <main className="app-main">
        <div className="search-section">
          <SearchForm onSearch={handleSearch} />
        </div>

        <div className="results-section">
          <ResultsDisplay
            events={searchResults}
            loading={loading}
            error={error}
          />
        </div>
      </main>

      <footer className="app-footer">
        <p>Find the best AI conferences and events tailored to your interests</p>
      </footer>
    </div>
  );
}

export default App;