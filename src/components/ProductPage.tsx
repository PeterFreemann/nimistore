"use client";

import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight, Copy, Check, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { Product } from '../context/CartContext';
import { useCart } from '../context/CartContext';
import ProductCard from './ProductCard';
import { products } from '../data/products';

interface ProductPageProps {
  product: Product;
  onBackClick: () => void;
  onProductClick?: (product: Product) => void;
  onCategoryClick?: (category: string) => void;
}

export default function ProductPage({ product, onBackClick, onProductClick, onCategoryClick }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const { addItem } = useCart();

  // Add this code temporarily in your ProductPage component or run in browser console
const checkProducts = () => {
  console.log('=== CHECKING ALL PRODUCTS ===');
  
  // Get all Beauty & Personal Care products
  const beautyProducts = products.filter(p => p.category === 'Beauty & Personal Care');
  console.log(`Total Beauty & Personal Care products: ${beautyProducts.length}`);
  
  beautyProducts.forEach(p => {
    console.log(`- ID: ${p.id}, Name: "${p.name}", Price: £${p.price}`);
  });
  
  // Check product with ID 19
  const product19 = products.find(p => p.id === '19');
  console.log('\n=== PRODUCT ID 19 ===');
  console.log(product19 ? 
    `Found: ID: ${product19.id}, Name: "${product19.name}", Category: "${product19.category}"` : 
    'Product with ID 19 not found!');
  
  // Check how many products are in Beauty category (excluding current)
  const currentProduct = product; // Assuming product is the current one
  console.log('\n=== CURRENT PRODUCT ===');
  console.log(`ID: ${currentProduct.id}, Name: "${currentProduct.name}", Category: "${currentProduct.category}"`);
  
  const otherBeautyProducts = beautyProducts.filter(p => p.id !== currentProduct.id);
  console.log(`\nOther Beauty products (excluding current): ${otherBeautyProducts.length}`);
  otherBeautyProducts.forEach(p => {
    console.log(`- ID: ${p.id}, Name: "${p.name}"`);
  });
  
  return otherBeautyProducts;
};

// Call it
checkProducts();

  // Calculate total price based on quantity
  const totalPrice = product.price * quantity;

  // COMPREHENSIVE DEBUG
  useEffect(() => {
    console.log('=== PRODUCT PAGE DEBUG START ===');
    console.log('Current product details:', {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price
    });
    
    // Check all Beauty & Personal Care products
    const allBeautyProducts = products.filter(p => p.category === 'Beauty & Personal Care');
    console.log('All products in "Beauty & Personal Care" category:', allBeautyProducts.length);
    console.log('Beauty products list:', allBeautyProducts.map(p => ({ id: p.id, name: p.name })));
    
    // Check if current product is in the list
    const isCurrentProductBeauty = allBeautyProducts.some(p => p.id === product.id);
    console.log('Is current product in Beauty category?', isCurrentProductBeauty);
    
    // Check for category variations
    const allCategories = [...new Set(products.map(p => p.category))];
    console.log('All unique categories in database:', allCategories);
    
    // Check for similar categories
    console.log('Looking for similar categories to:', product.category);
    
    // Get products from same category (excluding current)
    const sameCategoryProducts = products.filter(p => 
      p.category === product.category && p.id !== product.id
    );
    console.log('Products in same category (excluding current):', sameCategoryProducts.length);
    console.log('Same category products:', sameCategoryProducts.map(p => ({ id: p.id, name: p.name })));
    
    // Get related products using the function
    const relatedProductsDebug = getRelatedProductsDebug();
    console.log('Related products found:', relatedProductsDebug.length);
    console.log('Related products details:', relatedProductsDebug.map(p => ({ 
      id: p.id, 
      name: p.name, 
      category: p.category 
    })));
    
    console.log('=== PRODUCT PAGE DEBUG END ===');
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [product.id, product.category]);

  // Debug version of getRelatedProducts
  const getRelatedProductsDebug = () => {
    if (!product.category) {
      console.log('No category for product, returning empty array');
      return [];
    }
    
    console.log('DEBUG: Starting getRelatedProducts for category:', product.category);
    
    // First, get products from the same category
    const sameCategoryProducts = products.filter(p => 
      p.category === product.category && p.id !== product.id
    );
    
    console.log('DEBUG: Found', sameCategoryProducts.length, 'products in same category');
    sameCategoryProducts.forEach(p => {
      console.log('  -', p.name, '(ID:', p.id, ')');
    });
    
    // If we have enough products, return them
    if (sameCategoryProducts.length >= 4) {
      console.log('DEBUG: Returning', Math.min(sameCategoryProducts.length, 6), 'products from same category');
      return shuffleArray(sameCategoryProducts).slice(0, 6);
    }
    
    console.log('DEBUG: Not enough products in same category, looking for similar categories');
    
    // Get similar categories
    const similarCategories = getSimilarCategories(product.category);
    console.log('DEBUG: Similar categories for', product.category, ':', similarCategories);
    
    let similarProducts: Product[] = [];
    
    // Try each similar category
    similarCategories.forEach(cat => {
      const productsInCat = products.filter(p => 
        p.category === cat && 
        p.id !== product.id &&
        !sameCategoryProducts.some(rp => rp.id === p.id)
      );
      
      if (productsInCat.length > 0) {
        console.log(`DEBUG: Found ${productsInCat.length} products in similar category "${cat}"`);
        const shuffled = shuffleArray(productsInCat).slice(0, 2);
        similarProducts = [...similarProducts, ...shuffled];
      }
    });
    
    console.log('DEBUG: Found', similarProducts.length, 'products from similar categories');
    
    // If we still don't have enough, get some random products
    if (sameCategoryProducts.length + similarProducts.length < 4) {
      const remainingCount = 4 - (sameCategoryProducts.length + similarProducts.length);
      console.log('DEBUG: Still need', remainingCount, 'more products, getting random ones');
      
      const allOtherProducts = products.filter(p => 
        p.id !== product.id &&
        !sameCategoryProducts.some(rp => rp.id === p.id) &&
        !similarProducts.some(sp => sp.id === p.id)
      );
      
      const randomProducts = shuffleArray(allOtherProducts).slice(0, remainingCount);
      similarProducts = [...similarProducts, ...randomProducts];
      
      console.log('DEBUG: Added', randomProducts.length, 'random products');
    }
    
    // Combine and return up to 6 products
    const allRelated = [...sameCategoryProducts, ...similarProducts];
    console.log('DEBUG: Total related products:', allRelated.length);
    return shuffleArray(allRelated).slice(0, 6);
  };

  // Helper function to shuffle array (for variety)
  const shuffleArray = (array: Product[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Helper function to get similar categories
  const getSimilarCategories = (category: string) => {
    console.log('DEBUG getSimilarCategories called with:', category);
    
    const categoryGroups: { [key: string]: string[] } = {
      'all': ['Fresh Food', 'Snacks', 'Drinks', 'Beauty & Personal Care'],
      'Groceries': ['Fresh Food', 'Dry Goods', 'Snacks', 'Vegetables & Fresh Produce'],
      'Fresh Food': ['Vegetables & Fresh Produce', 'Dry Goods', 'Snacks', 'Groceries'],
      'Frozen proteins': ['Meat, Fish & Poultry', 'Fresh Food', 'Groceries'],
      'Drinks': ['Snacks', 'Fresh Food', 'Fruit wine'],
      'Snacks': ['Drinks', 'Fresh Food', 'Bakery', 'Groceries'],
      'Beauty & Personal Care': ['Health & Beauty', 'Household', 'Snacks', 'Health & Beauty'],
      'Health & Beauty': ['Beauty & Personal Care', 'Household', 'Snacks'],
      'Household': ['Beauty & Personal Care', 'Health & Beauty'],
      'Dry Goods': ['Fresh Food', 'Snacks', 'Groceries', 'Pantry'],
      'Vegetables & Fresh Produce': ['Fresh Food', 'Groceries', 'Dry Goods'],
      'Meat, Fish & Poultry': ['Frozen proteins', 'Fresh Food', 'Groceries'],
      'Ethnic Foods': ['Fresh Food', 'Snacks', 'Groceries'],
      'Pantry': ['Fresh Food', 'Dry Goods', 'Groceries'],
      'Bakery': ['Snacks', 'Fresh Food', 'Groceries'],
      'Ready Meals': ['Fresh Food', 'Snacks', 'Groceries'],
      'Fruit wine': ['Drinks', 'Snacks']
    };
    
    const result = categoryGroups[category] || [];
    console.log('DEBUG getSimilarCategories returning:', result);
    return result;
  };

  // Get related products from the same category
  const getRelatedProducts = () => {
    if (!product.category) return [];
    
    // First, get products from the same category
    const sameCategoryProducts = products.filter(p => 
      p.category === product.category && p.id !== product.id
    );
    
    // If we have enough products, return them
    if (sameCategoryProducts.length >= 4) {
      return shuffleArray(sameCategoryProducts).slice(0, 6);
    }
    
    // If not enough, get products from similar categories
    const similarCategories = getSimilarCategories(product.category);
    
    let similarProducts: Product[] = [];
    
    // Try each similar category
    similarCategories.forEach(cat => {
      const productsInCat = products.filter(p => 
        p.category === cat && 
        p.id !== product.id &&
        !sameCategoryProducts.some(rp => rp.id === p.id)
      );
      
      if (productsInCat.length > 0) {
        similarProducts = [...similarProducts, ...shuffleArray(productsInCat).slice(0, 2)];
      }
    });
    
    // If we still don't have enough, get some random products
    if (sameCategoryProducts.length + similarProducts.length < 4) {
      const remainingCount = 4 - (sameCategoryProducts.length + similarProducts.length);
      const allOtherProducts = products.filter(p => 
        p.id !== product.id &&
        !sameCategoryProducts.some(rp => rp.id === p.id) &&
        !similarProducts.some(sp => sp.id === p.id)
      );
      
      const randomProducts = shuffleArray(allOtherProducts).slice(0, remainingCount);
      similarProducts = [...similarProducts, ...randomProducts];
    }
    
    // Combine and return up to 6 products
    const allRelated = [...sameCategoryProducts, ...similarProducts];
    return shuffleArray(allRelated).slice(0, 6);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  const handleQuantityIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleQuantityDecrease = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  // Get current page URL for sharing
  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  };

  // Share functionality
  const handleShare = async () => {
    const shareUrl = getShareUrl();
    const shareText = `Check out ${product.name} on NimiStore - £${product.price.toFixed(2)}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        setShowShareModal(true);
      }
    } else {
      setShowShareModal(true);
    }
  };

  // Copy link to clipboard
  const copyToClipboard = async () => {
    const shareUrl = getShareUrl();
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
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
    const shareUrl = getShareUrl();
    const shareText = `Check out ${product.name} on NimiStore - £${product.price.toFixed(2)}`;
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);

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
    const shareUrl = getShareUrl();
    const subject = `Check out ${product.name} on NimiStore`;
    const body = `I thought you might be interested in this product:\n\n${product.name}\nPrice: £${product.price.toFixed(2)}\n${product.description ? `Description: ${product.description}\n` : ''}\nView it here: ${shareUrl}`;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Handle view more related products - navigate to category page
  const handleViewMoreRelated = () => {
    if (onCategoryClick && product.category) {
      onCategoryClick(product.category);
    }
  };

  const relatedProducts = getRelatedProducts();
  const productImages = [product.image, product.image, product.image];

  // Single handler for related product clicks
  const handleRelatedProductClick = (relatedProduct: Product) => {
    if (onProductClick) {
      onProductClick(relatedProduct);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Debug Panel - Remove in production */}
       

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

              {/* Price - Updated to show total price */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-3xl font-bold text-emerald-600">
                    £{totalPrice.toFixed(2)}
                  </span>
                  {quantity > 1 && (
                    <span className="text-sm text-gray-500">
                      (£{product.price.toFixed(2)} each)
                    </span>
                  )}
                </div>
                {product.weight && (
                  <span className="text-gray-600">per {product.weight}</span>
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

              {/* Quantity and Add to Cart - Updated with better quantity controls */}
              <div className="mb-6 text-black">
                <div className="flex items-center space-x-4 mb-4">
                  <label className="text-sm font-medium text-gray-700">Quantity:</label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={handleQuantityDecrease}
                      disabled={quantity <= 1}
                      className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300 min-w-12 text-center font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={handleQuantityIncrease}
                      className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {quantity} item{quantity !== 1 ? 's' : ''} selected
                  </span>
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
                    <span>Add {quantity} to Cart - £{totalPrice.toFixed(2)}</span>
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
                    value={getShareUrl()}
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
              {relatedProducts.length > 0 && product.category 
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
              <p className="text-gray-500 mb-4">No related products found.</p>
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