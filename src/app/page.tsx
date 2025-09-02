'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SafetyMap } from '@/components/safety-map';
import { SafetyIncident } from '@/lib/schema';

const QUICK_SEARCHES = [
  "crime in sandton",
  "safety in rosebank",
  "hijacking johannesburg",
  "burglary pretoria",
  "robbery cape town",
  "assault durban",
  "theft centurion",
  "safety in melville",
  "crime in fourways",
  "security bryanston"
];

export default function Home() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [incidents, setIncidents] = useState<SafetyIncident[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setAnswer('');
    setIncidents([]);
    setShowDropdown(false);
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      
      const data = await response.json();
      
      if (data.answer) setAnswer(data.answer);
      if (data.incidents) {
        console.log('🔍 Search API returned', data.incidents.length, 'incidents');
        console.log('📊 Incidents data:', data.incidents);
        setIncidents(data.incidents);
      }
      
    } catch (error) {
      console.error('Search error:', error);
      setAnswer('Error processing request.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    setShowDropdown(false);
    // Auto-execute the search
    setTimeout(() => {
      handleSearch();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Header with Search */}
      <div className="border-b bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CI</span>
              </div>
              <h1 className="text-xl font-semibold text-black">Crime Intelligence</h1>
            </div>
            
            {/* Enhanced Search with Dropdown */}
            <div className="flex-1 max-w-3xl relative" ref={dropdownRef}>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search crime data... (e.g., 'crime in sandton', 'safety rosebank')"
                    className="pl-10 pr-10 border-gray-300 h-11 bg-white text-black placeholder:text-gray-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    onFocus={() => setShowDropdown(true)}
                  />
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
                <Button
                  onClick={handleSearch}
                  disabled={isLoading || !query.trim()}
                  className="bg-black text-white hover:bg-gray-800 px-8 h-11 disabled:bg-gray-400 disabled:text-white"
                >
                  {isLoading ? 'Searching...' : 'Search'}
                </Button>
              </div>

              {/* Quick Search Dropdown - Higher z-index */}
              {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                  <div className="p-3 border-b border-gray-100">
                    <h3 className="text-sm font-medium text-black">Quick Searches</h3>
                  </div>
                  <div className="py-1">
                    {QUICK_SEARCHES.map((searchTerm, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickSearch(searchTerm)}
                        className="w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-50 flex items-center gap-3"
                      >
                        <Search className="h-3 w-3 text-gray-400" />
                        {searchTerm}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
          
          {/* Left Panel - Analysis Results */}
          <div className="flex flex-col">
            <h2 className="text-lg font-medium mb-4 text-black">Analysis Results</h2>
            <div className="flex-1 bg-gray-50 rounded-lg p-6 overflow-y-auto">
              {answer ? (
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-black font-sans leading-relaxed">
                    {answer}
                  </pre>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-black">
                  <div className="text-center">
                    <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-black">Enter a search query to view crime analysis</p>
                    <p className="text-sm mt-2 text-gray-600">Try: "crime sandton" or "safety rosebank"</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Map */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-black">Location Map</h2>
              {incidents.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-black font-medium">{incidents.length} incidents</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-xs text-gray-600">High</span>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span className="text-xs text-gray-600">Med</span>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs text-gray-600">Low</span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden z-0">
              <SafetyMap incidents={incidents} />
            </div>
            
            {/* Debug: Show incident data below map */}
            {incidents.length > 0 && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg text-xs">
                <h3 className="font-semibold mb-2 text-black">📊 Incident Data ({incidents.length} total):</h3>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {incidents.slice(0, 5).map((incident, idx) => {
                    const [lng, lat] = incident.coordinates.coordinates;
                    return (
                      <div key={idx} className="text-gray-700">
                        <span className="font-mono">Pin {idx + 1}:</span> {incident.newsID} - 
                        <span className="text-blue-600"> [{lat.toFixed(4)}, {lng.toFixed(4)}]</span> - 
                        Sev.{incident.severity} - {incident.type}
                      </div>
                    );
                  })}
                  {incidents.length > 5 && (
                    <div className="text-gray-500">... and {incidents.length - 5} more incidents</div>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
