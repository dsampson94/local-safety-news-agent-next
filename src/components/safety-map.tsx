"use client";

import { useEffect, useState } from "react";

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

interface SafetyMapProps {
  incidents: SafetyIncident[];
}

const SEVERITY_COLORS = {
  1: "#22c55e", // green
  2: "#eab308", // yellow
  3: "#f97316", // orange
  4: "#ef4444", // red
  5: "#991b1b", // dark red
};

export function SafetyMap({ incidents }: SafetyMapProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("🗺️ SafetyMap: Received", incidents.length, "incidents");
    setIsLoading(false);
  }, [incidents]);

  // Simple fallback map visualization
  const FallbackMap = () => (
    <div className="w-full h-[400px] bg-slate-100 dark:bg-slate-800 rounded-lg border relative overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-800 dark:to-slate-700">
        {/* Johannesburg area representation */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gray-200 dark:bg-gray-600 rounded-full opacity-30"></div>
        <div className="absolute top-8 left-8 text-sm font-medium text-gray-600 dark:text-gray-300">
          Johannesburg Metro Area
        </div>
      </div>

      {/* Incident Markers */}
      {incidents.map((incident, index) => {
        const [lng, lat] = incident.coordinates.coordinates;
        // Convert coordinates to pixel position (simplified for Johannesburg area)
        const x = ((lng - 27.8) / (28.4 - 27.8)) * 100; // Rough Johannesburg bounds
        const y = ((-lat + 25.7) / (-26.4 + 25.7)) * 100;
        
        return (
          <div
            key={incident.newsID || index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
            style={{
              left: `${Math.max(5, Math.min(95, x))}%`,
              top: `${Math.max(5, Math.min(95, y))}%`,
            }}
          >
            {/* Marker */}
            <div
              className="w-4 h-4 rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform animate-pulse"
              style={{
                backgroundColor: SEVERITY_COLORS[incident.severity as keyof typeof SEVERITY_COLORS] || SEVERITY_COLORS[3]
              }}
            ></div>
            
            {/* Tooltip */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded p-2 whitespace-nowrap z-20 pointer-events-none min-w-48">
              <div className="font-semibold">{incident.type}</div>
              <div>Severity: {incident.severity}/5</div>
              <div className="text-xs text-gray-300">{new Date(incident.datetime).toLocaleDateString()}</div>
              <div className="truncate max-w-48 mt-1">{incident.summary}</div>
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg">
        <div className="text-xs font-semibold mb-2">Incident Severity</div>
        {Object.entries(SEVERITY_COLORS).map(([severity, color]) => (
          <div key={severity} className="flex items-center gap-2 text-xs mb-1">
            <div
              className="w-3 h-3 rounded-full border border-white shadow"
              style={{ backgroundColor: color }}
            ></div>
            <span>Level {severity}</span>
          </div>
        ))}
      </div>

      {/* Map Info */}
      <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-lg shadow text-xs">
        <div className="font-semibold">Crime Data Map</div>
        <div className="text-green-600 dark:text-green-400">
          {incidents.length} incidents plotted
        </div>
        <div className="text-gray-500 text-xs mt-1">
          GeoAgent processed ✓
        </div>
      </div>

      {/* Show GeoAgent success when incidents are present */}
      {incidents.length > 0 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-bounce">
          🌍 GeoAgent: {incidents.length} locations mapped
        </div>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-muted rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <FallbackMap />
      {incidents.length === 0 && (
        <div className="text-center text-sm text-muted-foreground py-8 bg-muted/50 rounded-lg">
          <div className="mb-2">🗺️ Map ready for incident data</div>
          <div>Try searching: "crime in sandton" to see GeoAgent in action</div>
        </div>
      )}
    </div>
  );
}
