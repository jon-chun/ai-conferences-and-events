# AI Conference Finder Spec

## Requirements
- Users input: city, AI interests, time range, travel distance (miles), preferences
- Search AI conferences/events within specified range and time
- Return top 20 recommendations (10 conferences + 10 events)
- Display: bold title, dates, location, website URL, concise description

## Tech Stack
- **Frontend**: React
- **Backend**: Express.js
- **API**: Claude Messages API with Web Search Tool

## Design Guidelines
- Clean, minimal interface
- Responsive design
- Fast load times
- Accessible form inputs

## Milestones

### Milestone 1: UI Setup with Dummy Data
- [ ] Create React frontend with form inputs
- [ ] Design results display component
- [ ] Implement dummy data for testing
- [ ] Basic styling and layout

### Milestone 2: Claude API Integration
- [ ] Set up Express backend server
- [ ] Integrate Claude Messages API
- [ ] Implement web search tool for finding conferences
- [ ] Connect frontend to backend API

### Milestone 3: Full Feature Completion
- [ ] Implement intelligent filtering and ranking
- [ ] Add geolocation and distance calculation
- [ ] Optimize search performance
- [ ] Error handling and user feedback
- [ ] Use https://docs.claude.com/en/docs/agents-and-tools/tool-use/web-search-tool for implementing messages API and web search 