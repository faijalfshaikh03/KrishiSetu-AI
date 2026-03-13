import { Plus, User, MapPin, Calendar, Package, MessageSquare } from 'lucide-react'

const Profile = () => {
  const userProfile = {
    username: 'ramesh_patil',
    displayName: 'Ramesh Patil',
    region: 'Nashik, Maharashtra',
    joinedDate: 'March 2026',
    bio: 'Experienced farmer specializing in grapes and onions. Passionate about sustainable farming practices.',
    stats: {
      orders: 12,
      listings: 5,
      communities: 3,
      posts: 8
    }
  }

  const recentActivity = [
    {
      id: '1',
      type: 'order',
      title: 'Delivered Premium Red Onions',
      description: '50 kg to buyer in Jalgaon',
      date: '2 days ago'
    },
    {
      id: '2',
      type: 'post',
      title: 'Posted in c/Nashik Grape Growers',
      description: 'Best practices for grape harvesting',
      date: '5 days ago'
    },
    {
      id: '3',
      type: 'listing',
      title: 'Listed Fresh Grapes',
      description: '100 kg at ₹45/kg',
      date: '1 week ago'
    }
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Profile</h1>
        <p className="text-gray-400">
          View and manage your public profile information.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-dark-card rounded-xl p-6 border border-dark-border">
            {/* Profile Picture */}
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center">
                <User size={60} className="text-gray-500" />
              </div>
            </div>

            {/* User Info */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-1">{userProfile.displayName}</h2>
              <p className="text-gray-400 mb-3">@{userProfile.username}</p>
              
              <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-2">
                <MapPin size={16} />
                <span>{userProfile.region}</span>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                <Calendar size={16} />
                <span>Joined {userProfile.joinedDate}</span>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-6">
              <p className="text-gray-300 text-sm text-center">{userProfile.bio}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-dark-bg rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-green-400">{userProfile.stats.orders}</p>
                <p className="text-gray-400 text-xs">Orders</p>
              </div>
              <div className="bg-dark-bg rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-blue-400">{userProfile.stats.listings}</p>
                <p className="text-gray-400 text-xs">Listings</p>
              </div>
              <div className="bg-dark-bg rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-purple-400">{userProfile.stats.communities}</p>
                <p className="text-gray-400 text-xs">Communities</p>
              </div>
              <div className="bg-dark-bg rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-orange-400">{userProfile.stats.posts}</p>
                <p className="text-gray-400 text-xs">Posts</p>
              </div>
            </div>

            {/* Edit Profile Button */}
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Activity Section */}
        <div className="lg:col-span-2">
          <div className="bg-dark-card rounded-xl p-6 border border-dark-border">
            <h3 className="text-2xl font-bold mb-6">Recent Activity</h3>

            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-dark-bg rounded-lg p-4 border border-dark-border hover:border-green-500/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                      {activity.type === 'order' && <Package size={20} className="text-green-400" />}
                      {activity.type === 'post' && <MessageSquare size={20} className="text-blue-400" />}
                      {activity.type === 'listing' && <Plus size={20} className="text-purple-400" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{activity.title}</h4>
                      <p className="text-gray-400 text-sm mb-2">{activity.description}</p>
                      <p className="text-gray-500 text-xs">{activity.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Communities Section */}
          <div className="bg-dark-card rounded-xl p-6 border border-dark-border mt-6">
            <h3 className="text-2xl font-bold mb-6">Communities</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-dark-bg rounded-lg p-4 border border-dark-border hover:border-green-500/50 transition-all cursor-pointer">
                <h4 className="font-semibold mb-1">c/Nashik Grape Growers</h4>
                <p className="text-gray-400 text-sm">89 posts • Active member</p>
              </div>
              <div className="bg-dark-bg rounded-lg p-4 border border-dark-border hover:border-green-500/50 transition-all cursor-pointer">
                <h4 className="font-semibold mb-1">c/Jalgaon Farmers</h4>
                <p className="text-gray-400 text-sm">142 posts • Member</p>
              </div>
              <div className="bg-dark-bg rounded-lg p-4 border border-dark-border hover:border-green-500/50 transition-all cursor-pointer">
                <h4 className="font-semibold mb-1">c/Pune Agri-Hub</h4>
                <p className="text-gray-400 text-sm">256 posts • Member</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110">
        <Plus className="text-white" size={28} />
      </button>
    </div>
  )
}

export default Profile
