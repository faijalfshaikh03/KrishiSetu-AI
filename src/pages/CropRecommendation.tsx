import { MapPin, Plus } from 'lucide-react'

const CropRecommendation = () => {
  const handleGetRecommendation = () => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Location:', position.coords.latitude, position.coords.longitude)
          // Add your API call here
        },
        (error) => {
          console.error('Error getting location:', error)
          alert('Please enable location access to get recommendations')
        }
      )
    } else {
      alert('Geolocation is not supported by your browser')
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Crop Recommendation</h1>
        <p className="text-gray-400">
          Get crop recommendations based on your location and local weather data from our API-powered model.
        </p>
      </div>

      {/* Get Recommendation Card */}
      <div className="bg-dark-card rounded-xl p-8 border border-dark-border">
        <h2 className="text-2xl font-bold mb-3">Get Recommendation</h2>
        <p className="text-gray-400 mb-6">
          Use your current location to get a crop recommendation based on live weather data.
        </p>

        <button
          onClick={handleGetRecommendation}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
        >
          <MapPin size={20} />
          Use My Current Location
        </button>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110">
        <Plus className="text-white" size={28} />
      </button>
    </div>
  )
}

export default CropRecommendation
