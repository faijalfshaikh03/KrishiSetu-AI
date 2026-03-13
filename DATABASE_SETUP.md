# Database Setup Guide - Real-time Sync

This guide will help you set up the Supabase database with real-time synchronization.

## Step 1: Run the SQL Schema

1. Go to your Supabase Dashboard
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase-schema.sql` file
5. Paste it into the SQL editor
6. Click **Run** (or press Ctrl/Cmd + Enter)

This will create:
- All necessary tables (profiles, buyers, communities, posts, comments, orders, produce_listings)
- Row Level Security (RLS) policies for data access control
- Real-time subscriptions for live data updates
- Sample data for buyers and communities

## Step 2: Enable Realtime (if not already enabled)

1. Go to **Database** → **Replication** in your Supabase dashboard
2. Make sure the following tables have replication enabled:
   - buyers
   - communities
   - posts
   - comments
   - orders
   - produce_listings

If any table is missing, click **Add table** and select it.

## Step 3: Verify the Setup

Run these queries in the SQL Editor to verify:

```sql
-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check sample data
SELECT * FROM communities;
SELECT * FROM buyers;
```

## What's Been Integrated

### Real-time Data Sync

All pages now use the `useRealtimeData` hook which:
- Fetches initial data from Supabase
- Subscribes to real-time changes
- Automatically updates the UI when data changes
- Handles loading and error states

### Pages with Real-time Sync

1. **Marketplace** (`/marketplace`)
   - Displays buyers from the `buyers` table
   - Updates in real-time when buyers are added/updated

2. **Community** (`/community`)
   - Displays communities from the `communities` table
   - Updates in real-time when communities are added/updated

3. **Orders** (`/orders`)
   - Displays user-specific orders from the `orders` table
   - Filtered by logged-in user
   - Updates in real-time when orders are created/updated

4. **List Produce Modal**
   - Saves new produce listings to `produce_listings` table
   - Integrated with authentication

## Database Schema Overview

### Tables

1. **profiles** - User profile information
   - Extends auth.users with additional fields
   - Stores name, avatar, location, phone

2. **buyers** - Marketplace buyers/retailers
   - Stores buyer information, pricing, ratings
   - Public read access

3. **communities** - Farmer communities
   - Regional farming communities
   - Public read access

4. **posts** - Community posts
   - User-generated content in communities
   - Users can CRUD their own posts

5. **comments** - Post comments
   - Comments on community posts
   - Users can CRUD their own comments

6. **orders** - User orders
   - Private to each user
   - Tracks order status and details

7. **produce_listings** - Farmer produce listings
   - What farmers are selling
   - Public read, users manage their own

### Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:
- Public data (buyers, communities, posts) is readable by everyone
- Private data (orders) is only accessible by the owner
- Users can only modify their own content

## Testing Real-time Sync

### Test 1: Add a New Buyer

1. Open your app in two browser windows
2. In the SQL Editor, run:
```sql
INSERT INTO buyers (name, verified, recommended, type, rating, image, offered_price, transport_cost, distance, net_profit)
VALUES ('Test Buyer', true, false, 'WHOLESALE MARKET', 4.5, 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&h=100&fit=crop', 2900, 1200, 150, 1700);
```
3. Watch both browser windows update instantly!

### Test 2: Create a Produce Listing

1. Log in to your app
2. Click "List Your Produce"
3. Fill out the form and submit
4. Check the database:
```sql
SELECT * FROM produce_listings ORDER BY created_at DESC LIMIT 5;
```

### Test 3: Update Order Status

1. Create an order in the database:
```sql
INSERT INTO orders (order_number, user_id, buyer_name, product, quantity, total_payout, status, placed_date)
VALUES ('ORD-TEST', 'your-user-id-here', 'Test Buyer', 'Test Product', '100 kg', '₹5,000', 'ordered', NOW());
```
2. Watch it appear in the Orders page
3. Update the status:
```sql
UPDATE orders SET status = 'in-transit' WHERE order_number = 'ORD-TEST';
```
4. Watch the status update in real-time!

## How Real-time Works

The `useRealtimeData` hook:

```typescript
const { data, loading, error } = useRealtimeData<Type>('table_name')
```

1. **Initial Fetch**: Loads all data from the table
2. **Subscribe**: Listens for INSERT, UPDATE, DELETE events
3. **Auto-update**: Updates local state when changes occur
4. **Cleanup**: Unsubscribes when component unmounts

### With Filters

```typescript
const { data, loading, error } = useRealtimeData<Order>('orders', {
  column: 'user_id',
  value: user?.id
})
```

This filters data by a specific column value (e.g., show only current user's orders).

## Troubleshooting

### Data not updating in real-time

1. Check if Realtime is enabled for the table in Database → Replication
2. Verify RLS policies allow the operation
3. Check browser console for errors

### "permission denied" errors

- Check RLS policies in the SQL schema
- Make sure you're logged in if accessing private data
- Verify the user has the correct permissions

### Data not loading

1. Check if tables exist: `SELECT * FROM information_schema.tables WHERE table_schema = 'public';`
2. Verify sample data was inserted
3. Check browser console for errors
4. Ensure `.env` file has correct credentials

## Next Steps

1. Add more sample data to test with
2. Create posts and comments in communities
3. Build a page to display produce listings
4. Add image upload functionality
5. Implement search and filtering
6. Add notifications for real-time events

## Additional Resources

- [Supabase Realtime Docs](https://supabase.com/docs/guides/realtime)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
