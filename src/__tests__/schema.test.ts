import { validateSafetyIncidents, validateSafetyIncidentsSafe, SafetyIncident } from '../lib/schema';

describe('Safety Incident Schema Validation', () => {
  const validIncident: SafetyIncident = {
    datetime: "2025-08-18T20:15:00Z",
    coordinates: {
      type: "Point",
      coordinates: [-26.1342, 28.0211]
    },
    type: "Violent Crimes",
    newsID: "test-news-123",
    severity: 3,
    keywords: ["robbery", "Parkhurst", "Johannesburg"],
    summary: "Short summary of the incident."
  };

  it('should validate a correct safety incident', () => {
    const result = validateSafetyIncidents([validIncident]);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(validIncident);
  });

  it('should validate multiple incidents', () => {
    const incidents = [
      validIncident,
      {
        ...validIncident,
        newsID: "test-news-456",
        type: "Property & Financial Crimes" as const,
        severity: 5
      }
    ];
    
    const result = validateSafetyIncidents(incidents);
    expect(result).toHaveLength(2);
  });

  it('should reject incident with invalid crime type', () => {
    const invalidIncident = {
      ...validIncident,
      type: "Invalid Crime Type"
    };

    expect(() => {
      validateSafetyIncidents([invalidIncident]);
    }).toThrow();
  });

  it('should reject incident with invalid severity', () => {
    const invalidIncident = {
      ...validIncident,
      severity: 6 // Should be 1-5
    };

    expect(() => {
      validateSafetyIncidents([invalidIncident]);
    }).toThrow();
  });

  it('should reject incident with invalid coordinates', () => {
    const invalidIncident = {
      ...validIncident,
      coordinates: {
        type: "Point",
        coordinates: [123] // Should be [lng, lat]
      }
    };

    expect(() => {
      validateSafetyIncidents([invalidIncident]);
    }).toThrow();
  });

  it('should reject incident with invalid datetime', () => {
    const invalidIncident = {
      ...validIncident,
      datetime: "invalid-date"
    };

    expect(() => {
      validateSafetyIncidents([invalidIncident]);
    }).toThrow();
  });

  it('should return validation errors with safe parse', () => {
    const invalidIncident = {
      ...validIncident,
      severity: 10,
      type: "Invalid Type"
    };

    const result = validateSafetyIncidentsSafe([invalidIncident]);
    expect(result.success).toBe(false);
    expect(result.data).toBeNull();
    expect(result.errors).toBeDefined();
    expect(result.errors).toBeInstanceOf(Array);
  });

  it('should validate all required crime types', () => {
    const crimeTypes = [
      "Violent Crimes",
      "Property & Financial Crimes", 
      "Public Order & Social Crimes",
      "Cyber & Communication Crimes",
      "Organised Crime & Syndicate Operations",
      "Sexual Offences"
    ];

    crimeTypes.forEach(crimeType => {
      const incident = {
        ...validIncident,
        type: crimeType as any,
        newsID: `test-${crimeType.replace(/\s+/g, '-').toLowerCase()}`
      };

      expect(() => {
        validateSafetyIncidents([incident]);
      }).not.toThrow();
    });
  });

  it('should validate summary length constraint', () => {
    const longSummary = "A".repeat(101); // 101 characters, should fail
    const invalidIncident = {
      ...validIncident,
      summary: longSummary
    };

    expect(() => {
      validateSafetyIncidents([invalidIncident]);
    }).toThrow();
  });

  it('should accept valid GeoJSON Point structure', () => {
    const validGeoJsonIncident = {
      ...validIncident,
      coordinates: {
        type: "Point" as const,
        coordinates: [28.0473, -26.2041] as [number, number] // Johannesburg
      }
    };

    expect(() => {
      validateSafetyIncidents([validGeoJsonIncident]);
    }).not.toThrow();
  });
});
