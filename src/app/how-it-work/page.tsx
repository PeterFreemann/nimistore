'use client';

import React from 'react'
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Howitworks from '@/components/HowItWorks';

export default function page() {
  const router = useRouter();

  const handlePageChange = (page: string) => {
    // Map the page names to actual routes
    const routeMap: { [key: string]: string } = {
      'home': '/',
      'shop-all': '/shop',
      'about': '/about',
      'contact': '/contact-us',
      'how-it-works': '/how-it-works',
      'cart': '/cart',
    };

    // Handle category pages
    if (page.startsWith('category-')) {
      const category = page.replace('category-', '');
      router.push(`/category/${category}`);
    } else {
      const route = routeMap[page] || `/${page}`;
      router.push(route);
    }
  };

  const handleSearch = (query: string) => {
    // Redirect to search page with query parameter
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div>
      <Header 
        currentPage="contact"
        onPageChange={handlePageChange}
        onSearch={handleSearch}
      />
      
      {/* Add your contact us content here */}
      <Howitworks />
    </div>
  )
}