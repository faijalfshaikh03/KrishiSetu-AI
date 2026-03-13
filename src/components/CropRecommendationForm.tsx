import { useState } from 'react'
import { MapPin, Loader2, Droplets, Calendar, DollarSign } from 'lucide-react'
import { CropRecommendationInput, LocationData, FarmData } from '../types/crops'
import { useLanguage } from '../context/LanguageContext'

interface CropRecommendationFormProps {
  onSubmit: (data: CropRecommendationInput) => void
  loading: boolean
}

const CropRecommendationForm = ({ onSubmit, loading }: CropRecommendationFormProps) => {
  const { t } = useLanguage()
  const [useCurrentLocation, setUseCurrentLocation] = useState(true)
  const [location, setLocation] = useState<Partial<LocationData>>({})
  const [farmData, setFarmData] = useState<Partial<FarmData>>({
    soilType: '',
    season: '',
    farmSize: 0,
    previousCrops: [],
    budget: 0,
    waterAvailability: '',
    farmingExperience: ''
  })
  const [locationLoading, setLocationLoading] = useState(false)

  const soilTypes = [
    'Black Soil (Regur)',
    'Red Soil',
    'Alluvial Soil',
    'Laterite Soil',
    'Sandy Soil',
    'Clay Soil',
    'Loamy Soil'
  ]

  const seasons = [
    'Kharif (Monsoon)',
    'Rabi (Winter)',
    'Zaid (Summer)',
    'Year Round'
  ]

  const waterAvailabilityOptions = [
    'Abundant (Irrigated)',
    'Moderate (Partial Irrigation)',
    'Limited (Rain-fed)',
    'Scarce (Drought-prone)'
  ]

  const experienceLevels = [
    'Beginner (0-2 years)',
    'Intermediate (3-10 years)',
    'Experienced (10+ years)'
  ]

  const getCurrentLocation = () => {
    setLocationLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          setLocation({ latitude, longitude })
          
          // Try to get location details using reverse geocoding
          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=demo&limit=1`
            )
            const data = await response.json()
            if (data.results && data.results[0]) {
              const result = data.results[0].components
              setLocation(prev => ({
                ...prev,
                latitude,
                longitude,
                state: result.state,
                district: result.county || result.district,
                city: result.city || result.town || result.village
              }))
            }
          } catch (error) {
            console.error('Geocoding error:', error)
          }
          
          setLocationLoading(false)
        },
        (error) => {
          console.error('Location error:', error)
          alert('Please enable location access to get recommendations')
          setLocationLoading(false)
        }
      )
    } else {
      alert('Geolocation is not supported by your browser')
      setLocationLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (useCurrentLocation && (!location.latitude || !location.longitude)) {
      alert('Please get your current location first')
      return
    }

    const submissionData: CropRecommendationInput = {
      location: location as LocationData,
      farmData
    }

    onSubmit(submissionData)
  }

  const handlePreviousCropsChange = (crop: string) => {
    setFarmData(prev => ({
      ...prev,
      previousCrops: prev.previousCrops?.includes(crop)
        ? prev.previousCrops.filter(c => c !== crop)
        : [...(prev.previousCrops || []), crop]
    }))
  }

  const commonCrops = ['Rice', 'Wheat', 'Cotton', 'Soybean', 'Sugarcane', 'Maize', 'Tur', 'Gram', 'Groundnut', 'Sunflower']

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Location Section */}
      <div className="bg-dark-card rounded-xl p-6 border border-dark-border">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MapPin className="text-green-500" size={20} />
          {t('cropRecommendation.locationInfo')}
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={useCurrentLocation}
                onChange={() => setUseCurrentLocation(true)}
                className="text-green-500"
              />
              {t('cropRecommendation.useCurrentLocation')}
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={!useCurrentLocation}
                onChange={() => setUseCurrentLocation(false)}
                className="text-green-500"
              />
              {t('cropRecommendation.enterManually')}
            </label>
          </div>

          {useCurrentLocation ? (
            <div>
              <button
                type="button"
                onClick={getCurrentLocation}
                disabled={locationLoading}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                {locationLoading ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <MapPin size={16} />
                )}
                {locationLoading ? 'Getting Location...' : 'Get Current Location'}
              </button>
              
              {location.latitude && location.longitude && (
                <div className="mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-400 text-sm">
                    <strong>Location:</strong> {location.city}, {location.district}, {location.state}
                  </p>
                  <p className="text-gray-400 text-xs">
                    Coordinates: {location.latitude?.toFixed(4)}, {location.longitude?.toFixed(4)}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="State"
                value={location.state || ''}
                onChange={(e) => setLocation(prev => ({ ...prev, state: e.target.value }))}
                className="px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white"
              />
              <input
                type="text"
                placeholder="District"
                value={location.district || ''}
                onChange={(e) => setLocation(prev => ({ ...prev, district: e.target.value }))}
                className="px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white"
              />
            </div>
          )}
        </div>
      </div>

      {/* Farm Details Section */}
      <div className="bg-dark-card rounded-xl p-6 border border-dark-border">
        <h3 className="text-xl font-bold mb-4">Farm Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Soil Type</label>
            <select
              value={farmData.soilType}
              onChange={(e) => setFarmData(prev => ({ ...prev, soilType: e.target.value }))}
              className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white"
            >
              <option value="">Select Soil Type</option>
              {soilTypes.map(soil => (
                <option key={soil} value={soil}>{soil}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <Calendar size={16} />
              Season
            </label>
            <select
              value={farmData.season}
              onChange={(e) => setFarmData(prev => ({ ...prev, season: e.target.value }))}
              className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white"
            >
              <option value="">Select Season</option>
              {seasons.map(season => (
                <option key={season} value={season}>{season}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Farm Size (acres)</label>
            <input
              type="number"
              value={farmData.farmSize || ''}
              onChange={(e) => setFarmData(prev => ({ ...prev, farmSize: Number(e.target.value) }))}
              className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white"
              placeholder="Enter farm size"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <DollarSign size={16} />
              Budget (₹)
            </label>
            <input
              type="number"
              value={farmData.budget || ''}
              onChange={(e) => setFarmData(prev => ({ ...prev, budget: Number(e.target.value) }))}
              className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white"
              placeholder="Enter budget"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <Droplets size={16} />
              Water Availability
            </label>
            <select
              value={farmData.waterAvailability}
              onChange={(e) => setFarmData(prev => ({ ...prev, waterAvailability: e.target.value }))}
              className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white"
            >
              <option value="">Select Water Availability</option>
              {waterAvailabilityOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Farming Experience</label>
            <select
              value={farmData.farmingExperience}
              onChange={(e) => setFarmData(prev => ({ ...prev, farmingExperience: e.target.value }))}
              className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white"
            >
              <option value="">Select Experience Level</option>
              {experienceLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Previous Crops */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Previous Crops (Select all that apply)</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {commonCrops.map(crop => (
              <label key={crop} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={farmData.previousCrops?.includes(crop) || false}
                  onChange={() => handlePreviousCropsChange(crop)}
                  className="text-green-500"
                />
                {crop}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Getting Recommendations...
          </>
        ) : (
          'Get Crop Recommendations'
        )}
      </button>
    </form>
  )
}

export default CropRecommendationForm