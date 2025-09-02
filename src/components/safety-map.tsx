"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { SafetyIncident } from '@/lib/schema';

interface SafetyMapProps {
  incidents: SafetyIncident[];
}

// Dynamic import to avoid SSR issues with Leaflet
const DynamicMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="text-center text-black">Loading map...</div>
    </div>
  )
});

export function SafetyMap({ incidents }: SafetyMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center text-black">Loading map...</div>
      </div>
    );
  }

  if (incidents.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center text-black">
          <div className="mb-2">🗺️ Map ready</div>
          <div className="text-sm text-gray-600">Search for incidents to view locations</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <DynamicMap incidents={incidents} />
    </div>
  );
}
