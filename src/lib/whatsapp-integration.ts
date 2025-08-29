// WhatsApp Bot Integration for Community Wolf
// This shows how our agents would integrate with their actual platform

import { SearchAgent } from './search-agent';
import { GeoAgent } from './geo-agent';

export interface WhatsAppMessage {
  from: string;
  body: string;
  timestamp: number;
  messageId: string;
}

export interface WhatsAppResponse {
  to: string;
  body: string;
  attachments?: {
    type: 'location' | 'document';
    data: any;
  }[];
}

export class CommunityWolfWhatsAppBot {
  private searchAgent: SearchAgent;
  private geoAgent: GeoAgent;
  
  constructor() {
    this.searchAgent = new SearchAgent();
    this.geoAgent = new GeoAgent();
  }
  
  async processWhatsAppMessage(message: WhatsAppMessage): Promise<WhatsAppResponse> {
    console.log(`📱 WhatsApp message from ${message.from}: "${message.body}"`);
    
    // Detect if this is a safety/crime query
    const isSafetyQuery = this.detectSafetyQuery(message.body);
    
    if (!isSafetyQuery) {
      return {
        to: message.from,
        body: "Hi! I can help you with crime and safety information in your area. Try asking: 'Is Sandton safe?' or 'Any crime in Parkhurst?'"
      };
    }
    
    try {
      // Step 1: Get immediate response from SearchAgent
      const searchResponse = await this.searchAgent.processQuery(message.body);
      
      // Step 2: Send immediate response to user
      const immediateResponse: WhatsAppResponse = {
        to: message.from,
        body: `🛡️ *Safety Update*\n\n${searchResponse.answer}\n\n_Generating detailed location data..._`
      };
      
      // Step 3: Background processing with GeoAgent
      this.geoAgent.processInBackground(message.body, searchResponse.results)
        .then(async (geoResults) => {
          // Send follow-up with map and detailed data
          await this.sendFollowUpWithMap(message.from, geoResults);
        })
        .catch(console.error);
      
      return immediateResponse;
      
    } catch (error) {
      console.error('❌ WhatsApp processing error:', error);
      return {
        to: message.from,
        body: "Sorry, I encountered an error processing your safety query. Please try again."
      };
    }
  }
  
  private detectSafetyQuery(text: string): boolean {
    const safetyKeywords = [
      'crime', 'safety', 'safe', 'dangerous', 'robbery', 'theft', 'mugging',
      'hijacking', 'burglary', 'assault', 'violence', 'police', 'security',
      'incident', 'report', 'alert', 'warning'
    ];
    
    const lowerText = text.toLowerCase();
    return safetyKeywords.some(keyword => lowerText.includes(keyword));
  }
  
  private async sendFollowUpWithMap(to: string, geoResults: any): Promise<void> {
    // Generate map image or location data
    const mapData = this.generateMapData(geoResults.incidents);
    
    const followUp: WhatsAppResponse = {
      to,
      body: `📍 *Detailed Location Analysis*\n\nFound ${geoResults.incidents.length} incidents in the area:\n\n${this.formatIncidentSummary(geoResults.incidents)}`,
      attachments: [
        {
          type: 'location',
          data: mapData
        },
        {
          type: 'document', 
          data: {
            filename: 'safety-report.json',
            content: JSON.stringify(geoResults.incidents, null, 2)
          }
        }
      ]
    };
    
    // Send follow-up message (would integrate with WhatsApp Business API)
    console.log('📤 Sending follow-up:', followUp);
  }
  
  private generateMapData(incidents: any[]): any {
    if (incidents.length === 0) return null;
    
    // Calculate center point of incidents
    const avgLat = incidents.reduce((sum, inc) => sum + inc.coordinates.coordinates[1], 0) / incidents.length;
    const avgLng = incidents.reduce((sum, inc) => sum + inc.coordinates.coordinates[0], 0) / incidents.length;
    
    return {
      latitude: avgLat,
      longitude: avgLng,
      address: "Area of recent safety incidents"
    };
  }
  
  private formatIncidentSummary(incidents: any[]): string {
    if (incidents.length === 0) return "No recent incidents found.";
    
    const severityGroups = incidents.reduce((acc, inc) => {
      acc[inc.severity] = (acc[inc.severity] || 0) + 1;
      return acc;
    }, {});
    
    const typeGroups = incidents.reduce((acc, inc) => {
      acc[inc.type] = (acc[inc.type] || 0) + 1;
      return acc;
    }, {});
    
    let summary = "";
    
    // Severity breakdown
    Object.entries(severityGroups).forEach(([severity, count]) => {
      const emoji = this.getSeverityEmoji(parseInt(severity));
      summary += `${emoji} Severity ${severity}: ${count} incident${count > 1 ? 's' : ''}\n`;
    });
    
    summary += "\n*Crime Types:*\n";
    Object.entries(typeGroups).forEach(([type, count]) => {
      summary += `• ${type}: ${count}\n`;
    });
    
    return summary;
  }
  
  private getSeverityEmoji(severity: number): string {
    switch (severity) {
      case 1: return "🟢";
      case 2: return "🟡"; 
      case 3: return "🟠";
      case 4: return "🔴";
      case 5: return "🚨";
      default: return "⚪";
    }
  }
}

// Usage example for Community Wolf
export const communityWolfBot = new CommunityWolfWhatsAppBot();

// Webhook endpoint for WhatsApp Business API
export async function handleWhatsAppWebhook(req: any) {
  const message: WhatsAppMessage = {
    from: req.body.from,
    body: req.body.body,
    timestamp: Date.now(),
    messageId: req.body.id
  };
  
  const response = await communityWolfBot.processWhatsAppMessage(message);
  
  // Send response via WhatsApp Business API
  // await whatsappBusinessAPI.sendMessage(response);
  
  return response;
}
