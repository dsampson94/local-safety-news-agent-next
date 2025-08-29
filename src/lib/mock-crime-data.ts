// Mock crime data for Johannesburg area - provides rich dataset for demonstrations
import { SafetyIncident } from './schema';

export const mockCrimeReports: SafetyIncident[] = [
  // Sandton CBD
  {
    datetime: "2025-08-25T14:30:00Z",
    coordinates: { type: "Point", coordinates: [28.0567, -26.1076] },
    type: "Property & Financial Crimes",
    newsID: "sandton_001",
    severity: 4,
    keywords: ["armed robbery", "Sandton", "ATM"],
    summary: "Armed robbery at Sandton City ATM. Three suspects approached victim withdrawing cash."
  },
  {
    datetime: "2025-08-25T22:15:00Z", 
    coordinates: { type: "Point", coordinates: [28.0578, -26.1056] },
    type: "Violent Crimes",
    newsID: "sandton_002", 
    severity: 3,
    keywords: ["mugging", "Sandton", "evening"],
    summary: "Pedestrian mugged near Sandton Gautrain station. Phone and wallet stolen by two suspects."
  },

  // Parkhurst
  {
    datetime: "2025-08-24T19:45:00Z",
    coordinates: { type: "Point", coordinates: [28.0211, -26.1342] },
    type: "Property & Financial Crimes", 
    newsID: "parkhurst_001",
    severity: 2,
    keywords: ["burglary", "Parkhurst", "residential"],
    summary: "House burglary on 4th Avenue Parkhurst. Suspects entered through back window."
  },
  {
    datetime: "2025-08-26T16:20:00Z",
    coordinates: { type: "Point", coordinates: [28.0198, -26.1355] },
    type: "Property & Financial Crimes",
    newsID: "parkhurst_002", 
    severity: 3,
    keywords: ["car theft", "Parkhurst", "vehicle"],
    summary: "BMW stolen from Parkhurst restaurant parking while owner was dining inside."
  },

  // Rosebank
  {
    datetime: "2025-08-25T11:30:00Z",
    coordinates: { type: "Point", coordinates: [28.0436, -26.1448] },
    type: "Public Order & Social Crimes",
    newsID: "rosebank_001",
    severity: 2, 
    keywords: ["pickpocketing", "Rosebank", "mall"],
    summary: "Pickpocketing incident at Rosebank Mall. Victim's wallet stolen from handbag."
  },
  {
    datetime: "2025-08-24T20:10:00Z",
    coordinates: { type: "Point", coordinates: [28.0445, -26.1439] },
    type: "Property & Financial Crimes",
    newsID: "rosebank_002",
    severity: 4,
    keywords: ["smash and grab", "Rosebank", "traffic"],
    summary: "Smash and grab at traffic light on Jan Smuts Avenue. Laptop bag stolen."
  },

  // Melville 
  {
    datetime: "2025-08-26T01:45:00Z",
    coordinates: { type: "Point", coordinates: [28.0094, -26.1856] },
    type: "Violent Crimes",
    newsID: "melville_001",
    severity: 5,
    keywords: ["assault", "Melville", "nightlife"],
    summary: "Serious assault outside Melville nightclub. Victim hospitalized after altercation."
  },

  // Bryanston
  {
    datetime: "2025-08-25T08:15:00Z", 
    coordinates: { type: "Point", coordinates: [28.0178, -26.0683] },
    type: "Property & Financial Crimes",
    newsID: "bryanston_001",
    severity: 3,
    keywords: ["home invasion", "Bryanston", "residential"],
    summary: "Home invasion in Bryanston security estate. Armed suspects tied up family."
  },

  // Fourways
  {
    datetime: "2025-08-26T12:00:00Z",
    coordinates: { type: "Point", coordinates: [28.0103, -25.9892] },
    type: "Property & Financial Crimes", 
    newsID: "fourways_001",
    severity: 2,
    keywords: ["shoplifting", "Fourways", "retail"],
    summary: "Shoplifting at Fourways Mall. Suspects caught stealing high-value electronics."
  },

  // Randburg
  {
    datetime: "2025-08-25T17:30:00Z",
    coordinates: { type: "Point", coordinates: [28.0011, -26.0939] },
    type: "Cyber & Communication Crimes",
    newsID: "randburg_001", 
    severity: 3,
    keywords: ["fraud", "Randburg", "online"],
    summary: "Online banking fraud reported in Randburg. Account compromised, R50,000 stolen."
  },

  // Alexandra
  {
    datetime: "2025-08-24T23:20:00Z",
    coordinates: { type: "Point", coordinates: [28.0928, -26.1056] },
    type: "Organised Crime & Syndicate Operations",
    newsID: "alexandra_001",
    severity: 5, 
    keywords: ["gang violence", "Alexandra", "shooting"],
    summary: "Gang-related shooting in Alexandra township. Multiple shots fired, two wounded."
  },

  // Soweto - Orlando
  {
    datetime: "2025-08-26T09:45:00Z",
    coordinates: { type: "Point", coordinates: [27.9117, -26.2678] },
    type: "Property & Financial Crimes",
    newsID: "soweto_001",
    severity: 3,
    keywords: ["robbery", "Soweto", "taxi"],
    summary: "Taxi robbery in Orlando, Soweto. Armed suspects robbed driver and passengers."
  },

  // CBD Johannesburg
  {
    datetime: "2025-08-25T13:20:00Z", 
    coordinates: { type: "Point", coordinates: [28.0473, -26.2041] },
    type: "Public Order & Social Crimes",
    newsID: "cbd_001",
    severity: 4,
    keywords: ["street robbery", "CBD", "downtown"],
    summary: "Street robbery in Johannesburg CBD. Tourist robbed at knifepoint near Carlton Centre."
  },

  // Hillbrow
  {
    datetime: "2025-08-24T21:15:00Z",
    coordinates: { type: "Point", coordinates: [28.0478, -26.1886] },
    type: "Violent Crimes", 
    newsID: "hillbrow_001",
    severity: 5,
    keywords: ["stabbing", "Hillbrow", "violence"],
    summary: "Stabbing incident in Hillbrow. Victim attacked during dispute, critical condition."
  },

  // Kempton Park
  {
    datetime: "2025-08-26T07:30:00Z",
    coordinates: { type: "Point", coordinates: [28.2300, -26.1017] },
    type: "Property & Financial Crimes",
    newsID: "kempton_001", 
    severity: 3,
    keywords: ["hijacking", "Kempton Park", "vehicle"],
    summary: "Vehicle hijacking near OR Tambo Airport. Driver forced out at gunpoint."
  },

  // Benoni
  {
    datetime: "2025-08-25T16:10:00Z",
    coordinates: { type: "Point", coordinates: [28.3103, -26.1756] },
    type: "Sexual Offences",
    newsID: "benoni_001",
    severity: 5, 
    keywords: ["assault", "Benoni", "sexual crime"],
    summary: "Sexual assault reported in Benoni residential area. Suspect arrested."
  },

  // Centurion
  {
    datetime: "2025-08-26T18:00:00Z",
    coordinates: { type: "Point", coordinates: [28.1881, -25.8601] },
    type: "Property & Financial Crimes",
    newsID: "centurion_001",
    severity: 2,
    keywords: ["theft", "Centurion", "mall"],
    summary: "Theft at Centurion Mall. Suspect caught stealing from clothing store."
  },

  // Pretoria CBD
  {
    datetime: "2025-08-25T14:45:00Z",
    coordinates: { type: "Point", coordinates: [28.1881, -25.7479] },
    type: "Public Order & Social Crimes",
    newsID: "pretoria_001",
    severity: 3,
    keywords: ["public violence", "Pretoria", "protest"],
    summary: "Public violence during protest in Pretoria CBD. Several arrests made."
  },

  // NEW RECENT REPORTS - Added Aug 26, 2025
  {
    datetime: "2025-08-26T08:30:00Z",
    coordinates: { type: "Point", coordinates: [28.0108, -25.9989] },
    type: "Property & Financial Crimes",
    newsID: "fourways_001",
    severity: 3,
    keywords: ["vehicle break-in", "Fourways", "laptop theft"],
    summary: "Vehicle break-in at Fourways Mall. Laptop stolen from parked car, security footage available."
  },
  {
    datetime: "2025-08-26T07:45:00Z",
    coordinates: { type: "Point", coordinates: [28.0963, -26.1009] },
    type: "Violent Crimes",
    newsID: "alexandra_001",
    severity: 4,
    keywords: ["street robbery", "Alexandra", "taxi rank"],
    summary: "Street robbery near Alexandra taxi rank. Pedestrian targeted, suspect fled on foot."
  },
  {
    datetime: "2025-08-26T03:20:00Z",
    coordinates: { type: "Point", coordinates: [27.9934, -26.0943] },
    type: "Property & Financial Crimes",
    newsID: "randburg_001",
    severity: 3,
    keywords: ["burglary", "Randburg", "electronics"],
    summary: "Residential burglary in Randburg. Electronics stolen, no forced entry signs detected."
  },
  {
    datetime: "2025-08-26T09:15:00Z",
    coordinates: { type: "Point", coordinates: [28.1772, -26.2309] },
    type: "Violent Crimes",
    newsID: "germiston_001",
    severity: 5,
    keywords: ["attempted hijacking", "Germiston", "security response"],
    summary: "Attempted vehicle hijacking thwarted by security. Two armed suspects fled on foot."
  },
  {
    datetime: "2025-08-26T11:30:00Z",
    coordinates: { type: "Point", coordinates: [28.3207, -26.1885] },
    type: "Violent Crimes",
    newsID: "benoni_001",
    severity: 3,
    keywords: ["assault", "Benoni", "tavern fight"],
    summary: "Assault at local tavern in Benoni. Two injured, medical assistance provided."
  },
  {
    datetime: "2025-08-26T12:45:00Z",
    coordinates: { type: "Point", coordinates: [28.2305, -26.1016] },
    type: "Property & Financial Crimes",
    newsID: "kempton_001",
    severity: 2,
    keywords: ["shoplifting", "Kempton Park", "retail"],
    summary: "Shoplifting at retail store. Suspect apprehended by store security."
  },
  {
    datetime: "2025-08-26T14:20:00Z",
    coordinates: { type: "Point", coordinates: [28.1506, -26.1421] },
    type: "Property & Financial Crimes",
    newsID: "edenvale_001",
    severity: 3,
    keywords: ["car break-in", "Edenvale", "handbag theft"],
    summary: "Car window smashed near shopping mall. Handbag stolen from passenger seat."
  },
  {
    datetime: "2025-08-26T16:10:00Z",
    coordinates: { type: "Point", coordinates: [28.2627, -26.2085] },
    type: "Violent Crimes",
    newsID: "boksburg_001",
    severity: 4,
    keywords: ["armed robbery", "Boksburg", "petrol station"],
    summary: "Armed robbery at petrol station. Cash and cigarettes stolen, staff unharmed."
  },
  {
    datetime: "2025-08-26T18:30:00Z",
    coordinates: { type: "Point", coordinates: [28.1218, -26.2667] },
    type: "Property & Financial Crimes",
    newsID: "alberton_001",
    severity: 2,
    keywords: ["bicycle theft", "Alberton", "residential"],
    summary: "Bicycle theft from residential complex. Security camera footage under review."
  },
  {
    datetime: "2025-08-26T19:45:00Z",
    coordinates: { type: "Point", coordinates: [28.4333, -26.2500] },
    type: "Property & Financial Crimes",
    newsID: "springs_001",
    severity: 3,
    keywords: ["business burglary", "Springs", "computer equipment"],
    summary: "Business premises burglary during evening. Computer equipment stolen from office."
  },
  {
    datetime: "2025-08-26T20:20:00Z",
    coordinates: { type: "Point", coordinates: [28.3696, -26.2367] },
    type: "Violent Crimes",
    newsID: "brakpan_001",
    severity: 5,
    keywords: ["vehicle hijacking", "Brakpan", "gunpoint"],
    summary: "Vehicle hijacking at intersection. Driver forced out at gunpoint, vehicle recovered."
  },
  {
    datetime: "2025-08-26T21:00:00Z",
    coordinates: { type: "Point", coordinates: [28.4771, -26.4318] },
    type: "Cyber & Communication Crimes",
    newsID: "nigel_001",
    severity: 3,
    keywords: ["ATM fraud", "Nigel", "skimming device"],
    summary: "ATM fraud incident. Skimming device discovered and removed by bank security."
  },
  {
    datetime: "2025-08-26T22:15:00Z",
    coordinates: { type: "Point", coordinates: [27.9267, -26.6733] },
    type: "Property & Financial Crimes",
    newsID: "vereeniging_001",
    severity: 2,
    keywords: ["purse snatching", "Vereeniging", "bus station"],
    summary: "Purse snatching near bus station. Suspect fled into residential area."
  },
  {
    datetime: "2025-08-26T23:30:00Z",
    coordinates: { type: "Point", coordinates: [27.8378, -26.7118] },
    type: "Violent Crimes",
    newsID: "vanderbijlpark_001",
    severity: 3,
    keywords: ["domestic violence", "Vanderbijlpark", "police intervention"],
    summary: "Domestic dispute escalated to assault. Police intervention, medical assistance provided."
  },
  {
    datetime: "2025-08-27T01:45:00Z",
    coordinates: { type: "Point", coordinates: [28.1286, -25.9886] },
    type: "Property & Financial Crimes",
    newsID: "midrand_001",
    severity: 4,
    keywords: ["residential burglary", "Midrand", "jewelry theft"],
    summary: "Residential burglary in upmarket area. High-value jewelry and electronics stolen."
  },
  {
    datetime: "2025-08-27T06:20:00Z",
    coordinates: { type: "Point", coordinates: [28.1878, -25.8601] },
    type: "Property & Financial Crimes",
    newsID: "centurion_001",
    severity: 3,
    keywords: ["vehicle break-ins", "Centurion", "office complex"],
    summary: "Multiple vehicle break-ins at office complex. Security patrol increased."
  },
  {
    datetime: "2025-08-27T08:00:00Z",
    coordinates: { type: "Point", coordinates: [28.1699, -25.7479] },
    type: "Property & Financial Crimes",
    newsID: "pretoria_west_001",
    severity: 2,
    keywords: ["cell phone theft", "Pretoria West", "motorcycle"],
    summary: "Cell phone snatched from pedestrian. Suspect escaped on motorcycle."
  },
  {
    datetime: "2025-08-27T10:30:00Z",
    coordinates: { type: "Point", coordinates: [28.2377, -25.7526] },
    type: "Violent Crimes",
    newsID: "hatfield_001",
    severity: 4,
    keywords: ["restaurant robbery", "Hatfield", "lunch hour"],
    summary: "Armed robbery at restaurant during lunch. Cash register emptied, customers safe."
  },
  {
    datetime: "2025-08-27T12:15:00Z",
    coordinates: { type: "Point", coordinates: [28.2753, -25.7879] },
    type: "Public Order & Social Crimes",
    newsID: "menlyn_001",
    severity: 2,
    keywords: ["altercation", "Menlyn", "food court"],
    summary: "Minor altercation at shopping center food court. Security mediated, no injuries."
  },
  {
    datetime: "2025-08-27T14:40:00Z",
    coordinates: { type: "Point", coordinates: [28.2358, -25.7615] },
    type: "Property & Financial Crimes",
    newsID: "brooklyn_001",
    severity: 3,
    keywords: ["office theft", "Brooklyn", "equipment"],
    summary: "Office equipment theft from business. Security alarm triggered, delayed response."
  },
  {
    datetime: "2025-08-27T16:25:00Z",
    coordinates: { type: "Point", coordinates: [28.2077, -25.7463] },
    type: "Violent Crimes",
    newsID: "arcadia_001",
    severity: 5,
    keywords: ["government vehicle", "Arcadia", "hijacking attempt"],
    summary: "Government vehicle targeted for hijacking. Security escort prevented incident."
  },
  {
    datetime: "2025-08-27T18:10:00Z",
    coordinates: { type: "Point", coordinates: [28.2292, -25.7544] },
    type: "Property & Financial Crimes",
    newsID: "sunnyside_001",
    severity: 3,
    keywords: ["apartment burglary", "Sunnyside", "balcony entry"],
    summary: "Apartment burglary via balcony entry. Electronics stolen from residence."
  },
  {
    datetime: "2025-08-27T19:30:00Z",
    coordinates: { type: "Point", coordinates: [28.2969, -25.7651] },
    type: "Cyber & Communication Crimes",
    newsID: "lynnwood_001",
    severity: 4,
    keywords: ["credit card fraud", "Lynnwood", "restaurant"],
    summary: "Credit card fraud scheme at upmarket restaurant. Multiple victims identified."
  },
  {
    datetime: "2025-08-27T20:45:00Z",
    coordinates: { type: "Point", coordinates: [28.3254, -25.8234] },
    type: "Property & Financial Crimes",
    newsID: "garsfontein_001",
    severity: 2,
    keywords: ["bicycle theft", "Garsfontein", "estate security"],
    summary: "Bicycle theft from residential estate. Security footage shows single suspect."
  },
  {
    datetime: "2025-08-27T22:00:00Z",
    coordinates: { type: "Point", coordinates: [28.1834, -25.7001] },
    type: "Violent Crimes",
    newsID: "wonderboom_001",
    severity: 3,
    keywords: ["street robbery", "Wonderboom", "nightclub"],
    summary: "Street robbery near nightclub. Wallet and phone stolen, victim unharmed."
  },
  {
    datetime: "2025-08-27T23:20:00Z",
    coordinates: { type: "Point", coordinates: [28.2156, -25.7292] },
    type: "Property & Financial Crimes",
    newsID: "moot_001",
    severity: 3,
    keywords: ["car parts theft", "Moot", "wheels battery"],
    summary: "Car parts theft overnight. Wheels and battery stolen from parked vehicle."
  },
  {
    datetime: "2025-08-28T00:30:00Z",
    coordinates: { type: "Point", coordinates: [28.3614, -25.7308] },
    type: "Violent Crimes",
    newsID: "mamelodi_001",
    severity: 4,
    keywords: ["serious assault", "Mamelodi", "taxi rank"],
    summary: "Serious assault at taxi rank. Multiple individuals involved, emergency response."
  },
  {
    datetime: "2025-08-28T02:15:00Z",
    coordinates: { type: "Point", coordinates: [28.1056, -25.7847] },
    type: "Property & Financial Crimes",
    newsID: "atteridgeville_001",
    severity: 3,
    keywords: ["residential burglary", "Atteridgeville", "appliances"],
    summary: "Early morning residential burglary. Television and kitchen appliances stolen."
  },
  {
    datetime: "2025-08-28T07:45:00Z",
    coordinates: { type: "Point", coordinates: [28.2667, -25.4167] },
    type: "Property & Financial Crimes",
    newsID: "hammanskraal_001",
    severity: 1,
    keywords: ["shoplifting", "Hammanskraal", "supermarket"],
    summary: "Shoplifting at local supermarket. Security apprehended suspect at exit."
  },
  {
    datetime: "2025-08-28T09:30:00Z",
    coordinates: { type: "Point", coordinates: [28.5240, -25.6707] },
    type: "Property & Financial Crimes",
    newsID: "cullinan_001",
    severity: 4,
    keywords: ["farm vehicle theft", "Cullinan", "tractor"],
    summary: "Farm vehicle theft reported. Tractor stolen from agricultural property."
  }
];
