import { useTheme } from '../context/ThemeContext'

export const useThemeClasses = () => {
  const { effectiveTheme } = useTheme()
  const isDark = effectiveTheme === 'dark'

  return {
    // Background classes
    bg: isDark ? 'bg-dark-bg' : 'bg-light-bg',
    card: isDark ? 'bg-dark-card' : 'bg-light-card',
    
    // Text classes
    text: {
      primary: isDark ? 'text-white' : 'text-gray-900',
      secondary: isDark ? 'text-gray-400' : 'text-gray-600',
      muted: isDark ? 'text-gray-500' : 'text-gray-500',
    },
    
    // Border classes
    border: isDark ? 'border-dark-border' : 'border-light-border',
    
    // Hover classes
    hover: {
      bg: isDark ? 'hover:bg-dark-hover' : 'hover:bg-light-hover',
      text: isDark ? 'hover:text-white' : 'hover:text-gray-900',
    },
    
    // Input classes
    input: isDark 
      ? 'bg-dark-bg border-gray-700 text-white placeholder-gray-500 focus:ring-primary focus:border-transparent'
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-primary focus:border-primary',
    
    // Button classes
    button: {
      primary: 'bg-green-600 hover:bg-green-700 text-white',
      secondary: isDark
        ? 'bg-dark-card hover:bg-dark-hover border-dark-border text-white'
        : 'bg-white hover:bg-gray-50 border-gray-300 text-gray-900',
    },
    
    // Utility
    isDark,
    isLight: !isDark,
  }
}