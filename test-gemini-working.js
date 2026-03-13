// Test Gemini API with the latest working model
const apiKey = process.env.VITE_GEMINI_API_KEY || 'AIzaSyAwFQsjJNPW4ZeoOXgQEBNRN6s3LrTES8g'

console.log('Testing Gemini API with latest models...')
console.log('API Key (first 20 chars):', apiKey.substring(0, 20) + '...\n')

async function testModel(modelName) {
  try {
    console.log(`Testing model: ${modelName}...`)
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: 'Recommend 3 crops for Maharashtra farmers with black soil. Return as JSON with name, suitability (0-100), and reason.'
          }]
        }]
      })
    })

    const data = await response.json()
    
    if (response.ok) {
      console.log(`✅ ${modelName} is WORKING!`)
      console.log('Response:', data.candidates?.[0]?.content?.parts?.[0]?.text?.substring(0, 200) + '...')
      return true
    } else {
      console.log(`❌ ${modelName} error:`)
      console.log('Status:', response.status)
      console.log('Error:', data.error?.message || data)
      return false
    }
  } catch (error) {
    console.error(`❌ ${modelName} connection error:`, error.message)
    return false
  }
}

async function testAllModels() {
  const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-pro-latest']
  
  for (const model of models) {
    const success = await testModel(model)
    if (success) {
      console.log(`\n✅ SUCCESS! Use "${model}" in your code`)
      break
    }
  }
}

testAllModels()
