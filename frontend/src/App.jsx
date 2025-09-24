import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import ResultsDisplay from './components/ResultsDisplay';
import axios from 'axios';
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchCriteria) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3001/api/search', {
        city: searchCriteria.city,
        kidsAges: searchCriteria.kidsAges || '',
        availability: `${searchCriteria.availability.start} to ${searchCriteria.availability.end}`,
        milesRange: searchCriteria.milesRange,
        aiInterests: searchCriteria.aiInterests,
        preferences: searchCriteria.preferences || ''
      });

      if (response.data.success) {
        setSearchResults(response.data.events);
      } else {
        setError('Failed to search for events. Please try again.');
      }
    } catch (err) {
      console.error('API Error:', err);
      if (err.response) {
        setError(`Server error: ${err.response.data.error || 'Unknown error'}`);
      } else if (err.request) {
        setError('Network error: Unable to connect to the server. Please ensure the backend is running.');
      } else {
        setError('Failed to search for events. Please try again.');
      }
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

        <ResultsDisplay
          events={searchResults}
          loading={loading}
          error={error}
        />
      </main>

      <footer className="app-footer">
        <p>Find the best AI conferences and events tailored to your interests</p>
      </footer>
    </div>
  );
}

export default App;