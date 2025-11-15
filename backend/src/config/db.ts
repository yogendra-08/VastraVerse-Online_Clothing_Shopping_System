/**
 * Database Configuration for VastraVerse
 * Supabase connection and initialization
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Supabase configuration (optional for JSON endpoints)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Only throw error if trying to use database features without credentials
export const hasDatabaseConfig = !!(supabaseUrl && supabaseServiceKey);

if (!hasDatabaseConfig) {
  console.warn('⚠️  Supabase environment variables not set. Database features will be disabled.');
  console.warn('   JSON product endpoints will still work.');
}

// Create Supabase clients (only if config exists)
export const supabase: SupabaseClient | null = hasDatabaseConfig 
  ? createClient(supabaseUrl!, supabaseServiceKey!)
  : null;
export const supabaseAnon: SupabaseClient | null = hasDatabaseConfig && supabaseAnonKey
  ? createClient(supabaseUrl!, supabaseAnonKey)
  : null;

// Test database connection
export const testConnection = async () => {
  if (!supabase) {
    console.warn('⚠️  Supabase client not initialized');
    return false;
  }
  try {
    const { data, error } = await supabase.from('users').select('count').limit(1);
    if (error && error.code !== 'PGRST116') { // PGRST116 is "relation does not exist"
      throw error;
    }
    console.log('✅ Supabase connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection failed:', error);
    return false;
  }
};

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: number;
          name: string;
          email: string;
          password: string;
          phone?: string;
          address?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          email: string;
          password: string;
          phone?: string;
          address?: string;
        };
        Update: {
          name?: string;
          email?: string;
          password?: string;
          phone?: string;
          address?: string;
        };
      };
      products: {
        Row: {
          id: number;
          name: string;
          description?: string;
          price: number;
          category: string;
          image?: string;
          stock: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          description?: string;
          price: number;
          category: string;
          image?: string;
          stock?: number;
        };
        Update: {
          name?: string;
          description?: string;
          price?: number;
          category?: string;
          image?: string;
          stock?: number;
        };
      };
      cart: {
        Row: {
          id: number;
          user_id: number;
          product_id: number;
          quantity: number;
          created_at: string;
        };
        Insert: {
          user_id: number;
          product_id: number;
          quantity?: number;
        };
        Update: {
          quantity?: number;
        };
      };
      wishlist: {
        Row: {
          id: number;
          user_id: number;
          product_id: number;
          created_at: string;
        };
        Insert: {
          user_id: number;
          product_id: number;
        };
        Update: {};
      };
    };
  };
}

// Initialize database tables (SQL to run in Supabase SQL editor)
export const getInitializationSQL = () => {
  return `
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

-- RLS Policies
-- Users can only access their own data
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid()::text = id::text);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid()::text = id::text);

-- Products are publicly readable
CREATE POLICY "Products are publicly readable" ON products FOR SELECT TO anon, authenticated USING (true);

-- Cart policies
CREATE POLICY "Users can view own cart" ON cart FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own cart" ON cart FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update own cart" ON cart FOR UPDATE USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can delete own cart" ON cart FOR DELETE USING (auth.uid()::text = user_id::text);

-- Wishlist policies
CREATE POLICY "Users can view own wishlist" ON wishlist FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own wishlist" ON wishlist FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can delete own wishlist" ON wishlist FOR DELETE USING (auth.uid()::text = user_id::text);
`;
};

export const connectDB = async () => {
  if (!hasDatabaseConfig || !supabase) {
    throw new Error('Database configuration not available');
  }
  return testConnection();
};

export const initializeTables = async () => {
  if (!hasDatabaseConfig) {
    console.log('📝 Database not configured. Skipping table initialization.');
    return true;
  }
  console.log('📝 To initialize your Supabase database, run the following SQL in your Supabase SQL editor:');
  console.log(getInitializationSQL());
  return true;
};
