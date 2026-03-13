import { X, Bold, Italic, Quote, Code, Image as ImageIcon, ChevronDown } from 'lucide-react'
import { FormEvent, useState } from 'react'

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
  communityName?: string
}

const CreatePostModal = ({ isOpen, onClose, communityName }: CreatePostModalProps) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedCommunity, setSelectedCommunity] = useState(communityName || '')

  if (!isOpen) return null

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('Creating post:', { title, content, community: selectedCommunity })
    // Add your post creation logic here
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-bg rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-dark-border">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-border">
          <div>
            <h2 className="text-2xl font-bold">Create a New Post</h2>
            <p className="text-gray-400 text-sm mt-1">
              Share your thoughts, questions, or updates with the community.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Community Selector */}
          <div>
            <label className="block text-sm font-medium mb-2">Community</label>
            <div className="relative">
              <select
                value={selectedCommunity}
                onChange={(e) => setSelectedCommunity(e.target.value)}
                className="w-full px-4 py-3 bg-dark-card text-white rounded-lg border border-dark-border outline-none focus:ring-2 focus:ring-green-500 appearance-none cursor-pointer"
              >
                <option value="">Select a community</option>
                <option value="jalgaon-farmers">c/Jalgaon Farmers</option>
                <option value="nashik-grape-growers">c/Nashik Grape Growers</option>
                <option value="pune-agri-hub">c/Pune Agri-Hub</option>
                <option value="nagpur-orange-city">c/Nagpur Orange City</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="An interesting title"
              className="w-full px-4 py-3 bg-dark-card text-white rounded-lg border-2 border-green-500 outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            
            {/* Formatting Toolbar */}
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                className="p-2.5 bg-dark-card hover:bg-dark-hover rounded-lg border border-dark-border transition-colors"
                title="Bold"
              >
                <Bold size={20} />
              </button>
              <button
                type="button"
                className="p-2.5 bg-dark-card hover:bg-dark-hover rounded-lg border border-dark-border transition-colors"
                title="Italic"
              >
                <Italic size={20} />
              </button>
              <button
                type="button"
                className="p-2.5 bg-dark-card hover:bg-dark-hover rounded-lg border border-dark-border transition-colors"
                title="Quote"
              >
                <Quote size={20} />
              </button>
              <button
                type="button"
                className="p-2.5 bg-dark-card hover:bg-dark-hover rounded-lg border border-dark-border transition-colors"
                title="Code"
              >
                <Code size={20} />
              </button>
              <button
                type="button"
                className="p-2.5 bg-dark-card hover:bg-dark-hover rounded-lg border border-dark-border transition-colors"
                title="Image"
              >
                <ImageIcon size={20} />
              </button>
            </div>

            {/* Text Area */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind? You can use Markdown for formatting."
              rows={10}
              className="w-full px-4 py-3 bg-dark-card text-white rounded-lg border border-dark-border outline-none focus:ring-2 focus:ring-green-500 resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePostModal
