import { AlertTriangle, CheckCircle, Zap } from 'lucide-react'
import { useThemeClasses } from '../hooks/useThemeClasses'

interface DiseaseDetectionResponse {
  disease: string
  confidence: number
  description: string
  symptoms: string[]
  treatment: string[]
  prevention: string[]
}

interface DiseaseDetectionResultsProps {
  results: DiseaseDetectionResponse
  onNewSearch: () => void
}

const DiseaseDetectionResults = ({ results, onNewSearch }: DiseaseDetectionResultsProps) => {
  const themeClasses = useThemeClasses()

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-red-400'
    if (confidence >= 0.6) return 'text-orange-400'
    return 'text-yellow-400'
  }

  const getConfidenceBgColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-red-500/10'
    if (confidence >= 0.6) return 'bg-orange-500/10'
    return 'bg-yellow-500/10'
  }

  return (
    <div className="space-y-6">
      {/* Disease Overview */}
      <div className={`${themeClasses.card} rounded-xl p-8 ${themeClasses.border} border`}>
        <div className="flex items-start gap-6">
          <div className={`w-16 h-16 ${getConfidenceBgColor(results.confidence)} rounded-lg flex items-center justify-center flex-shrink-0`}>
            <AlertTriangle className={`${getConfidenceColor(results.confidence)}`} size={32} />
          </div>
          <div className="flex-1">
            <h2 className={`text-3xl font-bold mb-2 ${themeClasses.text.primary}`}>
              {results.disease}
            </h2>
            <p className={`${themeClasses.text.secondary} mb-4`}>
              {results.description}
            </p>
            <div className="flex items-center gap-4">
              <div>
                <p className={`text-sm ${themeClasses.text.secondary}`}>Confidence Level</p>
                <p className={`text-2xl font-bold ${getConfidenceColor(results.confidence)}`}>
                  {(results.confidence * 100).toFixed(0)}%
                </p>
              </div>
              <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${results.confidence >= 0.8 ? 'bg-red-500' : results.confidence >= 0.6 ? 'bg-orange-500' : 'bg-yellow-500'}`}
                  style={{ width: `${results.confidence * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Symptoms */}
      <div className={`${themeClasses.card} rounded-xl p-8 ${themeClasses.border} border`}>
        <h3 className={`text-2xl font-bold mb-6 ${themeClasses.text.primary}`}>
          Symptoms to Look For
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.symptoms.map((symptom, index) => (
            <div key={index} className={`flex items-start gap-3 p-4 rounded-lg ${themeClasses.bg}`}>
              <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
              <p className={themeClasses.text.primary}>{symptom}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Treatment */}
      <div className={`${themeClasses.card} rounded-xl p-8 ${themeClasses.border} border`}>
        <h3 className={`text-2xl font-bold mb-6 ${themeClasses.text.primary}`}>
          Treatment Recommendations
        </h3>
        <div className="space-y-3">
          {results.treatment.map((treatment, index) => (
            <div key={index} className={`flex items-start gap-3 p-4 rounded-lg ${themeClasses.bg}`}>
              <Zap className="text-blue-400 flex-shrink-0 mt-1" size={20} />
              <p className={themeClasses.text.primary}>{treatment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Prevention */}
      <div className={`${themeClasses.card} rounded-xl p-8 ${themeClasses.border} border`}>
        <h3 className={`text-2xl font-bold mb-6 ${themeClasses.text.primary}`}>
          Prevention Measures
        </h3>
        <div className="space-y-3">
          {results.prevention.map((measure, index) => (
            <div key={index} className={`flex items-start gap-3 p-4 rounded-lg ${themeClasses.bg}`}>
              <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
              <p className={themeClasses.text.primary}>{measure}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onNewSearch}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Analyze Another Plant
        </button>
        <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-colors">
          Save Report
        </button>
      </div>
    </div>
  )
}

export default DiseaseDetectionResults
