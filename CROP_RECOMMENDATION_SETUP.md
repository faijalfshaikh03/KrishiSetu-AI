# Crop Recommendation System Setup

## Overview
The crop recommendation system uses Google's Gemini AI to provide intelligent crop suggestions based on location, soil type, weather conditions, and farming parameters.

## Features Implemented

### 1. Comprehensive Input Form
- **Location Detection**: GPS-based or manual location entry
- **Farm Details**: Soil type, season, farm size, budget
- **Water Availability**: Irrigation status and water access
- **Previous Crops**: Historical crop data for rotation planning
- **Experience Level**: Farmer's experience for appropriate recommendations

### 2. AI-Powered Recommendations
- **Top 3 Crop Suggestions**: Ranked by suitability
- **Suitability Scores**: Percentage-based scoring (60-95%)
- **Risk Assessment**: Low/Medium/High risk classification
- **Expected Yields**: Realistic yield estimates per hectare
- **Detailed Reasoning**: Explanations based on soil, climate, and regional factors

### 3. Structured Output Format
```
Recommended Crops:
1. Soybean - 92% (Low Risk) - 18-22 quintals/hectare
2. Cotton - 87% (Medium Risk) - 20-25 quintals/hectare  
3. Tur - 81% (Low Risk) - 15-20 quintals/hectare

Best Crop: Soybean
Reason: Optimal soil and rainfall conditions for Maharashtra region
```

## Setup Instructions

### 1. Get Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key

### 2. Configure Environment
1. Open `.env` file
2. Replace the dummy key:
```env
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 3. Test the System
1. Navigate to Crop Recommendation page
2. Fill in location and farm details
3. Click "Get Crop Recommendations"
4. View AI-generated suggestions

## Mock Data Mode
If no API key is configured, the system automatically uses mock data to demonstrate functionality:
- Sample recommendations for Maharashtra region
- Realistic crop suggestions (Soybean, Cotton, Tur)
- Proper formatting and risk assessment

## Technical Implementation

### Components
- `CropRecommendationForm.tsx`: Input form with location detection
- `CropRecommendationResults.tsx`: Results display with structured layout
- `gemini.ts`: AI service integration with prompt engineering
- `crops.ts`: TypeScript interfaces for type safety

### AI Prompt Engineering
The system uses carefully crafted prompts that:
- Request specific JSON output format
- Include regional agricultural knowledge
- Consider multiple factors (soil, climate, market, risk)
- Provide farmer-friendly explanations

### Multilingual Support
- English, Hindi, and Marathi translations
- Culturally appropriate crop names
- Regional farming terminology

## Usage Tips
1. **Location Accuracy**: Use GPS for best results
2. **Complete Information**: Fill all form fields for better recommendations
3. **Seasonal Timing**: Select appropriate season for planting
4. **Local Knowledge**: Combine AI suggestions with local expertise

## Future Enhancements
- Integration with weather APIs for real-time data
- Market price integration for profitability analysis
- Historical yield data from government databases
- Pest and disease risk assessment
- Crop calendar and planting schedules