const apiKey = import.meta.env.VITE_GEMINI_API_KEY

if (!apiKey) {
  console.warn('Missing Gemini API key. Backend server will handle API calls.')
}

export interface CropRecommendationInput {
  location: {
    latitude: number
    longitude: number
    region?: string
    state?: string
  }
  soilType?: string
  season?: string
  farmSize?: number
  previousCrops?: string[]
  budget?: number
  waterAvailability?: string
  farmingExperience?: string
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
}

export async function getCropRecommendations(
  input: CropRecommendationInput
): Promise<CropRecommendationResponse> {
  try {
    // Call backend server instead of direct API to avoid CORS issues
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'
    
    console.log(`Calling backend at ${backendUrl}/api/crop-recommendation...`)
    
    const response = await fetch(`${backendUrl}/api/crop-recommendation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: buildPrompt(input)
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Backend error:', errorData)
      throw new Error(errorData.error || 'Backend request failed')
    }

    const data = await response.json()
    const text = data.text

    if (!text) {
      throw new Error('Empty response from backend')
    }

    console.log(`✅ Got response from backend using model: ${data.model}`)

    // Parse the JSON response
    try {
      // Remove markdown code blocks if present
      let cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '')
      
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No JSON found in response')
      }
      
      const parsedResponse = JSON.parse(jsonMatch[0])
      
      // Transform the response to match our expected format
      let recommendedCrops = []
      
      if (Array.isArray(parsedResponse)) {
        // If it's an array, transform each item
        recommendedCrops = parsedResponse.map((crop: any) => ({
          name: crop.name,
          suitabilityScore: crop.suitability || crop.suitabilityScore || 0,
          reason: crop.reason,
          expectedYield: crop.expectedYield || 'Not specified',
          riskLevel: crop.riskLevel || 'Medium'
        }))
      } else if (parsedResponse.recommendedCrops) {
        // If it has recommendedCrops array
        recommendedCrops = parsedResponse.recommendedCrops
      }
      
      if (!recommendedCrops || recommendedCrops.length === 0) {
        throw new Error('No crops found in response')
      }
      
      return {
        recommendedCrops,
        finalRecommendation: {
          bestCrop: recommendedCrops[0].name,
          reason: `Based on AI analysis: ${recommendedCrops[0].reason}`
        }
      } as CropRecommendationResponse
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', text)
      throw new Error('Failed to parse AI response')
    }
  } catch (error) {
    console.error('Gemini API error:', error)
    throw error
  }
}

function buildPrompt(input: CropRecommendationInput): string {
  return `
You are an expert agricultural advisor for Indian farmers. Based on the following farmer data, provide crop recommendations in the exact JSON format specified below.

Farmer Data:
- Location: Latitude ${input.location.latitude}, Longitude ${input.location.longitude}
- Region: ${input.location.region || 'Not specified'}
- State: ${input.location.state || 'Not specified'}
- District: ${(input.location as any).district || 'Not specified'}
- Soil Type: ${input.soilType || 'Not specified'}
- Season: ${input.season || 'Current season'}
- Farm Size: ${input.farmSize || 'Not specified'} acres
- Previous Crops: ${input.previousCrops?.join(', ') || 'Not specified'}
- Budget: ${input.budget || 'Not specified'}
- Water Availability: ${input.waterAvailability || 'Not specified'}
- Farming Experience: ${input.farmingExperience || 'Not specified'}

Consider the following factors for recommendations:
1. Climate and weather patterns for the region
2. Soil suitability
3. Water requirements
4. Market demand and prices
5. Seasonal timing
6. Risk factors (drought, pests, diseases)
7. Expected yields for the region

Provide recommendations in this EXACT JSON format (no additional text):

{
  "recommendedCrops": [
    {
      "name": "Crop Name",
      "suitabilityScore": 92,
      "reason": "Detailed explanation of why this crop is suitable based on soil type, rainfall, temperature, region, and season",
      "expectedYield": "18-22 quintals per hectare",
      "riskLevel": "Low"
    },
    {
      "name": "Second Crop",
      "suitabilityScore": 87,
      "reason": "Detailed explanation for second crop",
      "expectedYield": "20-25 quintals per hectare", 
      "riskLevel": "Medium"
    },
    {
      "name": "Third Crop",
      "suitabilityScore": 81,
      "reason": "Detailed explanation for third crop",
      "expectedYield": "15-20 quintals per hectare",
      "riskLevel": "High"
    }
  ],
  "finalRecommendation": {
    "bestCrop": "Best Crop Name",
    "reason": "Short explanation of why this is the best choice based on highest suitability, market conditions, and risk factors"
  }
}

Important: 
- Provide exactly 3 crop recommendations
- Suitability scores should be realistic (60-95 range)
- Risk levels must be "Low", "Medium", or "High"
- Focus on crops suitable for Indian agriculture
- Consider regional specialties and climate
- Provide practical, actionable advice
- Make recommendations DIFFERENT based on the farmer's specific location, soil type, season, and experience level
- Do NOT provide generic recommendations - customize based on the input data
`
}

// Mock function for development/testing when API key is not available
export function getMockCropRecommendations(input?: CropRecommendationInput): CropRecommendationResponse {
  // Customize recommendations based on input if provided
  const location = input?.location
  const soilType = input?.soilType?.toLowerCase() || ''
  const season = input?.season?.toLowerCase() || ''
  const waterAvailability = input?.waterAvailability?.toLowerCase() || ''
  
  const isNorthIndia = location?.state?.toLowerCase().includes('punjab') || 
                      location?.state?.toLowerCase().includes('haryana') ||
                      location?.state?.toLowerCase().includes('uttar pradesh') ||
                      location?.state?.toLowerCase().includes('delhi')
  
  const isSouthIndia = location?.state?.toLowerCase().includes('karnataka') ||
                      location?.state?.toLowerCase().includes('tamil nadu') ||
                      location?.state?.toLowerCase().includes('andhra pradesh') ||
                      location?.state?.toLowerCase().includes('telangana') ||
                      location?.state?.toLowerCase().includes('kerala')
  
  const isEastIndia = location?.state?.toLowerCase().includes('west bengal') ||
                     location?.state?.toLowerCase().includes('bihar') ||
                     location?.state?.toLowerCase().includes('jharkhand') ||
                     location?.state?.toLowerCase().includes('odisha')
  
  // Default Maharashtra/Central India recommendations
  let crops = [
    {
      name: 'Soybean',
      suitabilityScore: 92,
      reason: `Soybean is highly suitable for your region with ${soilType || 'black'} soil and ${season || 'current'} season conditions. Excellent market demand and established supply chains.`,
      expectedYield: '18-22 quintals per hectare',
      riskLevel: 'Low' as const
    },
    {
      name: 'Cotton',
      suitabilityScore: 87,
      reason: `Cotton thrives in your soil conditions with moderate rainfall. The region's temperature patterns make it an excellent choice for commercial cultivation with good market demand.`,
      expectedYield: '20-25 quintals per hectare',
      riskLevel: 'Medium' as const
    },
    {
      name: 'Tur (Pigeon Pea)',
      suitabilityScore: 81,
      reason: `Tur is well-adapted to your local climate and soil conditions. ${waterAvailability.includes('limited') ? 'Requires less water and can withstand drought conditions' : 'Grows well with moderate water availability'}, making it a reliable choice.`,
      expectedYield: '15-20 quintals per hectare',
      riskLevel: 'Low' as const
    }
  ]
  
  // Adjust for North India
  if (isNorthIndia) {
    crops = [
      {
        name: 'Wheat',
        suitabilityScore: 94,
        reason: `Wheat is highly suitable for North Indian plains with alluvial soil and ${season || 'winter'} season conditions. The region has excellent irrigation facilities and established supply chains.`,
        expectedYield: '40-45 quintals per hectare',
        riskLevel: 'Low' as const
      },
      {
        name: 'Rice',
        suitabilityScore: 89,
        reason: `Rice cultivation is well-established in your region with adequate water supply and suitable climate. Good market demand and government support make it profitable.`,
        expectedYield: '35-40 quintals per hectare',
        riskLevel: 'Medium' as const
      },
      {
        name: 'Sugarcane',
        suitabilityScore: 83,
        reason: `Sugarcane grows well in the fertile alluvial soil with good irrigation. High market value and established sugar mills in your region ensure good returns.`,
        expectedYield: '600-700 quintals per hectare',
        riskLevel: 'Medium' as const
      }
    ]
  }
  
  // Adjust for South India
  if (isSouthIndia) {
    crops = [
      {
        name: 'Rice',
        suitabilityScore: 91,
        reason: `Rice is the staple crop of South India with excellent growing conditions. Monsoon patterns and soil types in your region are ideal for high-yield rice cultivation.`,
        expectedYield: '45-50 quintals per hectare',
        riskLevel: 'Low' as const
      },
      {
        name: 'Ragi (Finger Millet)',
        suitabilityScore: 86,
        reason: `Ragi is drought-resistant and well-suited to red soil conditions in your area. Growing demand for nutritious millets makes it a profitable choice.`,
        expectedYield: '25-30 quintals per hectare',
        riskLevel: 'Low' as const
      },
      {
        name: 'Groundnut',
        suitabilityScore: 82,
        reason: `Groundnut cultivation is traditional in South India with suitable soil and climate. Good oil content and market demand ensure steady income for your farm.`,
        expectedYield: '20-25 quintals per hectare',
        riskLevel: 'Medium' as const
      }
    ]
  }

  // Adjust for East India
  if (isEastIndia) {
    crops = [
      {
        name: 'Rice',
        suitabilityScore: 93,
        reason: `Rice is the primary crop of East India with abundant water and suitable climate. Your region has excellent monsoon patterns for high-yield cultivation.`,
        expectedYield: '50-55 quintals per hectare',
        riskLevel: 'Low' as const
      },
      {
        name: 'Jute',
        suitabilityScore: 88,
        reason: `Jute grows exceptionally well in East Indian climate with high humidity and rainfall. Strong market demand and established processing units in the region.`,
        expectedYield: '40-45 quintals per hectare',
        riskLevel: 'Medium' as const
      },
      {
        name: 'Maize',
        suitabilityScore: 84,
        reason: `Maize is well-suited to your region's soil and climate conditions. Good for both food and fodder, with increasing market demand.`,
        expectedYield: '35-40 quintals per hectare',
        riskLevel: 'Low' as const
      }
    ]
  }

  return {
    recommendedCrops: crops,
    finalRecommendation: {
      bestCrop: crops[0].name,
      reason: `Highest suitability based on ${location?.state || 'your region'}'s soil, rainfall patterns, and historical crop yield data. Low risk with good market prices and established supply chains in your area.`
    }
  }
}