import { Plus, User, MapPin, Calendar, Package, MessageSquare } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

interface UserProfile {
  id: string
  name?: string
  email?: string
  location?: string
  bio?: string
  avatar_url?: string
  created_at: string
}

interface ActivityItem {
  id: string
  type: 'order' | 'post' | 'listing'
  title: string
  description: string
  date: string
}

const Profile = () => {
  const { user } = useAuth()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [stats, setStats] = useState({ orders: 0, listings: 0, communities: 0, posts: 0 })
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchProfileData = async () => {
      try {
        // Fetch user profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profileError && profileError.code !== 'PGRST116') throw profileError
        if (profile) setUserProfile(profile)

        // Fetch stats
        const [ordersRes, listingsRes, communitiesRes, postsRes] = await Promise.all([
          supabase.from('orders').select('id', { count: 'exact' }).eq('user_id', user.id),
          supabase.from('produce_listings').select('id', { count: 'exact' }).eq('user_id', user.id),
          supabase.from('community_members').select('id', { count: 'exact' }).eq('user_id', user.id),
          supabase.from('posts').select('id', { count: 'exact' }).eq('user_id', user.id),
        ])

        setStats({
          orders: ordersRes.count || 0,
          listings: listingsRes.count || 0,
          communities: communitiesRes.count || 0,
          posts: postsRes.count || 0,
        })

        // Fetch recent activity
        const { data: orders } = await supabase
          .from('orders')
          .select('id, product, quantity, status, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(3)

        const { data: posts } = await supabase
          .from('posts')
          .select('id, title, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(3)

        const { data: listings } = await supabase
          .from('produce_listings')
          .select('id, crop_name, quantity, price_per_unit, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(3)

        const activity: ActivityItem[] = []

        orders?.forEach((order) => {
          activity.push({
            id: order.id,
            type: 'order',
            title: `${order.status === 'delivered' ? 'Delivered' : 'Ordered'} ${order.product}`,
            description: `${order.quantity} units`,
            date: new Date(order.created_at).toLocaleDateString(),
          })
        })

        posts?.forEach((post) => {
          activity.push({
            id: post.id,
            type: 'post',
            title: `Posted: ${post.title}`,
            description: 'Community post',
            date: new Date(post.created_at).toLocaleDateString(),
          })
        })

        listings?.forEach((listing) => {
          activity.push({
            id: listing.id,
            type: 'listing',
            title: `Listed ${listing.crop_name}`,
            description: `${listing.quantity} units at ₹${listing.price_per_unit}/unit`,
            date: new Date(listing.created_at).toLocaleDateString(),
          })
        })

        setRecentActivity(activity.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5))
      } catch (error) {
        console.error('Error fetching profile data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [user])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-400">Loading profile...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-400">Please log in to view your profile</div>
      </div>
    )
  }

  const displayName = userProfile?.name || user.email?.split('@')[0] || 'User'
  const joinedDate = userProfile?.created_at ? new Date(userProfile.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'Recently'

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
                {userProfile?.avatar_url ? (
                  <img src={userProfile.avatar_url} alt={displayName} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User size={60} className="text-gray-500" />
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-1">{displayName}</h2>
              <p className="text-gray-400 mb-3">{user.email}</p>
              
              {userProfile?.location && (
                <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-2">
                  <MapPin size={16} />
                  <span>{userProfile.location}</span>
                </div>
              )}
              
              <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                <Calendar size={16} />
                <span>Joined {joinedDate}</span>
              </div>
            </div>

            {/* Bio */}
            {userProfile?.bio && (
              <div className="mb-6">
                <p className="text-gray-300 text-sm text-center">{userProfile.bio}</p>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-dark-bg rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-green-400">{stats.orders}</p>
                <p className="text-gray-400 text-xs">Orders</p>
              </div>
              <div className="bg-dark-bg rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-blue-400">{stats.listings}</p>
                <p className="text-gray-400 text-xs">Listings</p>
              </div>
              <div className="bg-dark-bg rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-purple-400">{stats.communities}</p>
                <p className="text-gray-400 text-xs">Communities</p>
              </div>
              <div className="bg-dark-bg rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-orange-400">{stats.posts}</p>
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

            {recentActivity.length === 0 ? (
              <p className="text-gray-400">No recent activity yet.</p>
            ) : (
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
            )}
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
