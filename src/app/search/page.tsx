"use client";

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '../../components/Header';
import SearchPage from '../../components/SearchPage';
import Footer from '../../components/Footer';
import { Product } from '../../context/CartContext';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';

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
      <SearchPage 
        searchQuery={query}
        onProductClick={handleProductClick}
      />
      <Footer onCategoryClick={handleCategoryClick} />
    </div>
  );
}

export default function SearchRoute() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading search results...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}