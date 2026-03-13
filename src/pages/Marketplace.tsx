import { Plus, MapPin, Star, TrendingUp, Navigation, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useRealtimeData } from '../hooks/useRealtimeData'
import { Buyer as BuyerType } from '../types/database'

interface Buyer {
  id: string
  name: string
  verified: boolean
  recommended: boolean
  type: string
  rating: number
  image: string
  offeredPrice: number
  transportCost: number
  distance: number
  netProfit: number
}

const Marketplace = () => {
  const [selectedCrop, setSelectedCrop] = useState('wheat')
  const [sortBy, setSortBy] = useState('shortest')
  const [activeTab, setActiveTab] = useState('buyer-map')

  const { data: buyersData, loading } = useRealtimeData<BuyerType>('buyers')

  const buyers: Buyer[] = buyersData.map(buyer => ({
    id: buyer.id,
    name: buyer.name,
    verified: buyer.verified,
    recommended: buyer.recommended,
    type: buyer.type,
    rating: buyer.rating,
    image: buyer.image || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&h=100&fit=crop',
    offeredPrice: buyer.offered_price,
    transportCost: buyer.transport_cost,
    distance: buyer.distance,
    netProfit: buyer.net_profit
  }))

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Buyer Network</h1>
        <p className="text-gray-400">
          Locate verified wholesale buyers and exporters for your produce directly on the map.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('buyer-map')}
          className={`px-6 py-2.5 rounded-lg font-semibold transition-colors ${
            activeTab === 'buyer-map'
              ? 'bg-dark-card text-white border border-dark-border'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Buyer Map
        </button>
        <button
          onClick={() => setActiveTab('live-market')}
          className={`px-6 py-2.5 rounded-lg font-semibold transition-colors ${
            activeTab === 'live-market'
              ? 'bg-dark-card text-white border border-dark-border'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Live Market & Buyers
        </button>
      </div>

      {/* Crop Selector */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-400">Selling Crop:</span>
        <div className="relative">
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="px-6 py-2.5 bg-dark-card text-white rounded-lg border border-dark-border outline-none focus:ring-2 focus:ring-green-500 appearance-none cursor-pointer pr-10"
          >
            <option value="wheat">Wheat (Sharbati)</option>
            <option value="rice">Rice</option>
            <option value="onion">Onion</option>
            <option value="tomato">Tomato</option>
            <option value="potato">Potato</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
        </div>
      </div>

      {/* Discover Section */}
      <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl p-6 border border-green-500/30 mb-6">
        <div className="flex items-start gap-4">
          <MapPin className="text-green-400 flex-shrink-0 mt-1" size={32} />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-green-400 mb-2">Discover Buyers & Retailers</h2>
            <p className="text-gray-300 mb-4">
              Detect your location to find the nearest and most profitable buyers for your crop using live OpenStreetMap tracking.
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2">
              <Navigation size={18} />
              Detect My Location
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Buyers List */}
        <div className="lg:col-span-1">
          <div className="bg-dark-card rounded-xl p-4 border border-dark-border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Nearby Retailers</h3>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 bg-dark-bg text-white text-sm rounded-lg border border-dark-border outline-none appearance-none cursor-pointer pr-8"
                >
                  <option value="shortest">Shortest...</option>
                  <option value="highest-profit">Highest Profit</option>
                  <option value="best-rating">Best Rating</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {loading ? (
                <div className="text-center py-8 text-gray-400">Loading buyers...</div>
              ) : buyers.length === 0 ? (
                <div className="text-center py-8 text-gray-400">No buyers found</div>
              ) : (
                buyers.map((buyer) => (
                <div
                  key={buyer.id}
                  className="bg-dark-bg rounded-xl p-4 border border-dark-border hover:border-green-500/50 transition-all cursor-pointer"
                >
                  {/* Buyer Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <img
                      src={buyer.image}
                      alt={buyer.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold">{buyer.name}</h4>
                        {buyer.verified && (
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      {buyer.recommended && (
                        <span className="inline-block px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full mb-1">
                          AI Recommended
                        </span>
                      )}
                      <div className="flex items-center gap-2">
                        <span className="text-green-400 text-xs font-semibold">{buyer.type}</span>
                        <div className="flex items-center gap-1">
                          <Star className="text-orange-400 fill-orange-400" size={14} />
                          <span className="text-sm font-bold">{buyer.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Offered Price</span>
                      <span className="font-bold">₹{buyer.offeredPrice}/q</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400 flex items-center gap-1">
                        <MapPin size={14} />
                        Transport ({buyer.distance}km)
                      </span>
                      <span className="text-red-400">-₹{buyer.transportCost}/q</span>
                    </div>
                  </div>

                  {/* Net Profit */}
                  <div className="bg-green-500/10 rounded-lg p-3 mb-3">
                    <div className="flex justify-between items-center">
                      <span className="text-green-400 font-semibold flex items-center gap-1">
                        <TrendingUp size={16} />
                        Net Profit
                      </span>
                      <span className="text-green-400 font-bold text-lg">₹{buyer.netProfit}/q</span>
                    </div>
                  </div>

                  {/* Get Directions Button */}
                  <button className="w-full bg-dark-card hover:bg-dark-hover text-white font-semibold py-2.5 rounded-lg transition-colors border border-dark-border flex items-center justify-center gap-2">
                    <Navigation size={18} />
                    Get Directions
                  </button>
                </div>
              ))
              )}
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="lg:col-span-2">
          <div className="bg-dark-card rounded-xl p-6 border border-dark-border h-full min-h-[600px] flex items-center justify-center">
            <div className="text-center">
              <MapPin className="text-gray-600 mx-auto mb-4" size={64} />
              <p className="text-gray-400 text-lg">Interactive Map View</p>
              <p className="text-gray-500 text-sm mt-2">Map integration coming soon...</p>
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

export default Marketplace
