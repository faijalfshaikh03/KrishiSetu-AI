import { Plus, User, MapPin, Copy, Edit2, Globe } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const Settings = () => {
  const { language, setLanguage, t } = useLanguage()
  const [activeTab, setActiveTab] = useState('profile')
  const [username, setUsername] = useState('your_username')
  const [displayName, setDisplayName] = useState('Your Name')
  const [region, setRegion] = useState('e.g., Punjab, India')
  const [userId] = useState('usr_1234567890abcdef')
  const [email] = useState('user@example.com')

  const tabs = [
    { id: 'profile', label: t('settings.profile') },
    { id: 'appearance', label: t('settings.appearance') },
    { id: 'notifications', label: t('settings.notifications') },
    { id: 'translation', label: t('settings.translation') },
    { id: 'my-orders', label: t('settings.myOrders') }
  ]

  const languages = [
    { code: 'en', name: t('language.english'), flag: '🇺🇸' },
    { code: 'hi', name: t('language.hindi'), flag: '🇮🇳' },
    { code: 'mr', name: t('language.marathi'), flag: '🇮🇳' }
  ]

  const handleUpdateProfile = () => {
    console.log('Updating profile:', { username, displayName, region })
    // Add your update logic here
  }

  const handleCopyUserId = () => {
    navigator.clipboard.writeText(userId)
    alert('User ID copied to clipboard!')
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{t('settings.title')}</h1>
        <p className="text-gray-400">
          {t('settings.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-dark-card rounded-xl p-2 border border-dark-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-dark-hover text-white'
                    : 'text-gray-400 hover:text-white hover:bg-dark-hover/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Profile Section */}
              <div className="bg-dark-card rounded-xl p-6 border border-dark-border">
                <h2 className="text-2xl font-bold mb-2">Profile</h2>
                <p className="text-gray-400 mb-6">This is how others will see you on the site.</p>

                {/* Profile Picture */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">Profile Picture</label>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center">
                        <User size={40} className="text-gray-500" />
                      </div>
                      <button className="absolute bottom-0 right-0 w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors">
                        <Edit2 size={14} className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Username */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Username</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-dark-bg text-white rounded-lg border border-dark-border outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                {/* Display Name */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Display Name</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-dark-bg text-white rounded-lg border border-dark-border outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Default Region */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Default Region</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      placeholder="e.g., Punjab, India"
                      className="w-full pl-12 pr-4 py-3 bg-dark-bg text-white rounded-lg border border-dark-border outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                {/* Update Button */}
                <button
                  onClick={handleUpdateProfile}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  {t('settings.updateProfile')}
                </button>
              </div>

              {/* Account Section */}
              <div className="bg-dark-card rounded-xl p-6 border border-dark-border">
                <h2 className="text-2xl font-bold mb-2">Account</h2>
                <p className="text-gray-400 mb-6">Manage your account security and identification.</p>

                {/* User ID */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">User ID</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={userId}
                      readOnly
                      className="w-full px-4 py-3 bg-gray-700 text-gray-400 rounded-lg border border-dark-border outline-none cursor-not-allowed"
                    />
                    <button
                      onClick={handleCopyUserId}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      title="Copy User ID"
                    >
                      <Copy size={18} />
                    </button>
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <p className="text-gray-400 text-sm mb-2">
                    Your email address is {email}. This cannot be changed.
                  </p>
                  <input
                    type="email"
                    value={email}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-700 text-gray-400 rounded-lg border border-dark-border outline-none cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="bg-dark-card rounded-xl p-6 border border-dark-border">
              <h2 className="text-2xl font-bold mb-2">Appearance</h2>
              <p className="text-gray-400">Customize the look and feel of the application.</p>
              <div className="mt-6 text-gray-500">Appearance settings coming soon...</div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-dark-card rounded-xl p-6 border border-dark-border">
              <h2 className="text-2xl font-bold mb-2">Notifications</h2>
              <p className="text-gray-400">Manage your notification preferences.</p>
              <div className="mt-6 text-gray-500">Notification settings coming soon...</div>
            </div>
          )}

          {activeTab === 'translation' && (
            <div className="bg-dark-card rounded-xl p-6 border border-dark-border">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="text-green-500" size={24} />
                <h2 className="text-2xl font-bold">{t('settings.translation')}</h2>
              </div>
              <p className="text-gray-400 mb-6">{t('settings.chooseLanguage')}</p>
              
              <div className="space-y-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as any)}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
                      language === lang.code
                        ? 'border-green-500 bg-green-500/10 text-green-400'
                        : 'border-dark-border bg-dark-bg hover:border-gray-600 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </div>
                    {language === lang.code && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-blue-400 text-sm">
                  <strong>Note:</strong> Language changes will be applied immediately. Some content may require a page refresh to fully update.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'my-orders' && (
            <div className="bg-dark-card rounded-xl p-6 border border-dark-border">
              <h2 className="text-2xl font-bold mb-2">My Orders</h2>
              <p className="text-gray-400">View and manage your order history.</p>
              <div className="mt-6 text-gray-500">Order history coming soon...</div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110">
        <Plus className="text-white" size={28} />
      </button>
    </div>
  )
}

export default Settings
