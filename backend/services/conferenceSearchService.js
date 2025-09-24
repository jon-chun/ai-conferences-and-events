const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

class ConferenceSearchService {
  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async searchConferences(searchCriteria) {
    try {
      const systemPrompt = this.buildSystemPrompt();
      const userQuery = this.buildUserQuery(searchCriteria);

      const response = await this.anthropic.messages.create({
        model: 'GLM-4.5',
        max_tokens: 4000,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userQuery
          }
        ],
        tools: [
          {
            type: 'web_search_20250305',
            name: 'web_search',
            description: 'Search for current AI conferences and events',
            max_uses: 5,
            user_location: {
              type: 'approximate',
              city: searchCriteria.city,
              country: 'US'
            },
            input_schema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'The search query to execute'
                }
              },
              required: ['query']
            }
          }
        ]
      });

      return this.parseResponse(response);
    } catch (error) {
      console.error('Error searching conferences:', error);
      throw new Error('Failed to search conferences');
    }
  }

  buildSystemPrompt() {
    const promptPath = path.join(__dirname, '../../prompt.md');
    const promptContent = fs.readFileSync(promptPath, 'utf8');

    const systemPromptMatch = promptContent.match(/## System Prompt\s*\n([\s\S]*?)(?=\n##|$)/);
    if (systemPromptMatch) {
      return systemPromptMatch[1].trim();
    }

    return `You are an AI conference and event recommendation expert. Search for AI conferences and events based on the user's criteria and return exactly 5 top recommendations.`;
  }

  buildUserQuery(searchCriteria) {
    const { city, kidsAges, availability, milesRange, aiInterests, preferences } = searchCriteria;

    let query = `Search for AI conferences, machine learning conferences, and artificial intelligence events near ${city} within ${milesRange} miles. I'm available ${availability}. My specific AI interests include: ${aiInterests}.`;

    if (kidsAges) {
      query += ` I have kids ages ${kidsAges} so family-friendly events would be preferred.`;
    }

    if (preferences) {
      query += ` Additional preferences: ${preferences}`;
    }

    query += `

Please search for:
1. Academic AI conferences (NeurIPS, ICML, CVPR, ICLR, AAAI, etc.)
2. Industry AI events and meetups
3. Machine learning workshops and seminars
4. AI research symposiums
5. Tech conferences with AI tracks

Focus on events happening ${availability} within ${milesRange} miles of ${city}. Use the web search tool to find current, upcoming events. Return specific event names, dates, venues, and official websites.`;

    return query;
  }

  parseResponse(response) {
    let content = '';

    // Handle different response formats
    if (response.content && response.content[0] && response.content[0].text) {
      content = response.content[0].text;
    } else if (response.content && response.content.length > 0) {
      // Try to find text content in different formats
      const textContent = response.content.find(item => item.type === 'text');
      if (textContent) {
        content = textContent.text;
      }
    }

    // If no content, return empty array
    if (!content || content.trim() === '') {
      return [];
    }

    const events = [];

    // Try different parsing strategies
    const strategies = [
      this.parseNumberedEvents.bind(this),
      this.parseBulletedEvents.bind(this),
      this.parseSimpleEvents.bind(this)
    ];

    for (const strategy of strategies) {
      try {
        const parsedEvents = strategy(content);
        if (parsedEvents.length > 0) {
          return parsedEvents;
        }
      } catch (error) {
        console.log('Parsing strategy failed:', error.message);
        continue;
      }
    }

    // If all strategies fail, create a fallback event
    return [{
      id: 1,
      title: 'Search completed - No specific events found',
      dates: 'Please check the websites below',
      location: 'Various locations',
      distance: 'Search area',
      website: 'https://www.google.com/search?q=AI+conferences',
      description: 'The web search was completed but no specific AI conferences were found in the results. Try searching with different criteria or check the linked search results.',
      type: 'event'
    }];
  }

  parseNumberedEvents(content) {
    const events = [];
    const eventBlocks = content.split(/\*\*\d+\.\s+/).filter(block => block.trim());

    eventBlocks.forEach((block, index) => {
      const event = this.parseEventBlock(block.trim(), index + 1);
      if (event) {
        events.push(event);
      }
    });

    return events;
  }

  parseBulletedEvents(content) {
    const events = [];
    const lines = content.split('\n').filter(line => line.trim());

    let currentEvent = null;
    let eventId = 1;

    for (const line of lines) {
      if (line.includes('**') && line.includes('Conference') || line.includes('Event')) {
        if (currentEvent) {
          events.push(currentEvent);
        }
        currentEvent = this.parseEventFromLine(line, eventId++);
      } else if (currentEvent) {
        this.appendEventDetails(currentEvent, line);
      }
    }

    if (currentEvent) {
      events.push(currentEvent);
    }

    return events;
  }

  parseSimpleEvents(content) {
    const events = [];
    const lines = content.split('\n').filter(line => line.trim());

    let eventId = 1;
    for (const line of lines) {
      if (line.length > 20 && (line.includes('conference') || line.includes('event') || line.includes('summit'))) {
        events.push({
          id: eventId++,
          title: line.replace(/\*\*/g, '').trim(),
          dates: 'Date information not available',
          location: 'Location not available',
          distance: 'Distance not available',
          website: '',
          description: line,
          type: line.includes('conference') ? 'conference' : 'event'
        });
      }
    }

    return events;
  }

  parseEventFromLine(line, id) {
    const titleMatch = line.match(/\*\*(.+?)\*\*/);
    const title = titleMatch ? titleMatch[1] : `Event ${id}`;

    return {
      id: id,
      title: title,
      dates: 'Dates not available',
      location: 'Location not available',
      distance: 'Distance not available',
      website: '',
      description: 'Event information extracted from search results',
      type: title.toLowerCase().includes('conference') ? 'conference' : 'event'
    };
  }

  appendEventDetails(event, line) {
    if (line.includes('Date') || line.includes('When')) {
      event.dates = line.replace(/\*\*Date:\*\*\s*/i, '').replace(/\*\*When:\*\*\s*/i, '').trim();
    } else if (line.includes('Location') || line.includes('Where')) {
      event.location = line.replace(/\*\*Location:\*\*\s*/i, '').replace(/\*\*Where:\*\*\s*/i, '').trim();
    } else if (line.includes('Website') || line.includes('URL')) {
      const urlMatch = line.match(/(https?:\/\/[^\s]+)/);
      event.website = urlMatch ? urlMatch[1] : '';
    } else if (line.length > 20 && !line.includes('**')) {
      event.description = line.trim();
    }
  }

  parseEventBlock(block, index) {
    try {
      const titleMatch = block.match(/^(.+?)\*\*/);
      const title = titleMatch ? titleMatch[1].trim() : `Event ${index}`;

      const datesMatch = block.match(/\*\*Dates\*\*:\s*(.+?)(?=\n|$)/);
      const dates = datesMatch ? datesMatch[1].trim() : 'Dates not available';

      const locationMatch = block.match(/\*\*Location\*\*:\s*(.+?)(?=\n|$)/);
      const location = locationMatch ? locationMatch[1].trim() : 'Location not available';

      const distanceMatch = block.match(/\*\*Distance\*\*:\s*(.+?)(?=\n|$)/);
      const distance = distanceMatch ? distanceMatch[1].trim() : 'Distance not available';

      const websiteMatch = block.match(/\*\*Website\*\*:\s*(.+?)(?=\n|$)/);
      const website = websiteMatch ? websiteMatch[1].trim() : '';

      const descriptionMatch = block.match(/\*\*Description\*\*:\s*(.+?)(?=\n\n|$)/);
      const description = descriptionMatch ? descriptionMatch[1].trim() : 'Description not available';

      return {
        id: index,
        title: title,
        dates: dates,
        location: location,
        distance: distance,
        website: website,
        description: description,
        type: this.determineEventType(title, description)
      };
    } catch (error) {
      console.error('Error parsing event block:', error);
      return null;
    }
  }

  determineEventType(title, description) {
    const titleLower = title.toLowerCase();
    const descriptionLower = description.toLowerCase();

    const conferenceKeywords = ['conference', 'summit', 'symposium', 'icml', 'neurips', 'cvpr', 'iclr', 'aaai', 'ijcai'];
    const hasConferenceKeyword = conferenceKeywords.some(keyword =>
      titleLower.includes(keyword) || descriptionLower.includes(keyword)
    );

    return hasConferenceKeyword ? 'conference' : 'event';
  }
}

module.exports = ConferenceSearchService;