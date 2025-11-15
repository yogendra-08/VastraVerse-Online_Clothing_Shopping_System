/**
 * Product Data for VastraVerse
 * Sample products with Indian fashion items
 */

// DummyJSON API Product Interface
export interface Product {
  id: number;
  title: string; // DummyJSON uses 'title' instead of 'name'
  name?: string; // Keep for backward compatibility
  description: string;
  category: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
  images: string[];
  image?: string; // For backward compatibility, will use images[0] or thumbnail
  tags?: string[];
  reviews?: Array<{
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }>;
  // Optional fields for backward compatibility
  sizes?: string[];
  gender?: string;
  colors?: Array<{ name: string; hex: string }>;
  related?: number[];
}

// Static products array removed - now using DummyJSON API
// Keep empty array for backward compatibility
export const products: Product[] = [];
