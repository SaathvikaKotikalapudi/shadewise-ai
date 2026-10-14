export const demoCities = [
  {
    id: 'hyderabad',
    nameEn: 'Hyderabad (Telangana)',
    nameTe: 'హైదరాబాద్ (తెలంగాణ)',
    lat: 17.4375,
    lng: 78.4482,
    temp: 38,
    feelsLike: 42,
    humidity: 48,
    uvIndex: 9,
    windSpeed: '14 km/h',
    heatRisk: 'high',
    peakWindow: '11:30 AM – 3:45 PM',
    treeCanopyDensity: '28% urban coverage',
  },
  {
    id: 'visakhapatnam',
    nameEn: 'Visakhapatnam (Coastal AP)',
    nameTe: 'విశాఖపట్నం (ఆంధ్రప్రదేశ్)',
    lat: 17.6868,
    lng: 83.2185,
    temp: 35,
    feelsLike: 44,
    humidity: 78,
    uvIndex: 10,
    windSpeed: '18 km/h',
    heatRisk: 'extreme',
    peakWindow: '11:00 AM – 4:00 PM',
    treeCanopyDensity: '34% urban coverage',
  },
  {
    id: 'vijayawada',
    nameEn: 'Vijayawada (Krishna Basin)',
    nameTe: 'విజయవాడ (కృష్ణా జిల్లా)',
    lat: 16.5062,
    lng: 80.648,
    temp: 41,
    feelsLike: 47,
    humidity: 55,
    uvIndex: 11,
    windSpeed: '10 km/h',
    heatRisk: 'extreme',
    peakWindow: '10:45 AM – 4:15 PM',
    treeCanopyDensity: '19% urban coverage',
  },
  {
    id: 'tirupati',
    nameEn: 'Tirupati (Rayalaseema)',
    nameTe: 'తిరుపతి (రాయలసీమ)',
    lat: 13.6288,
    lng: 79.4192,
    temp: 37,
    feelsLike: 40,
    humidity: 42,
    uvIndex: 8,
    windSpeed: '12 km/h',
    heatRisk: 'high',
    peakWindow: '11:30 AM – 3:30 PM',
    treeCanopyDensity: '31% urban coverage',
  },
  {
    id: 'warangal',
    nameEn: 'Warangal (Telangana)',
    nameTe: 'వరంగల్ (తెలంగాణ)',
    lat: 17.9689,
    lng: 79.5941,
    temp: 39,
    feelsLike: 43,
    humidity: 44,
    uvIndex: 9,
    windSpeed: '11 km/h',
    heatRisk: 'high',
    peakWindow: '11:15 AM – 3:45 PM',
    treeCanopyDensity: '24% urban coverage',
  },
];

// Initial community heat-gap reports
export const initialHeatReports = [
  {
    id: 'gap-001',
    category: 'missingShade',
    location: 'Metro Pillar 1042 to Gate 3, Ameerpet Interchange',
    priority: 'high',
    description:
      'A 400m pedestrian stretch with zero shade canopy. Asphalt temperature reaches extreme levels between 12 PM and 3 PM.',
    upvotes: 28,
    timestamp: '2 hours ago',
    status: 'Verified by 14 commuters',
  },
  {
    id: 'gap-002',
    category: 'waterUnavailable',
    location: 'Public Bus Stop, Osmania General Hospital Road',
    priority: 'critical',
    description:
      'Municipal drinking water tap has been dry for over two weeks. Outpatients and transit commuters have no hydration access.',
    upvotes: 45,
    timestamp: 'Yesterday',
    status: 'Urgent Infrastructure Alert',
  },
  {
    id: 'gap-003',
    category: 'unshadedBusStop',
    location: 'RTC X Roads, Northbound Shelter',
    priority: 'medium',
    description:
      'Tin roof on the bus shelter was damaged during storm. Standing commuters are directly exposed to the noon sun for 15-20 mins.',
    upvotes: 19,
    timestamp: '3 days ago',
    status: 'Reported to Ward Office',
  },
  {
    id: 'gap-004',
    category: 'extremeHeatZone',
    location: 'Tech Corridor Pedestrian Crossing, Hitec City',
    priority: 'high',
    description:
      'Massive concrete island with 90-second traffic signal wait. No shade or misting system available during peak sun.',
    upvotes: 34,
    timestamp: '4 days ago',
    status: 'Identified Heat Void',
  },
];

// Realistic map route mock geometry for the Leaflet preview
export const sampleMapData = {
  center: [17.4375, 78.4482], // Hyderabad Ameerpet
  zoom: 15,
  startPoint: {
    lat: 17.4345,
    lng: 78.4442,
    title: 'Origin: Ameerpet Metro Station Gate 2',
  },
  endPoint: {
    lat: 17.4412,
    lng: 78.4552,
    title: 'Destination: City Healthcare & Public Garden',
  },
  // Shaded cool route (follows garden and tree avenue)
  shadedRouteCoords: [
    [17.4345, 78.4442],
    [17.4355, 78.4455],
    [17.4368, 78.4475],
    [17.4385, 78.4498],
    [17.4398, 78.4525],
    [17.4412, 78.4552],
  ],
  // Direct unshaded asphalt route (arterial road)
  exposedRouteCoords: [
    [17.4345, 78.4442],
    [17.436, 78.4438],
    [17.438, 78.446],
    [17.4402, 78.451],
    [17.4412, 78.4552],
  ],
  waterStations: [
    { lat: 17.4368, lng: 78.4475, name: 'Heritage Park Drinking Water Fountain (Chilled)' },
    { lat: 17.4398, lng: 78.4525, name: 'Community RO Water Refill Station' },
  ],
  treeCanopyShelters: [
    { lat: 17.4355, lng: 78.4455, name: 'Neem Tree Shaded Pedestrian Corridor' },
    { lat: 17.4385, lng: 78.4498, name: 'Covered Eco-Shelter & Benches' },
  ],
};

// AI Companion intelligent response simulator
export const aiDemoResponses = {
  default:
    'Staying cool in urban heat requires proactive habits: seek tree-lined paths, avoid direct sun between 11:30 AM and 3:30 PM, and sip water continuously rather than drinking large amounts all at once.',
  water:
    'Hydration Guidelines: When temperatures exceed 36°C, your body loses 0.5 to 1 liter of moisture per hour of walking. Always pre-hydrate with 250ml of water 15 minutes before setting out, and carry an electrolyte or lemon-water refill. ShadeWise highlights verified drinking water points along your journey!',
  humidity:
    'High humidity impairs your bodys primary cooling mechanism: sweat evaporation. When relative humidity exceeds 60% alongside temperatures over 34°C (high wet-bulb temperature), the heat index feels 5-8°C hotter, significantly raising the risk of heat cramps and exhaustion. Take frequent breaks under deep canopy shade.',
  exhaustion:
    'Key early warning signs of heat exhaustion include heavy sweating, pale clammy skin, headache, lightheadedness, and muscle cramps. If you notice these symptoms: immediately move into shaded or air-conditioned shelter, loosen tight clothing, elevate your feet, and sip cool fluids.',
  shade:
    'Dense urban tree canopies (like neem, banyan, and peepal) provide dual thermal relief: they block up to 80-90% of direct solar radiation (shortwave rays) and release moisture through evapotranspiration, reducing localized surface temperatures by up to 5°C to 8°C compared to exposed asphalt roads.',
  pack:
    'Essential hot-weather commuting kit: (1) Insulated water bottle, (2) Wide-brimmed cotton hat or UV umbrella, (3) Polarized sunglasses with UV400 protection, (4) Light-colored breathable cotton or linen clothing, (5) Oral rehydration salt (ORS) sachet for emergencies.',
  telugu:
    'ఎండలో నడిచేటప్పుడు పాటించవలసిన ముఖ్యమైన జాగ్రత్తలు: (1) ఉదయం 11:30 నుండి మధ్యాహ్నం 3:30 వరకు తీవ్ర ఎండలో నడవడాన్ని నివారించండి, (2) చెట్ల నీడ ఉన్న మార్గాలనే ఎంచుకోండి, (3) దాహం వేయకపోయినా ప్రతి 20 నిమిషాలకు కొద్దికొద్దిగా నీరు తాగండి, (4) లేత రంగు కాటన్ దుస్తులు, టోపీ లేదా గొడుగు ధరించండి.',
};
