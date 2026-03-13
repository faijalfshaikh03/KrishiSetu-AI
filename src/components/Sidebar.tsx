import { 
  LayoutDashboard, 
  TrendingUp, 
  Lightbulb, 
  CloudSun, 
  AlertTriangle,
  Landmark,
  ShoppingCart, 
  Users, 
  Package, 
  User, 
  Settings, 
  LogOut,
  Leaf
} from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { useThemeClasses } from '../hooks/useThemeClasses'

interface SidebarProps {
  isOpen: boolean
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const { t } = useLanguage()
  const themeClasses = useThemeClasses()

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const navItems = [
    { icon: LayoutDashboard, label: t('nav.dashboard'), section: 'main', path: '/dashboard' },
    { icon: TrendingUp, label: t('nav.pricePrediction'), section: 'ai-tools', path: '/price-prediction' },
    { icon: Lightbulb, label: t('nav.cropRecommendation'), section: 'ai-tools', path: '/crop-recommendation' },
    { icon: CloudSun, label: t('nav.weatherAdvice'), section: 'ai-tools', path: '/weather-advice' },
    { icon: AlertTriangle, label: 'Disease Detection', section: 'ai-tools', path: '/disease-detection' },
    { icon: Landmark, label: 'Government Schemes', section: 'ai-tools', path: '/government-schemes' },
    { icon: ShoppingCart, label: t('nav.marketplace'), section: 'platform', path: '/marketplace' },
    { icon: Users, label: t('nav.community'), section: 'platform', path: '/community' },
    { icon: Package, label: t('nav.orders'), section: 'platform', path: '/orders' },
    { icon: User, label: t('nav.profile'), section: 'account', path: '/profile' },
    { icon: Settings, label: t('nav.settings'), section: 'account', path: '/settings' },
  ]

  const sections = {
    'ai-tools': 'AI Tools',
    'platform': 'Platform',
    'account': 'Account'
  }

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen ${themeClasses.card} ${themeClasses.border} border-r transition-all duration-300 z-50 ${
        isOpen ? 'w-64' : 'w-0'
      } overflow-hidden`}
    >
      <div className={`flex items-center gap-3 p-6 ${themeClasses.border} border-b`}>
        <Leaf className="text-green-500" size={28} />
        <span className={`text-xl font-bold ${themeClasses.text.primary}`}>KrishiSetu AI</span>
      </div>

      <nav className="py-4 overflow-y-auto h-[calc(100vh-180px)]">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const showSection = index > 0 && navItems[index - 1].section !== item.section
          const isActive = location.pathname === item.path
          
          return (
            <div key={item.label}>
              {showSection && (
                <div className={`px-5 py-3 text-xs uppercase ${themeClasses.text.muted} font-semibold tracking-wider`}>
                  {sections[item.section as keyof typeof sections]}
                </div>
              )}
              <Link
                to={item.path}
                className={`flex items-center px-5 py-3 ${themeClasses.text.secondary} ${themeClasses.hover.bg} ${themeClasses.hover.text} transition-colors ${
                  isActive ? `${themeClasses.hover.bg} ${themeClasses.text.primary} border-l-3 border-green-500` : ''
                }`}
              >
                <Icon size={20} className="mr-3" />
                <span className="text-sm">{item.label}</span>
              </Link>
            </div>
          )
        })}
      </nav>

      <div className={`absolute bottom-0 left-0 right-0 p-4 ${themeClasses.border} border-t`}>
        <button
          onClick={handleLogout}
          className={`w-full flex items-center px-5 py-3 text-red-400 ${themeClasses.hover.bg} transition-colors rounded-lg`}
        >
          <LogOut size={20} className="mr-3" />
          <span className="text-sm">{t('topbar.logout')}</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
