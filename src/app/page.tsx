"use client";

import React, { useState, useEffect } from 'react';
import { Product } from '../context/CartContext';
import { useSearchParams } from 'next/navigation';

// Import your existing components
import HomePage from '../components/HomePage';
import Header from '../components/Header';
import CategoryPage from '../components/CategoryPage';
import AboutPage from '../components/Aboutus';
import ContactPage from '../components/Contactus';
import CartPage from '../components/CartPage';
import CheckoutPage from '../components/CheckoutPage';
import Footer from '@/components/Footer';
import HowItWorks from '../components/HowItWorks';
import SearchPage from '../components/SearchPage';
import ProductPage from '../components/ProductPage';

export default function MainApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const searchParams = useSearchParams();

  // Handle payment success from URL parameters (when redirected from Stripe)
  useEffect(() => {
    const paymentSuccess = searchParams.get('payment_success');
    const sessionId = searchParams.get('session_id');
    
    if (paymentSuccess === 'true' && sessionId) {
      console.log('Payment successful, session:', sessionId);
      setCurrentPage('success');
      
      // Clear the URL parameters without page reload
      const url = new URL(window.location.href);
      url.searchParams.delete('payment_success');
      url.searchParams.delete('session_id');
      window.history.replaceState({}, '', url.toString());
    }
  }, [searchParams]);

  // Handle page navigation
  const handlePageChange = (page: string) => {
    console.log('Navigate to:', page);
    
    if (page.startsWith('category-')) {
      const category = page.replace('category-', '');
      setSelectedCategory(category);
      setCurrentPage('category');
    } else if (page === 'shop-all') {
      setSelectedCategory('all');
      setCurrentPage('category');
    } else {
      setCurrentPage(page);
    }
  };

  // Handle category clicks
  const handleCategoryClick = (category: string) => {
    console.log('Category clicked:', category);
    
    // Check if it's already in the format 'category-{categoryName}'
    if (category.startsWith('category-')) {
      const categoryName = category.replace('category-', '');
      setSelectedCategory(categoryName);
      setCurrentPage('category');
    } else {
      // If it's just a category name, convert it to the expected format
      setSelectedCategory(category);
      setCurrentPage('category');
    }
  };

  // Handle product clicks
  const handleProductClick = (product: Product) => {
    console.log('Product clicked:', product);
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage('search');
    console.log('Search for:', query);
  };

  // Handle checkout click
  const handleCheckoutClick = () => {
    console.log('Proceed to checkout');
    setCurrentPage('checkout');
  };

  // Handle order completion
  const handleOrderComplete = () => {
    console.log('Order completed');
    setCurrentPage('success');
  };

  // Handle back from product page
  const handleBackFromProduct = () => {
    setSelectedProduct(null);
    setCurrentPage('home');
  };

  // Success Page Component (inline for simplicity)
  const SuccessPage = () => {
  const [countdown, setCountdown] = useState(5);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    // Countdown for automatic redirect
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShouldRedirect(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Separate useEffect for the redirect
  useEffect(() => {
    if (shouldRedirect) {
      setCurrentPage('home');
    }
  }, [shouldRedirect]);

  const handleReturnHome = () => {
    setCurrentPage('home');
  };

  const handleContinueShopping = () => {
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Success Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-4">
              <svg className="h-16 w-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-lg text-gray-600 mb-2">
            Thank you for your order
          </p>
          
          <p className="text-gray-500 mb-6">
            Your order has been confirmed and will be processed shortly.
          </p>

          {/* Auto-redirect notice */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg mb-6">
            <p className="text-sm text-blue-700">
              Redirecting to home page in {countdown} seconds...
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleReturnHome}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Return to Home</span>
            </button>
            
            <button
              onClick={handleContinueShopping}
              className="border border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            What happens next?
          </h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start space-x-3">
              <div className="bg-emerald-100 text-emerald-600 rounded-full p-1 mt-0.5">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p>Your order is being processed and will be prepared for shipment</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-emerald-100 text-emerald-600 rounded-full p-1 mt-0.5">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p>You will receive a shipping confirmation email with tracking information</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-emerald-100 text-emerald-600 rounded-full p-1 mt-0.5">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p>Expected delivery: 2-3 business days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


  // Render different pages based on currentPage state
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            onProductClick={handleProductClick}
            onCategoryClick={handleCategoryClick}
          />
        );
      
      case 'product':
        return selectedProduct ? (
          <ProductPage
            product={selectedProduct}
            onBackClick={handleBackFromProduct}
            onProductClick={handleProductClick}
            onCategoryClick={handleCategoryClick}
          />
        ) : (
          <HomePage 
            onProductClick={handleProductClick}
            onCategoryClick={handleCategoryClick}
          />
        );
      
      case 'category':
        return (
          <CategoryPage 
            category={selectedCategory}
            onProductClick={handleProductClick}
          />
        );
      
      case 'about':
        return <AboutPage />;
      
      case 'contact':
        return <ContactPage />;
      
      case 'how-it-works':
        return <HowItWorks />;
      
      case 'cart':
        return (
          <CartPage 
            onCheckoutClick={handleCheckoutClick}
            onContinueShoppingClick={() => {
              setCurrentPage('home');
            }}
          />
        );

      case 'checkout':
        return (
          <CheckoutPage 
            onOrderComplete={handleOrderComplete}
          />
        );

      case 'success':
        return <SuccessPage />;
      
      case 'search':
        return (
          <SearchPage 
            searchQuery={searchQuery}
            onProductClick={handleProductClick}
          />
        );
      
      default:
        return (
          <HomePage 
            onProductClick={handleProductClick}
            onCategoryClick={handleCategoryClick}
          />
        );
    }
  };

  return (
    <div className="min-h-screen">
      <Header 
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        selectedCategory={selectedCategory}
      />
      
      {renderCurrentPage()}
      
      <Footer 
        onPageChange={handlePageChange}
        onCategoryClick={handleCategoryClick}
      />
    </div>
  );
}