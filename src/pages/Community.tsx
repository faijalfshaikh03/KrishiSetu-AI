import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRealtimeData } from '../hooks/useRealtimeData'
import { Community as CommunityType } from '../types/database'

interface CommunityCard {
  id: string
  slug: string
  name: string
  description: string
  image: string
  posts: number
  lastActive: string
}

const Community = () => {
  const { data: communitiesData, loading } = useRealtimeData<CommunityType>('communities')

  const communities: CommunityCard[] = communitiesData.map(community => ({
    id: community.id,
    slug: community.slug,
    name: community.name,
    description: community.description || '',
    image: community.image || 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=400&fit=crop',
    posts: community.posts_count,
    lastActive: 'just now'
  }))

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Community Hub</h1>
        <p className="text-gray-400">
          Connect with fellow farmers, share knowledge, and grow together. Explore a community or search for content below.
        </p>
      </div>

      {/* Community Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-12 text-gray-400">Loading communities...</div>
        ) : communities.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-400">No communities found</div>
        ) : (
          communities.map((community) => (
          <Link
            key={community.id}
            to={`/community/${community.slug}`}
            className="bg-dark-card rounded-xl overflow-hidden border border-dark-border hover:border-green-500 transition-all cursor-pointer group"
          >
            {/* Community Image */}
            <div className="h-48 overflow-hidden">
              <img
                src={community.image}
                alt={community.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Community Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 group-hover:text-green-500 transition-colors">
                {community.name}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {community.description}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Official Hub • {community.posts} Posts</span>
                <span>{community.lastActive}</span>
              </div>
            </div>
          </Link>
        ))
        )}
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110">
        <Plus className="text-white" size={28} />
      </button>
    </div>
  )
}

export default Community
