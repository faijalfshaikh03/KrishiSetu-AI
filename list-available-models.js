// List available models for your API key
const apiKey = process.env.VITE_GEMINI_API_KEY || 'AIzaSyAwFQsjJNPW4ZeoOXgQEBNRN6s3LrTES8g'

console.log('Listing available models for your API key...')
console.log('API Key (first 20 chars):', apiKey.substring(0, 20) + '...\n')

async function listModels() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`)
    const data = await response.json()
    
    if (response.ok) {
      console.log('✅ Available Models:')
      if (data.models && data.models.length > 0) {
        data.models.forEach(model => {
          console.log(`  - ${model.name}`)
          if (model.supportedGenerationMethods) {
            console.log(`    Methods: ${model.supportedGenerationMethods.join(', ')}`)
          }
        })
      } else {
        console.log('  No models available')
      }
    } else {
      console.log('❌ Error listing models:')
      console.log('Status:', response.status)
      console.log('Error:', data.error?.message || data)
    }
  } catch (error) {
    console.error('❌ Connection error:', error.message)
  }
}

listModels()
