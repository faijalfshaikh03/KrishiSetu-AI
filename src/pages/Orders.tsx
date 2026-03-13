import { Plus, CheckCircle, Truck, Clock } from 'lucide-react'
import { useState } from 'react'
import ListProduceModal from '../components/ListProduceModal'
import { useRealtimeData } from '../hooks/useRealtimeData'
import { useAuth } from '../context/AuthContext'
import { Order as OrderType } from '../types/database'

interface Order {
  id: string
  orderNumber: string
  placedDate: string
  status: 'delivered' | 'in-transit' | 'ordered'
  product: string
  location: string
  buyer: string
  quantity: string
  totalPayout: string
}

const Orders = () => {
  const [isListProduceOpen, setIsListProduceOpen] = useState(false)
  const { user } = useAuth()
  const { data: ordersData, loading } = useRealtimeData<OrderType>('orders', {
    column: 'user_id',
    value: user?.id
  })

  const orders: Order[] = ordersData.map(order => ({
    id: order.id,
    orderNumber: order.order_number,
    placedDate: new Date(order.placed_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    status: order.status,
    product: order.product,
    location: order.location || '',
    buyer: order.buyer_name,
    quantity: order.quantity,
    totalPayout: order.total_payout
  }))

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
            <CheckCircle size={16} />
            Delivered
          </span>
        )
      case 'in-transit':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
            <Truck size={16} />
            In Transit
          </span>
        )
      case 'ordered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium">
            <Clock size={16} />
            Ordered
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Farmer Orders Dashboard</h1>
          <p className="text-gray-400">
            Manage your incoming produce shipments across {orders.length} orders.
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

      {/* Orders List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No orders yet</p>
            <button 
              onClick={() => setIsListProduceOpen(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              List Your First Produce
            </button>
          </div>
        ) : (
          orders.map((order) => (
          <div
            key={order.id}
            className="bg-dark-card rounded-xl p-6 border border-dark-border hover:border-green-500/50 transition-all"
          >
            {/* Order Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold mb-1">Order #{order.orderNumber}</h3>
                <p className="text-gray-400 text-sm">Placed on {order.placedDate}</p>
              </div>
              {getStatusBadge(order.status)}
            </div>

            {/* Order Details */}
            <div className="border-t border-dark-border pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="text-lg font-bold mb-2">{order.product}</h4>
                  <p className="text-gray-400 text-sm">Buyer: {order.buyer}</p>
                </div>

                <div className="flex gap-12 text-right">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">QUANTITY</p>
                    <p className="text-xl font-bold">{order.quantity}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">TOTAL PAYOUT</p>
                    <p className="text-xl font-bold text-green-400">{order.totalPayout}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
        )}
      </div>

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

export default Orders
