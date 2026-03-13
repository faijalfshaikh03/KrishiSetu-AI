// Simple backend server to proxy Gemini API calls
import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY

app.use(cors())
app.use(express.json())

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Crop recommendation endpoint
app.post('/api/crop-recommendation', async (req, res) => {
  try {
    const { prompt } = req.body
    const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' })
    }

    if (!GEMINI_API_KEY) {
      console.error('API key not found in environment variables')
      console.error('Available env vars:', Object.keys(process.env).filter(k => k.includes('GEMINI') || k.includes('VITE')))
      return res.status(500).json({ error: 'API key not configured' })
    }

    const modelNames = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-pro-latest']
    let lastError = null

    for (const modelName of modelNames) {
      try {
        console.log(`Trying model: ${modelName}...`)
        
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: prompt
                }]
              }]
            })
          }
        )

        if (!response.ok) {
          const errorData = await response.json()
          console.log(`Model ${modelName} failed:`, errorData.error?.message)
          lastError = errorData.error?.message
          continue
        }

        const data = await response.json()
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text

        if (!text) {
          console.log(`Model ${modelName} returned empty response`)
          lastError = 'Empty response'
          continue
        }

        console.log(`✅ Successfully used model: ${modelName}`)
        return res.json({ success: true, text, model: modelName })
      } catch (error) {
        console.error(`Model ${modelName} error:`, error.message)
        lastError = error.message
        continue
      }
    }

    // All models failed
    res.status(500).json({ 
      error: 'All models failed',
      lastError 
    })
  } catch (error) {
    console.error('Server error:', error)
    res.status(500).json({ error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
  console.log(`API Key configured: ${process.env.VITE_GEMINI_API_KEY ? 'Yes' : 'No'}`)
  if (process.env.VITE_GEMINI_API_KEY) {
    console.log(`API Key (first 20 chars): ${process.env.VITE_GEMINI_API_KEY.substring(0, 20)}...`)
  }
})
