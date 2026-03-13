# Supabase Setup Guide

This guide will help you set up Supabase for authentication and database in your application.

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Fill in the project details:
   - Project name: Choose a name for your project
   - Database password: Create a strong password (save this!)
   - Region: Choose the closest region to your users
5. Click "Create new project"

## 2. Get Your API Keys

1. Once your project is created, go to Project Settings (gear icon)
2. Click on "API" in the left sidebar
3. Copy the following values:
   - Project URL (under "Project URL")
   - anon/public key (under "Project API keys")

## 3. Configure Environment Variables

1. Create a `.env` file in the root of your project:
   ```bash
   copy .env.example .env
   ```

2. Open the `.env` file and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## 4. Set Up Authentication

Supabase authentication is already configured in the app. The following features are available:

- Email/Password authentication
- User session management
- Protected routes
- Logout functionality

### Authentication Pages

- `/login` - Sign in page
- `/signup` - Sign up page
- All other routes are protected and require authentication

## 5. Database Setup (Optional)

If you need to store additional data, you can create tables in Supabase:

1. Go to the "Table Editor" in your Supabase dashboard
2. Click "Create a new table"
3. Define your schema

### Example: User Profiles Table

```sql
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );

create policy "Users can insert their own profile"
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );
```

## 6. Using the Auth Context

The app includes an `AuthContext` that provides:

```typescript
const { user, session, loading, signUp, signIn, signOut } = useAuth()
```

- `user` - Current user object
- `session` - Current session
- `loading` - Loading state
- `signUp(email, password, metadata)` - Register new user
- `signIn(email, password)` - Sign in user
- `signOut()` - Sign out user

## 7. Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:5173/signup`
3. Create a test account
4. You should be redirected to the dashboard after successful signup

## 8. Email Confirmation (Optional)

By default, Supabase requires email confirmation. To disable this for development:

1. Go to Authentication > Settings in your Supabase dashboard
2. Scroll to "Email Auth"
3. Toggle off "Enable email confirmations"

## Troubleshooting

### "Missing Supabase environment variables" error
- Make sure your `.env` file exists and contains the correct values
- Restart your development server after creating/updating the `.env` file

### Users can't sign up
- Check if email confirmation is enabled in Supabase settings
- Check the browser console for error messages
- Verify your API keys are correct

### Session not persisting
- Supabase automatically handles session persistence using localStorage
- Make sure you're not clearing localStorage in your app

## Next Steps

- Set up database tables for your app data
- Configure Row Level Security (RLS) policies
- Add social authentication providers (Google, GitHub, etc.)
- Implement password reset functionality
- Add user profile management

For more information, visit the [Supabase Documentation](https://supabase.com/docs).
