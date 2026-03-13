// Test CORS issue with Gemini API from browser context
const apiKey = 'AIzaSyAwFQsjJNPW4ZeoOXgQEBNRN6s3LrTES8g'

console.log('Testing Gemini API REST endpoint...')

async function testAPI() {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: 'Say hello'
            }]
          }]
        })
      }
    )

    console.log('Response status:', response.status)
    const data = await response.json()
    console.log('Response:', data)
  } catch (error) {
    console.error('Error:', error.message)
  }
}

testAPI()
