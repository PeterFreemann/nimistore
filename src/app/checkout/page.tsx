"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import CheckoutPage from '../../components/CheckoutPage';
import Footer from '../../components/Footer';

export default function CheckoutRoute() {
  const router = useRouter();

  const handleOrderComplete = () => {
    // Navigate to success page after order completion
    router.push('/success');
  };

  const handleCategoryClick = (category: string) => {
    const slug = category.toLowerCase().replace(/\s+/g, '-');
    router.push(`/category/${slug}`);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <CheckoutPage onOrderComplete={handleOrderComplete} />
      <Footer onCategoryClick={handleCategoryClick} />
    </div>
  );
}