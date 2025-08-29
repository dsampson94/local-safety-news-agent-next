"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle, Shield, Clock, Users } from "lucide-react";

interface StatsData {
  totalIncidents: number;
  activeAlerts: number;
  responseTime: string;
  safetyScore: number;
  trend: "up" | "down";
  lastUpdated: string;
}

export function LiveStatsBar() {
  const [stats, setStats] = useState<StatsData>({
    totalIncidents: 247,
    activeAlerts: 12,
    responseTime: "3.2min",
    safetyScore: 87,
    trend: "down",
    lastUpdated: new Date().toLocaleTimeString()
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalIncidents: prev.totalIncidents + Math.floor(Math.random() * 3),
        activeAlerts: Math.max(0, prev.activeAlerts + (Math.random() > 0.7 ? 1 : -1)),
        safetyScore: Math.max(70, Math.min(95, prev.safetyScore + (Math.random() - 0.5) * 4)),
        lastUpdated: new Date().toLocaleTimeString()
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card className="relative overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-500" />
            Total Incidents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalIncidents}</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            {stats.trend === "up" ? (
              <TrendingUp className="h-3 w-3 text-red-500" />
            ) : (
              <TrendingDown className="h-3 w-3 text-green-500" />
            )}
            <span>Last 24h</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            Active Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeAlerts}</div>
          <Badge variant={stats.activeAlerts > 15 ? "destructive" : "secondary"} className="text-xs">
            {stats.activeAlerts > 15 ? "High" : "Normal"}
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4 text-green-500" />
            Response Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.responseTime}</div>
          <div className="text-xs text-muted-foreground">Avg today</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Users className="h-4 w-4 text-purple-500" />
            Safety Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.safetyScore}%</div>
          <div className="w-full bg-muted rounded-full h-2 mt-1">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${stats.safetyScore}%` }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
