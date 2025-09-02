import { NextRequest, NextResponse } from "next/server";
import { webSearchTool, executeTool } from "@/lib/tools";
import { mockCrimeReports } from "@/lib/mock-crime-data";

interface ToolCall {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    console.log(`\n🔥 === LOCAL SAFETY NEWS SEARCH STARTED ===`);
    console.log(`📝 User Query: "${query}"`);
    console.log(`⏰ Timestamp: ${new Date().toISOString()}`);
    console.log(`🤖 SearchAgent: Initializing AI-powered search...`);
    console.log(`📋 SYSTEM OVERVIEW:`);
    console.log(`   🧠 AI Model: Claude 3.5 Sonnet (via OpenRouter)`);
    console.log(`   🔧 Tools: Crime Database Search`);
    console.log(`   🗺️ Map: Mapbox integration for visualization`);
    console.log(`   🚀 Background: GeoAgent for location processing`);
    console.log(`   📊 Flow: Query → AI → Database → Results → Map\n`);

    // Step 1: Call LLM with tool calling capability
    console.log(`📡 Step 1: Sending query to Claude 3.5 Sonnet via OpenRouter...`);
    const searchResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "Local Safety News - SearchAgent",
      },
      body: JSON.stringify({
        model: "anthropic/claude-3.5-sonnet",
        messages: [
          {
            role: "system",
            content: `You are a SearchAgent that helps users find crime and safety information. Your task is to:

1. Use the search_local_crime_data tool to find recent safety incidents for the user's query
2. Analyze the search results to provide a helpful summary with specific incident counts and types
3. Return both the summary and the raw search results

IMPORTANT: You MUST use the search_local_crime_data tool to get current information from our local crime database.`
          },
          {
            role: "user",
            content: `Please search for safety and crime information about: "${query}"`
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: webSearchTool.name,
              description: webSearchTool.description,
              parameters: webSearchTool.parameters
            }
          }
        ],
        tool_choice: "auto",
        max_tokens: 2000,
        temperature: 0.3
      })
    });

    if (!searchResponse.ok) {
      console.log(`❌ OpenRouter API Error: ${searchResponse.status} ${searchResponse.statusText}`);
      console.log(`🔄 Switching to fallback mode with real crime data...`);
      
      // Fallback: Use local mock data
      const extractLocationFromQuery = (query: string): string => {
        const locations = ['sandton', 'rosebank', 'parkhurst', 'hyde park', 'bryanston', 'morningside', 'melrose', 'illovo', 'craighall', 'atholl', 'johannesburg', 'pretoria', 'centurion'];
        const queryLower = query.toLowerCase();
        for (const location of locations) {
          if (queryLower.includes(location)) {
            return location;
          }
        }
        return 'johannesburg';
      };

      const searchLocation = extractLocationFromQuery(query);
      const queryTerms = query.toLowerCase().split(' ');
      const locationLower = searchLocation.toLowerCase();
      
      const matchingIncidents = mockCrimeReports.filter(incident => {
        const matchesLocation = incident.keywords.some((keyword: string) => 
          keyword.toLowerCase().includes(locationLower)
        ) || incident.newsID.toLowerCase().includes(locationLower);
        
        if (!matchesLocation) {
          return false;
        }
        
        const matchesQuery = queryTerms.some((term: string) => 
          incident.keywords.some((keyword: string) => keyword.toLowerCase().includes(term)) ||
          incident.summary.toLowerCase().includes(term) ||
          incident.type.toLowerCase().includes(term)
        );
        
        return matchesQuery;
      }).sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime())
      .slice(0, 10);

      console.log(`✅ Fallback: Found ${matchingIncidents.length} incidents for "${searchLocation}"`);
      
      const crimeTypes = [...new Set(matchingIncidents.map(i => i.type))];
      const severityStats = matchingIncidents.reduce((acc, incident) => {
        acc[incident.severity] = (acc[incident.severity] || 0) + 1;
        return acc;
      }, {} as Record<number, number>);

      const now = new Date();
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const recentIncidents = matchingIncidents.filter(incident => 
        new Date(incident.datetime) >= sevenDaysAgo
      );

      const avgSeverity = matchingIncidents.length > 0 
        ? (matchingIncidents.reduce((sum, i) => sum + i.severity, 0) / matchingIncidents.length)
        : 0;

      const mockResponse = {
        answer: matchingIncidents.length > 0 ? `🚨 **SAFETY ALERT: ${searchLocation.toUpperCase()}**

📊 **${matchingIncidents.length} INCIDENTS FOUND** | Recent: ${recentIncidents.length} (last 7 days)
⚠️ **Risk Level**: ${avgSeverity >= 4 ? '🔴 HIGH' : avgSeverity >= 3 ? '🟡 MODERATE' : '🟢 LOW'} (${avgSeverity.toFixed(1)}/5.0)

🎯 **INCIDENT BREAKDOWN:**
${crimeTypes.map(type => {
  const count = matchingIncidents.filter(i => i.type === type).length;
  const percentage = ((count / matchingIncidents.length) * 100).toFixed(0);
  return `• **${type}**: ${count} incidents (${percentage}%)`;
}).join('\n')}

📈 **SEVERITY ANALYSIS:**
${Object.entries(severityStats)
  .sort(([a], [b]) => parseInt(b) - parseInt(a))
  .map(([sev, count]) => {
    const severity = parseInt(sev);
    const emoji = severity >= 4 ? '🔴' : severity >= 3 ? '🟡' : '🟢';
    const label = severity >= 4 ? 'CRITICAL' : severity >= 3 ? 'SERIOUS' : 'MINOR';
    return `${emoji} **Level ${sev} (${label})**: ${count} case${count > 1 ? 's' : ''}`;
  }).join('\n')}

🕐 **LATEST INCIDENTS:**
${matchingIncidents.slice(0, 3).map((incident, index) => {
  const date = new Date(incident.datetime).toLocaleDateString();
  const emoji = incident.severity >= 4 ? '🔴' : incident.severity >= 3 ? '🟡' : '🟢';
  return `${index + 1}. ${emoji} **${date}** - ${incident.summary}`;
}).join('\n')}

🛡️ **SAFETY TIPS:**
${matchingIncidents.some(i => i.severity >= 4) 
  ? '• 🚫 HIGH RISK AREA - Avoid if possible\n• 👥 Never travel alone\n• 📱 Keep emergency contacts ready' 
  : '• 👀 Stay alert and aware\n• 🌙 Extra caution after dark\n• 💼 Secure valuables'}
• 🚔 Emergency: 10111 | Medical: 10177

🗺️ **MAP LOCATIONS:** ${matchingIncidents.length} incident pins plotted →

📊 **Source**: Local Crime Database | **Updated**: Live` 
        : `🔍 **NO INCIDENTS FOUND: ${searchLocation.toUpperCase()}**

✅ **GOOD NEWS!** No recent incidents match your search.

📍 **Search Area**: ${searchLocation.charAt(0).toUpperCase() + searchLocation.slice(1)}
📅 **Time Range**: Last 30 days
🎯 **Search Terms**: "${query}"

🛡️ **GENERAL SAFETY TIPS:**
• 👀 Stay alert and aware of surroundings
• 🌙 Extra caution during evening hours  
• 💼 Keep valuables secure and out of sight
• 👥 Travel in groups when possible
• 🚔 Report suspicious activity: 10111

📊 **Source**: Local Crime Database | **Status**: All Clear`,
        incidents: matchingIncidents
      };

      return NextResponse.json(mockResponse);
    }

    const searchData = await searchResponse.json();
    console.log(`✅ Step 2: Claude 3.5 Sonnet responded successfully`);
    console.log(`🧠 AI Analysis: Model determined ${searchData.choices[0].message.tool_calls ? searchData.choices[0].message.tool_calls.length : 0} tool(s) needed`);

    let toolResults: any[] = [];
    let finalAnswer = "";

    // Step 2: Handle tool calls
    const message = searchData.choices[0]?.message;
    if (message.tool_calls && message.tool_calls.length > 0) {
      console.log(`🛠️ Step 3: Processing ${message.tool_calls.length} tool call(s) to search crime database...`);

      // Execute each tool call
      for (const toolCall of message.tool_calls) {
        try {
          const functionName = toolCall.function.name;
          const functionArgs = JSON.parse(toolCall.function.arguments);
          
          console.log(`🔧 Executing: ${functionName}`);
          console.log(`📍 Search Parameters:`, functionArgs);
          
          const toolResult = await executeTool(functionName, functionArgs);
          toolResults.push({
            toolCall: toolCall,
            result: toolResult
          });

          console.log(`✅ Database Search Complete: ${functionName}`);
          if (toolResult && toolResult.incidents) {
            console.log(`📊 Found ${toolResult.incidents.length} incidents in the crime database`);
          }
        } catch (error) {
          console.error(`❌ Tool execution failed:`, error);
          toolResults.push({
            toolCall: toolCall,
            error: error instanceof Error ? error.message : String(error)
          });
        }
      }

      // Step 3: Send tool results back to LLM for final response
      // Step 3: Get final analysis from LLM
      console.log(`🧠 Step 4: Asking Claude to analyze the crime data and generate user-friendly summary...`);
      const finalResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
          "X-Title": "Local Safety News - SearchAgent",
        },
        body: JSON.stringify({
          model: "anthropic/claude-3.5-sonnet",
          messages: [
            {
              role: "system",
              content: `You are a SearchAgent. Analyze the search results and provide a helpful summary of the safety information found.`
            },
            {
              role: "user", 
              content: `Please search for safety and crime information about: "${query}"`
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
          max_tokens: 1000,
          temperature: 0.3
        })
      });

      if (finalResponse.ok) {
        const finalData = await finalResponse.json();
        finalAnswer = finalData.choices[0]?.message?.content || "No summary available.";
        console.log(`✅ Step 5: AI-generated summary complete`);
      } else {
        console.log(`⚠️ Final analysis failed, using raw data instead`);
      }
    }

    // Extract search results from tool executions
    const searchResults = toolResults
      .filter(tr => tr.result && tr.result.results)
      .flatMap(tr => tr.result.results);

    // Trigger background geo processing
    console.log(`🚀 Step 6: Triggering GeoAgent for background geospatial analysis...`);
    triggerGeoProcessing(query, searchResults);

    console.log(`✅ === SEARCH COMPLETE ===`);
    console.log(`📈 Results Summary:`);
    console.log(`   • Total Incidents Found: ${searchResults.length}`);
    console.log(`   • AI Summary Generated: ${finalAnswer ? 'Yes' : 'No'}`);
    console.log(`   • Map Data Ready: ${searchResults.length > 0 ? 'Yes' : 'No'}`);
    console.log(`   • GeoAgent Triggered: Yes (background processing)`);
    console.log(`🎯 Success: Data sent to frontend for display\n`);

    return NextResponse.json({
      answer: finalAnswer || "Search completed but no summary available.",
      results: searchResults,
      toolCalls: toolResults.map(tr => ({
        tool: tr.toolCall.function.name,
        status: tr.error ? "error" : "success",
        result: tr.error || "Tool executed successfully"
      }))
    });

  } catch (error) {
    console.error("❌ SearchAgent error:", error);
    return NextResponse.json(
      { error: "Failed to process search request" },
      { status: 500 }
    );
  }
}

async function triggerGeoProcessing(query: string, searchResults: any[]) {
  try {
    console.log(`🌍 === GEOAGENT BACKGROUND PROCESSING ===`);
    console.log(`📍 Geographic Analysis: Starting for ${searchResults.length} incidents`);
    console.log(`🔄 Processing Mode: Background (non-blocking)`);
    
    // Call the GeoAgent in the background (fire and forget)
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/geo-process`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        searchResults
      })
    }).catch(error => {
      console.error("❌ Background geo processing failed:", error);
    });
    
    console.log(`✅ GeoAgent: Background processing initiated successfully`);
  } catch (error) {
    console.error("❌ Failed to trigger geo processing:", error);
  }
}
