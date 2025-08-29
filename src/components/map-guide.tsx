"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Map, Settings, Eye, MousePointer } from "lucide-react";

export function MapGuide() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-blue-700 dark:text-blue-300 flex items-center gap-2 text-base">
          <Map className="w-5 h-5" />
          Map Features & Tips
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-fit p-0 h-auto text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
        >
          {isExpanded ? (
            <>
              Hide details <ChevronUp className="w-4 h-4 ml-1" />
            </>
          ) : (
            <>
              Learn how to use the map <ChevronDown className="w-4 h-4 ml-1" />
            </>
          )}
        </Button>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 flex-shrink-0 mt-0.5"></div>
              <div>
                <p className="text-sm font-medium text-green-700 dark:text-green-300">Low Severity (1-2)</p>
                <p className="text-xs text-muted-foreground">Minor incidents, petty crime</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-orange-500 flex-shrink-0 mt-0.5"></div>
              <div>
                <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Medium Severity (3)</p>
                <p className="text-xs text-muted-foreground">Moderate incidents, property crime</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-red-500 flex-shrink-0 mt-0.5"></div>
              <div>
                <p className="text-sm font-medium text-red-700 dark:text-red-300">High Severity (4-5)</p>
                <p className="text-xs text-muted-foreground">Serious incidents, violent crime</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-3 space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <MousePointer className="w-4 h-4" />
              How to use the map:
            </h4>
            
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-current mt-2 flex-shrink-0"></span>
                <span>Click on any colored marker to see incident details</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-current mt-2 flex-shrink-0"></span>
                <span>Map automatically zooms to show all found incidents</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-current mt-2 flex-shrink-0"></span>
                <span>Drag to pan, scroll to zoom in/out</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-current mt-2 flex-shrink-0"></span>
                <span>Search for specific areas to see localized incidents</span>
              </li>
            </ul>
          </div>

          <div className="border-t pt-3">
            <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
              <Settings className="w-4 h-4" />
              Get better maps:
            </h4>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Currently using a demo Mapbox token</p>
              <p>• For production use, get your free token at:</p>
              <p className="font-mono bg-muted px-2 py-1 rounded text-xs">
                account.mapbox.com/access-tokens
              </p>
              <p>• Add to .env.local as NEXT_PUBLIC_MAPBOX_TOKEN</p>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
