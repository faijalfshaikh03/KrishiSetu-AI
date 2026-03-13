import { useState } from 'react'
import { Plus, AlertCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useThemeClasses } from '../hooks/useThemeClasses'
import DiseaseDetectionForm from '../components/DiseaseDetectionForm'
import DiseaseDetectionResults from '../components/DiseaseDetectionResults'

interface DiseaseDetectionResponse {
  disease: string
  confidence: number
  description: string
  symptoms: string[]
  treatment: string[]
  prevention: string[]
}

const DiseaseDetection = () => {
  const { t } = useLanguage()
  const themeClasses = useThemeClasses()
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<DiseaseDetectionResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDetectDisease = async (cropName: string, symptoms: string) => {
    setLoading(true)
    setError(null)
    
    try {
      // Placeholder for disease detection logic
      // Will be integrated later
      console.log('Disease detection for:', cropName, symptoms)
      setError('Disease detection integration coming soon')
    } catch (err) {
      console.error('Disease detection error:', err)
      setError(err instanceof Error ? err.message : 'Failed to detect disease')
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
          Disease Detection
        </h1>
        <p className={themeClasses.text.secondary}>
          Identify crop diseases early and get treatment recommendations to protect your harvest.
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="text-red-400" size={20} />
          <div>
            <p className="text-red-400 font-medium">Error detecting disease</p>
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        </div>
      )}

      {!results ? (
        <DiseaseDetectionForm onSubmit={handleDetectDisease} loading={loading} />
      ) : (
        <DiseaseDetectionResults results={results} onNewSearch={handleNewSearch} />
      )}

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110">
        <Plus className="text-white" size={28} />
      </button>
    </div>
  )
}

export default DiseaseDetection
