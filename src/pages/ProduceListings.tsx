import { Plus, MapPin, Package } from 'lucide-react'
import { useState } from 'react'
import { useRealtimeData } from '../hooks/useRealtimeData'
import { ProduceListing } from '../types/database'
import ListProduceModal from '../components/ListProduceModal'

const ProduceListings = () => {
  const [isListProduceOpen, setIsListProduceOpen] = useState(false)
  const { data: listings, loading } = useRealtimeData<ProduceListing>('produce_listings')

  const getStatusBadge = (status: string) => {
    const styles = {
      available: 'bg-green-500/20 text-green-400',
      sold: 'bg-gray-500/20 text-gray-400',
      reserved: 'bg-orange-500/20 text-orange-400'
    }
    return styles[status as keyof typeof styles] || styles.available
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Produce Listings</h1>
          <p className="text-gray-400">
            Browse available produce from farmers in your area
          </p>
        </div>
        <button 
          onClick={() => setIsListProduceOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          List Your Produce
        </button>
      </div>

      {/* Listings Grid */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading listings...</div>
      ) : listings.length === 0 ? (
        <div className="text-center py-12">
          <Package className="text-gray-600 mx-auto mb-4" size={64} />
          <p className="text-gray-400 mb-4">No produce listings yet</p>
          <button 
            onClick={() => setIsListProduceOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Create First Listing
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-dark-card rounded-xl p-6 border border-dark-border hover:border-green-500/50 transition-all"
            >
              {/* Status Badge */}
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(listing.status)}`}>
                  {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                </span>
                <span className="text-gray-400 text-sm">
                  {new Date(listing.created_at).toLocaleDateString()}
                </span>
              </div>

              {/* Crop Name */}
              <h3 className="text-xl font-bold mb-2 capitalize">
                {listing.crop_name}
              </h3>

              {/* Description */}
              {listing.description && (
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {listing.description}
                </p>
              )}

              {/* Location */}
              {listing.location && (
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                  <MapPin size={16} />
                  <span>{listing.location}</span>
                </div>
              )}

              {/* Pricing */}
              <div className="border-t border-dark-border pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Price per {listing.unit}</span>
                  <span className="font-bold text-green-400">₹{listing.price_per_unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Available Quantity</span>
                  <span className="font-bold">{listing.quantity} {listing.unit}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-300 font-semibold">Total Value</span>
                  <span className="font-bold text-green-400">
                    ₹{(listing.quantity * listing.price_per_unit).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Contact Button */}
              <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-colors">
                Contact Seller
              </button>
            </div>
          ))}
        </div>
      )}

      {/* List Produce Modal */}
      <ListProduceModal 
        isOpen={isListProduceOpen}
        onClose={() => setIsListProduceOpen(false)}
      />

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsListProduceOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110"
      >
        <Plus className="text-white" size={28} />
      </button>
    </div>
  )
}

export default ProduceListings
