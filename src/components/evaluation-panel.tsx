"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle, TrendingUp, MapPin, Target } from "lucide-react";

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

interface EvaluationPanelProps {
  latestResultsFilename?: string;
}

export function EvaluationPanel({ latestResultsFilename }: EvaluationPanelProps) {
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const runEvaluation = async () => {
    if (!latestResultsFilename) {
      alert("No results file available to evaluate");
      return;
    }

    setIsEvaluating(true);
    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          filename: latestResultsFilename.endsWith('.json') 
            ? latestResultsFilename 
            : `${latestResultsFilename}.json` 
        }),
      });

      if (!response.ok) {
        throw new Error("Evaluation failed");
      }

      const result = await response.json();
      setEvaluation(result);
    } catch (error) {
      console.error("Evaluation error:", error);
      alert("Failed to run evaluation");
    } finally {
      setIsEvaluating(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            GeoAgent Evaluation
          </CardTitle>
          <CardDescription>
            Assess the accuracy and quality of generated safety incident data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={runEvaluation} 
            disabled={isEvaluating || !latestResultsFilename}
            className="w-full"
          >
            {isEvaluating ? "Evaluating..." : "Run Evaluation"}
          </Button>
          {!latestResultsFilename && (
            <p className="text-sm text-gray-500 mt-2">
              Submit a search first to generate results for evaluation
            </p>
          )}
        </CardContent>
      </Card>

      {evaluation && (
        <div className="space-y-4">
          {/* Overall Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Overall Score</span>
                <Badge className={getScoreBadgeColor(evaluation.overallScore)}>
                  {evaluation.overallScore}/100
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      evaluation.overallScore >= 80 ? 'bg-green-500' :
                      evaluation.overallScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${evaluation.overallScore}%` }}
                  />
                </div>
                <span className={`font-semibold ${getScoreColor(evaluation.overallScore)}`}>
                  {evaluation.overallScore >= 80 ? 'Excellent' :
                   evaluation.overallScore >= 60 ? 'Good' : 'Needs Improvement'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Validation Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {evaluation.schemaValidation.passed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  Schema Validation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Valid Incidents:</span>
                    <Badge variant="outline">{evaluation.validIncidents}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Invalid Incidents:</span>
                    <Badge variant="outline">{evaluation.invalidIncidents}</Badge>
                  </div>
                  {evaluation.schemaValidation.errors.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-red-600">Errors:</p>
                      <ul className="text-xs text-red-500 mt-1">
                        {evaluation.schemaValidation.errors.slice(0, 3).map((error, idx) => (
                          <li key={idx}>• {error.message}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Coordinate Accuracy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>South Africa:</span>
                    <Badge variant="outline">{evaluation.coordinateValidation.southAfricaCount}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Invalid Coords:</span>
                    <Badge variant="outline">{evaluation.coordinateValidation.invalidCoordinates}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Accuracy:</span>
                    <Badge className={getScoreBadgeColor(evaluation.coordinateValidation.accuracyScore)}>
                      {evaluation.coordinateValidation.accuracyScore}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Distributions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Severity Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(evaluation.severityDistribution).map(([severity, count]) => (
                    <div key={severity} className="flex justify-between items-center">
                      <span>Level {severity}:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${(count / evaluation.totalIncidents) * 100}%` 
                            }}
                          />
                        </div>
                        <Badge variant="outline">{count}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Crime Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(evaluation.crimeTypeDistribution).map(([type, count]) => (
                    <div key={type} className="flex justify-between items-center">
                      <span className="text-sm truncate">{type}:</span>
                      <Badge variant="outline">{count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          {evaluation.recommendations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {evaluation.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
