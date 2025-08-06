'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import AboutUs from '@/components/Aboutus';

export default function AboutUsPage() {
  const router = useRouter();

  const handlePageChange = (page: string) => {
    // Handle page navigation with Next.js router
    if (page.startsWith('category-')) {
      const category = page.replace('category-', '');
      if (category === 'all') {
        router.push('/shop-all');
      } else {
        router.push(`/category/${category.toLowerCase().replace(/\s+/g, '-')}`);
      }
    } else if (page === 'home') {
      router.push('/');
    } else if (page === 'shop-all') {
      router.push('/shop-all');
    } else if (page === 'cart') {
      router.push('/cart');
    } else if (page === 'contact') {
      router.push('/contact');
    } else if (page === 'how-it-works') {
      router.push('/how-it-works');
    } else {
      router.push(`/${page}`);
    }
  };

  const handleSearch = (query: string) => {
    // Redirect to search results page
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div>
      <Header 
        currentPage="about"
        onPageChange={handlePageChange}
        onSearch={handleSearch}
      />
      
      {/* Add your about us content here */}
      <AboutUs  />
    </div>
  );
}