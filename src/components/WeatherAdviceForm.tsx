import { useState } from 'react'
import { MapPin, Loader2, Navigation } from 'lucide-react'
import { LocationData } from '../lib/weather'
import { useLanguage } from '../context/LanguageContext'
import { useThemeClasses } from '../hooks/useThemeClasses'

interface WeatherAdviceFormProps {
  onSubmit: (location: LocationData) => void
  loading: boolean
}

const WeatherAdviceForm = ({ onSubmit, loading }: WeatherAdviceFormProps) => {
  const { t } = useLanguage()
  const themeClasses = useThemeClasses()
  const [useCurrentLocation, setUseCurrentLocation] = useState(true)
  const [manualLocation, setManualLocation] = useState('')
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)

  const handleCurrentLocation = async () => {
    setLocationLoading(true)
    setLocationError(null)

    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser')
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        })
      })

      const { latitude, longitude } = position.coords

      // Try to get location name using reverse geocoding
      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=demo&limit=1`
        )
        const data = await response.json()
        
        let locationData: LocationData = { latitude, longitude }
        
        if (data.results && data.results[0]) {
          const result = data.results[0].components
          locationData = {
            latitude,
            longitude,
            city: result.city || result.town || result.village,
            state: result.state,
            country: result.country,
            district: result.county || result.district
          }
        }

        onSubmit(locationData)
      } catch (geocodeError) {
        // If reverse geocoding fails, still use coordinates
        onSubmit({ latitude, longitude })
      }
    } catch (error) {
      setLocationError(error instanceof Error ? error.message : 'Failed to get location')
    } finally {
      setLocationLoading(false)
    }
  }

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!manualLocation.trim()) return

    // For manual location, we'll use a simple geocoding approach
    // In production, you'd use a proper geocoding service
    const locationData: LocationData = {
      latitude: 0, // Will be geocoded
      longitude: 0, // Will be geocoded
      city: manualLocation.trim()
    }

    onSubmit(locationData)
  }

  return (
    <div className={`${themeClasses.card} rounded-xl p-6 ${themeClasses.border} border`}>
      <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${themeClasses.text.primary}`}>
        <MapPin className="text-green-500" size={20} />
        {t('weather.getAdvice')}
      </h3>
      
      <div className="space-y-4">
        {/* Location Method Selection */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={useCurrentLocation}
              onChange={() => setUseCurrentLocation(true)}
              className="text-green-500"
            />
            <span className={themeClasses.text.secondary}>{t('weather.useCurrentLocation')}</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={!useCurrentLocation}
              onChange={() => setUseCurrentLocation(false)}
              className="text-green-500"
            />
            <span className={themeClasses.text.secondary}>{t('weather.enterCityName')}</span>
          </label>
        </div>

        {/* Current Location Button */}
        {useCurrentLocation ? (
          <div>
            <button
              type="button"
              onClick={handleCurrentLocation}
              disabled={locationLoading || loading}
              className={`${themeClasses.button.primary} px-6 py-3 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {locationLoading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Navigation size={16} />
              )}
              {locationLoading ? t('weather.gettingLocation') : t('weather.getCurrentLocation')}
            </button>
            
            {locationError && (
              <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm">{locationError}</p>
                <p className="text-red-300 text-xs mt-1">
                  Please enable location access or use manual entry
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Manual Location Form */
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${themeClasses.text.secondary}`}>
                {t('weather.cityName')}
              </label>
              <div className="relative">
                <MapPin className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${themeClasses.text.secondary}`} size={18} />
                <input
                  type="text"
                  value={manualLocation}
                  onChange={(e) => setManualLocation(e.target.value)}
                  placeholder={t('weather.enterCity')}
                  className={`w-full pl-12 pr-4 py-3 rounded-lg ${themeClasses.input} focus:outline-none focus:ring-2 focus:ring-green-500`}
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading || !manualLocation.trim()}
              className={`w-full ${themeClasses.button.primary} py-3 px-6 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  {t('weather.gettingWeatherAdvice')}
                </>
              ) : (
                t('weather.getAdvice')
              )}
            </button>
          </form>
        )}

        {/* Info Box */}
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className={`text-blue-400 text-sm`}>
            <strong>{t('weather.adviceIncludes')}</strong>
          </p>
        </div>
      </div>
    </div>
  )
}

export default WeatherAdviceForm