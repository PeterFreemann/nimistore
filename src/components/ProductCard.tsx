import React from "react";
import { ShoppingCart, Star, Eye } from "lucide-react";
import { Product } from "../context/CartContext";
import { useCart } from "../context/CartContext";
import image from "../images/nimi.png";

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
      className="rounded-lg overflow-hidden cursor-pointer relative group w-65 bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
      onClick={handleCardClick}
    >
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