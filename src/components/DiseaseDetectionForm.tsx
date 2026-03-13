import { useState } from 'react'
import { Upload, Loader } from 'lucide-react'
import { useThemeClasses } from '../hooks/useThemeClasses'

interface DiseaseDetectionFormProps {
  onSubmit: (cropName: string, symptoms: string) => Promise<void>
  loading: boolean
}

const DiseaseDetectionForm = ({ onSubmit, loading }: DiseaseDetectionFormProps) => {
  const themeClasses = useThemeClasses()
  const [cropName, setCropName] = useState('')
  const [symptoms, setSymptoms] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cropName.trim() || !symptoms.trim()) {
      alert('Please fill in all fields')
      return
    }
    await onSubmit(cropName, symptoms)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className={`${themeClasses.card} rounded-xl p-8 ${themeClasses.border} border`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form Fields */}
          <div className="space-y-6">
            {/* Crop Name */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                Crop Name
              </label>
              <input
                type="text"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                placeholder="e.g., Tomato, Wheat, Rice"
                className={`w-full px-4 py-3 rounded-lg ${themeClasses.input} border ${themeClasses.border} focus:outline-none focus:border-green-500 transition-colors`}
                disabled={loading}
              />
            </div>

            {/* Symptoms */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                Describe Symptoms
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Describe the symptoms you observe on the plant (e.g., yellow spots, wilting, brown patches)"
                rows={4}
                className={`w-full px-4 py-3 rounded-lg ${themeClasses.input} border ${themeClasses.border} focus:outline-none focus:border-green-500 transition-colors resize-none`}
                disabled={loading}
              />
            </div>
          </div>

          {/* Right Column - Image Upload */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
              Upload Plant Image (Optional)
            </label>
            <div className={`border-2 border-dashed ${themeClasses.border} rounded-lg p-6 text-center cursor-pointer hover:border-green-500 transition-colors`}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
                disabled={loading}
              />
              <label htmlFor="image-upload" className="cursor-pointer block">
                {imagePreview ? (
                  <div className="space-y-2">
                    <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                    <p className={`text-sm ${themeClasses.text.secondary}`}>Click to change image</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className={`mx-auto ${themeClasses.text.secondary}`} size={32} />
                    <p className={`text-sm font-medium ${themeClasses.text.primary}`}>
                      Click to upload or drag and drop
                    </p>
                    <p className={`text-xs ${themeClasses.text.secondary}`}>
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader size={20} className="animate-spin" />
                Analyzing...
              </>
            ) : (
              'Detect Disease'
            )}
          </button>
        </div>
      </div>
    </form>
  )
}

export default DiseaseDetectionForm
