import { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'hi' | 'mr'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation data
const translations = {
  en: {
    // Navigation & Sidebar
    'nav.dashboard': 'Dashboard',
    'nav.pricePrediction': 'Price Prediction',
    'nav.cropRecommendation': 'Crop Recommendation',
    'nav.weatherAdvice': 'Weather Advice',
    'nav.marketplace': 'Marketplace',
    'nav.produceListings': 'Produce Listings',
    'nav.community': 'Community',
    'nav.orders': 'Orders',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome to KrishiSetu AI. Choose a tool to get started.',
    'dashboard.cropPricePrediction': 'Crop Price Prediction',
    'dashboard.cropPricePredictionDesc': 'Predict crop prices based on market trends',
    'dashboard.cropRecommendation': 'Crop Recommendation',
    'dashboard.cropRecommendationDesc': 'Get AI-powered crop recommendations',
    'dashboard.weatherAdvice': 'Weather & Farming Advice',
    'dashboard.weatherAdviceDesc': 'Real-time weather and farming tips',
    
    // Settings
    'settings.title': 'Settings',
    'settings.subtitle': 'Manage your account settings, profile, and preferences.',
    'settings.profile': 'Profile',
    'settings.appearance': 'Appearance',
    'settings.notifications': 'Notifications',
    'settings.translation': 'Translation',
    'settings.myOrders': 'My Orders',
    'settings.chooseLanguage': 'Choose your preferred language.',
    'settings.updateProfile': 'Update profile',
    'settings.profilePicture': 'Profile Picture',
    'settings.username': 'Username',
    'settings.displayName': 'Display Name',
    'settings.defaultRegion': 'Default Region',
    'settings.account': 'Account',
    'settings.userId': 'User ID',
    'settings.emailAddress': 'Email Address',
    'settings.emailNote': 'Your email address is {email}. This cannot be changed.',
    
    // TopBar
    'topbar.logout': 'Logout',
    
    // Auth
    'auth.login': 'Sign In',
    'auth.signup': 'Sign Up',
    'auth.welcomeBack': 'Welcome Back',
    'auth.signInToAccount': 'Sign in to your account',
    'auth.createAccount': 'Create Account',
    'auth.signUpToStart': 'Sign up to get started',
    'auth.email': 'Email address',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.fullName': 'Full Name',
    'auth.enterEmail': 'Enter your email',
    'auth.enterPassword': 'Enter your password',
    'auth.enterName': 'Enter your name',
    'auth.confirmYourPassword': 'Confirm your password',
    'auth.signingIn': 'Signing in...',
    'auth.creatingAccount': 'Creating account...',
    'auth.dontHaveAccount': "Don't have an account?",
    'auth.alreadyHaveAccount': 'Already have an account?',
    
    // Crop Recommendation
    'cropRecommendation.title': 'Crop Recommendation',
    'cropRecommendation.subtitle': 'Get AI-powered crop recommendations based on your location, soil type, and farming conditions.',
    'cropRecommendation.getRecommendations': 'Get Crop Recommendations',
    'cropRecommendation.newRecommendation': 'Get New Recommendation',
    'cropRecommendation.locationInfo': 'Location Information',
    'cropRecommendation.useCurrentLocation': 'Use Current Location',
    'cropRecommendation.enterManually': 'Enter Manually',
    'cropRecommendation.getCurrentLocation': 'Get Current Location',
    'cropRecommendation.gettingLocation': 'Getting Location...',
    'cropRecommendation.farmDetails': 'Farm Details',
    'cropRecommendation.soilType': 'Soil Type',
    'cropRecommendation.selectSoilType': 'Select Soil Type',
    'cropRecommendation.season': 'Season',
    'cropRecommendation.selectSeason': 'Select Season',
    'cropRecommendation.farmSize': 'Farm Size (acres)',
    'cropRecommendation.enterFarmSize': 'Enter farm size',
    'cropRecommendation.budget': 'Budget (₹)',
    'cropRecommendation.enterBudget': 'Enter budget',
    'cropRecommendation.waterAvailability': 'Water Availability',
    'cropRecommendation.selectWaterAvailability': 'Select Water Availability',
    'cropRecommendation.farmingExperience': 'Farming Experience',
    'cropRecommendation.selectExperience': 'Select Experience Level',
    'cropRecommendation.previousCrops': 'Previous Crops (Select all that apply)',
    'cropRecommendation.gettingRecommendations': 'Getting Recommendations...',
    'cropRecommendation.recommendedCrops': 'Recommended Crops',
    'cropRecommendation.suitability': 'Suitability',
    'cropRecommendation.expectedYield': 'Expected Yield',
    'cropRecommendation.whySuitable': 'Why this crop is suitable:',
    'cropRecommendation.bestCropToGrow': 'Best Crop to Grow',
    'cropRecommendation.topRecommendation': 'Our top recommendation for your farm',
    'cropRecommendation.saveResults': 'Save Results',
    'cropRecommendation.demoModeActive': 'Demo Mode Active',
    'cropRecommendation.errorGettingRecommendations': 'Error getting recommendations',
    
    // Risk Levels
    'risk.low': 'Low Risk',
    'risk.medium': 'Medium Risk',
    'risk.high': 'High Risk',
    
    // Languages
    'language.english': 'English',
    'language.hindi': 'हिंदी (Hindi)',
    'language.marathi': 'मराठी (Marathi)',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.loading': 'Loading...',
    'common.state': 'State',
    'common.district': 'District',
    'common.location': 'Location',
    'common.coordinates': 'Coordinates',
    
    // Weather Advice
    'weather.title': 'Weather & Farming Advice',
    'weather.subtitle': 'Get AI-powered weather forecasts and actionable farming tips for your location.',
    'weather.getAdvice': 'Get Weather Advice',
    'weather.newSearch': 'New Search',
    'weather.currentWeather': 'Current Weather',
    'weather.forecast': '3-Day Forecast',
    'weather.warnings': 'Weather Warnings',
    'weather.suitableActivities': 'Suitable Activities',
    'weather.recommendedCrops': 'Recommended Crops',
    'weather.irrigationAdvice': 'Irrigation Advice',
    'weather.pestControl': 'Pest Control',
    'weather.farmingRecommendations': 'Farming Recommendations',
    'weather.useCurrentLocation': 'Use Current Location',
    'weather.enterCityName': 'Enter City Name',
    'weather.getCurrentLocation': 'Get Current Location',
    'weather.gettingLocation': 'Getting Location...',
    'weather.cityName': 'City Name',
    'weather.enterCity': 'Enter city name (e.g., Mumbai, Delhi, Pune)',
    'weather.gettingWeatherAdvice': 'Getting Weather Advice...',
    'weather.temperature': 'Temperature',
    'weather.humidity': 'Humidity',
    'weather.windSpeed': 'Wind Speed',
    'weather.visibility': 'Visibility',
    'weather.pressure': 'Pressure',
    'weather.uvIndex': 'UV Index',
    'weather.condition': 'Condition',
    'weather.feelsLike': 'Feels like',
    'weather.today': 'Today',
    'weather.tomorrow': 'Tomorrow',
    'weather.dayAfter': 'Day After',
    'weather.highLow': 'High/Low',
    'weather.rain': 'Rain',
    'weather.needed': 'Needed',
    'weather.amount': 'Amount',
    'weather.timing': 'Timing',
    'weather.method': 'Method',
    'weather.riskLevel': 'Risk Level',
    'weather.recommendations': 'Recommendations',
    'weather.priority': 'Priority',
    'weather.high': 'HIGH',
    'weather.medium': 'MEDIUM',
    'weather.low': 'LOW',
    'weather.yes': 'Yes',
    'weather.no': 'No',
    'weather.errorGettingAdvice': 'Error getting weather advice',
    'weather.adviceIncludes': 'Weather Advice includes: Current conditions, 3-day forecast, farming recommendations, irrigation advice, pest control tips, and suitable activities.',
  },
  hi: {
    // Navigation & Sidebar
    'nav.dashboard': 'डैशबोर्ड',
    'nav.pricePrediction': 'मूल्य पूर्वानुमान',
    'nav.cropRecommendation': 'फसल सिफारिश',
    'nav.weatherAdvice': 'मौसम सलाह',
    'nav.marketplace': 'बाज़ार',
    'nav.produceListings': 'उत्पाद सूची',
    'nav.community': 'समुदाय',
    'nav.orders': 'ऑर्डर',
    'nav.profile': 'प्रोफ़ाइल',
    'nav.settings': 'सेटिंग्स',
    
    // Dashboard
    'dashboard.title': 'डैशबोर्ड',
    'dashboard.welcome': 'कृषिसेतु AI में आपका स्वागत है। शुरू करने के लिए एक उपकरण चुनें।',
    'dashboard.cropPricePrediction': 'फसल मूल्य पूर्वानुमान',
    'dashboard.cropPricePredictionDesc': 'बाजार के रुझान के आधार पर फसल की कीमतों का पूर्वानुमान लगाएं',
    'dashboard.cropRecommendation': 'फसल सिफारिश',
    'dashboard.cropRecommendationDesc': 'AI-संचालित फसल सिफारिशें प्राप्त करें',
    'dashboard.weatherAdvice': 'मौसम और कृषि सलाह',
    'dashboard.weatherAdviceDesc': 'वास्तविक समय मौसम और कृषि सुझाव',
    
    // Settings
    'settings.title': 'सेटिंग्स',
    'settings.subtitle': 'अपने खाता सेटिंग्स, प्रोफ़ाइल और प्राथमिकताओं का प्रबंधन करें।',
    'settings.profile': 'प्रोफ़ाइल',
    'settings.appearance': 'दिखावट',
    'settings.notifications': 'सूचनाएं',
    'settings.translation': 'अनुवाद',
    'settings.myOrders': 'मेरे ऑर्डर',
    'settings.chooseLanguage': 'अपनी पसंदीदा भाषा चुनें।',
    'settings.updateProfile': 'प्रोफ़ाइल अपडेट करें',
    'settings.profilePicture': 'प्रोफ़ाइल चित्र',
    'settings.username': 'उपयोगकर्ता नाम',
    'settings.displayName': 'प्रदर्शन नाम',
    'settings.defaultRegion': 'डिफ़ॉल्ट क्षेत्र',
    'settings.account': 'खाता',
    'settings.userId': 'उपयोगकर्ता ID',
    'settings.emailAddress': 'ईमेल पता',
    'settings.emailNote': 'आपका ईमेल पता {email} है। इसे बदला नहीं जा सकता।',
    
    // TopBar
    'topbar.logout': 'लॉग आउट',
    
    // Auth
    'auth.login': 'साइन इन',
    'auth.signup': 'साइन अप',
    'auth.welcomeBack': 'वापसी पर स्वागत',
    'auth.signInToAccount': 'अपने खाते में साइन इन करें',
    'auth.createAccount': 'खाता बनाएं',
    'auth.signUpToStart': 'शुरू करने के लिए साइन अप करें',
    'auth.email': 'ईमेल पता',
    'auth.password': 'पासवर्ड',
    'auth.confirmPassword': 'पासवर्ड की पुष्टि करें',
    'auth.fullName': 'पूरा नाम',
    'auth.enterEmail': 'अपना ईमेल दर्ज करें',
    'auth.enterPassword': 'अपना पासवर्ड दर्ज करें',
    'auth.enterName': 'अपना नाम दर्ज करें',
    'auth.confirmYourPassword': 'अपने पासवर्ड की पुष्टि करें',
    'auth.signingIn': 'साइन इन हो रहा है...',
    'auth.creatingAccount': 'खाता बनाया जा रहा है...',
    'auth.dontHaveAccount': 'खाता नहीं है?',
    'auth.alreadyHaveAccount': 'पहले से खाता है?',
    
    // Crop Recommendation
    'cropRecommendation.title': 'फसल सिफारिश',
    'cropRecommendation.subtitle': 'अपने स्थान, मिट्टी के प्रकार और कृषि स्थितियों के आधार पर AI-संचालित फसल सिफारिशें प्राप्त करें।',
    'cropRecommendation.getRecommendations': 'फसल सिफारिशें प्राप्त करें',
    'cropRecommendation.newRecommendation': 'नई सिफारिश प्राप्त करें',
    'cropRecommendation.locationInfo': 'स्थान की जानकारी',
    'cropRecommendation.useCurrentLocation': 'वर्तमान स्थान का उपयोग करें',
    'cropRecommendation.enterManually': 'मैन्युअल रूप से दर्ज करें',
    'cropRecommendation.getCurrentLocation': 'वर्तमान स्थान प्राप्त करें',
    'cropRecommendation.gettingLocation': 'स्थान प्राप्त कर रहे हैं...',
    'cropRecommendation.farmDetails': 'खेत का विवरण',
    'cropRecommendation.soilType': 'मिट्टी का प्रकार',
    'cropRecommendation.selectSoilType': 'मिट्टी का प्रकार चुनें',
    'cropRecommendation.season': 'मौसम',
    'cropRecommendation.selectSeason': 'मौसम चुनें',
    'cropRecommendation.farmSize': 'खेत का आकार (एकड़)',
    'cropRecommendation.enterFarmSize': 'खेत का आकार दर्ज करें',
    'cropRecommendation.budget': 'बजट (₹)',
    'cropRecommendation.enterBudget': 'बजट दर्ज करें',
    'cropRecommendation.waterAvailability': 'पानी की उपलब्धता',
    'cropRecommendation.selectWaterAvailability': 'पानी की उपलब्धता चुनें',
    'cropRecommendation.farmingExperience': 'कृषि अनुभव',
    'cropRecommendation.selectExperience': 'अनुभव स्तर चुनें',
    'cropRecommendation.previousCrops': 'पिछली फसलें (सभी लागू का चयन करें)',
    'cropRecommendation.gettingRecommendations': 'सिफारिशें प्राप्त कर रहे हैं...',
    'cropRecommendation.recommendedCrops': 'अनुशंसित फसलें',
    'cropRecommendation.suitability': 'उपयुक्तता',
    'cropRecommendation.expectedYield': 'अपेक्षित उत्पादन',
    'cropRecommendation.whySuitable': 'यह फसल क्यों उपयुक्त है:',
    'cropRecommendation.bestCropToGrow': 'उगाने के लिए सबसे अच्छी फसल',
    'cropRecommendation.topRecommendation': 'आपके खेत के लिए हमारी शीर्ष सिफारिश',
    'cropRecommendation.saveResults': 'परिणाम सहेजें',
    'cropRecommendation.demoModeActive': 'डेमो मोड सक्रिय',
    'cropRecommendation.errorGettingRecommendations': 'सिफारिशें प्राप्त करने में त्रुटि',
    
    // Risk Levels
    'risk.low': 'कम जोखिम',
    'risk.medium': 'मध्यम जोखिम',
    'risk.high': 'उच्च जोखिम',
    
    // Languages
    'language.english': 'English',
    'language.hindi': 'हिंदी (Hindi)',
    'language.marathi': 'मराठी (Marathi)',
    
    // Common
    'common.save': 'सेव करें',
    'common.cancel': 'रद्द करें',
    'common.loading': 'लोड हो रहा है...',
    'common.state': 'राज्य',
    'common.district': 'जिला',
    'common.location': 'स्थान',
    'common.coordinates': 'निर्देशांक',
    
    // Placeholders
    'placeholder.state': 'राज्य',
    'placeholder.district': 'जिला',
    'placeholder.enterName': 'अपना नाम दर्ज करें',
    'placeholder.enterEmail': 'अपना ईमेल दर्ज करें',
    'placeholder.enterPassword': 'अपना पासवर्ड दर्ज करें',
    'placeholder.confirmPassword': 'अपने पासवर्ड की पुष्टि करें',
    'placeholder.regionExample': 'उदा., पंजाब, भारत',
    
    // Weather Advice
    'weather.title': 'मौसम और कृषि सलाह',
    'weather.subtitle': 'अपने स्थान के लिए AI-संचालित मौसम पूर्वानुमान और कार्यात्मक कृषि सुझाव प्राप्त करें।',
    'weather.getAdvice': 'मौसम सलाह प्राप्त करें',
    'weather.newSearch': 'नई खोज',
    'weather.currentWeather': 'वर्तमान मौसम',
    'weather.forecast': '3-दिन का पूर्वानुमान',
    'weather.warnings': 'मौसम चेतावनी',
    'weather.suitableActivities': 'उपयुक्त गतिविधियां',
    'weather.recommendedCrops': 'अनुशंसित फसलें',
    'weather.irrigationAdvice': 'सिंचाई सलाह',
    'weather.pestControl': 'कीट नियंत्रण',
    'weather.farmingRecommendations': 'कृषि सिफारिशें',
    'weather.useCurrentLocation': 'वर्तमान स्थान का उपयोग करें',
    'weather.enterCityName': 'शहर का नाम दर्ज करें',
    'weather.getCurrentLocation': 'वर्तमान स्थान प्राप्त करें',
    'weather.gettingLocation': 'स्थान प्राप्त कर रहे हैं...',
    'weather.cityName': 'शहर का नाम',
    'weather.enterCity': 'शहर का नाम दर्ज करें (जैसे, मुंबई, दिल्ली, पुणे)',
    'weather.gettingWeatherAdvice': 'मौसम सलाह प्राप्त कर रहे हैं...',
    'weather.temperature': 'तापमान',
    'weather.humidity': 'आर्द्रता',
    'weather.windSpeed': 'हवा की गति',
    'weather.visibility': 'दृश्यता',
    'weather.pressure': 'दबाव',
    'weather.uvIndex': 'UV सूचकांक',
    'weather.condition': 'स्थिति',
    'weather.feelsLike': 'महसूस होता है',
    'weather.today': 'आज',
    'weather.tomorrow': 'कल',
    'weather.dayAfter': 'परसों',
    'weather.highLow': 'उच्च/निम्न',
    'weather.rain': 'बारिश',
    'weather.needed': 'आवश्यक',
    'weather.amount': 'मात्रा',
    'weather.timing': 'समय',
    'weather.method': 'विधि',
    'weather.riskLevel': 'जोखिम स्तर',
    'weather.recommendations': 'सिफारिशें',
    'weather.priority': 'प्राथमिकता',
    'weather.high': 'उच्च',
    'weather.medium': 'मध्यम',
    'weather.low': 'निम्न',
    'weather.yes': 'हां',
    'weather.no': 'नहीं',
    'weather.errorGettingAdvice': 'मौसम सलाह प्राप्त करने में त्रुटि',
    'weather.adviceIncludes': 'मौसम सलाह में शामिल है: वर्तमान स्थितियां, 3-दिन का पूर्वानुमान, कृषि सिफारिशें, सिंचाई सलाह, कीट नियंत्रण सुझाव, और उपयुक्त गतिविधियां।',
  },
  mr: {
    // Navigation & Sidebar
    'nav.dashboard': 'डॅशबोर्ड',
    'nav.pricePrediction': 'किंमत अंदाज',
    'nav.cropRecommendation': 'पीक शिफारस',
    'nav.weatherAdvice': 'हवामान सल्ला',
    'nav.marketplace': 'बाजारपेठ',
    'nav.produceListings': 'उत्पादन यादी',
    'nav.community': 'समुदाय',
    'nav.orders': 'ऑर्डर',
    'nav.profile': 'प्रोफाइल',
    'nav.settings': 'सेटिंग्ज',
    
    // Dashboard
    'dashboard.title': 'डॅशबोर्ड',
    'dashboard.welcome': 'कृषिसेतु AI मध्ये आपले स्वागत आहे. सुरुवात करण्यासाठी एक साधन निवडा.',
    'dashboard.cropPricePrediction': 'पीक किंमत अंदाज',
    'dashboard.cropPricePredictionDesc': 'बाजारातील ट्रेंडच्या आधारे पिकांच्या किमतींचा अंदाज लावा',
    'dashboard.cropRecommendation': 'पीक शिफारस',
    'dashboard.cropRecommendationDesc': 'AI-चालित पीक शिफारसी मिळवा',
    'dashboard.weatherAdvice': 'हवामान आणि शेती सल्ला',
    'dashboard.weatherAdviceDesc': 'रिअल-टाइम हवामान आणि शेती टिप्स',
    
    // Settings
    'settings.title': 'सेटिंग्ज',
    'settings.subtitle': 'तुमच्या खाते सेटिंग्ज, प्रोफाइल आणि प्राधान्यांचे व्यवस्थापन करा.',
    'settings.profile': 'प्रोफाइल',
    'settings.appearance': 'दिसणे',
    'settings.notifications': 'सूचना',
    'settings.translation': 'भाषांतर',
    'settings.myOrders': 'माझे ऑर्डर',
    'settings.chooseLanguage': 'तुमची पसंतीची भाषा निवडा.',
    'settings.updateProfile': 'प्रोफाइल अपडेट करा',
    'settings.profilePicture': 'प्रोफाइल चित्र',
    'settings.username': 'वापरकर्ता नाव',
    'settings.displayName': 'प्रदर्शन नाव',
    'settings.defaultRegion': 'डिफॉल्ट प्रदेश',
    'settings.account': 'खाते',
    'settings.userId': 'वापरकर्ता ID',
    'settings.emailAddress': 'ईमेल पत्ता',
    'settings.emailNote': 'तुमचा ईमेल पत्ता {email} आहे. हे बदलले जाऊ शकत नाही.',
    
    // TopBar
    'topbar.logout': 'लॉग आउट',
    
    // Auth
    'auth.login': 'साइन इन',
    'auth.signup': 'साइन अप',
    'auth.welcomeBack': 'परत स्वागत',
    'auth.signInToAccount': 'तुमच्या खात्यात साइन इन करा',
    'auth.createAccount': 'खाते तयार करा',
    'auth.signUpToStart': 'सुरुवात करण्यासाठी साइन अप करा',
    'auth.email': 'ईमेल पत्ता',
    'auth.password': 'पासवर्ड',
    'auth.confirmPassword': 'पासवर्डची पुष्टी करा',
    'auth.fullName': 'पूर्ण नाव',
    'auth.enterEmail': 'तुमचा ईमेल टाका',
    'auth.enterPassword': 'तुमचा पासवर्ड टाका',
    'auth.enterName': 'तुमचे नाव टाका',
    'auth.confirmYourPassword': 'तुमच्या पासवर्डची पुष्टी करा',
    'auth.signingIn': 'साइन इन करत आहे...',
    'auth.creatingAccount': 'खाते तयार करत आहे...',
    'auth.dontHaveAccount': 'खाते नाही?',
    'auth.alreadyHaveAccount': 'आधीच खाते आहे?',
    
    // Crop Recommendation
    'cropRecommendation.title': 'पीक शिफारस',
    'cropRecommendation.subtitle': 'तुमच्या स्थान, मातीचा प्रकार आणि शेती परिस्थितीच्या आधारे AI-चालित पीक शिफारसी मिळवा.',
    'cropRecommendation.getRecommendations': 'पीक शिफारसी मिळवा',
    'cropRecommendation.newRecommendation': 'नवीन शिफारस मिळवा',
    'cropRecommendation.locationInfo': 'स्थान माहिती',
    'cropRecommendation.useCurrentLocation': 'सध्याचे स्थान वापरा',
    'cropRecommendation.enterManually': 'मॅन्युअली प्रविष्ट करा',
    'cropRecommendation.getCurrentLocation': 'सध्याचे स्थान मिळवा',
    'cropRecommendation.gettingLocation': 'स्थान मिळवत आहे...',
    'cropRecommendation.farmDetails': 'शेताचे तपशील',
    'cropRecommendation.soilType': 'मातीचा प्रकार',
    'cropRecommendation.selectSoilType': 'मातीचा प्रकार निवडा',
    'cropRecommendation.season': 'हंगाम',
    'cropRecommendation.selectSeason': 'हंगाम निवडा',
    'cropRecommendation.farmSize': 'शेताचा आकार (एकर)',
    'cropRecommendation.enterFarmSize': 'शेताचा आकार प्रविष्ट करा',
    'cropRecommendation.budget': 'बजेट (₹)',
    'cropRecommendation.enterBudget': 'बजेट प्रविष्ट करा',
    'cropRecommendation.waterAvailability': 'पाण्याची उपलब्धता',
    'cropRecommendation.selectWaterAvailability': 'पाण्याची उपलब्धता निवडा',
    'cropRecommendation.farmingExperience': 'शेती अनुभव',
    'cropRecommendation.selectExperience': 'अनुभव पातळी निवडा',
    'cropRecommendation.previousCrops': 'मागील पिके (सर्व लागू निवडा)',
    'cropRecommendation.gettingRecommendations': 'शिफारसी मिळवत आहे...',
    'cropRecommendation.recommendedCrops': 'शिफारस केलेली पिके',
    'cropRecommendation.suitability': 'योग्यता',
    'cropRecommendation.expectedYield': 'अपेक्षित उत्पादन',
    'cropRecommendation.whySuitable': 'हे पीक का योग्य आहे:',
    'cropRecommendation.bestCropToGrow': 'लावण्यासाठी सर्वोत्तम पीक',
    'cropRecommendation.topRecommendation': 'तुमच्या शेतासाठी आमची शीर्ष शिफारस',
    'cropRecommendation.saveResults': 'परिणाम सेव्ह करा',
    'cropRecommendation.demoModeActive': 'डेमो मोड सक्रिय',
    'cropRecommendation.errorGettingRecommendations': 'शिफारसी मिळवण्यात त्रुटी',
    
    // Risk Levels
    'risk.low': 'कमी जोखीम',
    'risk.medium': 'मध्यम जोखीम',
    'risk.high': 'उच्च जोखीम',
    
    // Languages
    'language.english': 'English',
    'language.hindi': 'हिंदी (Hindi)',
    'language.marathi': 'मराठी (Marathi)',
    
    // Common
    'common.save': 'सेव्ह करा',
    'common.cancel': 'रद्द करा',
    'common.loading': 'लोड होत आहे...',
    'common.state': 'राज्य',
    'common.district': 'जिल्हा',
    'common.location': 'स्थान',
    'common.coordinates': 'निर्देशांक',
    
    // Placeholders
    'placeholder.state': 'राज्य',
    'placeholder.district': 'जिल्हा',
    'placeholder.enterName': 'तुमचे नाव टाका',
    'placeholder.enterEmail': 'तुमचा ईमेल टाका',
    'placeholder.enterPassword': 'तुमचा पासवर्ड टाका',
    'placeholder.confirmPassword': 'तुमच्या पासवर्डची पुष्टी करा',
    'placeholder.regionExample': 'उदा., महाराष्ट्र, भारत',
    
    // Weather Advice
    'weather.title': 'हवामान आणि शेती सल्ला',
    'weather.subtitle': 'तुमच्या स्थानासाठी AI-चालित हवामान अंदाज आणि कार्यात्मक शेती टिप्स मिळवा।',
    'weather.getAdvice': 'हवामान सल्ला मिळवा',
    'weather.newSearch': 'नवीन शोध',
    'weather.currentWeather': 'सध्याचे हवामान',
    'weather.forecast': '3-दिवसांचा अंदाज',
    'weather.warnings': 'हवामान चेतावणी',
    'weather.suitableActivities': 'योग्य क्रियाकलाप',
    'weather.recommendedCrops': 'शिफारस केलेली पिके',
    'weather.irrigationAdvice': 'सिंचन सल्ला',
    'weather.pestControl': 'कीड नियंत्रण',
    'weather.farmingRecommendations': 'शेती शिफारसी',
    'weather.useCurrentLocation': 'सध्याचे स्थान वापरा',
    'weather.enterCityName': 'शहराचे नाव प्रविष्ट करा',
    'weather.getCurrentLocation': 'सध्याचे स्थान मिळवा',
    'weather.gettingLocation': 'स्थान मिळवत आहे...',
    'weather.cityName': 'शहराचे नाव',
    'weather.enterCity': 'शहराचे नाव प्रविष्ट करा (उदा., मुंबई, दिल्ली, पुणे)',
    'weather.gettingWeatherAdvice': 'हवामान सल्ला मिळवत आहे...',
    'weather.temperature': 'तापमान',
    'weather.humidity': 'आर्द्रता',
    'weather.windSpeed': 'वाऱ्याचा वेग',
    'weather.visibility': 'दृश्यता',
    'weather.pressure': 'दाब',
    'weather.uvIndex': 'UV निर्देशांक',
    'weather.condition': 'स्थिती',
    'weather.feelsLike': 'असे वाटते',
    'weather.today': 'आज',
    'weather.tomorrow': 'उद्या',
    'weather.dayAfter': 'परवा',
    'weather.highLow': 'उच्च/निम्न',
    'weather.rain': 'पाऊस',
    'weather.needed': 'आवश्यक',
    'weather.amount': 'प्रमाण',
    'weather.timing': 'वेळ',
    'weather.method': 'पद्धत',
    'weather.riskLevel': 'जोखीम पातळी',
    'weather.recommendations': 'शिफारसी',
    'weather.priority': 'प्राधान्य',
    'weather.high': 'उच्च',
    'weather.medium': 'मध्यम',
    'weather.low': 'निम्न',
    'weather.yes': 'होय',
    'weather.no': 'नाही',
    'weather.errorGettingAdvice': 'हवामान सल्ला मिळवण्यात त्रुटी',
    'weather.adviceIncludes': 'हवामान सल्ल्यामध्ये समाविष्ट आहे: सध्याची परिस्थिती, 3-दिवसांचा अंदाज, शेती शिफारसी, सिंचन सल्ला, कीड नियंत्रण टिप्स, आणि योग्य क्रियाकलाप।',
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('krishisetu-language')
    return (saved as Language) || 'en'
  })

  useEffect(() => {
    localStorage.setItem('krishisetu-language', language)
  }, [language])

  const t = (key: string): string => {
    const langTranslations = translations[language] as Record<string, string>
    return langTranslations[key] || key
  }

  const value = {
    language,
    setLanguage,
    t
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}