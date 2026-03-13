export interface Buyer {
  id: string
  name: string
  verified: boolean
  recommended: boolean
  type: string
  rating: number
  image: string
  offered_price: number
  transport_cost: number
  distance: number
  net_profit: number
  location?: any
  created_at: string
  updated_at: string
}

export interface Community {
  id: string
  slug: string
  name: string
  description: string
  image: string
  posts_count: number
  created_at: string
  updated_at: string
}

export interface Post {
  id: string
  community_id: string
  user_id: string
  title: string
  content: string
  image?: string
  likes: number
  comments_count: number
  created_at: string
  updated_at: string
}

export interface Comment {
  id: string
  post_id: string
  user_id: string
  content: string
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  order_number: string
  user_id: string
  buyer_name: string
  product: string
  location?: string
  quantity: string
  total_payout: string
  status: 'ordered' | 'in-transit' | 'delivered'
  placed_date: string
  created_at: string
  updated_at: string
}

export interface ProduceListing {
  id: string
  user_id: string
  crop_name: string
  quantity: number
  unit: string
  price_per_unit: number
  description?: string
  image?: string
  location?: string
  status: 'available' | 'sold' | 'reserved'
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  name?: string
  email?: string
  avatar_url?: string
  location?: string
  phone?: string
  created_at: string
  updated_at: string
}
