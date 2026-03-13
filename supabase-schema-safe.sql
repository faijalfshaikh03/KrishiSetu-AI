-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (extends auth.users) - only create if not exists
do $$ 
begin
  if not exists (select from pg_tables where schemaname = 'public' and tablename = 'profiles') then
    create table profiles (
      id uuid references auth.users on delete cascade primary key,
      name text,
      email text,
      avatar_url text,
      location text,
      phone text,
      created_at timestamp with time zone default timezone('utc'::text, now()) not null,
      updated_at timestamp with time zone default timezone('utc'::text, now()) not null
    );
  end if;
end $$;

-- Buyers table
create table if not exists buyers (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  verified boolean default false,
  recommended boolean default false,
  type text not null,
  rating numeric(2,1) default 0,
  image text,
  offered_price numeric(10,2) not null,
  transport_cost numeric(10,2) not null,
  distance numeric(10,2) not null,
  net_profit numeric(10,2) not null,
  location jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Communities table
create table if not exists communities (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  name text not null,
  description text,
  image text,
  posts_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Posts table
create table if not exists posts (
  id uuid default uuid_generate_v4() primary key,
  community_id uuid references communities(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  content text not null,
  image text,
  likes integer default 0,
  comments_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Comments table
create table if not exists comments (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid references posts(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Orders table
create table if not exists orders (
  id uuid default uuid_generate_v4() primary key,
  order_number text unique not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  buyer_name text not null,
  product text not null,
  location text,
  quantity text not null,
  total_payout text not null,
  status text not null check (status in ('ordered', 'in-transit', 'delivered')),
  placed_date timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Produce listings table
create table if not exists produce_listings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  crop_name text not null,
  quantity numeric(10,2) not null,
  unit text not null,
  price_per_unit numeric(10,2) not null,
  description text,
  image text,
  location text,
  status text not null default 'available' check (status in ('available', 'sold', 'reserved')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table profiles enable row level security;
alter table buyers enable row level security;
alter table communities enable row level security;
alter table posts enable row level security;
alter table comments enable row level security;
alter table orders enable row level security;
alter table produce_listings enable row level security;

-- Drop existing policies if they exist (to avoid conflicts)
drop policy if exists "Public profiles are viewable by everyone" on profiles;
drop policy if exists "Users can insert their own profile" on profiles;
drop policy if exists "Users can update own profile" on profiles;
drop policy if exists "Buyers are viewable by everyone" on buyers;
drop policy if exists "Only authenticated users can insert buyers" on buyers;
drop policy if exists "Communities are viewable by everyone" on communities;
drop policy if exists "Only authenticated users can create communities" on communities;
drop policy if exists "Posts are viewable by everyone" on posts;
drop policy if exists "Authenticated users can create posts" on posts;
drop policy if exists "Users can update own posts" on posts;
drop policy if exists "Users can delete own posts" on posts;
drop policy if exists "Comments are viewable by everyone" on comments;
drop policy if exists "Authenticated users can create comments" on comments;
drop policy if exists "Users can update own comments" on comments;
drop policy if exists "Users can delete own comments" on comments;
drop policy if exists "Users can view own orders" on orders;
drop policy if exists "Users can create own orders" on orders;
drop policy if exists "Users can update own orders" on orders;
drop policy if exists "Produce listings are viewable by everyone" on produce_listings;
drop policy if exists "Users can create own listings" on produce_listings;
drop policy if exists "Users can update own listings" on produce_listings;
drop policy if exists "Users can delete own listings" on produce_listings;

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on profiles for select using (true);

create policy "Users can insert their own profile"
  on profiles for insert with check (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Buyers policies
create policy "Buyers are viewable by everyone"
  on buyers for select using (true);

create policy "Only authenticated users can insert buyers"
  on buyers for insert with check (auth.role() = 'authenticated');

-- Communities policies
create policy "Communities are viewable by everyone"
  on communities for select using (true);

create policy "Only authenticated users can create communities"
  on communities for insert with check (auth.role() = 'authenticated');

-- Posts policies
create policy "Posts are viewable by everyone"
  on posts for select using (true);

create policy "Authenticated users can create posts"
  on posts for insert with check (auth.role() = 'authenticated');

create policy "Users can update own posts"
  on posts for update using (auth.uid() = user_id);

create policy "Users can delete own posts"
  on posts for delete using (auth.uid() = user_id);

-- Comments policies
create policy "Comments are viewable by everyone"
  on comments for select using (true);

create policy "Authenticated users can create comments"
  on comments for insert with check (auth.role() = 'authenticated');

create policy "Users can update own comments"
  on comments for update using (auth.uid() = user_id);

create policy "Users can delete own comments"
  on comments for delete using (auth.uid() = user_id);

-- Orders policies
create policy "Users can view own orders"
  on orders for select using (auth.uid() = user_id);

create policy "Users can create own orders"
  on orders for insert with check (auth.uid() = user_id);

create policy "Users can update own orders"
  on orders for update using (auth.uid() = user_id);

-- Produce listings policies
create policy "Produce listings are viewable by everyone"
  on produce_listings for select using (true);

create policy "Users can create own listings"
  on produce_listings for insert with check (auth.uid() = user_id);

create policy "Users can update own listings"
  on produce_listings for update using (auth.uid() = user_id);

create policy "Users can delete own listings"
  on produce_listings for delete using (auth.uid() = user_id);

-- Enable realtime for all tables (only if not already enabled)
do $$
begin
  -- This will not fail if already added
  alter publication supabase_realtime add table buyers;
exception when others then
  null;
end $$;

do $$
begin
  alter publication supabase_realtime add table communities;
exception when others then
  null;
end $$;

do $$
begin
  alter publication supabase_realtime add table posts;
exception when others then
  null;
end $$;

do $$
begin
  alter publication supabase_realtime add table comments;
exception when others then
  null;
end $$;

do $$
begin
  alter publication supabase_realtime add table orders;
exception when others then
  null;
end $$;

do $$
begin
  alter publication supabase_realtime add table produce_listings;
exception when others then
  null;
end $$;

-- Insert sample data (only if tables are empty)
insert into communities (slug, name, description, image, posts_count)
select 'jalgaon-farmers', 'c/Jalgaon Farmers', 'A community for farmers in Jalgaon to discuss Banana, Cotton, and local farming practices.', 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=400&fit=crop', 142
where not exists (select 1 from communities where slug = 'jalgaon-farmers');

insert into communities (slug, name, description, image, posts_count)
select 'nashik-grape-growers', 'c/Nashik Grape Growers', 'Connect with vineyards, export specialists, and vegetable growers in Nashik region.', 'https://images.unsplash.com/photo-1596363505729-4190a9506133?w=800&h=400&fit=crop', 89
where not exists (select 1 from communities where slug = 'nashik-grape-growers');

insert into communities (slug, name, description, image, posts_count)
select 'pune-agri-hub', 'c/Pune Agri-Hub', 'Discuss modern farming techniques, greenhouse setups, and direct-to-consumer sales.', 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=400&fit=crop', 256
where not exists (select 1 from communities where slug = 'pune-agri-hub');

insert into communities (slug, name, description, image, posts_count)
select 'nagpur-orange-city', 'c/Nagpur Orange City', 'Dedicated to citrus farmers, cotton growers, and central Maharashtra agriculture.', 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&h=400&fit=crop', 115
where not exists (select 1 from communities where slug = 'nagpur-orange-city');

insert into buyers (name, verified, recommended, type, rating, image, offered_price, transport_cost, distance, net_profit)
select 'K.P. Traders', true, true, 'WHOLESALE MARKET', 4.3, 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&h=100&fit=crop', 2780, 1380, 172, 1400
where not exists (select 1 from buyers where name = 'K.P. Traders');

insert into buyers (name, verified, recommended, type, rating, image, offered_price, transport_cost, distance, net_profit)
select 'Ekdunt Vegetables', false, false, 'WHOLESALE MARKET', 4.6, 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=100&h=100&fit=crop', 2800, 1467, 183, 1333
where not exists (select 1 from buyers where name = 'Ekdunt Vegetables');
