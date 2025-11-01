import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight, Copy, Check, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { Product } from '../context/CartContext';
import { useCart } from '../context/CartContext';
import ProductCard from './ProductCard';
import { products } from '../data/products'; // Import your products data

interface ProductPageProps {
  product: Product;
  onBackClick: () => void;
  onProductClick?: (product: Product) => void;
  onCategoryClick?: (category: string) => void; // Add this prop
}

export default function ProductPage({ product, onBackClick, onProductClick, onCategoryClick }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
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

  // Get current page URL for sharing - FIXED VERSION
  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      // Since this is a single-page app, we'll use the current URL
      // and add the product as a query parameter
      const baseUrl = window.location.origin + window.location.pathname;
      const params = new URLSearchParams();
      params.set('product', product.id);
      params.set('name', encodeURIComponent(product.name));
      return `${baseUrl}?${params.toString()}`;
    }
    return '';
  };

  // Alternative: Simple current URL (most reliable)
  const getSimpleShareUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  };

  // Share functionality
  const handleShare = async () => {
    const shareUrl = getSimpleShareUrl(); // Use simple URL
    const shareText = `Check out ${product.name} on NimiStore - £${product.price.toFixed(2)}`;

    console.log('Sharing URL:', shareUrl); // Debug log

    // Check if Web Share API is available (mobile devices)
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        // User cancelled the share or something went wrong
        console.log('Share cancelled:', error);
        // Fallback to custom share modal
        setShowShareModal(true);
      }
    } else {
      // Fallback: Show custom share modal
      setShowShareModal(true);
    }
  };

  // Copy link to clipboard
  const copyToClipboard = async () => {
    const shareUrl = getSimpleShareUrl(); // Use simple URL
    console.log('Copying URL:', shareUrl); // Debug log
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log('Clipboard API failed, using fallback:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Share on social media
  const shareOnSocialMedia = (platform: string) => {
    const shareUrl = getSimpleShareUrl(); // Use simple URL
    const shareText = `Check out ${product.name} on NimiStore - £${product.price.toFixed(2)}`;
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);

    console.log(`Sharing to ${platform}:`, shareUrl); // Debug log

    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`
    };

    if (urls[platform as keyof typeof urls]) {
      window.open(
        urls[platform as keyof typeof urls],
        '_blank',
        'width=600,height=400'
      );
    }
  };

  // Share via email
  const shareViaEmail = () => {
    const shareUrl = getSimpleShareUrl(); // Use simple URL
    const subject = `Check out ${product.name} on NimiStore`;
    const body = `I thought you might be interested in this product:\n\n${product.name}\nPrice: £${product.price.toFixed(2)}\n${product.description ? `Description: ${product.description}\n` : ''}\nView it here: ${shareUrl}`;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Get related products from the same category
  const getRelatedProducts = () => {
    if (!product.category) return [];
    
    // Filter products by same category, excluding the current product
    const relatedProducts = products.filter(p => 
      p.category === product.category && p.id !== product.id
    );
    
    // If there are fewer than 4 products in the same category, 
    // add some from similar categories or random products
    if (relatedProducts.length < 4) {
      // Get products from similar categories
      const similarCategories = getSimilarCategories(product.category);
      const similarProducts = products.filter(p => 
        similarCategories.includes(p.category) && 
        p.id !== product.id &&
        !relatedProducts.some(rp => rp.id === p.id)
      );
      
      // Combine and limit to 6 products max
      return [...relatedProducts, ...similarProducts].slice(0, 6);
    }
    
    return relatedProducts.slice(0, 6);
  };

  // Helper function to get similar categories
  const getSimilarCategories = (category: string) => {
    const categoryGroups: { [key: string]: string[] } = {
      'Fresh Food': ['Vegetables & Fresh Produce', 'Dry Goods'],
      'Frozen proteins': ['Meat, Fish & Poultry', 'Fresh Food'],
      'Drinks': ['Snacks'],
      'Snacks': ['Drinks', 'Fresh Food'],
      'Beauty & Personal Care': ['Health & Beauty', 'Household'],
      'Health & Beauty': ['Beauty & Personal Care'],
      'Household': ['Beauty & Personal Care'],
      'Dry Goods': ['Fresh Food', 'Snacks'],
      'Vegetables & Fresh Produce': ['Fresh Food'],
      'Meat, Fish & Poultry': ['Frozen proteins']
    };
    
    return categoryGroups[category] || [];
  };

  // Handle view more related products - navigate to category page
  const handleViewMoreRelated = () => {
    if (onCategoryClick && product.category) {
      // Use the same pattern as your header navigation
      // The header expects category pages in the format 'category-{categoryName}'
      onCategoryClick(`category-${product.category}`);
    }
  };

  const relatedProducts = getRelatedProducts();
  const productImages = [product.image, product.image, product.image]; // Simulate multiple images

  // Single handler for related product clicks
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
              <div className="mb-4 bg-white rounded-lg overflow-hidden">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-contain rounded-lg"
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
                    <img src={image} alt="" className="w-full h-full object-contain" />
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
                  
                  <button 
                    onClick={handleShare}
                    className="flex items-center justify-center space-x-2 py-3 px-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
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

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Share this product</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Share this product with friends and family</p>
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <input
                    type="text"
                    value={getSimpleShareUrl()}
                    readOnly
                    className="flex-1 bg-transparent text-sm text-gray-600 outline-none truncate"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center space-x-1 px-3 py-1 bg-emerald-600 text-white rounded text-sm hover:bg-emerald-700 transition-colors"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3 mb-4">
                <button
                  onClick={() => shareOnSocialMedia('facebook')}
                  className="flex flex-col items-center space-y-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Facebook size={20} />
                  <span className="text-xs">Facebook</span>
                </button>
                
                <button
                  onClick={() => shareOnSocialMedia('twitter')}
                  className="flex flex-col items-center space-y-2 p-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
                >
                  <Twitter size={20} />
                  <span className="text-xs">Twitter</span>
                </button>
                
                <button
                  onClick={() => shareOnSocialMedia('whatsapp')}
                  className="flex flex-col items-center space-y-2 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <MessageCircle size={20} />
                  <span className="text-xs">WhatsApp</span>
                </button>
                
                <button
                  onClick={shareViaEmail}
                  className="flex flex-col items-center space-y-2 p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <MessageCircle size={20} />
                  <span className="text-xs">Email</span>
                </button>
              </div>

              <button
                onClick={() => setShowShareModal(false)}
                className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}

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
            <h2 className="text-2xl font-bold">
              {relatedProducts.length > 0 ? 'Related Products' : 'You Might Also Like'}
            </h2>
            <span className="text-sm text-gray-500">
              {relatedProducts.length > 0 
                ? `More in ${product.category}` 
                : 'Discover other products'
              }
            </span>
          </div>
          
          {relatedProducts.length > 0 ? (
            <>
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
                    onClick={handleViewMoreRelated}
                    className="px-6 py-3 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors font-semibold"
                  >
                    View More Related Products
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No related products found in the same category.</p>
              <button
                onClick={onBackClick}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
              >
                Browse All Products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}