# Backend Server Setup for Gemini API

## Problem
The Gemini API doesn't support CORS requests from browser clients. To fix this, we've created a backend server that acts as a proxy.

## Solution
A simple Express.js backend server that:
- Receives crop recommendation requests from the frontend
- Calls the Gemini API from the server (no CORS issues)
- Returns the results to the frontend

## Setup Instructions

### Step 1: Install Dependencies
```bash
npm install
```

This will install:
- `express` - Web server
- `cors` - Enable CORS
- `dotenv` - Environment variables
- `node-fetch` - HTTP requests
- `concurrently` - Run multiple commands

### Step 2: Verify .env Configuration
Your `.env` file should have:
```env
VITE_GEMINI_API_KEY=AIzaSyDRgN6mF_MX2_FIE9HbTppPPYA1FAJaln0
VITE_BACKEND_URL=http://localhost:3001
```

### Step 3: Run the Backend Server
```bash
npm run server
```

You should see:
```
✅ Server running on http://localhost:3001
API Key configured: Yes
```

### Step 4: Run Frontend (in another terminal)
```bash
npm run dev
```

### Step 5: Run Both Together (Optional)
```bash
npm run dev:full
```

This runs both the backend server and frontend dev server concurrently.

## How It Works

1. **Frontend** (Vite app) sends crop recommendation request to backend
2. **Backend** (Express server) receives the request
3. **Backend** calls Gemini API with the API key (no CORS issues)
4. **Backend** returns the AI response to frontend
5. **Frontend** displays the recommendations

## API Endpoint

### POST `/api/crop-recommendation`

**Request:**
```json
{
  "prompt": "Your crop recommendation prompt here"
}
```

**Response (Success):**
```json
{
  "success": true,
  "text": "JSON response from Gemini",
  "model": "gemini-2.5-flash"
}
```

**Response (Error):**
```json
{
  "error": "Error message",
  "lastError": "Details"
}
```

## Troubleshooting

### Backend won't start
- Check if port 3001 is already in use
- Try: `npm run server -- --port 3002`
- Update `VITE_BACKEND_URL` in `.env` to match

### "Cannot find module" errors
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`
- Run `npm install` fresh

### API still not working
- Verify API key in `.env`
- Check backend console for error messages
- Ensure backend is running on port 3001

## Production Deployment

For production, you'll want to:

1. **Use environment variables** for API key (don't hardcode)
2. **Add authentication** to the backend endpoint
3. **Add rate limiting** to prevent abuse
4. **Use HTTPS** for secure communication
5. **Deploy backend separately** (Heroku, Railway, Vercel, etc.)

### Example Production Setup
```env
VITE_BACKEND_URL=https://your-backend.herokuapp.com
VITE_GEMINI_API_KEY=your_api_key_here
```

## Files

- `server.js` - Backend Express server
- `.env` - Configuration (API key, backend URL)
- `package.json` - Dependencies and scripts

## Next Steps

1. Install dependencies: `npm install`
2. Start backend: `npm run server`
3. Start frontend: `npm run dev` (in another terminal)
4. Test crop recommendations
5. Enjoy real AI-powered suggestions!
