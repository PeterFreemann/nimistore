import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../context/CartContext';
import { useCart } from '../context/CartContext';
import ProductCard from './ProductCard';

interface ProductPageProps {
  product: Product;
  onBackClick: () => void;
  onProductClick?: (product: Product) => void;
}

export default function ProductPage({ product, onBackClick, onProductClick }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();

  // Scroll to top when component mounts or product changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product.id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  // Mock related products - in a real app, this would come from an API
  // Filter products by same category or similar products
  const getRelatedProducts = () => {
    // This is mock data - replace with actual related products logic
    const mockRelatedProducts: Product[] = [
      {
        id: 'related-1',
        name: 'Premium Palm Oil 1L',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop',
        category: product.category,
        description: 'High-quality palm oil perfect for African cooking',
        inStock: true,
        weight: '1L'
      },
      {
        id: 'related-2', 
        name: 'Dried Fish Selection',
        price: 12.50,
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop',
        category: product.category,
        description: 'Traditional dried fish variety pack',
        inStock: true,
        weight: '500g'
      },
      {
        id: 'related-3',
        name: 'Plantain Chips',
        price: 3.99,
        image: 'https://images.unsplash.com/photo-1621510456681-2330135e5871?w=400&h=400&fit=crop',
        category: 'Snacks',
        description: 'Crispy plantain chips made from fresh plantains',
        inStock: true,
        weight: '150g'
      },
      {
        id: 'related-4',
        name: 'African Pepper Mix',
        price: 6.75,
        image: 'https://images.unsplash.com/photo-1583484963630-4d28c5e71bb4?w=400&h=400&fit=crop',
        category: product.category,
        description: 'Authentic African pepper blend for seasoning',
        inStock: true,
        weight: '100g'
      },
      {
        id: 'related-5',
        name: 'Cassava Flour',
        price: 5.25,
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
        category: 'Dry Goods',
        description: 'Premium cassava flour for traditional dishes',
        inStock: true,
        weight: '1kg'
      },
      {
        id: 'related-6',
        name: 'Scotch Bonnet Peppers',
        price: 4.50,
        image: 'https://images.unsplash.com/photo-1583658774980-2c779865c6e4?w=400&h=400&fit=crop',
        category: 'Fresh Food',
        description: 'Fresh scotch bonnet peppers for authentic heat',
        inStock: false,
        weight: '200g'
      }
    ];

    return mockRelatedProducts;
  };

  const relatedProducts = getRelatedProducts();
  const productImages = [product.image, product.image, product.image]; // Simulate multiple images

  // Fixed: Single handler for related product clicks
  const handleRelatedProductClick = (relatedProduct: Product) => {
    if (onProductClick) {
      onProductClick(relatedProduct);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <button
            onClick={onBackClick}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            ← Back to Products
          </button>
        </nav>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div>
              <div className="mb-4">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              <div className="flex space-x-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
                      selectedImage === index ? 'border-emerald-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <div className="mb-4">
                <span className="inline-block bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-full mb-2">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">(4.2) • 127 reviews</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl font-bold text-emerald-600">£{product.price.toFixed(2)}</span>
                {product.weight && (
                  <span className="text-gray-600 ml-2">per {product.weight}</span>
                )}
                <div className={`inline-block ml-4 px-3 py-1 rounded-full text-sm ${
                  product.inStock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6 text-black">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="mb-6 text-black">
                <div className="flex items-center space-x-4 mb-4">
                  <label className="text-sm font-medium text-gray-700">Quantity:</label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-600 hover:text-gray-900"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:text-gray-900"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 text-black">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-semibold transition-colors ${
                      product.inStock
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart size={20} />
                    <span>Add to Cart</span>
                  </button>
                  
                  <button className="flex items-center justify-center space-x-2 py-3 px-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Heart size={20} />
                    <span>Wishlist</span>
                  </button>
                  
                  <button className="flex items-center justify-center space-x-2 py-3 px-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 size={20} />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="border-t pt-6 text-black">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Truck size={16} className="text-emerald-600" />
                    <span>Free delivery over £50</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Shield size={16} className="text-emerald-600" />
                    <span>Quality guaranteed</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <RotateCcw size={16} className="text-emerald-600" />
                    <span>Easy returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-md mt-8 p-8">
          <h2 className="text-2xl font-bold mb-6 text-black">Customer Reviews</h2>
          
          <div className="space-y-6">
            {[
              {
                name: "Sarah Johnson",
                rating: 5,
                date: "2 days ago",
                comment: "Excellent quality! Just like what I remember from home. Will definitely order again."
              },
              {
                name: "Michael Chen",
                rating: 4,
                date: "1 week ago", 
                comment: "Good product, arrived quickly and well packaged. Slightly expensive but worth it for the quality."
              },
              {
                name: "Aisha Patel",
                rating: 5,
                date: "2 weeks ago",
                comment: "Perfect! Exactly what I was looking for. Great service and fast delivery."
              }
            ].map((review, index) => (
              <div key={index} className="border-b text-black border-gray-200 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{review.name}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Section */}
        <div className="bg-white rounded-lg shadow-md mt-8 p-8 text-black">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Related Products</h2>
            <span className="text-sm text-gray-500">You might also like</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                onProductClick={handleRelatedProductClick}
                onViewClick={handleRelatedProductClick}
              />
            ))}
          </div>

          {/* Show More Related Products Button */}
          {relatedProducts.length > 4 && (
            <div className="text-center mt-6">
              <button
                onClick={() => {/* Handle view all related products */}}
                className="px-6 py-3 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors font-semibold"
              >
                View More Related Products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}