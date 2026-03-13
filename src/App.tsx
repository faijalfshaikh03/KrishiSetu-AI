import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Dashboard from './pages/Dashboard'
import PricePrediction from './pages/PricePrediction'
import CropRecommendation from './pages/CropRecommendation'
import WeatherAdvice from './pages/WeatherAdvice'
import Community from './pages/Community'
import CommunityDetail from './pages/CommunityDetail'
import Orders from './pages/Orders'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import Marketplace from './pages/Marketplace'
import ProduceListings from './pages/ProduceListings'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { useThemeClasses } from './hooks/useThemeClasses'

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const themeClasses = useThemeClasses()

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className={`flex min-h-screen ${themeClasses.bg} transition-colors`}>
                <Sidebar isOpen={isSidebarOpen} />
                <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
                  <TopBar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                  <main className="p-8">
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/price-prediction" element={<PricePrediction />} />
                      <Route path="/crop-recommendation" element={<CropRecommendation />} />
                      <Route path="/weather-advice" element={<WeatherAdvice />} />
                      <Route path="/marketplace" element={<Marketplace />} />
                      <Route path="/produce-listings" element={<ProduceListings />} />
                      <Route path="/community" element={<Community />} />
                      <Route path="/community/:communityId" element={<CommunityDetail />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App