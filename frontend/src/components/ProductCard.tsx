/**
 * Product Card Component for VastraVerse
 * Displays individual product with add to cart and wishlist functionality
 */

import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../utils/api';
import { useCart } from '../hooks/useCart';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isInCart, getItemQuantity } = useCart();

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const handleAddToWishlist = () => {
    // This would be implemented with wishlist functionality
    toast.success('Added to wishlist!');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const isOutOfStock = product.stock === 0;
  const inCart = isInCart(product.id);
  const cartQuantity = getItemQuantity(product.id);

  return (
    <div className="card-product group">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Stock badge */}
        {isOutOfStock && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
            Out of Stock
          </div>
        )}
        
        {/* Wishlist button */}
        <button
          onClick={handleAddToWishlist}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
        >
          <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
        </button>

        {/* Quick add to cart overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {inCart ? `In Cart (${cartQuantity})` : 'Add to Cart'}
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs font-medium text-saffron-600 uppercase tracking-wide">
            {product.category}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">({product.rating})</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {/* Placeholder for original price */}
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.price * 1.2)}
            </span>
          </div>
          
          <div className="text-sm text-gray-500">
            {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex space-x-2">
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-sm py-2"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            {inCart ? `In Cart (${cartQuantity})` : 'Add to Cart'}
          </button>
          
          <button
            onClick={handleAddToWishlist}
            className="p-2 border border-gray-300 rounded-lg hover:border-saffron-500 hover:text-saffron-600 transition-colors"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
