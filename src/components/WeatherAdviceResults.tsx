import { Thermometer, Droplets, Wind, Eye, RefreshCw } from 'lucide-react'
import { WeatherAdviceResponse } from '../lib/weather'
import { useThemeClasses } from '../hooks/useThemeClasses'

interface WeatherAdviceResultsProps {
  results: WeatherAdviceResponse
  onNewSearch: () => void
}

export default function WeatherAdviceResults({ results, onNewSearch }: WeatherAdviceResultsProps) {
  const themeClasses = useThemeClasses()
  const { weather, advice } = results

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${themeClasses.text.primary}`}>
            Weather Advice for {weather.location.city}
          </h2>
          <p className={`${themeClasses.text.secondary}`}>
            Generated on {new Date(results.generatedAt).toLocaleDateString()}
          </p>
        </div>
        <button onClick={onNewSearch} className={`${themeClasses.button.secondary} px-4 py-2 rounded-lg`}>
          <RefreshCw size={16} />
        </button>
      </div>

      <div className={`${themeClasses.card} rounded-xl p-6 ${themeClasses.border} border`}>
        <h3 className={`text-xl font-bold mb-4 ${themeClasses.text.primary}`}>Current Weather</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`${themeClasses.bg} rounded-lg p-4`}>
            <div className={`flex items-center gap-2 ${themeClasses.text.secondary} text-sm mb-2`}>
              <Thermometer size={16} />
              <span>Temperature</span>
            </div>
            <p className={`text-2xl font-bold ${themeClasses.text.primary}`}>{weather.current.temperature}°C</p>
          </div>
          <div className={`${themeClasses.bg} rounded-lg p-4`}>
            <div className={`flex items-center gap-2 ${themeClasses.text.secondary} text-sm mb-2`}>
              <Droplets size={16} />
              <span>Humidity</span>
            </div>
            <p className={`text-2xl font-bold ${themeClasses.text.primary}`}>{weather.current.humidity}%</p>
          </div>
          <div className={`${themeClasses.bg} rounded-lg p-4`}>
            <div className={`flex items-center gap-2 ${themeClasses.text.secondary} text-sm mb-2`}>
              <Wind size={16} />
              <span>Wind Speed</span>
            </div>
            <p className={`text-2xl font-bold ${themeClasses.text.primary}`}>{weather.current.windSpeed} km/h</p>
          </div>
          <div className={`${themeClasses.bg} rounded-lg p-4`}>
            <div className={`flex items-center gap-2 ${themeClasses.text.secondary} text-sm mb-2`}>
              <Eye size={16} />
              <span>Visibility</span>
            </div>
            <p className={`text-2xl font-bold ${themeClasses.text.primary}`}>{weather.current.visibility} km</p>
          </div>
        </div>
      </div>

      <div className={`${themeClasses.card} rounded-xl p-6 ${themeClasses.border} border`}>
        <h3 className={`text-xl font-bold mb-4 ${themeClasses.text.primary}`}>3-Day Forecast</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: 'Today', data: weather.forecast.today },
            { label: 'Tomorrow', data: weather.forecast.tomorrow },
            { label: 'Day After', data: weather.forecast.dayAfter }
          ].map((day, index) => (
            <div key={index} className={`${themeClasses.bg} rounded-lg p-4`}>
              <h4 className={`font-semibold mb-3 ${themeClasses.text.primary}`}>{day.label}</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className={`${themeClasses.text.secondary}`}>High/Low</span>
                  <span className={`${themeClasses.text.primary}`}>{day.data.high}°/{day.data.low}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${themeClasses.text.secondary}`}>Rain</span>
                  <span className={`${themeClasses.text.primary}`}>{day.data.rainChance}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className={`${themeClasses.card} rounded-xl p-6 ${themeClasses.border} border`}>
          <h3 className={`text-lg font-bold mb-4 ${themeClasses.text.primary}`}>Recommended Crops</h3>
          <div className="flex flex-wrap gap-2">
            {advice.recommendedCrops.map((crop, index) => (
              <span key={index} className={`px-3 py-1 ${themeClasses.bg} rounded-full text-sm`}>
                {crop}
              </span>
            ))}
          </div>
        </div>

        <div className={`${themeClasses.card} rounded-xl p-6 ${themeClasses.border} border`}>
          <h3 className={`text-lg font-bold mb-4 ${themeClasses.text.primary}`}>Irrigation Advice</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className={`${themeClasses.text.secondary}`}>Needed:</span>
              <span>{advice.irrigation.needed ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex justify-between">
              <span className={`${themeClasses.text.secondary}`}>Amount:</span>
              <span>{advice.irrigation.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className={`${themeClasses.text.secondary}`}>Timing:</span>
              <span>{advice.irrigation.timing}</span>
            </div>
          </div>
        </div>
      </div>

      {advice.warnings.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4 text-red-400">Warnings</h3>
          <div className="space-y-2">
            {advice.warnings.map((warning, index) => (
              <p key={index} className="text-red-300">{warning}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}