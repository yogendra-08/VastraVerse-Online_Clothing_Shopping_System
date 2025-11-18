/**
 * Gen Z Summer 2025 Collection Landing Page
 * Campaign spotlight page showcasing latest Gen Z summer products
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye, Star, ArrowDown, Instagram, Mail } from 'lucide-react';
import { Product } from '../utils/api';
import { useCart } from '../hooks/useCart';
import toast from 'react-hot-toast';

// Placeholder products for Gen Z Summer 2025 Collection
const summerProducts: Product[] = [
  {
    id: 701,
    name: 'Street Hoodie',
    description: 'Comfortable street-style hoodie perfect for summer evenings',
    price: 2499,
    category: 'Aria Luxe',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop',
    stock: 25,
    rating: 4.7,
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'New'
  },
  {
    id: 702,
    name: 'Casual Tee',
    description: 'Premium cotton casual t-shirt with modern fit',
    price: 999,
    category: 'Aria Luxe',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',
    stock: 30,
    rating: 4.6,
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Trending'
  },
  {
    id: 703,
    name: 'Denim Jacket',
    description: 'Classic denim jacket with contemporary styling',
    price: 3499,
    category: 'Aria Luxe',
    image: 'https://images.unsplash.com/photo-1593032465171-8f0b7a0b78cd?w=600&h=800&fit=crop',
    stock: 18,
    rating: 4.8,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'Limited Edition'
  },
  {
    id: 704,
    name: 'Graphic Tee',
    description: 'Bold graphic print t-shirt for statement looks',
    price: 1299,
    category: 'Aria Luxe',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',
    stock: 22,
    rating: 4.5,
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'New'
  },
  {
    id: 705,
    name: 'Slim Fit T-Shirt',
    description: 'Modern slim fit t-shirt with premium fabric',
    price: 1199,
    category: 'Aria Luxe',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',
    stock: 28,
    rating: 4.6,
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Trending'
  },
  {
    id: 706,
    name: 'Summer Shorts',
    description: 'Comfortable summer shorts perfect for warm weather',
    price: 1499,
    category: 'Aria Luxe',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop',
    stock: 20,
    rating: 4.7,
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'New'
  },
  {
    id: 707,
    name: 'Cargo Pants',
    description: 'Stylish cargo pants with multiple pockets',
    price: 2799,
    category: 'Aria Luxe',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop',
    stock: 15,
    rating: 4.8,
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Limited Edition'
  },
  {
    id: 708,
    name: 'Oversized Hoodie',
    description: 'Trendy oversized hoodie for relaxed summer vibes',
    price: 2699,
    category: 'Aria Luxe',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop',
    stock: 17,
    rating: 4.7,
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Trending'
  },
  {
    id: 709,
    name: 'Vintage Denim',
    description: 'Classic vintage-style denim with modern comfort',
    price: 3199,
    category: 'Aria Luxe',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop',
    stock: 19,
    rating: 4.9,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'New'
  },
  {
    id: 710,
    name: 'Crop Top',
    description: 'Stylish crop top perfect for summer styling',
    price: 899,
    category: 'Aria Luxe',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',
    stock: 24,
    rating: 4.6,
    sizes: ['S', 'M', 'L'],
    badge: 'Trending'
  },
  {
    id: 711,
    name: 'Joggers',
    description: 'Comfortable joggers for active summer days',
    price: 1999,
    category: 'Aria Luxe',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop',
    stock: 21,
    rating: 4.7,
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'New'
  },
  {
    id: 712,
    name: 'Tank Top',
    description: 'Cool tank top for hot summer days',
    price: 799,
    category: 'Aria Luxe',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',
    stock: 26,
    rating: 4.5,
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Trending'
  },
  {
    id: 713,
    name: 'Bomber Jacket',
    description: 'Lightweight bomber jacket for summer evenings',
    price: 3999,
    category: 'Aria Luxe',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop',
    stock: 12,
    rating: 4.8,
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Limited Edition'
  },
  {
    id: 714,
    name: 'Cargo Shorts',
    description: 'Functional cargo shorts with modern design',
    price: 1799,
    category: 'Aria Luxe',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop',
    stock: 23,
    rating: 4.6,
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'New'
  },
  {
    id: 715,
    name: 'Oversized T-Shirt',
    description: 'Comfortable oversized t-shirt for relaxed style',
    price: 1099,
    category: 'Aria Luxe',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',
    stock: 27,
    rating: 4.6,
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Trending'
  },
  {
    id: 716,
    name: 'Track Pants',
    description: 'Sporty track pants for active lifestyle',
    price: 2199,
    category: 'Aria Luxe',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop',
    stock: 20,
    rating: 4.7,
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'New'
  }
];

interface SummerProductCardProps {
  product: Product & { badge?: string };
}

const SummerProductCard: React.FC<SummerProductCardProps> = ({ product }) => {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = async () => {
    try {
      await addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        gender: product.gender,
        collection: product.gender === 'women' ? 'women' : product.gender === 'men' ? 'men' : undefined,
      });
      toast.success('Added to cart!');
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const originalPrice = Math.round(product.price * 1.25);
  const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);
  const inCart = isInCart(product.id);
  const cartQuantity = getItemQuantity(product.id);

  const secondaryImage = product.image.replace('w=600', 'w=601');

  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case 'New':
        return { background: '#000000', color: '#ffffff' };
      case 'Limited Edition':
        return { background: '#d4af37', color: '#000000' };
      case 'Trending':
        return { background: '#8B3A3A', color: '#ffffff' };
      default:
        return null;
    }
  };

  return (
    <div
      className="summer-product-card group relative bg-white overflow-hidden"
      style={{
        borderRadius: '8px',
        border: '1px solid #efefef',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <img
          src={secondaryImage}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {product.badge && (
          <div
            className="absolute top-3 left-3 px-2 py-1 text-xs font-semibold"
            style={{ 
              ...getBadgeStyle(product.badge),
              borderRadius: '4px'
            }}
          >
            {product.badge}
          </div>
        )}

        {discount > 0 && !product.badge && (
          <div
            className="absolute top-3 left-3 px-2 py-1 text-xs font-semibold text-white"
            style={{ background: '#000000', borderRadius: '4px' }}
          >
            {discount}% OFF
          </div>
        )}

        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-200 z-10"
          style={{ border: '1px solid #efefef' }}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
            strokeWidth={1.5}
          />
        </button>

        <div
          className={`absolute bottom-0 left-0 right-0 p-4 bg-white transform transition-all duration-300 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
          style={{ borderTop: '1px solid #efefef' }}
        >
          <button
            onClick={handleAddToCart}
            disabled={!product.stock || product.stock === 0}
            className="w-full py-3 px-4 text-sm font-medium text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{
              background: '#000000',
              borderRadius: '4px',
            }}
            onMouseEnter={(e) => {
              if (product.stock && product.stock > 0) {
                e.currentTarget.style.background = '#d4af37';
                e.currentTarget.style.color = '#000000';
              }
            }}
            onMouseLeave={(e) => {
              if (product.stock && product.stock > 0) {
                e.currentTarget.style.background = '#000000';
                e.currentTarget.style.color = '#ffffff';
              }
            }}
          >
            <ShoppingCart className="h-4 w-4" strokeWidth={2} />
            {inCart ? `In Cart (${cartQuantity})` : 'Add to Cart'}
          </button>
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
          {product.category}
        </p>
        <h3 className="text-sm font-medium text-black mb-2 line-clamp-2 leading-snug">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-black">
            {formatPrice(product.price)}
          </span>
          {discount > 0 && (
            <>
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(originalPrice)}
              </span>
              <span
                className="text-xs font-medium px-1.5 py-0.5 rounded"
                style={{ background: '#efefef', color: '#000000' }}
              >
                Save {formatPrice(originalPrice - product.price)}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const SummerCollectionPage: React.FC = () => {
  const [products] = useState<Product[]>(summerProducts);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#f3eee7' }}>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop)',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl mx-auto">
            <h1
              className="text-6xl md:text-7xl font-bold mb-4 font-heading text-white"
              style={{ 
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)',
                letterSpacing: '0.02em'
              }}
            >
              Gen Z Summer 2025 Collection
            </h1>
            <p
              className="text-xl md:text-2xl mb-8 text-white/90"
              style={{ 
                textShadow: '1px 1px 4px rgba(0, 0, 0, 0.5)',
                letterSpacing: '0.01em'
              }}
            >
              Fresh styles for the trendsetters
            </p>
            <button
              onClick={scrollToProducts}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
              style={{
                background: '#d4af37',
                color: '#000000',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#000000';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#d4af37';
                e.currentTarget.style.color = '#000000';
              }}
            >
              Shop Now
              <ArrowDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-4xl md:text-5xl font-bold mb-3 font-heading"
              style={{ color: '#000000' }}
            >
              Latest Collection
            </h2>
            <p
              className="text-base text-gray-600 max-w-2xl mx-auto"
              style={{ letterSpacing: '0.02em' }}
            >
              Discover the newest additions to our Gen Z Summer 2025 lineup
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="fade-in-up"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animationFillMode: 'both'
                }}
              >
                <SummerProductCard product={product as Product & { badge?: string }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-4 font-heading" style={{ color: '#000000' }}>
              Explore More Collections
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/products/men"
                className="px-6 py-3 border-2 rounded-lg font-medium transition-all duration-300"
                style={{
                  borderColor: '#000000',
                  color: '#000000',
                  background: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#000000';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#000000';
                }}
              >
                Men's Collection
              </Link>
              <Link
                to="/products/women"
                className="px-6 py-3 border-2 rounded-lg font-medium transition-all duration-300"
                style={{
                  borderColor: '#000000',
                  color: '#000000',
                  background: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#000000';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#000000';
                }}
              >
                Women's Collection
              </Link>
              <Link
                to="/genz"
                className="px-6 py-3 border-2 rounded-lg font-medium transition-all duration-300"
                style={{
                  borderColor: '#000000',
                  color: '#000000',
                  background: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#000000';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#000000';
                }}
              >
                Gen Z Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-semibold mb-4 font-heading" style={{ color: '#000000' }}>
            Stay Updated
          </h3>
          <p className="text-gray-600 mb-6">
            Get the latest trends and exclusive offers delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-black"
            />
            <button
              className="px-6 py-3 rounded-lg font-medium transition-all duration-300"
              style={{
                background: '#000000',
                color: '#ffffff'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#d4af37';
                e.currentTarget.style.color = '#000000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#000000';
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border-2 border-gray-300 hover:border-black transition-colors"
              style={{ color: '#000000' }}
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="mailto:info@vastraverse.com"
              className="p-3 rounded-full border-2 border-gray-300 hover:border-black transition-colors"
              style={{ color: '#000000' }}
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SummerCollectionPage;

