// Data statistics component to showcase the comprehensive dataset
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LocalCrimeStorage } from '@/lib/local-crime-storage';
import { SafetyIncident } from '@/lib/schema';

interface DataStats {
  totalReports: number;
  last24Hours: number;
  last7Days: number;
  last30Days: number;
  byType: Record<string, number>;
  bySeverity: Record<string, number>;
  mostActiveAreas: Array<{area: string, count: number}>;
  timeDistribution: Record<string, number>;
}

export function DataStatistics() {
  const [stats, setStats] = useState<DataStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    calculateStats();
  }, []);

  const calculateStats = () => {
    try {
      // Initialize storage to ensure we have data
      LocalCrimeStorage.initializeData();
      const allReports = LocalCrimeStorage.getAllReports();
      
      const now = Date.now();
      const oneDayAgo = now - (24 * 60 * 60 * 1000);
      const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);
      const oneMonthAgo = now - (30 * 24 * 60 * 60 * 1000);

      // Time-based counts
      const last24Hours = allReports.filter(r => 
        new Date(r.datetime).getTime() > oneDayAgo
      ).length;
      
      const last7Days = allReports.filter(r => 
        new Date(r.datetime).getTime() > oneWeekAgo
      ).length;
      
      const last30Days = allReports.filter(r => 
        new Date(r.datetime).getTime() > oneMonthAgo
      ).length;

      // Crime type distribution
      const byType: Record<string, number> = {};
      allReports.forEach(report => {
        byType[report.type] = (byType[report.type] || 0) + 1;
      });

      // Severity distribution
      const bySeverity: Record<string, number> = {};
      allReports.forEach(report => {
        const severity = `Level ${report.severity}`;
        bySeverity[severity] = (bySeverity[severity] || 0) + 1;
      });

      // Most active areas (based on keywords)
      const areaCount: Record<string, number> = {};
      allReports.forEach(report => {
        report.keywords.forEach(keyword => {
          if (keyword.includes('_') || keyword.length > 3) {
            areaCount[keyword] = (areaCount[keyword] || 0) + 1;
          }
        });
      });
      
      const mostActiveAreas = Object.entries(areaCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([area, count]) => ({ area, count }));

      // Time distribution (by hour)
      const timeDistribution: Record<string, number> = {};
      for (let hour = 0; hour < 24; hour++) {
        timeDistribution[`${hour}:00`] = 0;
      }
      
      allReports.forEach(report => {
        const hour = new Date(report.datetime).getHours();
        timeDistribution[`${hour}:00`]++;
      });

      setStats({
        totalReports: allReports.length,
        last24Hours,
        last7Days,
        last30Days,
        byType,
        bySeverity,
        mostActiveAreas,
        timeDistribution
      });
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error calculating stats:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse bg-gray-200 h-32 rounded"></div>
        <div className="animate-pulse bg-gray-200 h-32 rounded"></div>
      </div>
    );
  }

  if (!stats) {
    return <div>Error loading statistics</div>;
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalReports.toLocaleString()}</div>
            <p className="text-xs text-gray-500">Past 6 months</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Last 24 Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.last24Hours}</div>
            <p className="text-xs text-gray-500">Recent activity</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.last7Days}</div>
            <p className="text-xs text-gray-500">7 day total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.last30Days}</div>
            <p className="text-xs text-gray-500">30 day total</p>
          </CardContent>
        </Card>
      </div>

      {/* Crime Type Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Crime Type Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(stats.byType)
              .sort(([,a], [,b]) => b - a)
              .map(([type, count]) => (
                <div key={type} className="flex justify-between items-center">
                  <span className="text-sm font-medium">{type}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(count / stats.totalReports) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Most Active Areas */}
      <Card>
        <CardHeader>
          <CardTitle>Most Active Areas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {stats.mostActiveAreas.map(({ area, count }, index) => (
              <div key={area} className="flex justify-between items-center py-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">#{index + 1}</span>
                  <span className="text-sm capitalize">{area.replace(/_/g, ' ')}</span>
                </div>
                <span className="text-sm font-medium text-gray-600">{count} reports</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Severity Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Severity Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2">
            {Object.entries(stats.bySeverity)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([severity, count]) => (
                <div key={severity} className="text-center">
                  <div className="text-lg font-bold text-gray-800">{count}</div>
                  <div className="text-xs text-gray-600">{severity}</div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Peak Hours */}
      <Card>
        <CardHeader>
          <CardTitle>Peak Crime Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 mb-3">
            Crime frequency by hour of day (24-hour format)
          </div>
          <div className="grid grid-cols-12 gap-1 text-xs">
            {Object.entries(stats.timeDistribution)
              .sort(([a], [b]) => parseInt(a) - parseInt(b))
              .map(([hour, count]) => {
                const maxCount = Math.max(...Object.values(stats.timeDistribution));
                const height = Math.max(4, (count / maxCount) * 40);
                return (
                  <div key={hour} className="flex flex-col items-center">
                    <div 
                      className="bg-red-500 w-full rounded-t"
                      style={{ height: `${height}px` }}
                      title={`${hour}: ${count} reports`}
                    ></div>
                    <span className="text-xs mt-1 transform -rotate-45 origin-top-left">
                      {hour.split(':')[0]}
                    </span>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
