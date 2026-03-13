import { Menu, Moon, Languages, Bell, LogOut } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { useNavigate } from 'react-router-dom'
import { useThemeClasses } from '../hooks/useThemeClasses'

interface TopBarProps {
  onMenuClick: () => void
}

const TopBar = ({ onMenuClick }: TopBarProps) => {
  const [showThemeMenu, setShowThemeMenu] = useState(false)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const themeClasses = useThemeClasses()
  const themeRef = useRef<HTMLDivElement>(null)
  const languageRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिन्दी (Hindi)', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी (Marathi)', flag: '🇮🇳' }
  ]

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeRef.current && !themeRef.current.contains(event.target as Node)) {
        setShowThemeMenu(false)
      }
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false)
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme)
    setShowThemeMenu(false)
  }

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode as any)
    setShowLanguageMenu(false)
  }

  const handleLogout = async () => {
    try {
      setShowUserMenu(false)
      await signOut()
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const getUserInitial = () => {
    if (user?.user_metadata?.name) {
      return user.user_metadata.name.charAt(0).toUpperCase()
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase()
    }
    return 'U'
  }

  return (
    <header className={`${themeClasses.card} ${themeClasses.border} border-b px-8 py-4 flex justify-between items-center transition-colors`}>
      <button 
        onClick={onMenuClick}
        className={`${themeClasses.text.secondary} ${themeClasses.hover.text} transition-colors`}
      >
        <Menu size={24} />
      </button>

      <div className="flex items-center gap-4">
        {/* Theme Selector */}
        <div className="relative" ref={themeRef}>
          <button 
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            className={`${themeClasses.text.secondary} ${themeClasses.hover.text} transition-colors`}
          >
            <Moon size={20} />
          </button>
          
          {showThemeMenu && (
            <div className={`absolute right-0 top-12 ${themeClasses.card} ${themeClasses.border} border rounded-xl shadow-xl w-48 py-2 z-50`}>
              <button
                onClick={() => handleThemeChange('light')}
                className={`w-full text-left px-4 py-3 ${themeClasses.hover.bg} transition-colors ${
                  theme === 'light' ? themeClasses.text.primary : themeClasses.text.secondary
                }`}
              >
                Light
              </button>
              <button
                onClick={() => handleThemeChange('dark')}
                className={`w-full text-left px-4 py-3 ${themeClasses.hover.bg} transition-colors ${
                  theme === 'dark' ? themeClasses.text.primary : themeClasses.text.secondary
                }`}
              >
                Dark
              </button>
              <button
                onClick={() => handleThemeChange('system')}
                className={`w-full text-left px-4 py-3 ${themeClasses.hover.bg} transition-colors ${
                  theme === 'system' ? themeClasses.text.primary : themeClasses.text.secondary
                }`}
              >
                System
              </button>
            </div>
          )}
        </div>

        {/* Language Selector */}
        <div className="relative" ref={languageRef}>
          <button 
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            className={`${themeClasses.text.secondary} ${themeClasses.hover.text} transition-colors`}
          >
            <Languages size={20} />
          </button>
          
          {showLanguageMenu && (
            <div className={`absolute right-0 top-12 ${themeClasses.card} ${themeClasses.border} border rounded-xl shadow-xl w-56 py-2 z-50`}>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full text-left px-4 py-3 ${themeClasses.hover.bg} transition-colors flex items-center gap-3 ${
                    language === lang.code ? themeClasses.text.primary : themeClasses.text.secondary
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                  {language === lang.code && (
                    <div className="ml-auto w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className={`${themeClasses.text.secondary} ${themeClasses.hover.text} transition-colors`}>
          <Bell size={20} />
        </button>

        {/* User Avatar */}
        <div className="relative" ref={userRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className={`w-9 h-9 ${themeClasses.hover.bg} rounded-full flex items-center justify-center text-green-500 font-semibold hover:ring-2 hover:ring-primary transition-all`}
          >
            {getUserInitial()}
          </button>

          {showUserMenu && (
            <div className={`absolute right-0 top-12 ${themeClasses.card} ${themeClasses.border} border rounded-xl shadow-xl w-56 py-2 z-50`}>
              <div className={`px-4 py-3 ${themeClasses.border} border-b`}>
                <p className={`text-sm ${themeClasses.text.primary} font-medium`}>
                  {user?.user_metadata?.name || 'User'}
                </p>
                <p className={`text-xs ${themeClasses.text.secondary} truncate`}>
                  {user?.email}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className={`w-full text-left px-4 py-3 ${themeClasses.hover.bg} transition-colors ${themeClasses.text.secondary} flex items-center gap-2`}
              >
                <LogOut size={16} />
                {t('topbar.logout')}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default TopBar
