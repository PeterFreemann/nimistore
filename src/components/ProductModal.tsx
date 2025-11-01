import { useState } from 'react';
import { X, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product } from '../context/CartContext';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  // Mock additional images - in a real app, these would come from the product data
  const productImages = [
    product.image,
    // Adding some mock alternative angles - you can replace these with actual product images
    product.image.replace('400', '401'), // Slight variation
    product.image.replace('400', '402'), // Another variation
    product.image.replace('400', '403'), // Third variation
  ];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  const incrementQuantity = () => {
    if (quantity < 10) { // Set a reasonable max limit
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-black">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-black"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side - Images */}
            <div>
              {/* Main Image */}
              <div className="mb-4 relative">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    // Fallback to original image if mock variations don't load
                    e.currentTarget.src = product.image;
                  }}
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
                      Sold Out
                    </span>
                  </div>
                )}
              </div>

              {/* Image Thumbnails */}
              <div className="flex gap-2 overflow-x-auto">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-none w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-emerald-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to original image if mock variations don't load
                        e.currentTarget.src = product.image;
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right side - Product Info */}
            <div className="flex flex-col">
              {/* Product Name */}
              <h1 className="text-2xl font-bold mb-4 text-gray-900">{product.name}</h1>

              {/* Category and Weight */}
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
                {product.weight && (
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {product.weight}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="mb-6 flex-grow">
                <h3 className="font-semibold mb-3 text-gray-900">Description</h3>
                <p className="text-gray-700 leading-relaxed text-base">
                  {product.description || 'No description available for this product.'}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl font-bold text-emerald-600">
                  £{product.price.toFixed(2)}
                </span>
                <span className="text-gray-500 ml-2 text-sm">per unit</span>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-900">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={decrementQuantity}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center text-black justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-xl font-semibold w-12 text-center text-gray-900">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="w-10 h-10 rounded-full text-black border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity >= 10}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  product.inStock
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart size={20} />
                {product.inStock ? `Add ${quantity} to Cart` : 'Out of Stock'}
              </button>

              {/* Total Price Preview */}
              {quantity > 1 && (
                <div className="mt-3 text-center text-gray-700 font-medium">
                  Total: £{(product.price * quantity).toFixed(2)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}