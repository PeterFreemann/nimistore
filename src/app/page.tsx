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
    router.push(`/product/${product.id}`);
  };

  const handleCategoryClick = (category: string) => {
    const slug = category.toLowerCase().replace(/\s+/g, '-');
    router.push(`/category/${slug}`);
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