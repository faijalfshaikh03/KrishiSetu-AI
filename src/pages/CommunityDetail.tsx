import { Plus, Calendar, Globe, MessageSquare, Rss, MoreHorizontal } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import CreatePostModal from '../components/CreatePostModal'

interface CommunityData {
  [key: string]: {
    name: string
    description: string
    image: string
    created: string
    posts: number
  }
}

const CommunityDetail = () => {
  const { communityId } = useParams()
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)

  const communities: CommunityData = {
    'jalgaon-farmers': {
      name: 'c/Jalgaon Farmers',
      description: 'A community for farmers in Jalgaon to discuss Banana, Cotton, and local market trends.',
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=300&fit=crop',
      created: 'March 10th, 2026 10:37 PM',
      posts: 142
    },
    'nashik-grape-growers': {
      name: 'c/Nashik Grape Growers',
      description: 'Connect with vineyards, export specialists, and vegetable growers in Nashik region.',
      image: 'https://images.unsplash.com/photo-1596363505729-4190a9506133?w=1200&h=300&fit=crop',
      created: 'March 10th, 2026 10:37 PM',
      posts: 89
    },
    'pune-agri-hub': {
      name: 'c/Pune Agri-Hub',
      description: 'Discuss modern farming techniques, greenhouse setups, and direct-to-consumer sales.',
      image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&h=300&fit=crop',
      created: 'March 10th, 2026 10:37 PM',
      posts: 256
    },
    'nagpur-orange-city': {
      name: 'c/Nagpur Orange City',
      description: 'Dedicated to citrus farmers, cotton growers, and central Maharashtra agriculture.',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&h=300&fit=crop',
      created: 'March 10th, 2026 10:37 PM',
      posts: 115
    }
  }

  const community = communities[communityId || 'jalgaon-farmers']

  if (!community) {
    return <div>Community not found</div>
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Banner */}
      <div className="relative h-48 rounded-xl overflow-hidden mb-6">
        <img
          src={community.image}
          alt={community.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/50 to-transparent"></div>
        
        {/* Community Avatar and Name */}
        <div className="absolute bottom-6 left-6 flex items-end gap-4">
          <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center text-3xl font-bold border-4 border-dark-bg">
            {community.name.charAt(2)}
          </div>
          <div className="mb-2">
            <h1 className="text-3xl font-bold">{community.name}</h1>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button 
          onClick={() => setIsCreatePostOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-full transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Create Post
        </button>
        <button className="bg-dark-card hover:bg-dark-hover text-white font-semibold px-6 py-2.5 rounded-full transition-colors border border-dark-border flex items-center gap-2">
          <Rss size={20} />
          Subscribe
        </button>
        <button className="bg-dark-card hover:bg-dark-hover text-white font-semibold px-6 py-2.5 rounded-full transition-colors border border-dark-border">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          <div className="bg-gray-100 rounded-xl p-12 text-center">
            <div className="text-6xl mb-4">💬</div>
            <p className="text-gray-500">
              Be the first to say hello to the {communityId?.replace('-', '-')} community!
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* About Section */}
          <div className="bg-dark-card rounded-xl p-6 border border-dark-border">
            <h2 className="text-xl font-bold mb-4">About {community.name}</h2>
            <p className="text-gray-400 mb-6">{community.description}</p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-400">
                <Calendar size={18} />
                <span className="text-sm">Created {community.created}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Globe size={18} />
                <span className="text-sm">Public</span>
              </div>
            </div>

            <button className="w-full bg-dark-hover hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-colors border border-dark-border">
              Add a community guide
            </button>
          </div>

          {/* Moderators Section */}
          <div className="bg-dark-card rounded-xl p-6 border border-dark-border">
            <h2 className="text-xl font-bold mb-4">Moderators</h2>
            <button className="w-full bg-dark-hover hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-colors border border-dark-border flex items-center justify-center gap-2">
              <MessageSquare size={18} />
              Message Mods
            </button>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal 
        isOpen={isCreatePostOpen} 
        onClose={() => setIsCreatePostOpen(false)}
        communityName={community.name}
      />

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsCreatePostOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110"
      >
        <Plus className="text-white" size={28} />
      </button>
    </div>
  )
}

export default CommunityDetail
