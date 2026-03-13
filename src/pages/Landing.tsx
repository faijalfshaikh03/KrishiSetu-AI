import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sprout, TrendingUp, Cloud, ShoppingCart, 
  CheckCircle, ArrowRight, Menu, X, 
  Leaf, BarChart3, Users, Shield, Zap, Target
} from 'lucide-react';

export default function Landing() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* STICKY NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                KrishiSetu-AI
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-green-600 transition-colors font-medium">How It Works</a>
              <a href="#benefits" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Benefits</a>
              <a href="#impact" className="text-gray-700 hover:text-green-600 transition-colors font-medium">About</a>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                to="/login" 
                className="px-5 py-2.5 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-all"
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block py-2 text-gray-700 hover:text-green-600 font-medium">Features</a>
              <a href="#how-it-works" className="block py-2 text-gray-700 hover:text-green-600 font-medium">How It Works</a>
              <a href="#benefits" className="block py-2 text-gray-700 hover:text-green-600 font-medium">Benefits</a>
              <a href="#impact" className="block py-2 text-gray-700 hover:text-green-600 font-medium">About</a>
              <div className="pt-4 space-y-2">
                <Link to="/login" className="block w-full px-5 py-2.5 border-2 border-green-600 text-green-600 rounded-lg font-semibold text-center">
                  Sign In
                </Link>
                <Link to="/signup" className="block w-full px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold text-center">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-white"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center md:text-left space-y-6 md:space-y-8">
              <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                🌾 AI-Powered Agricultural Intelligence
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Grow Smarter,
                <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Earn Better
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Empower your farm with AI-driven crop recommendations, real-time market prices, and direct access to buyers. Make data-backed decisions that maximize your profits.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button 
                  onClick={() => navigate('/signup')}
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:border-green-600 hover:text-green-600 transition-all">
                  Watch Demo
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 justify-center md:justify-start pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">No Credit Card Required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">Free for Farmers</span>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <Sprout className="w-10 h-10 text-white" />
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">AI Analysis Complete</div>
                      <div className="text-2xl font-bold text-green-600">₹45,000</div>
                      <div className="text-sm text-gray-500">Projected Profit Increase</div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Cards */}
                <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 border border-green-100">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="text-xs text-gray-500">Market Price</div>
                      <div className="text-sm font-bold text-gray-900">₹2,850/q</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 border border-blue-100">
                  <div className="flex items-center space-x-2">
                    <Cloud className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="text-xs text-gray-500">Weather</div>
                      <div className="text-sm font-bold text-gray-900">Perfect</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KEY BENEFITS SECTION */}
      <section id="benefits" className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Farmers & Retailers Choose Us
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Real solutions that increase income, reduce risk, and connect farms directly to markets
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit Card 1 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 hover:shadow-xl transition-all border border-green-100">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Higher Profits for Farmers</h3>
              <p className="text-gray-600 leading-relaxed">
                Get real-time market prices and AI recommendations to sell at the right time. Increase your income by up to 30% with data-driven decisions.
              </p>
            </div>

            {/* Benefit Card 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 hover:shadow-xl transition-all border border-blue-100">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smarter Crop Decisions</h3>
              <p className="text-gray-600 leading-relaxed">
                AI analyzes your soil, weather, and market demand to recommend the most profitable crops for your land. Reduce crop failures and maximize yield.
              </p>
            </div>

            {/* Benefit Card 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 hover:shadow-xl transition-all border border-purple-100">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Direct Buyer Connection</h3>
              <p className="text-gray-600 leading-relaxed">
                Skip middlemen and sell directly to retailers and buyers. Keep more profit in your pocket with transparent, fair pricing.
              </p>
            </div>

            {/* Benefit Card 4 */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 hover:shadow-xl transition-all border border-orange-100">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Reduced Losses & Risk</h3>
              <p className="text-gray-600 leading-relaxed">
                Weather alerts, disease predictions, and market insights help you avoid losses. Make informed decisions backed by AI intelligence.
              </p>
            </div>

            {/* Benefit Card 5 */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 hover:shadow-xl transition-all border border-indigo-100">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                <ShoppingCart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Reliable Sourcing for Retailers</h3>
              <p className="text-gray-600 leading-relaxed">
                Buyers get direct access to quality produce from verified farmers. Build long-term relationships and ensure consistent supply.
              </p>
            </div>

            {/* Benefit Card 6 */}
            <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-2xl p-8 hover:shadow-xl transition-all border border-teal-100">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">No Middlemen Dependency</h3>
              <p className="text-gray-600 leading-relaxed">
                Take control of your sales and pricing. Connect directly with buyers and negotiate fair deals without losing margin to intermediaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES SECTION */}
      <section id="features" className="py-16 md:py-24 px-4 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features Built for Farmers
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to make better farming decisions and grow your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sprout className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Crop Recommendation</h3>
              <p className="text-gray-600 leading-relaxed">
                Get personalized crop suggestions based on your soil type, climate, and market demand. Plant what sells best.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Market Price Prediction</h3>
              <p className="text-gray-600 leading-relaxed">
                See future price trends and current market rates. Know when to sell for maximum profit with AI-powered forecasts.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Cloud className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Weather Insights</h3>
              <p className="text-gray-600 leading-relaxed">
                Get real-time weather updates and farming advice. Plan your activities with accurate forecasts and alerts.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Direct Buyer Marketplace</h3>
              <p className="text-gray-600 leading-relaxed">
                List your produce and connect with verified buyers. Sell directly without middlemen and get fair prices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Simple. Smart. Profitable.
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Start making better farming decisions in just 3 easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
            {/* Connecting Line - Desktop Only */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-green-200 via-green-400 to-green-600"></div>

            {/* Step 1 */}
            <div className="relative text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6 relative z-10 shadow-lg">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Enter Farm Details</h3>
              <p className="text-gray-600 leading-relaxed">
                Tell us about your land size, soil type, location, and what you want to grow. Takes less than 2 minutes.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6 relative z-10 shadow-lg">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Analyzes Data</h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI studies weather patterns, market prices, soil conditions, and demand to find the best opportunities for you.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6 relative z-10 shadow-lg">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Results & Connect</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive crop recommendations, price predictions, and connect with buyers ready to purchase your produce at fair prices.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/signup')}
              className="px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center space-x-2"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* PRODUCT PREVIEW SECTION */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              See KrishiSetu-AI in Action
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              A complete platform designed for modern farmers and smart retailers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Farmer Dashboard Preview */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white">Farmer Dashboard</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <Leaf className="w-16 h-16 mx-auto text-green-600" />
                    <div className="text-sm text-gray-600">Crop Recommendations</div>
                    <div className="text-lg font-bold text-gray-900">Wheat, Tomato, Potato</div>
                    <div className="text-xs text-gray-500">Based on your soil & market</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-600">Weather</div>
                    <div className="text-sm font-bold text-green-600">28°C</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-600">Price</div>
                    <div className="text-sm font-bold text-blue-600">₹2,850</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-600">Buyers</div>
                    <div className="text-sm font-bold text-purple-600">12</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Buyer Dashboard Preview */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white">Buyer Dashboard</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <ShoppingCart className="w-16 h-16 mx-auto text-blue-600" />
                    <div className="text-sm text-gray-600">Available Produce</div>
                    <div className="text-lg font-bold text-gray-900">250+ Listings</div>
                    <div className="text-xs text-gray-500">From verified farmers</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-600">Farmers</div>
                    <div className="text-sm font-bold text-green-600">150+</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-600">Orders</div>
                    <div className="text-sm font-bold text-orange-600">45</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-600">Savings</div>
                    <div className="text-sm font-bold text-purple-600">25%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-green-600 mb-2">Real-time</div>
              <div className="text-sm text-gray-600">Market Data</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">AI-Powered</div>
              <div className="text-sm text-gray-600">Recommendations</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-purple-600 mb-2">Direct</div>
              <div className="text-sm text-gray-600">Buyer Access</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT / TRUST SECTION */}
      <section id="impact" className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Real Impact. Real Results.
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Transforming agriculture through technology and empowering farming communities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Impact Stat 1 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">30%</div>
              <div className="text-gray-600 font-medium">Average Income Increase</div>
            </div>

            {/* Impact Stat 2 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-4">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">40%</div>
              <div className="text-gray-600 font-medium">Reduction in Crop Losses</div>
            </div>

            {/* Impact Stat 3 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">100%</div>
              <div className="text-gray-600 font-medium">Transparent Pricing</div>
            </div>

            {/* Impact Stat 4 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mb-4">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">0</div>
              <div className="text-gray-600 font-medium">Middlemen Required</div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border border-green-100">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Verified Farmers</h3>
                  <p className="text-gray-600">All farmers are verified to ensure quality and authenticity for buyers</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Secure Transactions</h3>
                  <p className="text-gray-600">Safe and secure payment processing with buyer protection</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Expert Support</h3>
                  <p className="text-gray-600">Agricultural experts available to help you succeed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STRONG CTA SECTION */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-green-600 to-emerald-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-lg md:text-xl text-green-50 mb-8 leading-relaxed">
            Join thousands of farmers who are already earning more, reducing losses, and connecting directly with buyers. Start your journey to smarter, more profitable farming today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button 
              onClick={() => navigate('/signup')}
              className="px-10 py-5 bg-white text-green-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center space-x-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-green-600 transition-all">
              Schedule a Demo
            </button>
          </div>

          <div className="flex flex-wrap gap-6 justify-center text-green-50">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Free for Farmers</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>No Credit Card</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Setup in 2 Minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">KrishiSetu-AI</span>
              </div>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Empowering farmers with AI-driven insights and connecting them directly to markets. Building a smarter, more profitable future for agriculture.
              </p>
              <div className="text-sm text-gray-500">
                Built for National Hackathon 2024
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-green-400 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-green-400 transition-colors">How It Works</a></li>
                <li><a href="#benefits" className="hover:text-green-400 transition-colors">Benefits</a></li>
                <li><a href="#impact" className="hover:text-green-400 transition-colors">About</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>Email: support@krishisetu.ai</li>
                <li>Phone: +91 XXXXX XXXXX</li>
                <li>Location: India</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              © 2024 KrishiSetu-AI. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-green-400 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
