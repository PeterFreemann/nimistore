import React from "react";
import { ShoppingCart, Star, Eye } from "lucide-react";
import { Product } from "../context/CartContext";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  onViewClick?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onProductClick,
  onViewClick,
}: ProductCardProps) {
  const { addItem } = useCart();

  // Add debug logging
  React.useEffect(() => {
    console.log(`ProductCard loaded for: ${product.name} (ID: ${product.id})`);
    console.log('Product data:', product);
  }, [product]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Add to cart clicked for:', product.name);
    addItem(product);
  };

  const handleViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('View button clicked for:', product.name);
    
    if (onViewClick) {
      console.log('Calling onViewClick');
      onViewClick(product);
    } else {
      console.log('No onViewClick, calling onProductClick');
      onProductClick(product);
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    console.log('=== PRODUCT CARD CLICK DEBUG ===');
    console.log('Card clicked for product:', product.name);
    console.log('Product ID:', product.id);
    console.log('Product category:', product.category);
    console.log('Event target:', e.target);
    console.log('Event current target:', e.currentTarget);
    console.log('onProductClick function exists:', !!onProductClick);
    console.log('=== END DEBUG ===');
    
    e.stopPropagation();
    e.preventDefault();
    
    if (onProductClick) {
      console.log('Calling onProductClick with product:', product);
      onProductClick(product);
    } else {
      console.error('ERROR: onProductClick is undefined!');
    }
  };

  // Default rating if not provided
  const productRating = (product as any).rating || 4.0;

  return (
    <div
      className="rounded-lg overflow-hidden cursor-pointer relative group w-65 bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
      onClick={handleCardClick}
    >
      {/* Debug badge */}
      
      
      {/* Product Image Container */}
      <div className="relative w-full h-48 flex items-center justify-center bg-gray-50 p-4">
        <img
          src={product.image}
          alt={product.name}
          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = "/fallback-image.jpg";
          }}
        />

        {/* Stock Status Badge */}
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
      </div>

      {/* Product Info - Always Visible */}
      <div className="p-4">
        {/* Product Name - Always Visible */}
        <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Category badge */}
        <div className="mb-2">
          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
            {product.category}
          </span>
        </div>

        {/* Price and Add to Cart Button - Always Visible */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-emerald-600">
              £{product.price.toFixed(2)}
            </span>
            {product.weight && (
              <span className="text-xs text-gray-500">{product.weight}</span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              product.inStock
                ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm hover:shadow-md"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <ShoppingCart size={14} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}