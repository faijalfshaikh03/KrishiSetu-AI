import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY

if (!apiKey) {
  throw new Error('Missing Gemini API key. Please add VITE_GEMINI_API_KEY to your .env file')
}

const genAI = new GoogleGenerativeAI(apiKey)

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
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `
You are an expert agricultural advisor for Indian farmers. Based on the following farmer data, provide crop recommendations in the exact JSON format specified below.

Farmer Data:
- Location: Latitude ${input.location.latitude}, Longitude ${input.location.longitude}
- Region: ${input.location.region || 'Not specified'}
- State: ${input.location.state || 'Not specified'}
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
`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Parse the JSON response
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No JSON found in response')
      }
      
      const parsedResponse = JSON.parse(jsonMatch[0])
      
      // Validate the response structure
      if (!parsedResponse.recommendedCrops || !Array.isArray(parsedResponse.recommendedCrops)) {
        throw new Error('Invalid response structure')
      }
      
      return parsedResponse as CropRecommendationResponse
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', text)
      throw new Error('Failed to parse AI response')
    }
  } catch (error) {
    console.error('Gemini API error:', error)
    throw new Error('Failed to get crop recommendations. Please try again.')
  }
}

// Mock function for development/testing when API key is not available
export function getMockCropRecommendations(input?: CropRecommendationInput): CropRecommendationResponse {
  // Customize recommendations based on input if provided
  const location = input?.location
  const isNorthIndia = location?.state?.toLowerCase().includes('punjab') || 
                      location?.state?.toLowerCase().includes('haryana') ||
                      location?.state?.toLowerCase().includes('uttar pradesh')
  
  const isSouthIndia = location?.state?.toLowerCase().includes('karnataka') ||
                      location?.state?.toLowerCase().includes('tamil nadu') ||
                      location?.state?.toLowerCase().includes('andhra pradesh')
  
  // Default Maharashtra/Central India recommendations
  let crops = [
    {
      name: 'Soybean',
      suitabilityScore: 92,
      reason: 'Soybean is highly suitable because black soil and 600-700mm rainfall conditions match the crop\'s optimal growth requirements in Maharashtra. The current season timing is perfect for soybean cultivation.',
      expectedYield: '18-22 quintals per hectare',
      riskLevel: 'Low' as const
    },
    {
      name: 'Cotton',
      suitabilityScore: 87,
      reason: 'Cotton thrives in black cotton soil with moderate rainfall. The region\'s temperature patterns and soil fertility make it an excellent choice for commercial cultivation with good market demand.',
      expectedYield: '20-25 quintals per hectare',
      riskLevel: 'Medium' as const
    },
    {
      name: 'Tur (Pigeon Pea)',
      suitabilityScore: 81,
      reason: 'Tur is well-adapted to the local climate and soil conditions. It requires less water and can withstand drought conditions, making it a reliable choice for sustainable farming.',
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
        reason: 'Wheat is highly suitable for North Indian plains with alluvial soil and winter season conditions. The region has excellent irrigation facilities and established supply chains.',
        expectedYield: '40-45 quintals per hectare',
        riskLevel: 'Low' as const
      },
      {
        name: 'Rice',
        suitabilityScore: 89,
        reason: 'Rice cultivation is well-established in the region with adequate water supply and suitable climate. Good market demand and government support make it profitable.',
        expectedYield: '35-40 quintals per hectare',
        riskLevel: 'Medium' as const
      },
      {
        name: 'Sugarcane',
        suitabilityScore: 83,
        reason: 'Sugarcane grows well in the fertile alluvial soil with good irrigation. High market value and established sugar mills in the region ensure good returns.',
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
        reason: 'Rice is the staple crop of South India with excellent growing conditions. Monsoon patterns and soil types are ideal for high-yield rice cultivation.',
        expectedYield: '45-50 quintals per hectare',
        riskLevel: 'Low' as const
      },
      {
        name: 'Ragi (Finger Millet)',
        suitabilityScore: 86,
        reason: 'Ragi is drought-resistant and well-suited to red soil conditions. Growing demand for nutritious millets makes it a profitable choice.',
        expectedYield: '25-30 quintals per hectare',
        riskLevel: 'Low' as const
      },
      {
        name: 'Groundnut',
        suitabilityScore: 82,
        reason: 'Groundnut cultivation is traditional in South India with suitable soil and climate. Good oil content and market demand ensure steady income.',
        expectedYield: '20-25 quintals per hectare',
        riskLevel: 'Medium' as const
      }
    ]
  }

  return {
    recommendedCrops: crops,
    finalRecommendation: {
      bestCrop: crops[0].name,
      reason: `Highest suitability based on ${location?.state || 'regional'} soil, rainfall patterns, and historical crop yield data. Low risk with good market prices and established supply chains.`
    }
  }
}