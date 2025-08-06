"use client";

import React, { useState } from 'react';
import { Product } from '../context/CartContext';

// Import your existing components
import HomePage from '../components/HomePage'; // Adjust path as needed
import Header from '../components/Header';

// You'll need to create or import these other page components
import CategoryPage from '../components/CategoryPage';
import AboutPage from '../components/Aboutus';
import ContactPage from '../components/Contactus';
import CartPage from '../components/CartPage';
import CheckoutPage from '../components/CheckoutPage'; // Add this import
import Footer from '@/components/Footer';
import HowItWorksPage from '../components/HowItWorks'; // Adjust path as needed
import HowItWorks from '../components/HowItWorks';
import SearchPage from '../components/SearchPage'; // Add this import

export default function MainApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

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
    setSelectedCategory(category);
    setCurrentPage('category');
  };

  // Handle product clicks
  const handleProductClick = (product: Product) => {
    console.log('Product clicked:', product);
    // Add your product click logic here
    // Maybe navigate to product detail page or add to cart
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage('search');
    console.log('Search for:', query);
    // Implement your search logic here
  };

  // Handle checkout click
  const handleCheckoutClick = () => {
    console.log('Proceed to checkout');
    setCurrentPage('checkout'); // Add this line to navigate to checkout page
  };

  // Handle order completion
  const handleOrderComplete = () => {
    console.log('Order completed');
    setCurrentPage('order-complete'); // Navigate to order complete page
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
        return (
          <HowItWorks/>
        );
      
      case 'cart':
        return (
          <CartPage 
            onCheckoutClick={handleCheckoutClick} // Use the proper handler
            onContinueShoppingClick={() => {
              // Navigate back to shopping
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

      case 'order-complete':
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">✅</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Complete!</h1>
              <p className="text-gray-600 mb-8">Thank you for your order. You will receive a confirmation email shortly.</p>
              <button
                onClick={() => setCurrentPage('home')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        );
      
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