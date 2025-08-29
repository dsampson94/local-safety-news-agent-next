import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { validateSafetyIncidentsSafe } from "@/lib/schema";

interface EvaluationResult {
  filename: string;
  totalIncidents: number;
  validIncidents: number;
  invalidIncidents: number;
  schemaValidation: {
    passed: boolean;
    errors: any[];
  };
  coordinateValidation: {
    southAfricaCount: number;
    invalidCoordinates: number;
    accuracyScore: number;
  };
  severityDistribution: Record<number, number>;
  crimeTypeDistribution: Record<string, number>;
  overallScore: number;
  recommendations: string[];
}

export async function POST(request: NextRequest) {
  try {
    const { filename } = await request.json();
    
    if (!filename) {
      return NextResponse.json(
        { error: "Filename is required" },
        { status: 400 }
      );
    }

    // Read the results file
    const dataDir = path.join(process.cwd(), 'data', 'results');
    const filePath = path.join(dataDir, filename);
    
    let fileContent: string;
    try {
      fileContent = await fs.readFile(filePath, 'utf-8');
    } catch (error) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }

    let incidents: any[];
    try {
      incidents = JSON.parse(fileContent);
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid JSON file" },
        { status: 400 }
      );
    }

    // Perform evaluation
    const evaluation = await evaluateIncidents(incidents, filename);
    
    return NextResponse.json(evaluation);

  } catch (error) {
    console.error("Evaluation error:", error);
    return NextResponse.json(
      { error: "Failed to evaluate incidents" },
      { status: 500 }
    );
  }
}

async function evaluateIncidents(incidents: any[], filename: string): Promise<EvaluationResult> {
  // Schema validation
  const schemaValidation = validateSafetyIncidentsSafe(incidents);
  
  // Coordinate validation (South Africa bounds)
  const coordinateValidation = validateCoordinates(incidents);
  
  // Severity distribution analysis
  const severityDistribution = analyzeSeverityDistribution(incidents);
  
  // Crime type distribution
  const crimeTypeDistribution = analyzeCrimeTypeDistribution(incidents);
  
  // Calculate overall score
  const overallScore = calculateOverallScore(
    schemaValidation,
    coordinateValidation,
    incidents.length
  );
  
  // Generate recommendations
  const recommendations = generateRecommendations(
    schemaValidation,
    coordinateValidation,
    severityDistribution,
    crimeTypeDistribution
  );

  return {
    filename,
    totalIncidents: incidents.length,
    validIncidents: schemaValidation.success ? incidents.length : 0,
    invalidIncidents: schemaValidation.success ? 0 : incidents.length,
    schemaValidation: {
      passed: schemaValidation.success,
      errors: schemaValidation.errors || []
    },
    coordinateValidation,
    severityDistribution,
    crimeTypeDistribution,
    overallScore,
    recommendations
  };
}

function validateCoordinates(incidents: any[]) {
  // South Africa approximate bounds
  const southAfricaBounds = {
    minLng: 16.0,
    maxLng: 33.0,
    minLat: -35.0,
    maxLat: -22.0
  };

  let southAfricaCount = 0;
  let invalidCoordinates = 0;

  incidents.forEach(incident => {
    if (incident.coordinates && incident.coordinates.coordinates) {
      const [lng, lat] = incident.coordinates.coordinates;
      
      if (typeof lng !== 'number' || typeof lat !== 'number') {
        invalidCoordinates++;
        return;
      }

      if (lng >= southAfricaBounds.minLng && lng <= southAfricaBounds.maxLng &&
          lat >= southAfricaBounds.minLat && lat <= southAfricaBounds.maxLat) {
        southAfricaCount++;
      }
    } else {
      invalidCoordinates++;
    }
  });

  const accuracyScore = incidents.length > 0 
    ? (southAfricaCount / (incidents.length - invalidCoordinates)) * 100 
    : 0;

  return {
    southAfricaCount,
    invalidCoordinates,
    accuracyScore: Math.round(accuracyScore)
  };
}

function analyzeSeverityDistribution(incidents: any[]) {
  const distribution: Record<number, number> = {};
  
  incidents.forEach(incident => {
    const severity = incident.severity;
    if (typeof severity === 'number' && severity >= 1 && severity <= 5) {
      distribution[severity] = (distribution[severity] || 0) + 1;
    }
  });

  return distribution;
}

function analyzeCrimeTypeDistribution(incidents: any[]) {
  const distribution: Record<string, number> = {};
  
  incidents.forEach(incident => {
    const type = incident.type;
    if (typeof type === 'string') {
      distribution[type] = (distribution[type] || 0) + 1;
    }
  });

  return distribution;
}

function calculateOverallScore(
  schemaValidation: any,
  coordinateValidation: any,
  totalIncidents: number
): number {
  let score = 0;

  // Schema validation (40% weight)
  if (schemaValidation.success) {
    score += 40;
  }

  // Coordinate accuracy (30% weight)
  score += (coordinateValidation.accuracyScore / 100) * 30;

  // Data completeness (20% weight)
  if (totalIncidents > 0) {
    score += 20;
  }

  // Data quality (10% weight)
  if (coordinateValidation.invalidCoordinates === 0) {
    score += 10;
  } else {
    const validRatio = (totalIncidents - coordinateValidation.invalidCoordinates) / totalIncidents;
    score += validRatio * 10;
  }

  return Math.round(score);
}

function generateRecommendations(
  schemaValidation: any,
  coordinateValidation: any,
  severityDistribution: any,
  crimeTypeDistribution: any
): string[] {
  const recommendations: string[] = [];

  if (!schemaValidation.success) {
    recommendations.push("Fix schema validation errors to ensure data structure compliance");
  }

  if (coordinateValidation.accuracyScore < 80) {
    recommendations.push("Improve coordinate accuracy - many incidents appear outside South Africa");
  }

  if (coordinateValidation.invalidCoordinates > 0) {
    recommendations.push("Ensure all incidents have valid coordinate data");
  }

  // Check severity distribution
  const severityValues = Object.keys(severityDistribution).map(Number);
  if (severityValues.length === 1) {
    recommendations.push("Consider more varied severity scoring for realistic incident assessment");
  }

  // Check crime type diversity
  const crimeTypes = Object.keys(crimeTypeDistribution);
  if (crimeTypes.length === 1) {
    recommendations.push("Diversify crime type classification for more comprehensive coverage");
  }

  if (coordinateValidation.accuracyScore >= 90 && schemaValidation.success) {
    recommendations.push("Excellent data quality! Consider expanding to more detailed incident information");
  }

  return recommendations;
}
