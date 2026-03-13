import { TrendingUp, Lightbulb, CloudSun, Plus } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useThemeClasses } from '../hooks/useThemeClasses'

const Dashboard = () => {
  const { t } = useLanguage()
  const themeClasses = useThemeClasses()
  
  const cards = [
    {
      icon: TrendingUp,
      title: t('dashboard.cropPricePrediction'),
      description: t('dashboard.cropPricePredictionDesc'),
      color: 'bg-blue-500',
      link: '/price-prediction'
    },
    {
      icon: Lightbulb,
      title: t('dashboard.cropRecommendation'),
      description: t('dashboard.cropRecommendationDesc'),
      color: 'bg-green-500',
      link: '/crop-recommendation'
    },
    {
      icon: CloudSun,
      title: t('dashboard.weatherAdvice'),
      description: t('dashboard.weatherAdviceDesc'),
      color: 'bg-orange-500',
      link: '/weather-advice'
    }
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className={`text-4xl font-bold mb-2 ${themeClasses.text.primary}`}>{t('dashboard.title')}</h1>
        <p className={themeClasses.text.secondary}>
          {t('dashboard.welcome')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.title}
              className={`${themeClasses.card} rounded-xl p-6 ${themeClasses.border} border hover:border-green-500 transition-all cursor-pointer`}
            >
              <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="text-white" size={24} />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${themeClasses.text.primary}`}>{card.title}</h3>
              <p className={`${themeClasses.text.secondary} text-sm`}>{card.description}</p>
            </div>
          )
        })}
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110">
        <Plus className="text-white" size={28} />
      </button>
    </div>
  )
}

export default Dashboard
