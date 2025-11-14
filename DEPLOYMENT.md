# VastraVerse - Netlify Deployment Guide

This guide will help you deploy both the frontend and backend of VastraVerse to Netlify.

## Prerequisites

1. **Supabase Account**: Create a project at [supabase.com](https://supabase.com)
2. **Netlify Account**: Sign up at [netlify.com](https://netlify.com)
3. **Git Repository**: Your code should be in a Git repository (GitHub, GitLab, etc.)

## Step 1: Set up Supabase Database

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the following SQL to create the required tables:

```sql
-- Enable Row Level Security
ALTER TABLE IF EXISTS users ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS products ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS wishlist ENABLE ROW LEVEL SECURITY;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(15),
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  image VARCHAR(500),
  stock INTEGER DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT 0.0,
  sizes TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cart table
CREATE TABLE IF NOT EXISTS cart (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Wishlist table
CREATE TABLE IF NOT EXISTS wishlist (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Products are publicly readable
CREATE POLICY "Products are publicly readable" ON products FOR SELECT TO anon, authenticated USING (true);
```

4. (Optional) Add some sample products by running the SQL in `backend/src/config/supabaseSeedData.sql`

## Step 2: Get Supabase Credentials

1. In your Supabase project dashboard, go to Settings > API
2. Copy the following values:
   - Project URL
   - anon public key
   - service_role key (keep this secret!)

## Step 3: Deploy to Netlify

### Option A: Deploy via Netlify Dashboard

1. Go to [netlify.com](https://netlify.com) and log in
2. Click "New site from Git"
3. Connect your Git provider and select your repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
5. Click "Deploy site"

### Option B: Deploy via Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Deploy from your project root:
   ```bash
   netlify deploy --prod
   ```

## Step 4: Configure Environment Variables

In your Netlify site dashboard, go to Site settings > Environment variables and add:

```
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=production
```

**Important**: Generate a strong JWT secret. You can use:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Step 5: Redeploy

After setting environment variables, trigger a new deployment:
1. Go to your site dashboard
2. Click "Deploys" tab
3. Click "Trigger deploy" > "Deploy site"

## Step 6: Test Your Deployment

1. Visit your Netlify site URL
2. Test user registration and login
3. Check that products are loading
4. Verify API endpoints work: `https://your-site.netlify.app/.netlify/functions/health`

## Available API Endpoints

- `/.netlify/functions/health` - Health check
- `/.netlify/functions/auth-register` - User registration
- `/.netlify/functions/auth-login` - User login
- `/.netlify/functions/products` - Get products

## Troubleshooting

### Build Fails
- Check that all dependencies are installed
- Verify environment variables are set correctly
- Check build logs in Netlify dashboard

### API Functions Not Working
- Verify environment variables are set
- Check function logs in Netlify dashboard
- Ensure Supabase credentials are correct

### Database Connection Issues
- Verify Supabase URL and keys
- Check that database tables are created
- Ensure RLS policies are set up correctly

## Development

To run locally with Netlify Functions:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

3. Create `.env` file with your environment variables

4. Start development server:
   ```bash
   netlify dev
   ```

This will start both the frontend and Netlify Functions locally.

## Support

If you encounter issues:
1. Check the Netlify function logs
2. Verify your Supabase setup
3. Ensure all environment variables are correctly set
4. Check the browser console for frontend errors
