export interface LocationData {
  latitude: number
  longitude: number
  region?: string
  state?: string
  district?: string
  city?: string
}

export interface FarmData {
  soilType: string
  season: string
  farmSize: number
  previousCrops: string[]
  budget: number
  waterAvailability: string
  farmingExperience: string
}

export interface WeatherData {
  temperature: number
  humidity: number
  rainfall: number
  season: string
}

export interface CropRecommendationInput {
  location: LocationData
  farmData?: Partial<FarmData>
  weatherData?: WeatherData
}

export interface CropRecommendation {
  name: string
  suitabilityScore: number
  reason: string
  expectedYield: string
  riskLevel: 'Low' | 'Medium' | 'High'
}

export interface CropRecommendationResponse {
  recommendedCrops: CropRecommendation[]
  finalRecommendation: {
    bestCrop: string
    reason: string
  }
  generatedAt: string
  location: LocationData
}