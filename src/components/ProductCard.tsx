import React from 'react';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { Product } from '../context/CartContext';
import { useCart } from '../context/CartContext';
import image from '../images/nimi.png';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  onViewClick?: (product: Product) => void;
}

export default function ProductCard({ product, onProductClick, onViewClick }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  const handleViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onViewClick) {
      onViewClick(product);
    } else {
      // Fallback to onProductClick if onViewClick is not provided
      onProductClick(product);
    }
  };

  const handleCardClick = () => {
    onProductClick(product);
  };

  // Default rating if not provided
  const productRating = (product as any).rating || 4.0;

  return (
    <div 
      className="rounded-lg overflow-hidden cursor-pointer relative group h-60 bg-gray-100"
      onClick={handleCardClick}
    >
      {/* Product Image - Full card */}
      <div className="relative w-full h-full">
        <img
  src={image.src}  // Use .src property
  alt={product.name}
  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
  onError={(e) => {
    e.currentTarget.src = '';
  }}
/>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Sold Out
            </span>
          </div>
        )}
        
        {/* View Button - appears on hover */}
        <button
          onClick={handleViewClick}
          className="absolute top-2 right-2 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
        >
          <Eye size={16} className="text-gray-700" />
        </button>

        {/* Product Name - appears on hover at bottom left */}
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <h3 className="font-semibold text-sm line-clamp-2 max-w-48">
            {product.name}
          </h3>
        </div>

        {/* Add to Cart Button - appears on hover at bottom */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`absolute bottom-2 right-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 ${
            product.inStock
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart size={14} />
          Add
        </button>
      </div>
    </div>
  );
}