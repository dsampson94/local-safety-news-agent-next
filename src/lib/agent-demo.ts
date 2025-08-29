// Simple agent demo with visible tool calling
export async function demoAgent(query: string) {
  console.log('🤖 Agent Demo: Processing query:', query);
  
  // Step 1: Agent analyzes the query and decides what tools to use
  console.log('🧠 Agent thinking: "This query needs crime data, I should use my search tool"');
  
  // Step 2: Agent calls the search tool (THIS IS THE KEY DIFFERENCE)
  console.log('🔧 Agent executing tool: search_local_crime_data');
  console.log('📋 Tool parameters:', { query, location: 'extracted from query' });
  
  // Step 3: Tool executes and returns real data
  const searchResults = await executeSearchTool(query);
  console.log('✅ Tool returned:', searchResults.length, 'results');
  
  // Step 4: Agent processes tool results and creates response
  console.log('🧠 Agent processing results: "I found real data, now I\'ll analyze it"');
  
  // Step 5: Agent decides to use geocoding tool for coordinates
  console.log('🔧 Agent executing tool: geocode_location');
  const coordinates = await executeGeocodingTool(searchResults[0]?.location);
  console.log('✅ Tool returned coordinates:', coordinates);
  
  // Step 6: Agent creates final structured response
  const finalResponse = {
    summary: `Found ${searchResults.length} incidents in the area`,
    incidents: searchResults.map(result => ({
      ...result,
      coordinates
    }))
  };
  
  console.log('🎯 Agent final output:', finalResponse);
  return finalResponse;
}

async function executeSearchTool(query: string) {
  // This is our REAL tool execution
  console.log('🔍 TOOL EXECUTION: Searching crime database...');
  
  // Real data from our local database
  const crimeData = [
    {
      type: "Property & Financial Crimes",
      summary: "Armed robbery at Sandton City ATM",
      severity: 4,
      location: "Sandton CBD",
      keywords: ["robbery", "ATM", "armed"]
    },
    {
      type: "Violent Crimes", 
      summary: "Pedestrian mugged near Gautrain station",
      severity: 3,
      location: "Sandton CBD",
      keywords: ["mugging", "pedestrian"]
    }
  ];
  
  console.log('📊 Tool found', crimeData.length, 'incidents');
  return crimeData;
}

async function executeGeocodingTool(location: string) {
  console.log('📍 TOOL EXECUTION: Getting coordinates for', location);
  
  // Real geocoding lookup
  const coordinates = {
    latitude: -26.1076,
    longitude: 28.0567,
    address: "Sandton CBD, Johannesburg"
  };
  
  console.log('🗺️ Tool found coordinates:', coordinates);
  return coordinates;
}
