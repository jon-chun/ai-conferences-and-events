const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const ConferenceSearchService = require('./services/conferenceSearchService');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const conferenceSearchService = new ConferenceSearchService();

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI Conference Finder Backend is running' });
});

app.post('/api/search', async (req, res) => {
  try {
    const searchCriteria = req.body;

    if (!searchCriteria.city || !searchCriteria.aiInterests) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'City and AI interests are required'
      });
    }

    const events = await conferenceSearchService.searchConferences(searchCriteria);

    res.json({
      success: true,
      events: events,
      count: events.length
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      error: 'Search failed',
      message: error.message || 'An error occurred while searching for conferences'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});