/**
 * Home Page Component for VastraVerse
 * Landing page with hero section, categories, and featured products
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShoppingBag, Heart, Users } from 'lucide-react';
import { Product, productsAPI } from '../utils/api';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await productsAPI.getAll();
        if (response.success && response.data) {
          // Get first 8 products as featured
          setFeaturedProducts(response.data.products.slice(0, 8));
        }
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const categories = [
    {
      name: 'Men',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
      link: '/products/men',
      description: 'Stylish & Comfortable'
    },
    {
      name: 'Women',
      image: 'https://images.unsplash.com/photo-1494790108755-2616c9c8e6e2?w=400&h=500&fit=crop',
      link: '/products/women',
      description: 'Elegant & Trendy'
    },
    {
      name: 'Kids',
      image: 'https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=400&h=500&fit=crop',
      link: '/products/kids',
      description: 'Cute & Playful'
    },
    {
      name: 'Traditional',
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=500&fit=crop',
      link: '/products/traditional',
      description: 'Authentic & Cultural'
    }
  ];

  const stats = [
    { icon: Users, value: '50K+', label: 'Happy Customers' },
    { icon: ShoppingBag, value: '10K+', label: 'Products Sold' },
    { icon: Star, value: '4.8', label: 'Average Rating' },
    { icon: Heart, value: '95%', label: 'Customer Satisfaction' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            VastraVerse
          </h1>
          <p className="text-xl md:text-2xl mb-4 hero-text animation-delay-200">
            Your Fashion, Your Way
          </p>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto animation-delay-400">
            Explore the Universe of Indian Fashion - From traditional ethnic wear to modern contemporary styles, 
            discover clothing that celebrates your unique style and heritage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animation-delay-600">
            <Link to="/products" className="btn-secondary inline-flex items-center">
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/products/traditional" className="btn-outline border-white text-white hover:bg-white hover:text-saffron-600">
              Explore Traditional
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-saffron-500 to-gold-500 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our curated collections designed for every style and occasion
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="category-card h-80 group"
              >
                <div className="relative h-full">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="category-overlay"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.description}</p>
                    <div className="mt-4 flex items-center text-sm">
                      <span>Shop Now</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked items that showcase the best of Indian fashion
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <div className="product-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/products" className="btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-saffron-500 to-gold-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Updated with VastraVerse</h2>
          <p className="text-xl mb-8 opacity-90">
            Get the latest fashion trends, exclusive offers, and style tips delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="bg-white text-saffron-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
