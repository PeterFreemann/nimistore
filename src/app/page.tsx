"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import HomePage from '../components/HomePage';
import Footer from '../components/Footer';
import { Product } from '../context/CartContext';

export default function Home() {
  const router = useRouter();

  const handleProductClick = (product: Product) => {
    // Navigate to product page
    router.push(`/product/${product.id}`);
  };

  const handleCategoryClick = (category: string) => {
    // DON'T convert to slug - pass the category name as is
    // URL encode it properly
    console.log('Category clicked in Home:', category);
    
    if (category === 'all') {
      router.push('/category/all');
    } else {
      // Use encodeURIComponent to handle spaces and special characters
      const encodedCategory = encodeURIComponent(category);
      router.push(`/category/${encodedCategory}`);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <HomePage 
        onProductClick={handleProductClick}
        onCategoryClick={handleCategoryClick}
      />
      <Footer onCategoryClick={handleCategoryClick} />
    </div>
  );
}