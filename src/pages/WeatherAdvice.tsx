import { Plus, MapPin, Cloud, Thermometer, Droplets, Wind, CloudRain, Sprout, Wheat } from 'lucide-react'
import { FormEvent, useState } from 'react'

interface WeatherData {
  location: string
  condition: string
  temperature: string
  humidity: string
  windSpeed: string
  rainChance: string
  suitableActivities: string[]
  recommendedCrops: string[]
  farmingRecommendations: {
    category: string
    title: string
    description: string
  }[]
}

const WeatherAdvice = () => {
  const [location, setLocation] = useState('Nashik')
  const [weatherData, setWeatherData] = useState<WeatherData>({
    location: 'Nashik',
    condition: 'Partly Cloudy',
    temperature: '23.3°C',
    humidity: '69%',
    windSpeed: '8.1 km/h',
    rainChance: '25%',
    suitableActivities: ['Irrigate fields', 'Apply fertilizers', 'Inspect crops for pests'],
    recommendedCrops: ['Wheat', 'Jowar', 'Chickpea'],
    farmingRecommendations: [
      {
        category: 'Irrigation',
        title: 'Use drip irrigation',
        description: 'With partly cloudy conditions, drip irrigation can save up to 40% water while keeping soil moisture optimal for wheat and onion crops.'
      },
      {
        category: 'Crop Care',
        title: 'Monitor crop health',
        description: 'Check crops for early signs of pest infestation or fungal disease given current weather conditions.'
      }
    ]
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Simulate API call with the location
    console.log('Getting weather for:', location)
    // In production, you would call your weather API here
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Weather Prediction & Advice</h1>
        <p className="text-gray-400">
          Get AI-powered weather forecasts and actionable farming tips for your location.
        </p>
      </div>

      {/* Enter Location Card */}
      <div className="bg-dark-card rounded-xl p-8 border border-dark-border mb-6">
        <h2 className="text-2xl font-bold mb-3">Enter Location</h2>
        <p className="text-gray-400 mb-6">
          Enter a city name to get the weather forecast and farming advice.
        </p>

        <form onSubmit={handleSubmit} className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Nashik"
                className="w-full pl-12 pr-4 py-3 bg-gray-700 text-white rounded-lg border-none outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Get Analysis
            </button>
          </div>
        </form>
      </div>

      {/* Weather Display */}
      <div className="bg-dark-card rounded-xl p-8 border border-dark-border mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Weather for {weatherData.location}</h2>
          <div className="flex items-center gap-2 text-gray-400">
            <Cloud size={24} />
            <span className="text-lg">{weatherData.condition}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
              <Thermometer size={16} />
              <span>Temperature</span>
            </div>
            <p className="text-3xl font-bold">{weatherData.temperature}</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
              <Droplets size={16} />
              <span>Humidity</span>
            </div>
            <p className="text-3xl font-bold">{weatherData.humidity}</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
              <Wind size={16} />
              <span>Wind Speed</span>
            </div>
            <p className="text-3xl font-bold">{weatherData.windSpeed}</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
              <CloudRain size={16} />
              <span>Chance of Rain</span>
            </div>
            <p className="text-3xl font-bold">{weatherData.rainChance}</p>
          </div>
        </div>

        {/* Activities and Crops */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sprout className="text-orange-400" size={20} />
              <h3 className="text-lg font-bold">Suitable Activities</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {weatherData.suitableActivities.map((activity, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-800 rounded-full text-sm border border-gray-700"
                >
                  {activity}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Wheat className="text-orange-400" size={20} />
              <h3 className="text-lg font-bold">Recommended for Harvest</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {weatherData.recommendedCrops.map((crop, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-800 rounded-full text-sm border border-gray-700"
                >
                  {crop}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Farming Recommendations */}
      <div className="bg-dark-card rounded-xl p-8 border border-dark-border">
        <div className="flex items-center gap-2 mb-6">
          <Sprout className="text-green-500" size={24} />
          <h2 className="text-2xl font-bold">Farming Recommendations</h2>
        </div>

        <div className="space-y-4">
          {weatherData.farmingRecommendations.map((rec, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6">
              <div className="mb-2">
                <span className="inline-block px-3 py-1 bg-gray-700 text-green-400 text-xs font-semibold rounded-full">
                  {rec.category}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{rec.title}</h3>
              <p className="text-gray-400">{rec.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110">
        <Plus className="text-white" size={28} />
      </button>
    </div>
  )
}

export default WeatherAdvice
