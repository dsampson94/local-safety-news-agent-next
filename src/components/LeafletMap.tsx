import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { SafetyIncident } from '@/lib/schema';

interface LeafletMapProps {
  incidents: SafetyIncident[];
}

export default function LeafletMap({ incidents }: LeafletMapProps) {
  const center: [number, number] = [-26.1076, 28.0567]; // Johannesburg
  
  console.log('🗺️ LeafletMap rendering with', incidents.length, 'incidents');
  
  // Log first few incidents to debug coordinates
  incidents.slice(0, 3).forEach((incident, idx) => {
    const [lng, lat] = incident.coordinates.coordinates;
    console.log(`📍 Debug Pin ${idx + 1}: ${incident.newsID} at [lng:${lng}, lat:${lat}] -> [${lat}, ${lng}]`);
  });

  return (
    <MapContainer 
      center={center} 
      zoom={12} 
      style={{ height: "100%", width: "100%" }} 
      scrollWheelZoom={true}
    >
      <TileLayer 
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {incidents.map((incident, idx) => {
        const [lng, lat] = incident.coordinates.coordinates;
        const position: [number, number] = [lat, lng];
        
        // Get color based on severity
        const getSeverityColor = (severity: number) => {
          if (severity >= 4) return '#ef4444'; // red for high severity
          if (severity >= 3) return '#f97316'; // orange for medium severity
          return '#22c55e'; // green for low severity
        };
        
        console.log(`🗺️ Rendering incident ${idx + 1}: ${incident.newsID} at [${lat}, ${lng}] - ${incident.type}`);
        
        return (
          <CircleMarker 
            key={`incident-${incident.newsID}-${idx}`} 
            center={position}
            radius={12}
            fillColor={getSeverityColor(incident.severity)}
            color="#ffffff"
            weight={2}
            opacity={1}
            fillOpacity={0.8}
          >
            <Popup maxWidth={300}>
              <div className="p-2">
                <div className="font-semibold text-gray-900 mb-1">{incident.type}</div>
                <div className="text-sm text-gray-600 mb-2">
                  Severity: {incident.severity}/5 • {new Date(incident.datetime).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-800 mb-2">{incident.summary}</div>
                <div className="text-xs text-gray-500 mb-1">
                  Location: [{lat.toFixed(4)}, {lng.toFixed(4)}]
                </div>
                <div className="text-xs text-gray-500">
                  ID: {incident.newsID}
                </div>
                {incident.keywords.length > 0 && (
                  <div className="text-xs text-gray-500 mt-2">
                    Keywords: {incident.keywords.join(", ")}
                  </div>
                )}
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
