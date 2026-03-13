import { Award, TrendingUp, AlertTriangle, CheckCircle, Star } from 'lucide-react'
import { CropRecommendationResponse } from '../types/crops'

interface CropRecommendationResultsProps {
  results: CropRecommendationResponse
  onNewRecommendation: () => void
}

const CropRecommendationResults = ({ results, onNewRecommendation }: CropRecommendationResultsProps) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-400 bg-green-500/10 border-green-500/20'
      case 'Medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
      case 'High': return 'text-red-400 bg-red-500/10 border-red-500/20'
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20'
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'Low': return <CheckCircle size={16} />
      case 'Medium': return <AlertTriangle size={16} />
      case 'High': return <AlertTriangle size={16} />
      default: return <AlertTriangle size={16} />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Award size={24} />
          Crop Recommendations
        </h2>
        <p className="text-green-100">
          Based on your location and farm conditions • Generated on {new Date(results.generatedAt).toLocaleDateString()}
        </p>
      </div>
      {/* Recommended Crops */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Recommended Crops</h3>
        
        {results.recommendedCrops.map((crop, index) => (
          <div key={crop.name} className="bg-dark-card rounded-xl p-6 border border-dark-border">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">{crop.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-400" size={16} />
                      <span className="text-yellow-400 font-semibold">{crop.suitabilityScore}%</span>
                    </div>
                    <span className="text-gray-400">Suitability</span>
                  </div>
                </div>
              </div>
              
              <div className={`px-3 py-1 rounded-full border text-sm font-medium flex items-center gap-1 ${getRiskColor(crop.riskLevel)}`}>
                {getRiskIcon(crop.riskLevel)}
                {crop.riskLevel} Risk
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-dark-bg rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="text-blue-400" size={16} />
                  <span className="text-sm font-medium text-gray-300">Expected Yield</span>
                </div>
                <p className="text-white font-semibold">{crop.expectedYield}</p>
              </div>
            </div>

            <div className="bg-dark-bg rounded-lg p-4">
              <h5 className="font-medium text-gray-300 mb-2">Why this crop is suitable:</h5>
              <p className="text-gray-400 text-sm leading-relaxed">{crop.reason}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Final Recommendation */}
      <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
            <Award className="text-white" size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-green-400">Best Crop to Grow</h3>
            <p className="text-gray-400">Our top recommendation for your farm</p>
          </div>
        </div>
        
        <div className="bg-dark-card rounded-lg p-4 mb-4">
          <h4 className="text-2xl font-bold text-white mb-2">{results.finalRecommendation.bestCrop}</h4>
          <p className="text-gray-300 leading-relaxed">{results.finalRecommendation.reason}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onNewRecommendation}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Get New Recommendation
        </button>
        <button className="flex-1 bg-dark-card hover:bg-dark-hover border border-dark-border text-white font-semibold py-3 px-6 rounded-lg transition-colors">
          Save Results
        </button>
      </div>
    </div>
  )
}

export default CropRecommendationResults