import { Plus, TrendingDown } from 'lucide-react'
import ProfitAnalyzer from '../components/ProfitAnalyzer'
import PriceChart from '../components/PriceChart'

const PricePrediction = () => {
  const handleAnalyze = (data: { crop: string; mandi: string; quantity: number }) => {
    console.log('Analyzing:', data)
    // Add your prediction logic here
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Crop Price Prediction</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Predict the price of a crop based on region and date using our AI-powered model.
        </p>
      </div>

      <ProfitAnalyzer onAnalyze={handleAnalyze} />
      <PriceChart />

      {/* Recommendation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-6">
        {/* Sell Today Card */}
        <div className="bg-white dark:bg-dark-card rounded-xl p-6 border-l-4 border-green-500 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-green-600 dark:text-green-500">SELL TODAY</h3>
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full">
              Current Rate
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">₹2,545</p>
        </div>

        {/* Sell in 4 Days Card */}
        <div className="bg-white dark:bg-dark-card rounded-xl p-6 border-l-4 border-orange-500 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-orange-600 dark:text-orange-500">SELL IN 4 DAYS</h3>
            <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-semibold rounded-full">
              Predicted Rate
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Total Revenue</p>
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="text-red-500" size={20} />
            <span className="text-red-600 dark:text-red-400 font-semibold">-4.24% return</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">₹2,437</p>
        </div>
      </div>

      {/* Market Factors Section */}
      <div className="bg-gray-900 dark:bg-gray-950 rounded-xl p-6 border border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-300">Top Market Factors</h3>
          <div className="text-right">
            <p className="text-gray-400 text-sm">AI Confidence</p>
            <p className="text-4xl font-bold text-white">67%</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700">
            Historical baseline pricing for Wheat
          </span>
          <span className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700">
            Regional variations for Nashik Mandi
          </span>
          <span className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700">
            Standard seasonal supply patterns
          </span>
        </div>

        <p className="text-gray-500 text-xs mt-4 text-center">
          Based on historical mandi price trends (2020–2025). Models update dynamically on available live data.
        </p>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110">
        <Plus className="text-white" size={28} />
      </button>
    </div>
  )
}

export default PricePrediction
