import { useState } from 'react'
import { Plus, AlertCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useThemeClasses } from '../hooks/useThemeClasses'
import WeatherAdviceForm from '../components/WeatherAdviceForm'
import WeatherAdviceResults from '../components/WeatherAdviceResults'
import { getWeatherAdvice, LocationData, WeatherAdviceResponse } from '../lib/weather'

const WeatherAdvice = () => {
  const { t } = useLanguage()
  const themeClasses = useThemeClasses()
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<WeatherAdviceResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGetWeatherAdvice = async (location: LocationData) => {
    setLoading(true)
    setError(null)
    
    try {
      const advice = await getWeatherAdvice(location)
      setResults(advice)
    } catch (err) {
      console.error('Weather advice error:', err)
      setError(err instanceof Error ? err.message : 'Failed to get weather advice')
    } finally {
      setLoading(false)
    }
  }

  const handleNewSearch = () => {
    setResults(null)
    setError(null)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className={`text-4xl font-bold mb-2 ${themeClasses.text.primary}`}>
          {t('dashboard.weatherAdvice')}
        </h1>
        <p className={themeClasses.text.secondary}>
          Get AI-powered weather forecasts and actionable farming tips for your location.
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="text-red-400" size={20} />
          <div>
            <p className="text-red-400 font-medium">Error getting weather advice</p>
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        </div>
      )}

      {!results ? (
        <WeatherAdviceForm onSubmit={handleGetWeatherAdvice} loading={loading} />
      ) : (
        <WeatherAdviceResults results={results} onNewSearch={handleNewSearch} />
      )}

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110">
        <Plus className="text-white" size={28} />
      </button>
    </div>
  )
}

export default WeatherAdvice
