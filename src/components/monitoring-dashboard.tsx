"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Shield, 
  Activity,
  Users,
  MapPin,
  Clock
} from 'lucide-react';

interface LiveStats {
  totalIncidents: number;
  last24Hours: number;
  avgSeverity: number;
  activeAlerts: number;
  coverageArea: number;
  responseTime: number;
}

interface Alert {
  id: string;
  type: 'HIGH_RISK' | 'NEW_PATTERN' | 'CLUSTER' | 'SYSTEM';
  message: string;
  location: string;
  severity: 1 | 2 | 3 | 4 | 5;
  timestamp: string;
  acknowledged: boolean;
}

interface AreaHotspot {
  name: string;
  coordinates: [number, number];
  riskScore: number;
  incidentCount: number;
  primaryCrimeType: string;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
}

export function MonitoringDashboard() {
  const [liveStats, setLiveStats] = useState<LiveStats>({
    totalIncidents: 0,
    last24Hours: 0,
    avgSeverity: 0,
    activeAlerts: 0,
    coverageArea: 0,
    responseTime: 0
  });
  
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [hotspots, setHotspots] = useState<AreaHotspot[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  
  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(updateLiveData, 5000); // Update every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isMonitoring]);
  
  const updateLiveData = async () => {
    try {
      // Simulate real-time data updates
      const stats = await fetchLiveStats();
      const newAlerts = await fetchActiveAlerts();
      const areaHotspots = await fetchHotspots();
      
      setLiveStats(stats);
      setAlerts(newAlerts);
      setHotspots(areaHotspots);
      
      console.log('📊 Live data updated:', new Date().toLocaleTimeString());
    } catch (error) {
      console.error('❌ Failed to update live data:', error);
    }
  };
  
  const startMonitoring = () => {
    setIsMonitoring(true);
    updateLiveData();
  };
  
  const stopMonitoring = () => {
    setIsMonitoring(false);
  };
  
  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };
  
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'HIGH_RISK': return '🚨';
      case 'NEW_PATTERN': return '🔍';
      case 'CLUSTER': return '📍';
      case 'SYSTEM': return '⚙️';
    }
  };
  
  const getSeverityColor = (severity: number) => {
    if (severity <= 2) return 'bg-green-100 text-green-800';
    if (severity <= 3) return 'bg-yellow-100 text-yellow-800';
    if (severity <= 4) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };
  
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-green-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Real-Time Safety Monitoring</h2>
          <p className="text-gray-600">Live crime and safety incident tracking for Johannesburg</p>
        </div>
        <div className="flex gap-2">
          {isMonitoring ? (
            <Button onClick={stopMonitoring} variant="destructive">
              Stop Monitoring
            </Button>
          ) : (
            <Button onClick={startMonitoring}>
              Start Live Monitoring
            </Button>
          )}
        </div>
      </div>
      
      {/* Live Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Total Incidents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{liveStats.totalIncidents.toLocaleString()}</div>
            <p className="text-xs text-gray-600">All time</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Last 24h
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{liveStats.last24Hours}</div>
            <p className="text-xs text-gray-600">Recent activity</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Avg Severity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{liveStats.avgSeverity.toFixed(1)}</div>
            <p className="text-xs text-gray-600">Out of 5.0</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{liveStats.activeAlerts}</div>
            <p className="text-xs text-gray-600">Needs attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Coverage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{liveStats.coverageArea} km²</div>
            <p className="text-xs text-gray-600">Monitored area</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{liveStats.responseTime}s</div>
            <p className="text-xs text-gray-600">Avg agent response</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Active Alerts ({alerts.filter(a => !a.acknowledged).length})
          </CardTitle>
          <CardDescription>
            Real-time safety alerts requiring attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.filter(a => !a.acknowledged).length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Shield className="h-12 w-12 mx-auto mb-2 text-green-500" />
                <p>No active alerts - all systems normal</p>
              </div>
            ) : (
              alerts.filter(a => !a.acknowledged).map(alert => (
                <Alert key={alert.id} className={getSeverityColor(alert.severity)}>
                  <AlertDescription className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{getAlertIcon(alert.type)}</span>
                      <div>
                        <div className="font-medium">{alert.message}</div>
                        <div className="text-sm opacity-75">
                          {alert.location} • {new Date(alert.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => acknowledgeAlert(alert.id)}
                    >
                      Acknowledge
                    </Button>
                  </AlertDescription>
                </Alert>
              ))
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Area Hotspots */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-orange-500" />
            Current Hotspots
          </CardTitle>
          <CardDescription>
            Areas with elevated crime activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {hotspots.map((hotspot, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge variant={hotspot.riskScore > 70 ? 'destructive' : hotspot.riskScore > 40 ? 'secondary' : 'default'}>
                    Risk: {hotspot.riskScore}
                  </Badge>
                  <div>
                    <div className="font-medium">{hotspot.name}</div>
                    <div className="text-sm text-gray-600">
                      {hotspot.incidentCount} incidents • Primary: {hotspot.primaryCrimeType}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getTrendIcon(hotspot.trend)}
                  <span className="text-sm">
                    {hotspot.changePercent > 0 ? '+' : ''}{hotspot.changePercent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* System Status */}
      {isMonitoring && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-500" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">SearchAgent: Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">GeoAgent: Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Analytics Engine: Active</span>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              Last updated: {new Date().toLocaleString()}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Mock data functions (in production, these would be real API calls)
async function fetchLiveStats(): Promise<LiveStats> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const incidents = JSON.parse(localStorage.getItem('local_safety_reports') || '[]');
  const last24h = incidents.filter((inc: any) => {
    const incDate = new Date(inc.datetime);
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return incDate > cutoff;
  });
  
  const avgSeverity = incidents.length > 0 
    ? incidents.reduce((sum: number, inc: any) => sum + (inc.severity || 1), 0) / incidents.length 
    : 0;
  
  return {
    totalIncidents: incidents.length,
    last24Hours: last24h.length,
    avgSeverity,
    activeAlerts: Math.floor(Math.random() * 3), // Random for demo
    coverageArea: 1250, // Approximate Johannesburg metro area
    responseTime: Math.floor(Math.random() * 5) + 1 // 1-5 seconds
  };
}

async function fetchActiveAlerts(): Promise<Alert[]> {
  const alerts: Alert[] = [];
  
  // Generate some demo alerts
  if (Math.random() > 0.7) {
    alerts.push({
      id: `alert-${Date.now()}`,
      type: 'HIGH_RISK',
      message: 'Elevated violent crime activity detected in Sandton CBD',
      location: 'Sandton CBD',
      severity: 4,
      timestamp: new Date().toISOString(),
      acknowledged: false
    });
  }
  
  if (Math.random() > 0.8) {
    alerts.push({
      id: `alert-${Date.now()}-2`,
      type: 'CLUSTER',
      message: 'Multiple theft incidents clustering in Rosebank area',
      location: 'Rosebank',
      severity: 3,
      timestamp: new Date().toISOString(),
      acknowledged: false
    });
  }
  
  return alerts;
}

async function fetchHotspots(): Promise<AreaHotspot[]> {
  return [
    {
      name: 'Sandton CBD',
      coordinates: [-26.1076, 28.0567],
      riskScore: 75,
      incidentCount: 12,
      primaryCrimeType: 'Property & Financial Crimes',
      trend: 'up',
      changePercent: 15
    },
    {
      name: 'Hillbrow',
      coordinates: [-26.1886, 28.0478],
      riskScore: 85,
      incidentCount: 18,
      primaryCrimeType: 'Violent Crimes',
      trend: 'stable',
      changePercent: 2
    },
    {
      name: 'Rosebank',
      coordinates: [-26.1448, 28.0436],
      riskScore: 45,
      incidentCount: 7,
      primaryCrimeType: 'Property & Financial Crimes',
      trend: 'down',
      changePercent: -8
    }
  ];
}
