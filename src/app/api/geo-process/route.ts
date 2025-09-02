import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { geocodingTool, dataExtractionTool, executeTool } from "@/lib/tools";
import { SafetyIncident } from "@/lib/schema";

export async function POST(request: NextRequest) {
  try {
    const { query, searchResults } = await request.json();

    console.log(`\n🌍 === GEOAGENT PROCESSING STARTED ===`);
    console.log(`📊 Input Data: ${searchResults?.length || 0} search results for "${query}"`);
    console.log(`🎯 Goal: Convert news data into geolocated incident objects for map display`);
    console.log(`🤖 GeoAgent: Initializing geographic analysis...`);

    // Step 1: Call LLM with tool calling capability
    console.log(`📡 Step 1: Sending geo-processing request to Claude 3.5 Sonnet...`);
    const geoResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "Local Safety News - GeoAgent",
      },
      body: JSON.stringify({
        model: "anthropic/claude-3.5-sonnet",
        messages: [
          {
            role: "system",
            content: `You are a GeoAgent that converts safety news into structured, geolocated data. Your tasks:

1. Use the geocode_location tool to get coordinates for locations mentioned
2. Use the extract_incident_data tool to analyze news content
3. Create structured incident objects based on the tool results

You have access to these tools:
- geocode_location: Convert location names to coordinates
- extract_incident_data: Extract crime type, severity, keywords from news text

IMPORTANT: You MUST use the tools to get accurate data. Do not generate coordinates or incident data without using the tools first.`
          },
          {
            role: "user",
            content: `Process this safety query and search results into geolocated incident objects:

Query: "${query}"
Search Results: ${JSON.stringify(searchResults, null, 2)}

Use the geocode_location tool for the location in the query, and extract_incident_data tool for each search result to create structured incident data.`
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: geocodingTool.name,
              description: geocodingTool.description,
              parameters: geocodingTool.parameters
            }
          },
          {
            type: "function", 
            function: {
              name: dataExtractionTool.name,
              description: dataExtractionTool.description,
              parameters: dataExtractionTool.parameters
            }
          }
        ],
        tool_choice: "auto",
        max_tokens: 3000,
        temperature: 0.2
      })
    });

    if (!geoResponse.ok) {
      throw new Error(`OpenRouter API error: ${geoResponse.status}`);
    }

    const geoData = await geoResponse.json();
    console.log(`📡 GeoAgent LLM response received, processing tool calls...`);

    let toolResults: any[] = [];
    let geocodedLocation: any = null;
    let extractedIncidents: any[] = [];

    // Step 2: Handle tool calls
    const message = geoData.choices[0]?.message;
    if (message.tool_calls && message.tool_calls.length > 0) {
      console.log(`🛠️ GeoAgent processing ${message.tool_calls.length} tool calls`);

      // Execute each tool call
      for (const toolCall of message.tool_calls) {
        try {
          const functionName = toolCall.function.name;
          const functionArgs = JSON.parse(toolCall.function.arguments);
          
          console.log(`🔧 GeoAgent executing tool: ${functionName} with args:`, functionArgs);
          
          const toolResult = await executeTool(functionName, functionArgs);
          toolResults.push({
            toolCall: toolCall,
            result: toolResult
          });

          // Store results for processing
          if (functionName === "geocode_location") {
            geocodedLocation = toolResult;
          } else if (functionName === "extract_incident_data") {
            extractedIncidents.push(toolResult);
          }

          console.log(`✅ GeoAgent tool execution completed for ${functionName}`);
        } catch (error) {
          console.error(`❌ GeoAgent tool execution failed:`, error);
          toolResults.push({
            toolCall: toolCall,
            error: error instanceof Error ? error.message : String(error)
          });
        }
      }

      // Step 3: Get final structured response from LLM
      const finalResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
          "X-Title": "Local Safety News - GeoAgent",
        },
        body: JSON.stringify({
          model: "anthropic/claude-3.5-sonnet",
          messages: [
            {
              role: "system",
              content: `Based on the tool results, create an array of SafetyIncident objects. Each incident must have:
- datetime (ISO format)
- coordinates (GeoJSON Point with [lng, lat])
- type (one of the 6 crime categories)
- newsID (unique identifier)
- severity (1-5)
- keywords (array)
- summary (max 100 chars)

Return ONLY a JSON array of incidents.`
            },
            {
              role: "user",
              content: `Create incident objects from the tool results. Use the geocoded coordinates for all incidents.`
            },
            {
              role: "assistant",
              content: null,
              tool_calls: message.tool_calls
            },
            ...toolResults.map(({ toolCall, result, error }) => ({
              role: "tool" as const,
              tool_call_id: toolCall.id,
              content: error ? `Error: ${error}` : JSON.stringify(result)
            }))
          ],
          max_tokens: 2000,
          temperature: 0.1
        })
      });

      if (finalResponse.ok) {
        const finalData = await finalResponse.json();
        const responseContent = finalData.choices[0]?.message?.content;
        console.log(`📋 GeoAgent final response:`, responseContent);
      }
    }

    // Step 4: Create incidents from tool results
    let incidents: SafetyIncident[] = [];

    if (geocodedLocation && extractedIncidents.length > 0) {
      incidents = extractedIncidents.map((extracted, index) => ({
        datetime: new Date().toISOString(),
        coordinates: geocodedLocation.coordinates,
        type: extracted.type,
        newsID: `geo-${Date.now()}-${index}`,
        severity: extracted.severity,
        keywords: extracted.keywords,
        summary: extracted.summary
      }));
    } else {
      // Create fallback incident if tools didn't execute properly
      incidents = createFallbackIncidents(query, geocodedLocation);
    }

    // Validate and clean the incidents
    incidents = validateIncidents(incidents);

    // Save to file
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${timestamp}.json`;
    const dataDir = path.join(process.cwd(), 'data', 'results');
    
    await fs.mkdir(dataDir, { recursive: true });
    
    const filePath = path.join(dataDir, filename);
    await fs.writeFile(filePath, JSON.stringify(incidents, null, 2));

    console.log(`✅ GeoAgent completed: Saved ${incidents.length} incidents to ${filename}`);
    console.log(`📊 Tool execution summary:`, toolResults.map(tr => ({
      tool: tr.toolCall.function.name,
      status: tr.error ? "error" : "success"
    })));

    return NextResponse.json({ 
      success: true, 
      incidentsGenerated: incidents.length,
      filename,
      toolExecutions: toolResults.map(tr => ({
        tool: tr.toolCall.function.name,
        status: tr.error ? "error" : "success",
        result: tr.error || "Tool executed successfully"
      }))
    });

  } catch (error) {
    console.error("❌ GeoAgent error:", error);
    return NextResponse.json(
      { error: "Failed to process geo data" },
      { status: 500 }
    );
  }
}

function createFallbackIncidents(query: string, geocodedLocation?: any): SafetyIncident[] {
  const fallbackCoordinates: [number, number] = geocodedLocation?.coordinates?.coordinates || [28.0473, -26.2041];
  
  return [
    {
      datetime: new Date().toISOString(),
      coordinates: {
        type: "Point",
        coordinates: fallbackCoordinates
      },
      type: "Property & Financial Crimes",
      newsID: `fallback-${Date.now()}`,
      severity: 3,
      keywords: ["safety", "general", "area"],
      summary: `General safety information for ${query} area.`
    }
  ];
}

function validateIncidents(incidents: any[]): SafetyIncident[] {
  const validTypes = [
    "Violent Crimes",
    "Property & Financial Crimes", 
    "Public Order & Social Crimes",
    "Cyber & Communication Crimes",
    "Organised Crime & Syndicate Operations",
    "Sexual Offences"
  ];

  return incidents.filter(incident => {
    return incident &&
           incident.coordinates &&
           incident.coordinates.coordinates &&
           Array.isArray(incident.coordinates.coordinates) &&
           incident.coordinates.coordinates.length === 2 &&
           typeof incident.coordinates.coordinates[0] === 'number' &&
           typeof incident.coordinates.coordinates[1] === 'number' &&
           validTypes.includes(incident.type) &&
           incident.severity >= 1 && incident.severity <= 5;
  }).map(incident => ({
    ...incident,
    datetime: incident.datetime || new Date().toISOString(),
    newsID: incident.newsID || `incident-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    keywords: Array.isArray(incident.keywords) ? incident.keywords : [],
    summary: incident.summary || "No summary available"
  }));
}
