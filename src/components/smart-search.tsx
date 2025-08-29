"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Clock, TrendingUp } from "lucide-react";

interface SmartSearchProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const QUICK_SEARCHES = [
  { text: "Crime rates in Sandton CBD", icon: TrendingUp, category: "Trending" },
  { text: "Safety incidents in Rosebank", icon: MapPin, category: "Popular" },
  { text: "Recent theft reports Johannesburg", icon: Clock, category: "Recent" },
  { text: "Break-ins in Fourways", icon: MapPin, category: "Area" },
  { text: "Hijacking incidents N1 highway", icon: TrendingUp, category: "Traffic" },
  { text: "Safety status Melville today", icon: Clock, category: "Live" }
];

const LOCATIONS = [
  "Sandton", "Rosebank", "Johannesburg CBD", "Fourways", "Randburg",
  "Melville", "Parktown", "Bryanston", "Midrand", "Centurion"
];

export function SmartSearch({ query, setQuery, onSearch, isLoading }: SmartSearchProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(QUICK_SEARCHES);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length > 2) {
      const filtered = QUICK_SEARCHES.filter(
        search => search.text.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions(QUICK_SEARCHES);
    }
  }, [query]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      onSearch();
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    setTimeout(onSearch, 100);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Ask about safety in any area... (e.g., 'Crime rates in Sandton')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="pl-10 pr-4 py-3 text-base border-2 focus:border-primary"
        />
      </div>

      {/* Quick Search Suggestions */}
      {showSuggestions && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Quick Searches</h4>
                <div className="space-y-2">
                  {filteredSuggestions.slice(0, 6).map((search, index) => (
                    <button
                      key={index}
                      onClick={() => selectSuggestion(search.text)}
                      className="w-full text-left p-2 hover:bg-muted rounded-lg transition-colors flex items-center gap-3"
                    >
                      <search.icon className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="text-sm">{search.text}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {search.category}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Popular Locations</h4>
                <div className="flex flex-wrap gap-2">
                  {LOCATIONS.slice(0, 8).map((location, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => selectSuggestion(`Safety incidents in ${location}`)}
                      className="text-xs h-7"
                    >
                      {location}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
