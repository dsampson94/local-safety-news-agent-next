import { z } from "zod";

// Crime type enum
export const CrimeTypeEnum = z.enum([
  "Violent Crimes",
  "Property & Financial Crimes", 
  "Public Order & Social Crimes",
  "Cyber & Communication Crimes",
  "Organised Crime & Syndicate Operations",
  "Sexual Offences"
]);

// Coordinates schema
export const CoordinatesSchema = z.object({
  type: z.literal("Point"),
  coordinates: z.tuple([z.number(), z.number()]) // [longitude, latitude]
});

// Safety incident schema
export const SafetyIncidentSchema = z.object({
  datetime: z.string().datetime(),
  coordinates: CoordinatesSchema,
  type: CrimeTypeEnum,
  newsID: z.string(),
  severity: z.number().int().min(1).max(5),
  keywords: z.array(z.string()),
  summary: z.string().max(100)
});

// Array of safety incidents
export const SafetyIncidentsArraySchema = z.array(SafetyIncidentSchema);

// Type exports
export type SafetyIncident = z.infer<typeof SafetyIncidentSchema>;
export type CrimeType = z.infer<typeof CrimeTypeEnum>;
export type Coordinates = z.infer<typeof CoordinatesSchema>;

// Validation function
export function validateSafetyIncidents(data: unknown): SafetyIncident[] {
  try {
    return SafetyIncidentsArraySchema.parse(data);
  } catch (error) {
    console.error("Schema validation error:", error);
    throw new Error("Invalid safety incidents data structure");
  }
}

// Validation function that returns result with errors
export function validateSafetyIncidentsSafe(data: unknown) {
  const result = SafetyIncidentsArraySchema.safeParse(data);
  return {
    success: result.success,
    data: result.success ? result.data : null,
    errors: result.success ? null : result.error.issues
  };
}
