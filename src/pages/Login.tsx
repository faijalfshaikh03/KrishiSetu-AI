import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { useThemeClasses } from '../hooks/useThemeClasses'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const { t } = useLanguage()
  const themeClasses = useThemeClasses()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await signIn(email, password)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${themeClasses.bg} px-4`}>
      <div className={`max-w-md w-full space-y-8 ${themeClasses.card} p-8 rounded-lg shadow-lg ${themeClasses.border} border`}>
        <div>
          <h2 className={`text-3xl font-bold text-center ${themeClasses.text.primary}`}>
            {t('auth.welcomeBack')}
          </h2>
          <p className={`mt-2 text-center ${themeClasses.text.secondary}`}>
            {t('auth.signInToAccount')}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${themeClasses.text.secondary}`}>
                {t('auth.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 rounded-md ${themeClasses.input} focus:outline-none focus:ring-2`}
                placeholder={t('auth.enterEmail')}
              />
            </div>
            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${themeClasses.text.secondary}`}>
                {t('auth.password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 rounded-md ${themeClasses.input} focus:outline-none focus:ring-2`}
                placeholder={t('auth.enterPassword')}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${themeClasses.button.primary} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? t('auth.signingIn') : t('auth.login')}
          </button>

          <div className="text-center">
            <p className={`text-sm ${themeClasses.text.secondary}`}>
              {t('auth.dontHaveAccount')}{' '}
              <Link to="/signup" className="text-primary hover:text-primary/90">
                {t('auth.signup')}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
