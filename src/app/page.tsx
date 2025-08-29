'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Download, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SafetyMap } from '@/components/safety-map';

interface Incident {
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
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [emergencyAlert, setEmergencyAlert] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadFilename, setDownloadFilename] = useState<string | null>(null);

  // Emergency keyword detection
  useEffect(() => {
    if (query.toLowerCase().includes('help') || 
        query.toLowerCase().includes('emergency') ||
        query.toLowerCase().includes('sos') ||
        query.toLowerCase().includes('urgent') ||
        query.toLowerCase().includes('suicide') ||
        query.toLowerCase().includes('crisis')) {
      
      const emergencyResponse = `⚠️ EMERGENCY PROTOCOL ACTIVATED

If this is a life-threatening emergency, please contact:
• Police: 10111
• Emergency Services: 112
• Crisis Helpline: 0800 567 567

For mental health support:
• SADAG: 0800 70 80 90
• Lifeline: 0861 322 322

Your safety is our priority. Professional help is available 24/7.`;
      
      setEmergencyAlert(emergencyResponse);
    }
  }, [query]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setAnswer('');
    setIncidents([]);
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      
      const data = await response.json();
      
      if (data.answer) {
        setAnswer(data.answer);
      }
      
      if (data.incidents) {
        setIncidents(data.incidents);
      }
      
      if (data.downloadUrl && data.filename) {
        setDownloadUrl(data.downloadUrl);
        setDownloadFilename(data.filename);
      }
      
    } catch (error) {
      console.error('Search error:', error);
      setAnswer('Sorry, there was an error processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-light tracking-wide">Local Safety Intelligence</h1>
          <p className="text-gray-600 mt-1">Real-time crime data and safety insights</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Emergency Alert */}
        {emergencyAlert && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-red-900 mb-2">Emergency Resources</h3>
                <pre className="text-sm text-red-800 whitespace-pre-wrap font-sans">
                  {emergencyAlert}
                </pre>
                <div className="flex gap-3 mt-4">
                  <Button
                    onClick={() => setEmergencyAlert(null)}
                    variant="outline"
                    size="sm"
                    className="border-red-300 text-red-700 hover:bg-red-50"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search Panel */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Safety Data
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., crime in sandton"
                    className="bg-white border-gray-300"
                    disabled={isLoading}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Quick searches:</p>
                  <div className="grid gap-2">
                    {[
                      "crime sandton",
                      "safety rosebank", 
                      "incidents johannesburg",
                      "help emergency"
                    ].map((cmd) => (
                      <button
                        key={cmd}
                        onClick={() => setQuery(cmd)}
                        className="text-left text-sm bg-white border border-gray-200 px-3 py-2 rounded hover:bg-gray-50 transition-colors"
                      >
                        {cmd}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleSearch}
                  disabled={isLoading || !query.trim()}
                  className="w-full bg-black text-white hover:bg-gray-800"
                >
                  {isLoading ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </div>

            {/* Status */}
            <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium mb-3">System Status</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Search Agent</span>
                  <span className="text-green-600">Online</span>
                </div>
                <div className="flex justify-between">
                  <span>Geo Agent</span>
                  <span className="text-green-600">Ready</span>
                </div>
                {incidents.length > 0 && (
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span>Incidents Found</span>
                    <span className="text-blue-600">{incidents.length}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Analysis Results */}
            {answer && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="font-medium mb-4">Analysis Results</h3>
                {isLoading ? (
                  <div className="text-gray-600">Processing your request...</div>
                ) : (
                  <div className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {answer}
                  </div>
                )}
              </div>
            )}

            {/* Map */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location Map
                </h3>
                {incidents.length > 0 && (
                  <span className="text-sm text-gray-600">{incidents.length} locations</span>
                )}
              </div>
              <SafetyMap incidents={incidents} />
            </div>

            {/* Download */}
            {downloadUrl && downloadFilename && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Data export ready</span>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                  >
                    <a href={downloadUrl} download={downloadFilename}>
                      <Download className="h-4 w-4 mr-2" />
                      Download JSON
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
