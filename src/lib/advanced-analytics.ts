// Advanced Analytics and Risk Assessment System
// This adds sophisticated analysis on top of our agent data

export interface RiskAssessment {
  overallRiskScore: number; // 0-100
  riskLevel: 'Low' | 'Medium' | 'High' | 'Extreme';
  factors: RiskFactor[];
  trends: TrendAnalysis;
  recommendations: string[];
  confidenceScore: number;
}

export interface RiskFactor {
  type: string;
  weight: number;
  description: string;
  score: number;
}

export interface TrendAnalysis {
  direction: 'increasing' | 'decreasing' | 'stable';
  changePercentage: number;
  timeframe: string;
  significantChanges: string[];
}

export class SafetyAnalyticsEngine {
  
  async assessAreaRisk(
    location: string, 
    radius: number = 5, 
    timeframeHours: number = 168 // 1 week
  ): Promise<RiskAssessment> {
    
    console.log(`📊 Analyzing risk for ${location} within ${radius}km over ${timeframeHours}h`);
    
    // Get incident data from our agents
    const incidents = await this.getIncidentsInArea(location, radius, timeframeHours);
    
    // Calculate various risk factors
    const riskFactors = [
      this.calculateViolentCrimeRisk(incidents),
      this.calculatePropertyCrimeRisk(incidents),
      this.calculateFrequencyRisk(incidents, timeframeHours),
      this.calculateSeverityRisk(incidents),
      this.calculateTimePatternRisk(incidents),
      this.calculateLocationDensityRisk(incidents, radius)
    ];
    
    // Weighted risk calculation
    const overallScore = this.calculateWeightedRisk(riskFactors);
    
    // Trend analysis
    const trends = await this.analyzeTrends(location, radius);
    
    // Generate recommendations
    const recommendations = this.generateRiskRecommendations(riskFactors, trends);
    
    return {
      overallRiskScore: overallScore,
      riskLevel: this.getRiskLevel(overallScore),
      factors: riskFactors,
      trends,
      recommendations,
      confidenceScore: this.calculateConfidenceScore(incidents.length, timeframeHours)
    };
  }
  
  private calculateViolentCrimeRisk(incidents: any[]): RiskFactor {
    const violentCrimes = incidents.filter(inc => 
      inc.type === 'Violent Crimes' || 
      inc.type === 'Sexual Offences' ||
      inc.severity >= 4
    );
    
    const violentRatio = incidents.length > 0 ? violentCrimes.length / incidents.length : 0;
    const score = Math.min(violentRatio * 100, 100);
    
    return {
      type: 'Violent Crime Risk',
      weight: 0.4, // High weight for violent crimes
      description: `${violentCrimes.length} violent incidents out of ${incidents.length} total`,
      score
    };
  }
  
  private calculatePropertyCrimeRisk(incidents: any[]): RiskFactor {
    const propertyCrimes = incidents.filter(inc => 
      inc.type === 'Property & Financial Crimes'
    );
    
    const propertyRatio = incidents.length > 0 ? propertyCrimes.length / incidents.length : 0;
    const score = Math.min(propertyRatio * 80, 100); // Slightly lower max than violent
    
    return {
      type: 'Property Crime Risk',
      weight: 0.25,
      description: `${propertyCrimes.length} property crimes detected`,
      score
    };
  }
  
  private calculateFrequencyRisk(incidents: any[], timeframeHours: number): RiskFactor {
    const incidentsPerDay = (incidents.length / timeframeHours) * 24;
    const score = Math.min(incidentsPerDay * 20, 100); // 5+ incidents/day = max risk
    
    return {
      type: 'Incident Frequency',
      weight: 0.2,
      description: `${incidentsPerDay.toFixed(1)} incidents per day`,
      score
    };
  }
  
  private calculateSeverityRisk(incidents: any[]): RiskFactor {
    if (incidents.length === 0) {
      return { type: 'Severity Risk', weight: 0.1, description: 'No incidents to analyze', score: 0 };
    }
    
    const avgSeverity = incidents.reduce((sum, inc) => sum + (inc.severity || 1), 0) / incidents.length;
    const score = (avgSeverity / 5) * 100;
    
    return {
      type: 'Average Severity',
      weight: 0.1,
      description: `Average severity: ${avgSeverity.toFixed(1)}/5`,
      score
    };
  }
  
  private calculateTimePatternRisk(incidents: any[]): RiskFactor {
    // Analyze if crimes are happening at dangerous times (night, weekends)
    const dangerousTimeIncidents = incidents.filter(inc => {
      const hour = new Date(inc.datetime).getHours();
      const dayOfWeek = new Date(inc.datetime).getDay();
      
      // Night hours (10PM - 6AM) or weekend nights
      return (hour >= 22 || hour <= 6) || (dayOfWeek === 0 || dayOfWeek === 6);
    });
    
    const ratio = incidents.length > 0 ? dangerousTimeIncidents.length / incidents.length : 0;
    const score = ratio * 60; // Lower impact factor
    
    return {
      type: 'Time Pattern Risk',
      weight: 0.05,
      description: `${(ratio * 100).toFixed(0)}% of incidents during high-risk times`,
      score
    };
  }
  
  private calculateLocationDensityRisk(incidents: any[], radius: number): RiskFactor {
    // Calculate incidents per square km
    const area = Math.PI * radius * radius; // Area in km²
    const density = incidents.length / area;
    const score = Math.min(density * 10, 100); // 10+ incidents/km² = max risk
    
    return {
      type: 'Location Density',
      weight: 0.05,
      description: `${density.toFixed(2)} incidents per km²`,
      score
    };
  }
  
  private calculateWeightedRisk(factors: RiskFactor[]): number {
    const weightedSum = factors.reduce((sum, factor) => sum + (factor.score * factor.weight), 0);
    const totalWeight = factors.reduce((sum, factor) => sum + factor.weight, 0);
    return Math.round(weightedSum / totalWeight);
  }
  
  private getRiskLevel(score: number): 'Low' | 'Medium' | 'High' | 'Extreme' {
    if (score <= 25) return 'Low';
    if (score <= 50) return 'Medium';
    if (score <= 75) return 'High';
    return 'Extreme';
  }
  
  private async analyzeTrends(location: string, radius: number): Promise<TrendAnalysis> {
    // Compare current week vs previous week
    const currentWeek = await this.getIncidentsInArea(location, radius, 168); // Current week
    const previousWeek = await this.getIncidentsInArea(location, radius, 168, 168); // Previous week
    
    const changePercentage = previousWeek.length > 0 
      ? ((currentWeek.length - previousWeek.length) / previousWeek.length) * 100
      : 0;
    
    let direction: 'increasing' | 'decreasing' | 'stable' = 'stable';
    if (Math.abs(changePercentage) > 20) {
      direction = changePercentage > 0 ? 'increasing' : 'decreasing';
    }
    
    return {
      direction,
      changePercentage: Math.round(changePercentage),
      timeframe: 'week-over-week',
      significantChanges: this.identifySignificantChanges(currentWeek, previousWeek)
    };
  }
  
  private identifySignificantChanges(current: any[], previous: any[]): string[] {
    const changes = [];
    
    // Check for new crime types
    const currentTypes = new Set(current.map(inc => inc.type));
    const previousTypes = new Set(previous.map(inc => inc.type));
    
    for (const type of currentTypes) {
      if (!previousTypes.has(type)) {
        changes.push(`New crime type detected: ${type}`);
      }
    }
    
    // Check for severity increases
    const currentAvgSeverity = current.reduce((sum, inc) => sum + inc.severity, 0) / current.length;
    const previousAvgSeverity = previous.reduce((sum, inc) => sum + inc.severity, 0) / previous.length;
    
    if (currentAvgSeverity > previousAvgSeverity + 0.5) {
      changes.push(`Incident severity increased by ${(currentAvgSeverity - previousAvgSeverity).toFixed(1)}`);
    }
    
    return changes;
  }
  
  private generateRiskRecommendations(factors: RiskFactor[], trends: TrendAnalysis): string[] {
    const recommendations = [];
    
    // Based on risk factors
    const highRiskFactors = factors.filter(f => f.score > 60);
    
    if (highRiskFactors.some(f => f.type === 'Violent Crime Risk')) {
      recommendations.push('⚠️ High violent crime risk - avoid area during late hours');
      recommendations.push('👥 Travel in groups when possible');
      recommendations.push('📱 Share location with trusted contacts');
    }
    
    if (highRiskFactors.some(f => f.type === 'Property Crime Risk')) {
      recommendations.push('🚗 Secure vehicles and avoid displaying valuables');
      recommendations.push('🏠 Use additional security measures for properties');
    }
    
    if (highRiskFactors.some(f => f.type === 'Incident Frequency')) {
      recommendations.push('📊 Monitor area regularly for updates');
      recommendations.push('🚨 Consider alternative routes/locations');
    }
    
    // Based on trends
    if (trends.direction === 'increasing') {
      recommendations.push(`📈 Crime increasing by ${trends.changePercentage}% - heightened caution advised`);
    }
    
    if (trends.significantChanges.length > 0) {
      recommendations.push('🆕 New crime patterns detected - stay updated on latest developments');
    }
    
    return recommendations;
  }
  
  private calculateConfidenceScore(incidentCount: number, timeframe: number): number {
    // Higher confidence with more data points and longer timeframes
    const dataScore = Math.min(incidentCount * 5, 70); // Max 70% from data volume
    const timeScore = Math.min(timeframe / 168 * 30, 30); // Max 30% from timeframe (week = full score)
    
    return Math.round(dataScore + timeScore);
  }
  
  private async getIncidentsInArea(
    location: string, 
    radius: number, 
    timeframeHours: number,
    offsetHours: number = 0
  ): Promise<any[]> {
    // This would integrate with our existing agents/storage
    // For now, return mock data based on our localStorage
    const allIncidents = JSON.parse(localStorage.getItem('local_safety_reports') || '[]');
    
    const cutoffTime = new Date(Date.now() - (timeframeHours + offsetHours) * 60 * 60 * 1000);
    const startTime = new Date(Date.now() - offsetHours * 60 * 60 * 1000);
    
    return allIncidents.filter((incident: any) => {
      const incidentTime = new Date(incident.datetime);
      return incidentTime >= cutoffTime && incidentTime <= startTime;
    });
  }
}

// Usage example
export const analyticsEngine = new SafetyAnalyticsEngine();
