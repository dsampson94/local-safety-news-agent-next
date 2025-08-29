// localStorage service for managing local crime data during demonstrations
import { comprehensiveCrimeData } from './comprehensive-crime-data';
import { SafetyIncident } from './schema';

export class LocalCrimeStorage {
  private static readonly STORAGE_KEY = 'local_safety_reports';
  
  static initializeData(): void {
    if (typeof window !== 'undefined') {
      const existing = localStorage.getItem(this.STORAGE_KEY);
      if (!existing) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(comprehensiveCrimeData));
        console.log('🗂️ Initialized localStorage with', comprehensiveCrimeData.length, 'crime reports');
      } else {
        console.log('📊 Local crime database ready with', this.getAllReports().length, 'reports');
      }
    }
  }
  
  static getAllReports(): SafetyIncident[] {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    }
    return comprehensiveCrimeData; // Fallback for SSR
  }
  
  static addReport(report: SafetyIncident): void {
    if (typeof window !== 'undefined') {
      const reports = this.getAllReports();
      reports.push(report);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reports));
      console.log('➕ Added new report:', report.newsID);
    }
  }
  
  static searchByLocation(locationQuery: string): SafetyIncident[] {
    const reports = this.getAllReports();
    const query = locationQuery.toLowerCase();
    
    return reports.filter(report => 
      report.keywords.some(keyword => keyword.toLowerCase().includes(query)) ||
      report.summary.toLowerCase().includes(query) ||
      report.newsID.toLowerCase().includes(query)
    );
  }
  
  static getRecentReports(hours: number = 72): SafetyIncident[] {
    const reports = this.getAllReports();
    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
    
    return reports.filter(report => 
      new Date(report.datetime) > cutoff
    );
  }
  
  static getReportsByArea(lat: number, lng: number, radiusKm: number = 5): SafetyIncident[] {
    const reports = this.getAllReports();
    
    return reports.filter(report => {
      const [reportLng, reportLat] = report.coordinates.coordinates;
      const distance = this.calculateDistance(lat, lng, reportLat, reportLng);
      return distance <= radiusKm;
    });
  }
  
  static getStatistics() {
    const reports = this.getAllReports();
    const crimeTypes = [...new Set(reports.map(r => r.type))];
    const severityDistribution = reports.reduce((acc, r) => {
      acc[r.severity] = (acc[r.severity] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
    
    return {
      totalReports: reports.length,
      crimeTypes: crimeTypes.length,
      averageSeverity: reports.reduce((sum, r) => sum + r.severity, 0) / reports.length,
      severityDistribution,
      recentReports: this.getRecentReports(24).length
    };
  }
  
  private static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
  
  private static deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }
}
