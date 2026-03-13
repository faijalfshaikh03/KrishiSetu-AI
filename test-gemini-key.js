// Simple test to verify Gemini API key is working
const apiKey = process.env.VITE_GEMINI_API_KEY || 'AIzaSyAwFQsjJNPW4ZeoOXgQEBNRN6s3LrTES8g'

console.log('Testing Gemini API Key...')
console.log('API Key (first 20 chars):', apiKey.substring(0, 20) + '...')

// Test with different models
async function testModel(modelName) {
  try {
    console.log(`\nTesting model: ${modelName}...`)
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: 'Say hello in one word'
          }]
        }]
      })
    })

    const data = await response.json()
    
    if (response.ok) {
      console.log(`✅ ${modelName} is WORKING!`)
      console.log('Response:', data.candidates?.[0]?.content?.parts?.[0]?.text)
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
  const models = ['gemini-pro', 'gemini-1.5-pro', 'gemini-1.5-flash']
  
  for (const model of models) {
    const success = await testModel(model)
    if (success) {
      console.log(`\n✅ Use "${model}" in your code`)
      break
    }
  }
}

testAllModels()
