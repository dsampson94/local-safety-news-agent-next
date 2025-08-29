import { SafetyIncident } from './schema';

export const comprehensiveCrimeData: SafetyIncident[] = [
  {
    id: "JHB-2023-001",
    type: "armed_robbery",
    severity: "high",
    location: {
      area: "Sandton CBD",
      coordinates: { lat: -26.1076, lng: 28.0567 },
      address: "Sandton Drive, Sandton"
    },
    timestamp: "2023-08-15T14:30:00Z",
    description: "Armed robbery at shopping complex. Three suspects with firearms targeted jewelry store. Security response time 4 minutes.",
    source: "SAPS Report",
    verified: true,
    tags: ["armed_robbery", "firearms", "commercial", "sandton"]
  },
  {
    id: "JHB-2023-002",
    type: "theft",
    severity: "medium",
    location: {
      area: "Rosebank",
      coordinates: { lat: -26.1467, lng: 28.0436 },
      address: "Oxford Road, Rosebank"
    },
    timestamp: "2023-08-16T09:15:00Z",
    description: "Purse snatching incident at bus stop. Single suspect on foot, fled towards Rosebank Mall.",
    source: "Community Report",
    verified: true,
    tags: ["theft", "pedestrian", "public_transport"]
  },
  {
    id: "JHB-2023-003",
    type: "vehicle_crime",
    severity: "high",
    location: {
      area: "Johannesburg CBD",
      coordinates: { lat: -26.2041, lng: 28.0473 },
      address: "Commissioner Street, CBD"
    },
    timestamp: "2023-08-17T22:45:00Z",
    description: "Vehicle hijacking at traffic lights. Two armed suspects forced driver out, fled towards M1 highway.",
    source: "SAPS Report",
    verified: true,
    tags: ["hijacking", "firearms", "traffic_lights", "cbd"]
  },
  {
    id: "JHB-2023-004",
    type: "burglary",
    severity: "medium",
    location: {
      area: "Melville",
      coordinates: { lat: -26.1849, lng: 28.0097 },
      address: "7th Street, Melville"
    },
    timestamp: "2023-08-18T03:20:00Z",
    description: "House burglary while residents sleeping. Entry through back window, electronics stolen.",
    source: "SAPS Report",
    verified: true,
    tags: ["burglary", "residential", "night", "electronics"]
  },
  {
    id: "JHB-2023-005",
    type: "assault",
    severity: "medium",
    location: {
      area: "Braamfontein",
      coordinates: { lat: -26.1929, lng: 28.0305 },
      address: "Jorrissen Street, Braamfontein"
    },
    timestamp: "2023-08-19T18:30:00Z",
    description: "Assault outside university campus. Victim hospitalized with minor injuries. Suspect fled on foot.",
    source: "University Security",
    verified: true,
    tags: ["assault", "university", "pedestrian"]
  },
  {
    id: "JHB-2023-006",
    type: "theft",
    severity: "low",
    location: {
      area: "Parktown",
      coordinates: { lat: -26.1620, lng: 28.0400 },
      address: "Jan Smuts Avenue, Parktown"
    },
    timestamp: "2023-08-20T12:00:00Z",
    description: "Bicycle theft from apartment complex. Lock cut, high-value mountain bike stolen.",
    source: "Community Report",
    verified: true,
    tags: ["theft", "bicycle", "residential_complex"]
  },
  {
    id: "JHB-2023-007",
    type: "armed_robbery",
    severity: "high",
    location: {
      area: "Fourways",
      coordinates: { lat: -25.9976, lng: 28.0099 },
      address: "William Nicol Drive, Fourways"
    },
    timestamp: "2023-08-21T19:45:00Z",
    description: "Armed robbery at petrol station. Three suspects with firearms, escaped in white sedan.",
    source: "SAPS Report",
    verified: true,
    tags: ["armed_robbery", "petrol_station", "firearms", "getaway_vehicle"]
  },
  {
    id: "JHB-2023-008",
    type: "vehicle_crime",
    severity: "medium",
    location: {
      area: "Randburg",
      coordinates: { lat: -26.0939, lng: 28.0021 },
      address: "Republic Road, Randburg"
    },
    timestamp: "2023-08-22T07:30:00Z",
    description: "Smash and grab at robot. Side window broken, laptop bag stolen from passenger seat.",
    source: "SAPS Report",
    verified: true,
    tags: ["smash_and_grab", "traffic_lights", "electronics"]
  },
  {
    id: "JHB-2023-009",
    type: "burglary",
    severity: "high",
    location: {
      area: "Houghton",
      coordinates: { lat: -26.1654, lng: 28.0756 },
      address: "Houghton Drive, Houghton Estate"
    },
    timestamp: "2023-08-23T02:15:00Z",
    description: "Armed house invasion. Three suspects with firearms entered through front gate. Family held at gunpoint.",
    source: "SAPS Report",
    verified: true,
    tags: ["house_invasion", "armed", "firearms", "family_threatened"]
  },
  {
    id: "JHB-2023-010",
    type: "theft",
    severity: "medium",
    location: {
      area: "Observatory",
      coordinates: { lat: -26.1923, lng: 28.0469 },
      address: "Lower Main Road, Observatory"
    },
    timestamp: "2023-08-24T16:20:00Z",
    description: "Phone snatching while victim walking. Suspect on motorcycle, fled towards M1 South.",
    source: "Community Report",
    verified: true,
    tags: ["phone_snatching", "motorcycle", "pedestrian"]
  },
  {
    id: "JHB-2023-011",
    type: "assault",
    severity: "high",
    location: {
      area: "Hillbrow",
      coordinates: { lat: -26.1886, lng: 28.0495 },
      address: "Pretoria Street, Hillbrow"
    },
    timestamp: "2023-08-25T21:10:00Z",
    description: "Serious assault with weapon. Victim stabbed during argument, hospitalized in critical condition.",
    source: "SAPS Report",
    verified: true,
    tags: ["assault", "weapon", "stabbing", "critical_injury"]
  },
  {
    id: "JHB-2023-012",
    type: "vehicle_crime",
    severity: "high",
    location: {
      area: "Roodepoort",
      coordinates: { lat: -26.1625, lng: 27.8717 },
      address: "Beyers Naude Drive, Roodepoort"
    },
    timestamp: "2023-08-26T20:30:00Z",
    description: "Vehicle hijacking at shopping center parking. Armed suspects forced family out of SUV.",
    source: "SAPS Report",
    verified: true,
    tags: ["hijacking", "shopping_center", "family", "suv"]
  },
  {
    id: "JHB-2023-013",
    type: "theft",
    severity: "low",
    location: {
      area: "Greenside",
      coordinates: { lat: -26.1543, lng: 28.0201 },
      address: "Gleneagles Road, Greenside"
    },
    timestamp: "2023-08-27T11:45:00Z",
    description: "Garden tools stolen from residential property. Gate lock broken, tools taken from shed.",
    source: "Community Report",
    verified: true,
    tags: ["theft", "residential", "garden_tools", "property_damage"]
  },
  {
    id: "JHB-2023-014",
    type: "burglary",
    severity: "medium",
    location: {
      area: "Benoni",
      coordinates: { lat: -26.1884, lng: 28.3207 },
      address: "Benoni Country Club Road, Benoni"
    },
    timestamp: "2023-08-28T04:00:00Z",
    description: "Business burglary at office complex. Security system disabled, computers and equipment stolen.",
    source: "Security Company",
    verified: true,
    tags: ["burglary", "commercial", "electronics", "security_breach"]
  },
  {
    id: "JHB-2023-015",
    type: "armed_robbery",
    severity: "high",
    location: {
      area: "Alexandra",
      coordinates: { lat: -26.1009, lng: 28.1056 },
      address: "London Road, Alexandra"
    },
    timestamp: "2023-08-29T17:15:00Z",
    description: "Taxi robbery at rank. Multiple passengers robbed at gunpoint by three armed suspects.",
    source: "SAPS Report",
    verified: true,
    tags: ["armed_robbery", "taxi", "multiple_victims", "public_transport"]
  },
  {
    id: "JHB-2023-016",
    type: "vehicle_crime",
    severity: "medium",
    location: {
      area: "Kempton Park",
      coordinates: { lat: -26.1015, lng: 28.2305 },
      address: "R21 Highway, Kempton Park"
    },
    timestamp: "2023-08-30T13:20:00Z",
    description: "Vehicle break-in at airport parking. Multiple cars targeted, luggage and valuables stolen.",
    source: "Airport Security",
    verified: true,
    tags: ["vehicle_break_in", "airport", "multiple_vehicles", "luggage"]
  },
  {
    id: "JHB-2023-017",
    type: "theft",
    severity: "medium",
    location: {
      area: "Edenvale",
      coordinates: { lat: -26.1429, lng: 28.1520 },
      address: "Van Riebeeck Avenue, Edenvale"
    },
    timestamp: "2023-09-01T10:30:00Z",
    description: "Shoplifting at supermarket. Suspect concealed groceries worth R800, detained by security.",
    source: "Store Security",
    verified: true,
    tags: ["shoplifting", "supermarket", "detained", "retail_theft"]
  },
  {
    id: "JHB-2023-018",
    type: "assault",
    severity: "medium",
    location: {
      area: "Boksburg",
      coordinates: { lat: -26.2122, lng: 28.2624 },
      address: "North Rand Road, Boksburg"
    },
    timestamp: "2023-09-02T19:45:00Z",
    description: "Bar fight escalated to assault. Two injured, one hospitalized. Suspects fled before police arrival.",
    source: "SAPS Report",
    verified: true,
    tags: ["assault", "bar_fight", "multiple_injured", "fled"]
  },
  {
    id: "JHB-2023-019",
    type: "burglary",
    severity: "high",
    location: {
      area: "Midrand",
      coordinates: { lat: -25.9953, lng: 28.1287 },
      address: "New Road, Midrand"
    },
    timestamp: "2023-09-03T01:30:00Z",
    description: "Warehouse burglary at industrial estate. Large quantity of electronics stolen, security guard tied up.",
    source: "SAPS Report",
    verified: true,
    tags: ["burglary", "warehouse", "industrial", "security_guard_threatened"]
  },
  {
    id: "JHB-2023-020",
    type: "vehicle_crime",
    severity: "high",
    location: {
      area: "Soweto",
      coordinates: { lat: -26.2678, lng: 27.8546 },
      address: "Vilakazi Street, Orlando West"
    },
    timestamp: "2023-09-04T18:00:00Z",
    description: "Taxi violence incident. Shooting between rival taxi associations, multiple vehicles damaged.",
    source: "SAPS Report",
    verified: true,
    tags: ["taxi_violence", "shooting", "multiple_vehicles", "gang_related"]
  },
  {
    id: "JHB-2024-001",
    type: "theft",
    severity: "medium",
    location: {
      area: "Constantia Kloof",
      coordinates: { lat: -26.1234, lng: 27.8923 },
      address: "Hendrik Potgieter Road, Constantia Kloof"
    },
    timestamp: "2024-01-05T14:15:00Z",
    description: "ATM fraud attempt detected. Skimming device found and removed by bank security.",
    source: "Bank Security",
    verified: true,
    tags: ["atm_fraud", "skimming", "bank_security", "prevented"]
  },
  {
    id: "JHB-2024-002",
    type: "armed_robbery",
    severity: "high",
    location: {
      area: "Centurion",
      coordinates: { lat: -25.8601, lng: 28.1878 },
      address: "John Vorster Drive, Centurion"
    },
    timestamp: "2024-01-06T16:45:00Z",
    description: "Cash-in-transit heist attempted. Security guards exchanged fire with robbers, no injuries reported.",
    source: "Security Company",
    verified: true,
    tags: ["cash_in_transit", "attempted_heist", "gunfire", "security_guards"]
  },
  {
    id: "JHB-2024-003",
    type: "burglary",
    severity: "medium",
    location: {
      area: "Northcliff",
      coordinates: { lat: -26.1434, lng: 27.9702 },
      address: "Beyers Naude Drive, Northcliff"
    },
    timestamp: "2024-01-07T05:30:00Z",
    description: "Residential burglary through roof access. Family woke to find laptops and jewelry missing.",
    source: "SAPS Report",
    verified: true,
    tags: ["burglary", "roof_access", "electronics", "jewelry", "family_home"]
  },
  {
    id: "JHB-2024-004",
    type: "vehicle_crime",
    severity: "medium",
    location: {
      area: "Alberton",
      coordinates: { lat: -26.2670, lng: 28.1217 },
      address: "Voortrekker Road, Alberton"
    },
    timestamp: "2024-01-08T08:20:00Z",
    description: "Catalytic converter theft from parking lot. Multiple vehicles targeted overnight.",
    source: "Community Report",
    verified: true,
    tags: ["catalytic_converter", "theft", "multiple_vehicles", "parking_lot"]
  },
  {
    id: "JHB-2024-005",
    type: "assault",
    severity: "high",
    location: {
      area: "Tembisa",
      coordinates: { lat: -25.9952, lng: 28.2263 },
      address: "Andrew Mapheto Drive, Tembisa"
    },
    timestamp: "2024-01-09T20:30:00Z",
    description: "Domestic violence incident escalated. Neighbor intervention prevented serious injury.",
    source: "Community Report",
    verified: true,
    tags: ["domestic_violence", "neighbor_intervention", "prevented_escalation"]
  },
  {
    id: "JHB-2024-006",
    type: "theft",
    severity: "low",
    location: {
      area: "Linden",
      coordinates: { lat: -26.1456, lng: 28.0234 },
      address: "4th Avenue, Linden"
    },
    timestamp: "2024-01-10T12:30:00Z",
    description: "Package theft from front door. Delivery left unattended, stolen within hours.",
    source: "Resident Report",
    verified: true,
    tags: ["package_theft", "delivery", "residential", "unattended"]
  },
  {
    id: "JHB-2024-007",
    type: "armed_robbery",
    severity: "high",
    location: {
      area: "Germiston",
      coordinates: { lat: -26.2309, lng: 28.1770 },
      address: "Victoria Street, Germiston"
    },
    timestamp: "2024-01-11T15:45:00Z",
    description: "Pharmacy robbery for scheduled drugs. Armed suspects threatened staff, fled with controlled substances.",
    source: "SAPS Report",
    verified: true,
    tags: ["pharmacy_robbery", "controlled_substances", "staff_threatened", "medical"]
  },
  {
    id: "JHB-2024-008",
    type: "vehicle_crime",
    severity: "high",
    location: {
      area: "Sandton",
      coordinates: { lat: -26.1098, lng: 28.0489 },
      address: "Rivonia Road, Sandton"
    },
    timestamp: "2024-01-12T21:15:00Z",
    description: "Luxury vehicle theft from restaurant valet. Keys taken at gunpoint, vehicle recovered next day.",
    source: "SAPS Report",
    verified: true,
    tags: ["luxury_vehicle", "valet_theft", "restaurant", "recovered"]
  },
  {
    id: "JHB-2024-009",
    type: "burglary",
    severity: "medium",
    location: {
      area: "Krugersdorp",
      coordinates: { lat: -26.0859, lng: 27.7845 },
      address: "Church Street, Krugersdorp"
    },
    timestamp: "2024-01-13T03:45:00Z",
    description: "Office building burglary over weekend. Multiple businesses affected, computers stolen.",
    source: "Security Company",
    verified: true,
    tags: ["office_burglary", "multiple_businesses", "weekend", "computers"]
  },
  {
    id: "JHB-2024-010",
    type: "theft",
    severity: "medium",
    location: {
      area: "Kensington",
      coordinates: { lat: -26.1967, lng: 28.0656 },
      address: "Prince George Drive, Kensington"
    },
    timestamp: "2024-01-14T17:00:00Z",
    description: "Copper cable theft from construction site. Power supply to nearby homes affected.",
    source: "Utility Company",
    verified: true,
    tags: ["copper_theft", "construction_site", "power_outage", "infrastructure"]
  },
  {
    id: "JHB-2024-011",
    type: "assault",
    severity: "medium",
    location: {
      area: "Honeydew",
      coordinates: { lat: -26.1076, lng: 27.8934 },
      address: "Honeydew Road, Honeydew"
    },
    timestamp: "2024-02-15T19:30:00Z",
    description: "Road rage incident at intersection. Driver assaulted after minor collision, hospitalized.",
    source: "Traffic Police",
    verified: true,
    tags: ["road_rage", "intersection", "collision", "hospitalized"]
  },
  {
    id: "JHB-2024-012",
    type: "vehicle_crime",
    severity: "high",
    location: {
      area: "Pretoria West",
      coordinates: { lat: -25.7545, lng: 28.1456 },
      address: "Church Street West, Pretoria"
    },
    timestamp: "2024-02-16T22:00:00Z",
    description: "Multiple vehicle break-ins at shopping mall. 15 cars affected, electronics and bags stolen.",
    source: "Mall Security",
    verified: true,
    tags: ["multiple_break_ins", "shopping_mall", "electronics", "15_vehicles"]
  },
  {
    id: "JHB-2024-013",
    type: "armed_robbery",
    severity: "high",
    location: {
      area: "Lenasia",
      coordinates: { lat: -26.3254, lng: 27.8476 },
      address: "Nirvana Drive, Lenasia"
    },
    timestamp: "2024-02-17T11:20:00Z",
    description: "Business robbery at gold buying shop. Three armed suspects took cash and jewelry.",
    source: "SAPS Report",
    verified: true,
    tags: ["business_robbery", "gold_shop", "cash", "jewelry", "three_suspects"]
  },
  {
    id: "JHB-2024-014",
    type: "burglary",
    severity: "high",
    location: {
      area: "Sandton",
      coordinates: { lat: -26.1045, lng: 28.0567 },
      address: "Katherine Street, Sandton"
    },
    timestamp: "2024-02-18T02:30:00Z",
    description: "High-end residential burglary. Security system bypassed, luxury goods worth R500,000 stolen.",
    source: "Private Security",
    verified: true,
    tags: ["high_end_burglary", "security_bypass", "luxury_goods", "high_value"]
  },
  {
    id: "JHB-2024-015",
    type: "theft",
    severity: "medium",
    location: {
      area: "Mayfair",
      coordinates: { lat: -26.2034, lng: 28.0123 },
      address: "Main Road, Mayfair"
    },
    timestamp: "2024-02-19T13:45:00Z",
    description: "Purse snatching from elderly woman outside bank. Suspect fled on foot, caught by security.",
    source: "Bank Security",
    verified: true,
    tags: ["purse_snatching", "elderly_victim", "bank", "suspect_caught"]
  },
  {
    id: "JHB-2024-016",
    type: "vehicle_crime",
    severity: "medium",
    location: {
      area: "Eastgate",
      coordinates: { lat: -26.1734, lng: 28.1234 },
      address: "Bradford Road, Bedfordview"
    },
    timestamp: "2024-02-20T16:15:00Z",
    description: "Smash and grab at traffic light. Window smashed, handbag stolen from passenger seat.",
    source: "Traffic Police",
    verified: true,
    tags: ["smash_and_grab", "traffic_light", "handbag", "window_smashed"]
  },
  {
    id: "JHB-2024-017",
    type: "assault",
    severity: "high",
    location: {
      area: "Diepkloof",
      coordinates: { lat: -26.2876, lng: 27.8945 },
      address: "Vilakazi Street, Diepkloof"
    },
    timestamp: "2024-02-21T18:45:00Z",
    description: "Gang-related assault with weapons. Two hospitalized, ongoing investigation into gang activity.",
    source: "SAPS Report",
    verified: true,
    tags: ["gang_assault", "weapons", "hospitalized", "gang_investigation"]
  },
  {
    id: "JHB-2024-018",
    type: "burglary",
    severity: "medium",
    location: {
      area: "Florida",
      coordinates: { lat: -26.1845, lng: 27.8234 },
      address: "16th Street, Florida"
    },
    timestamp: "2024-02-22T04:20:00Z",
    description: "School burglary over weekend. Computer lab targeted, 20 tablets stolen from secure cabinet.",
    source: "School Security",
    verified: true,
    tags: ["school_burglary", "computer_lab", "tablets", "weekend", "education"]
  },
  {
    id: "JHB-2024-019",
    type: "theft",
    severity: "low",
    location: {
      area: "Morningside",
      coordinates: { lat: -26.1567, lng: 28.0678 },
      address: "Rivonia Road, Morningside"
    },
    timestamp: "2024-02-23T09:30:00Z",
    description: "Bicycle theft from apartment complex. Lock cut during daytime, security footage available.",
    source: "Complex Management",
    verified: true,
    tags: ["bicycle_theft", "apartment_complex", "lock_cut", "cctv_footage"]
  },
  {
    id: "JHB-2024-020",
    type: "armed_robbery",
    severity: "high",
    location: {
      area: "Yeoville",
      coordinates: { lat: -26.1834, lng: 28.0623 },
      address: "Rockey Street, Yeoville"
    },
    timestamp: "2024-02-24T20:15:00Z",
    description: "Restaurant robbery during dinner service. Staff and customers held at gunpoint, cash stolen.",
    source: "SAPS Report",
    verified: true,
    tags: ["restaurant_robbery", "customers_threatened", "dinner_service", "cash"]
  },
  {
    id: "JHB-2024-021",
    type: "vehicle_crime",
    severity: "high",
    location: {
      area: "Wynberg",
      coordinates: { lat: -26.2123, lng: 28.0234 },
      address: "Main Road, Wynberg"
    },
    timestamp: "2024-03-01T07:45:00Z",
    description: "Truck hijacking on main route. Driver forced out at gunpoint, cargo of electronics stolen.",
    source: "Transport Security",
    verified: true,
    tags: ["truck_hijacking", "cargo_theft", "electronics", "main_route"]
  },
  {
    id: "JHB-2024-022",
    type: "burglary",
    severity: "medium",
    location: {
      area: "Turffontein",
      coordinates: { lat: -26.2456, lng: 28.0567 },
      address: "Turf Club Street, Turffontein"
    },
    timestamp: "2024-03-02T01:15:00Z",
    description: "Sports club burglary. Equipment room broken into, sporting goods and trophies stolen.",
    source: "Club Management",
    verified: true,
    tags: ["sports_club", "equipment_theft", "trophies", "break_in"]
  },
  {
    id: "JHB-2024-023",
    type: "theft",
    severity: "medium",
    location: {
      area: "Parkview",
      coordinates: { lat: -26.1543, lng: 28.0423 },
      address: "Empire Road, Parkview"
    },
    timestamp: "2024-03-03T14:20:00Z",
    description: "Mail theft from residential complex. Multiple units affected, identity documents stolen.",
    source: "Postal Service",
    verified: true,
    tags: ["mail_theft", "identity_documents", "multiple_units", "residential"]
  },
  {
    id: "JHB-2024-024",
    type: "assault",
    severity: "medium",
    location: {
      area: "Newtown",
      coordinates: { lat: -26.2098, lng: 28.0356 },
      address: "Mary Fitzgerald Square, Newtown"
    },
    timestamp: "2024-03-04T22:30:00Z",
    description: "Assault during cultural event. Argument escalated, one person injured, suspect detained.",
    source: "Event Security",
    verified: true,
    tags: ["cultural_event", "argument", "detained", "event_security"]
  },
  {
    id: "JHB-2024-025",
    type: "vehicle_crime",
    severity: "medium",
    location: {
      area: "Jeppestown",
      coordinates: { lat: -26.1987, lng: 28.0654 },
      address: "Jules Street, Jeppestown"
    },
    timestamp: "2024-03-05T12:00:00Z",
    description: "Motorcycle theft from parking garage. Lock broken, bike found abandoned next day.",
    source: "Building Security",
    verified: true,
    tags: ["motorcycle_theft", "parking_garage", "lock_broken", "recovered"]
  },
  {
    id: "JHB-2024-026",
    type: "armed_robbery",
    severity: "high",
    location: {
      area: "Soweto",
      coordinates: { lat: -26.2456, lng: 27.8123 },
      address: "Chris Hani Road, Soweto"
    },
    timestamp: "2024-03-06T17:30:00Z",
    description: "Spaza shop robbery. Owner threatened with knife, daily takings stolen.",
    source: "Community Leader",
    verified: true,
    tags: ["spaza_shop", "knife_threat", "daily_takings", "local_business"]
  },
  {
    id: "JHB-2024-027",
    type: "burglary",
    severity: "high",
    location: {
      area: "Bedfordview",
      coordinates: { lat: -26.1745, lng: 28.1456 },
      address: "North Road, Bedfordview"
    },
    timestamp: "2024-03-07T03:00:00Z",
    description: "Armed house invasion. Family held hostage for 2 hours while house searched thoroughly.",
    source: "SAPS Report",
    verified: true,
    tags: ["house_invasion", "family_hostage", "2_hours", "thorough_search"]
  },
  {
    id: "JHB-2024-028",
    type: "theft",
    severity: "low",
    location: {
      area: "Craighall",
      coordinates: { lat: -26.1398, lng: 28.0234 },
      address: "Jan Smuts Avenue, Craighall"
    },
    timestamp: "2024-03-08T10:45:00Z",
    description: "Car wash theft. Personal items stolen from vehicle while being cleaned.",
    source: "Business Owner",
    verified: true,
    tags: ["car_wash", "personal_items", "vehicle_service", "opportunity_theft"]
  },
  {
    id: "JHB-2024-029",
    type: "vehicle_crime",
    severity: "medium",
    location: {
      area: "Marshalltown",
      coordinates: { lat: -26.2087, lng: 28.0398 },
      address: "Marshall Street, Marshalltown"
    },
    timestamp: "2024-03-09T15:15:00Z",
    description: "Taxi rank incident. Dispute over routes led to vehicle damage and minor injuries.",
    source: "Transport Authority",
    verified: true,
    tags: ["taxi_rank", "route_dispute", "vehicle_damage", "minor_injuries"]
  },
  {
    id: "JHB-2024-030",
    type: "assault",
    severity: "high",
    location: {
      area: "Orange Grove",
      coordinates: { lat: -26.1456, lng: 28.0789 },
      address: "Louis Botha Avenue, Orange Grove"
    },
    timestamp: "2024-03-10T19:00:00Z",
    description: "Serious assault outside nightclub. Victim in intensive care, multiple suspects fled.",
    source: "Hospital Report",
    verified: true,
    tags: ["nightclub_assault", "intensive_care", "multiple_suspects", "serious"]
  },
  {
    id: "JHB-2025-001",
    type: "theft",
    severity: "medium",
    location: {
      area: "Randburg",
      coordinates: { lat: -26.0856, lng: 28.0021 },
      address: "Eton Avenue, Randburg"
    },
    timestamp: "2025-01-15T11:30:00Z",
    description: "ATM skimming device discovered at shopping center. Bank alerted customers to check accounts.",
    source: "Bank Security",
    verified: true,
    tags: ["atm_skimming", "shopping_center", "bank_alert", "prevention"]
  },
  {
    id: "JHB-2025-002",
    type: "vehicle_crime",
    severity: "high",
    location: {
      area: "Sandton",
      coordinates: { lat: -26.1076, lng: 28.0567 },
      address: "West Street, Sandton"
    },
    timestamp: "2025-02-03T08:15:00Z",
    description: "Luxury car theft from hotel valet. High-end BMW stolen during breakfast service.",
    source: "Hotel Security",
    verified: true,
    tags: ["luxury_theft", "hotel_valet", "bmw", "breakfast_service"]
  },
  {
    id: "JHB-2025-003",
    type: "armed_robbery",
    severity: "high",
    location: {
      area: "Roodepoort",
      coordinates: { lat: -26.1625, lng: 27.8717 },
      address: "Main Reef Road, Roodepoort"
    },
    timestamp: "2025-02-10T14:45:00Z",
    description: "Jewelry store robbery in broad daylight. Three armed suspects smashed display cases.",
    source: "SAPS Report",
    verified: true,
    tags: ["jewelry_store", "broad_daylight", "display_cases", "three_suspects"]
  },
  {
    id: "JHB-2025-004",
    type: "burglary",
    severity: "medium",
    location: {
      area: "Kempton Park",
      coordinates: { lat: -26.1015, lng: 28.2305 },
      address: "Atlas Road, Kempton Park"
    },
    timestamp: "2025-02-18T02:20:00Z",
    description: "Warehouse burglary at logistics depot. Shipping containers broken into, goods stolen.",
    source: "Security Company",
    verified: true,
    tags: ["warehouse_burglary", "logistics", "shipping_containers", "goods"]
  },
  {
    id: "JHB-2025-005",
    type: "assault",
    severity: "medium",
    location: {
      area: "Bramley",
      coordinates: { lat: -26.1234, lng: 28.0456 },
      address: "Corlett Drive, Bramley"
    },
    timestamp: "2025-03-05T20:30:00Z",
    description: "Restaurant altercation escalated to assault. Security intervened, no serious injuries.",
    source: "Restaurant Management",
    verified: true,
    tags: ["restaurant_altercation", "security_intervention", "no_serious_injury"]
  },
  {
    id: "JHB-2025-006",
    type: "theft",
    severity: "low",
    location: {
      area: "Rosebank",
      coordinates: { lat: -26.1467, lng: 28.0436 },
      address: "Cradock Avenue, Rosebank"
    },
    timestamp: "2025-03-12T16:00:00Z",
    description: "Phone theft from coffee shop table. Victim distracted, phone taken by opportunist.",
    source: "Shop Owner",
    verified: true,
    tags: ["phone_theft", "coffee_shop", "distraction", "opportunist"]
  },
  {
    id: "JHB-2025-007",
    type: "vehicle_crime",
    severity: "medium",
    location: {
      area: "Midrand",
      coordinates: { lat: -25.9953, lng: 28.1287 },
      address: "Grand Central Boulevard, Midrand"
    },
    timestamp: "2025-04-02T09:45:00Z",
    description: "Multiple vehicle break-ins at office park. 8 cars affected, laptops and bags stolen.",
    source: "Office Park Security",
    verified: true,
    tags: ["multiple_break_ins", "office_park", "8_vehicles", "laptops"]
  },
  {
    id: "JHB-2025-008",
    type: "burglary",
    severity: "high",
    location: {
      area: "Houghton",
      coordinates: { lat: -26.1654, lng: 28.0756 },
      address: "Oxford Road, Houghton"
    },
    timestamp: "2025-04-15T01:45:00Z",
    description: "Estate house burglary with armed suspects. Security guard overpowered, safe contents stolen.",
    source: "Private Security",
    verified: true,
    tags: ["estate_burglary", "armed_suspects", "security_overpowered", "safe"]
  },
  {
    id: "JHB-2025-009",
    type: "armed_robbery",
    severity: "high",
    location: {
      area: "Fourways",
      coordinates: { lat: -25.9976, lng: 28.0099 },
      address: "Cedar Road, Fourways"
    },
    timestamp: "2025-05-08T18:20:00Z",
    description: "Shopping mall robbery at electronics store. Customers evacuated, large amount of stock stolen.",
    source: "Mall Security",
    verified: true,
    tags: ["mall_robbery", "electronics_store", "customers_evacuated", "large_theft"]
  },
  {
    id: "JHB-2025-010",
    type: "theft",
    severity: "medium",
    location: {
      area: "Norwood",
      coordinates: { lat: -26.1543, lng: 28.0634 },
      address: "Grant Avenue, Norwood"
    },
    timestamp: "2025-05-22T13:15:00Z",
    description: "Construction site theft. Power tools and copper wiring stolen over weekend.",
    source: "Site Foreman",
    verified: true,
    tags: ["construction_theft", "power_tools", "copper_wiring", "weekend"]
  },
  {
    id: "JHB-2025-011",
    type: "vehicle_crime",
    severity: "high",
    location: {
      area: "Benoni",
      coordinates: { lat: -26.1884, lng: 28.3207 },
      address: "Benoni CBD, Benoni"
    },
    timestamp: "2025-06-10T07:30:00Z",
    description: "Cash van robbery at bank. Security guards threatened, undisclosed amount stolen.",
    source: "Security Company",
    verified: true,
    tags: ["cash_van", "bank_robbery", "security_threatened", "undisclosed_amount"]
  },
  {
    id: "JHB-2025-012",
    type: "assault",
    severity: "high",
    location: {
      area: "Alexandra",
      coordinates: { lat: -26.1009, lng: 28.1056 },
      address: "Roosevelt Street, Alexandra"
    },
    timestamp: "2025-06-25T21:45:00Z",
    description: "Gang violence escalation. Multiple injuries, community leaders calling for intervention.",
    source: "Community Leader",
    verified: true,
    tags: ["gang_violence", "multiple_injuries", "community_intervention", "escalation"]
  },
  {
    id: "JHB-2025-013",
    type: "burglary",
    severity: "medium",
    location: {
      area: "Edenvale",
      coordinates: { lat: -26.1429, lng: 28.1520 },
      address: "6th Road, Edenvale"
    },
    timestamp: "2025-07-12T04:30:00Z",
    description: "School computer lab burglary. 15 laptops stolen during school holidays.",
    source: "Education Department",
    verified: true,
    tags: ["school_burglary", "computer_lab", "15_laptops", "school_holidays"]
  },
  {
    id: "JHB-2025-014",
    type: "theft",
    severity: "low",
    location: {
      area: "Melville",
      coordinates: { lat: -26.1849, lng: 28.0097 },
      address: "Main Road, Melville"
    },
    timestamp: "2025-07-28T15:45:00Z",
    description: "Bicycle theft from university campus. Student bike stolen from secure parking.",
    source: "Campus Security",
    verified: true,
    tags: ["bicycle_theft", "university_campus", "student", "secure_parking"]
  },
  {
    id: "JHB-2025-015",
    type: "vehicle_crime",
    severity: "medium",
    location: {
      area: "Alberton",
      coordinates: { lat: -26.2670, lng: 28.1217 },
      address: "New Redruth Road, Alberton"
    },
    timestamp: "2025-08-15T12:30:00Z",
    description: "Catalytic converter theft spike. 5 vehicles targeted in shopping center parking.",
    source: "Shopping Center Security",
    verified: true,
    tags: ["catalytic_converter", "theft_spike", "5_vehicles", "shopping_center"]
  },
  {
    id: "JHB-2025-016",
    type: "armed_robbery",
    severity: "high",
    location: {
      area: "Johannesburg CBD",
      coordinates: { lat: -26.2041, lng: 28.0473 },
      address: "Pritchard Street, CBD"
    },
    timestamp: "2025-08-25T10:15:00Z",
    description: "Current incident: Armed robbery at cell phone shop. Three suspects with firearms, investigation ongoing.",
    source: "SAPS Report",
    verified: false,
    tags: ["cell_phone_shop", "three_suspects", "firearms", "current_investigation"]
  }
];
