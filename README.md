# AI Conference Finder

A modern web application that helps users discover AI conferences and events tailored to their interests, location, and schedule. Built with React, Express.js, and powered by Claude's Messages API with intelligent web search capabilities.

## 🚀 Live Demo

The application is currently running locally and can be accessed at **http://localhost:5173/**

## ✨ Features

### 🎯 Smart Search
- **Location-based**: Find events within your specified travel distance
- **Interest-matched**: Get recommendations based on your AI research specialties
- **Schedule-aware**: Search within your available time frame
- **Family-friendly**: Optional filtering for events suitable for children

### 📊 Comprehensive Results
- **Top 20 recommendations**: 10 premier conferences + 10 specialized events
- **Detailed information**: Bold titles, dates, locations, website URLs, and concise descriptions
- **Intelligent ranking**: Results prioritized by relevance to your interests
- **Real-time data**: Powered by Claude's web search tool for current information

### 🎨 Modern UI/UX
- **Responsive design**: Works seamlessly on desktop, tablet, and mobile
- **Clean interface**: Intuitive form with validation and loading states
- **Interactive elements**: Smooth animations and hover effects
- **Accessible design**: WCAG-compliant form inputs and navigation

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern, component-based UI framework
- **Vite** - Fast development server and build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **date-fns** - Modern JavaScript date utility library
- **CSS3** - Responsive styling with Grid and Flexbox

### Backend (Milestone 2)
- **Express.js** - Fast, minimalist web framework
- **Claude Messages API** - AI-powered search and recommendations
- **Web Search Tool** - Real-time conference and event discovery
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📋 Project Structure

```
ai-conferences-and-events/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   │   ├── SearchForm.jsx  # Main search form with validation
│   │   │   ├── EventCard.jsx   # Individual event display card
│   │   │   └── ResultsDisplay.jsx # Results container
│   │   ├── data/
│   │   │   └── dummyEvents.js  # Sample data for testing (Milestone 1)
│   │   ├── App.jsx             # Main application component
│   │   └── App.css             # Application styles
│   ├── package.json
│   └── vite.config.js
├── backend/                     # Express backend (Milestone 2)
├── spec.md                     # Project specifications
├── prompt.md                   # Claude API prompt configuration
├── todo.md                     # Development task tracking
└── README.md                   # This file
```

## 🎯 User Input Fields

1. **City** - Your location for distance calculations
2. **Kids Ages** - Optional ages for family-friendly event filtering
3. **Availability** - Date range when you're available to attend
4. **Travel Distance** - Maximum miles you're willing to travel
5. **AI Interests** - Your specific AI research interests and specialties
6. **Other Preferences** - Additional requirements or preferences

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jon-chun/ai-conferences-and-events.git
   cd ai-conferences-and-events
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to **http://localhost:5173/**

## 📖 Development Progress

### ✅ Milestone 1: UI Setup with Dummy Data - COMPLETED
- [x] React + Vite project setup
- [x] Complete search form with all 6 input fields
- [x] Form validation and error handling
- [x] Results display with event cards
- [x] Responsive design and modern styling
- [x] Dummy data integration for testing
- [x] Loading states and user feedback

### 🚧 Milestone 2: Claude API Integration - IN PROGRESS
- [ ] Express.js backend setup
- [ ] Claude Messages API integration
- [ ] Web search tool implementation
- [ ] Frontend-backend connection
- [ ] Real API data processing

### 📋 Milestone 3: Full Feature Completion - PLANNED
- [ ] Intelligent filtering and ranking
- [ ] Geolocation and distance calculation
- [ ] Performance optimization
- [ ] Advanced error handling

## 🧪 Testing

The application includes comprehensive testing scenarios:
- Form validation for required fields
- Responsive design across devices
- Loading states and error handling
- Data filtering and display logic
- End-to-end user workflows

## 🔧 API Integration (Milestone 2)

The application will integrate with Claude's Messages API featuring:
- **Web Search Tool**: Real-time discovery of current AI conferences
- **Intelligent Filtering**: Context-aware event recommendations
- **Natural Language Processing**: Understanding user preferences and interests
- **Structured Output**: Formatted results with all required information

## 📱 Responsive Design

- **Desktop**: Full-featured layout with optimal information density
- **Tablet**: Adaptive grid layout for comfortable viewing
- **Mobile**: Streamlined interface optimized for touch interaction
- **Performance**: Fast load times and smooth interactions

## 🤝 Contributing

This project is actively being developed. Check the [todo.md](todo.md) file for current tasks and development progress.

### Development Workflow
1. Check the [todo.md](todo.md) for current tasks
2. Follow the [spec.md](spec.md) for requirements
3. Use the [prompt.md](prompt.md) for API integration guidance
4. Test thoroughly before submitting changes

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Claude AI API** - For providing intelligent search and recommendation capabilities
- **Vite** - For the fast and modern development experience
- **React** - For the powerful and flexible UI framework
- **Open Source Community** - For the invaluable tools and libraries used

## 🔮 Future Enhancements

- **User Accounts**: Save preferences and search history
- **Notifications**: Get alerts for new events matching your interests
- **Social Features**: Share events with colleagues and friends
- **Advanced Filtering**: More granular search options
- **Event Reviews**: User ratings and reviews for events
- **Integration**: Calendar sync and ticket booking

---

**Built with ❤️ using React, Express.js, and Claude AI**

For questions, suggestions, or contributions, please open an issue or submit a pull request.