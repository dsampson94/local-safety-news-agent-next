"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SafetyMap } from "@/components/safety-map";
import { EvaluationPanel } from "@/components/evaluation-panel";
import { Search, Download, MapPin } from "lucide-react";

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

interface SafetyIncident {
  datetime: string;
  coordinates: {
    type: "Point";
    coordinates: [number, number];
  };
  type: string;
  newsID: string;
  severity: number;
  keywords: string[];
  summary: string;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [incidents, setIncidents] = useState<SafetyIncident[]>([]);
  const [latestResultsUrl, setLatestResultsUrl] = useState("");
  const [latestResultsFilename, setLatestResultsFilename] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setAnswer("");
    setSearchResults([]);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();
      setAnswer(data.answer);
      setSearchResults(data.results || []);

      // Poll for the geo results
      pollForGeoResults();
    } catch (error) {
      console.error("Search error:", error);
      setAnswer("Sorry, there was an error processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  const pollForGeoResults = async () => {
    // Poll every 2 seconds for up to 30 seconds
    let attempts = 0;
    const maxAttempts = 15;

    const poll = async () => {
      if (attempts >= maxAttempts) return;
      
      try {
        const response = await fetch("/api/results/latest");
        if (response.ok) {
          const data = await response.json();
          if (data.incidents && data.incidents.length > 0) {
            setIncidents(data.incidents);
            setLatestResultsUrl(`/api/results/latest`);
            setLatestResultsFilename(data.timestamp);
            return;
          }
        }
      } catch (error) {
        console.error("Error polling for results:", error);
      }

      attempts++;
      setTimeout(poll, 2000);
    };

    poll();
  };

  const downloadLatestResults = async () => {
    if (!latestResultsUrl) return;
    
    try {
      const response = await fetch(latestResultsUrl);
      const data = await response.json();
      const blob = new Blob([JSON.stringify(data.incidents, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `safety-incidents-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Local Safety News
          </h1>
          <p className="text-lg text-gray-600">
            Get real-time crime and public safety information for any location
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Search Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Search Safety News
                </CardTitle>
                <CardDescription>
                  Ask about crime or public safety news in any location
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Any crime or public safety news in Parkhurst, Johannesburg?"
                  value={query}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                  onKeyPress={(e: React.KeyboardEvent) => e.key === "Enter" && handleSearch()}
                />
                <Button 
                  onClick={handleSearch} 
                  disabled={isLoading || !query.trim()}
                  className="w-full"
                >
                  {isLoading ? "Searching..." : "Search"}
                </Button>
              </CardContent>
            </Card>

            {/* Answer Section */}
            {answer && (
              <Card>
                <CardHeader>
                  <CardTitle>Safety Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={answer}
                    readOnly
                    className="min-h-[120px] resize-none"
                  />
                </CardContent>
              </Card>
            )}

            {/* Search Results */}
            {searchResults.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Related News Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {searchResults.map((result: SearchResult, index: number) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-semibold text-sm">
                          <a 
                            href={result.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {result.title}
                          </a>
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {result.snippet}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Download Results */}
            {latestResultsUrl && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Download Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button onClick={downloadLatestResults} variant="outline" className="w-full">
                    Download Latest Results JSON
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Map Section */}
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Safety Incident Map
                </CardTitle>
                <CardDescription>
                  {incidents.length > 0 
                    ? `Showing ${incidents.length} incidents`
                    : "No incidents to display yet"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[500px] p-0">
                <SafetyMap incidents={incidents} />
              </CardContent>
            </Card>
          </div>

          {/* Evaluation Panel */}
          <div className="lg:col-span-1">
            <EvaluationPanel latestResultsFilename={latestResultsFilename} />
          </div>
        </div>
      </div>
    </div>
  );
}
