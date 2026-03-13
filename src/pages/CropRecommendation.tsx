import { useState } from 'react'
import { Plus, AlertCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import CropRecommendationForm from '../components/CropRecommendationForm'
import CropRecommendationResults from '../components/CropRecommendationResults'
import { getCropRecommendations, getMockCropRecommendations } from '../lib/gemini'
import { CropRecommendationInput, CropRecommendationResponse } from '../types/crops'

const CropRecommendation = () => {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<CropRecommendationResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGetRecommendations = async (input: CropRecommendationInput) => {
    setLoading(true)
    setError(null)
    
    try {
      // Check if Gemini API key is available
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY
      let recommendations: CropRecommendationResponse
      
      if (!apiKey || apiKey === 'AIzaSyDummy_Key_Replace_With_Real_Key') {
        // Use mock data if no API key
        console.log('Using mock data - Add real Gemini API key to .env file')
        recommendations = getMockCropRecommendations(input)
      } else {
        try {
          // Try to use real API
          recommendations = await getCropRecommendations(input)
        } catch (apiError) {
          // If API fails, fall back to mock data
          console.log('API failed, using mock data:', apiError)
          recommendations = getMockCropRecommendations(input)
          
          // Show a warning but don't treat it as an error
          setError('Using demo data - Gemini API connection failed. Please check your API key configuration.')
        }
      }
      
      // Add metadata
      const enhancedResults: CropRecommendationResponse = {
        ...recommendations,
        generatedAt: new Date().toISOString(),
        location: input.location
      }
      
      setResults(enhancedResults)
    } catch (err) {
      console.error('Recommendation error:', err)
      // Even if everything fails, provide mock data
      try {
        const mockRecommendations = getMockCropRecommendations(input)
        const enhancedResults: CropRecommendationResponse = {
          ...mockRecommendations,
          generatedAt: new Date().toISOString(),
          location: input.location
        }
        setResults(enhancedResults)
        setError('Using demo data - System temporarily unavailable. Please try again later.')
      } catch (mockError) {
        setError('System error - Please refresh the page and try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleNewRecommendation = () => {
    setResults(null)
    setError(null)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{t('cropRecommendation.title')}</h1>
        <p className="text-gray-400">
          {t('cropRecommendation.subtitle')}
        </p>
      </div>

      {error && (
        <div className={`mb-6 rounded-xl p-4 flex items-center gap-3 ${
          error.includes('demo data') 
            ? 'bg-yellow-500/10 border border-yellow-500/20' 
            : 'bg-red-500/10 border border-red-500/20'
        }`}>
          <AlertCircle className={error.includes('demo data') ? 'text-yellow-400' : 'text-red-400'} size={20} />
          <div>
            <p className={`font-medium ${error.includes('demo data') ? 'text-yellow-400' : 'text-red-400'}`}>
              {error.includes('demo data') ? 'Demo Mode Active' : 'Error getting recommendations'}
            </p>
            <p className={`text-sm ${error.includes('demo data') ? 'text-yellow-300' : 'text-red-300'}`}>
              {error}
            </p>
          </div>
        </div>
      )}

      {!results ? (
        <CropRecommendationForm onSubmit={handleGetRecommendations} loading={loading} />
      ) : (
        <CropRecommendationResults results={results} onNewRecommendation={handleNewRecommendation} />
      )}

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110">
        <Plus className="text-white" size={28} />
      </button>
    </div>
  )
}

export default CropRecommendation
