/**
 * Wishlist Page Component for VastraVerse
 * Display wishlist items
 */

import React from 'react';
import { Heart } from 'lucide-react';

const WishlistPage: React.FC = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>
        
        <div className="text-center py-20">
          <Heart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">Save items you love for later!</p>
          <a href="/products" className="btn-primary">
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
