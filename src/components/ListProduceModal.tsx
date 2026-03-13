import { X, Leaf, Shield, ChevronDown } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

interface ListProduceModalProps {
  isOpen: boolean
  onClose: () => void
}

const ListProduceModal = ({ isOpen, onClose }: ListProduceModalProps) => {
  const [product, setProduct] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [contact, setContact] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useAuth()

  if (!isOpen) return null

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error: insertError } = await supabase
        .from('produce_listings')
        .insert({
          user_id: user?.id,
          crop_name: product,
          quantity: parseFloat(quantity) || 0,
          unit: 'kg',
          price_per_unit: parseFloat(price),
          description: description || null,
          location: location || null,
          status: 'available'
        })

      if (insertError) throw insertError

      // Reset form
      setProduct('')
      setPrice('')
      setQuantity('')
      setName('')
      setLocation('')
      setContact('')
      setDescription('')
      
      onClose()
    } catch (err: any) {
      setError(err.message || 'Failed to create listing')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-bg rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-dark-border">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-border">
          <div className="flex items-center gap-3">
            <Leaf className="text-green-500" size={28} />
            <div>
              <h2 className="text-2xl font-bold">List Your Produce</h2>
              <p className="text-gray-400 text-sm mt-1">
                Select which product you're selling. Your offer will appear as a seller card on that product's marketplace page — buyers can compare your price directly.
              </p>
            </div>
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
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          
          {/* Product Selector */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              SELECT PRODUCT <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="w-full px-4 py-3 bg-dark-card text-white rounded-lg border-2 border-green-500 outline-none focus:ring-2 focus:ring-green-500 appearance-none cursor-pointer"
                required
              >
                <option value="">Choose which product you're selling...</option>
                <option value="wheat">Wheat</option>
                <option value="rice">Rice</option>
                <option value="onion">Onion</option>
                <option value="tomato">Tomato</option>
                <option value="potato">Potato</option>
                <option value="spinach">Spinach (Palak)</option>
                <option value="green-peas">Green Peas</option>
                <option value="grapes">Grapes</option>
                <option value="cotton">Cotton</option>
                <option value="sugarcane">Sugarcane</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>

          {/* Price and Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                YOUR PRICE / KG (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 35"
                className="w-full px-4 py-3 bg-dark-card text-white rounded-lg border border-dark-border outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                AVAILABLE QTY (KG)
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 200"
                className="w-full px-4 py-3 bg-dark-card text-white rounded-lg border border-dark-border outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Name and Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                YOUR NAME
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Patil"
                className="w-full px-4 py-3 bg-dark-card text-white rounded-lg border border-dark-border outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                LOCATION / VILLAGE
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Nashik, MH"
                className="w-full px-4 py-3 bg-dark-card text-white rounded-lg border border-dark-border outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              CONTACT NUMBER
            </label>
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="e.g. 9876543210"
              className="w-full px-4 py-3 bg-dark-card text-white rounded-lg border border-dark-border outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              DESCRIPTION (OPTIONAL)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Variety, quality, harvest date, freshness guarantee..."
              rows={4}
              className="w-full px-4 py-3 bg-dark-card text-white rounded-lg border border-dark-border outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          {/* Info Box */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex gap-3">
            <Shield className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-blue-300 text-sm">
              Your contact details (name, location, phone) will be visible to buyers comparing deals on the product page.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 bg-dark-card hover:bg-dark-hover text-white font-semibold rounded-lg transition-colors border border-dark-border"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Leaf size={20} />
              {loading ? 'Publishing...' : 'Publish Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ListProduceModal
