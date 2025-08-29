// Tool implementations for our agents
import { mockCrimeReports } from './mock-crime-data';
import { SafetyIncident } from './schema';

export interface Tool {
  name: string;
  description: string;
  parameters: any;
  execute: (params: any) => Promise<any>;
}

// Web Search Tool - Now uses local crime database for realistic demo data
export const webSearchTool: Tool = {
  name: "search_local_crime_data",
  description: "Search local crime database for safety incidents in specific areas",
  parameters: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "The search query for crime/safety news"
      },
      location: {
        type: "string", 
        description: "The location to focus the search on (e.g. 'Parkhurst', 'Sandton', 'Johannesburg')"
      }
    },
    required: ["query"]
  },
  execute: async (params: { query: string; location?: string }) => {
    console.log(`🔍 TOOL EXECUTION: search_local_crime_data with query: "${params.query}"`);
    
    // Extract location from query if not provided
    const searchLocation = params.location || extractLocationFromQuery(params.query);
    
    // Search local crime database
    const matchingReports = searchLocalDatabase(params.query, searchLocation);
    
    // Convert SafetyIncidents to search result format
    const searchResults = matchingReports.slice(0, 5).map(incident => ({
      title: `${incident.type} - ${incident.keywords.join(', ')}`,
      url: `https://local-safety-reports.com/incident/${incident.newsID}`,
      snippet: incident.summary,
      date: incident.datetime.split('T')[0],
      severity: incident.severity,
      location: incident.keywords.find(k => k.includes('burg') || k.includes('town')) || 'Johannesburg'
    }));

    console.log(`✅ TOOL RESULT: Found ${searchResults.length} incidents for "${searchLocation}"`);
    return {
      results: searchResults,
      searchQuery: params.query,
      location: searchLocation,
      totalResults: matchingReports.length,
      foundIncidents: matchingReports.slice(0, 5) // Include raw incidents for GeoAgent
    };
  }
};

// Helper functions for local database search
function extractLocationFromQuery(query: string): string {
  const locations = [
    'sandton', 'parkhurst', 'rosebank', 'melville', 'bryanston', 
    'fourways', 'randburg', 'alexandra', 'soweto', 'hillbrow',
    'kempton park', 'benoni', 'centurion', 'pretoria', 'johannesburg'
  ];
  
  const queryLower = query.toLowerCase();
  for (const location of locations) {
    if (queryLower.includes(location)) {
      return location;
    }
  }
  return 'johannesburg'; // Default
}

function searchLocalDatabase(query: string, location: string): SafetyIncident[] {
  const queryTerms = query.toLowerCase().split(' ');
  const locationLower = location.toLowerCase();
  
  return mockCrimeReports.filter(incident => {
    // Check if incident matches location
    const matchesLocation = incident.keywords.some(keyword => 
      keyword.toLowerCase().includes(locationLower)
    ) || incident.newsID.toLowerCase().includes(locationLower);
    
    // Check if incident matches query terms
    const matchesQuery = queryTerms.some(term => 
      incident.keywords.some(keyword => keyword.toLowerCase().includes(term)) ||
      incident.summary.toLowerCase().includes(term) ||
      incident.type.toLowerCase().includes(term)
    );
    
    return matchesLocation || matchesQuery;
  }).sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()); // Most recent first
}

// Geocoding Tool
export const geocodingTool: Tool = {
  name: "geocode_location",
  description: "Convert location names to geographic coordinates (latitude, longitude)",
  parameters: {
    type: "object",
    properties: {
      location: {
        type: "string",
        description: "The location name to geocode (e.g., 'Parkhurst, Johannesburg')"
      }
    },
    required: ["location"]
  },
  execute: async (params: { location: string }) => {
    console.log(`📍 TOOL EXECUTION: geocode_location for: "${params.location}"`);
    
    // South African location database (in production, use Google Geocoding API)
    const locationDB: Record<string, [number, number]> = {
      // Johannesburg areas
      "parkhurst": [28.0093, -26.1414],
      "parkhurst, johannesburg": [28.0093, -26.1414],
      "sandton": [28.0473, -26.1076],
      "sandton, johannesburg": [28.0473, -26.1076],
      "rosebank": [28.0420, -26.1464],
      "rosebank, johannesburg": [28.0420, -26.1464],
      "melville": [28.0093, -26.1809],
      "melville, johannesburg": [28.0093, -26.1809],
      "johannesburg": [28.0473, -26.2041],
      "johannesburg cbd": [28.0473, -26.2041],
      
      // Cape Town areas
      "cape town": [18.4241, -33.9249],
      "cape town cbd": [18.4241, -33.9249],
      "camps bay": [18.3775, -33.9506],
      "camps bay, cape town": [18.3775, -33.9506],
      "sea point": [18.3906, -33.9167],
      "sea point, cape town": [18.3906, -33.9167],
      "observatory": [18.4733, -33.9333],
      "observatory, cape town": [18.4733, -33.9333],
      
      // Durban areas
      "durban": [31.0218, -29.8587],
      "durban cbd": [31.0218, -29.8587],
      "umhlanga": [31.0952, -29.7277],
      "umhlanga, durban": [31.0952, -29.7277],
      
      // Pretoria areas
      "pretoria": [28.1881, -25.7479],
      "pretoria cbd": [28.1881, -25.7479],
      "hatfield": [28.2378, -25.7500],
      "hatfield, pretoria": [28.2378, -25.7500]
    };

    const normalizedLocation = params.location.toLowerCase().trim();
    
    // Try exact match first
    let coordinates = locationDB[normalizedLocation];
    
    // Try partial matches
    if (!coordinates) {
      for (const [key, coords] of Object.entries(locationDB)) {
        if (normalizedLocation.includes(key) || key.includes(normalizedLocation)) {
          coordinates = coords;
          break;
        }
      }
    }
    
    // Default to Johannesburg if no match
    if (!coordinates) {
      coordinates = [28.0473, -26.2041]; // Johannesburg center
      console.log(`⚠️ GEOCODING: Location "${params.location}" not found, defaulting to Johannesburg`);
    }

    const result = {
      location: params.location,
      coordinates: {
        type: "Point" as const,
        coordinates: coordinates as [number, number]
      },
      confidence: coordinates === locationDB[normalizedLocation] ? "high" : "medium"
    };

    console.log(`✅ TOOL RESULT: Geocoded "${params.location}" to [${coordinates[0]}, ${coordinates[1]}]`);
    return result;
  }
};

// Data Extraction Tool
export const dataExtractionTool: Tool = {
  name: "extract_incident_data",
  description: "Extract structured incident data from news text",
  parameters: {
    type: "object", 
    properties: {
      newsText: {
        type: "string",
        description: "The news text to extract incident data from"
      },
      location: {
        type: "string",
        description: "The primary location mentioned"
      }
    },
    required: ["newsText", "location"]
  },
  execute: async (params: { newsText: string; location: string }) => {
    console.log(`📊 TOOL EXECUTION: extract_incident_data from news text (${params.newsText.length} chars)`);
    
    // Simple keyword-based extraction (in production, use NLP)
    const crimeKeywords = {
      "Violent Crimes": ["assault", "robbery", "mugging", "attack", "violence", "murder", "shooting"],
      "Property & Financial Crimes": ["theft", "burglary", "fraud", "scam", "stolen", "break-in"],
      "Public Order & Social Crimes": ["protest", "disturbance", "vandalism", "loitering"],
      "Cyber & Communication Crimes": ["cyber", "online", "digital", "phishing", "hacking"],
      "Organised Crime & Syndicate Operations": ["syndicate", "gang", "organized", "cartel"],
      "Sexual Offences": ["sexual", "harassment", "assault"]
    };

    let detectedType = "Property & Financial Crimes"; // default
    let severity = 3; // default
    let keywords: string[] = [];

    // Analyze text for crime type and severity
    const lowerText = params.newsText.toLowerCase();
    
    for (const [crimeType, typeKeywords] of Object.entries(crimeKeywords)) {
      const matches = typeKeywords.filter(keyword => lowerText.includes(keyword));
      if (matches.length > 0) {
        detectedType = crimeType;
        keywords.push(...matches);
        
        // Adjust severity based on crime type
        if (crimeType === "Violent Crimes") severity = 4;
        else if (crimeType === "Sexual Offences") severity = 5;
        else if (crimeType === "Organised Crime & Syndicate Operations") severity = 4;
        break;
      }
    }

    // Extract additional keywords
    const importantWords = lowerText.match(/\b\w{4,}\b/g) || [];
    keywords.push(...importantWords.slice(0, 5));
    keywords = [...new Set(keywords)]; // remove duplicates

    const result = {
      type: detectedType,
      severity,
      keywords: keywords.slice(0, 5), // limit to 5 keywords
      summary: params.newsText.substring(0, 100).trim(),
      extractedLocation: params.location
    };

    console.log(`✅ TOOL RESULT: Extracted ${detectedType} (severity: ${severity})`);
    return result;
  }
};

// Tool registry
export const AVAILABLE_TOOLS = [webSearchTool, geocodingTool, dataExtractionTool];

// Helper function to execute tools
export async function executeTool(toolName: string, parameters: any) {
  const tool = AVAILABLE_TOOLS.find(t => t.name === toolName);
  if (!tool) {
    throw new Error(`Tool "${toolName}" not found`);
  }
  
  return await tool.execute(parameters);
}
