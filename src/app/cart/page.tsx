"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import CartPage from '../../components/CartPage';
import Footer from '../../components/Footer';

export default function CartRoute() {
  const router = useRouter();

  const handleCheckoutClick = () => {
    router.push('/checkout');
  };

  const handleContinueShopping = () => {
    router.push('/');
  };

  const handleCategoryClick = (category: string) => {
    const slug = category.toLowerCase().replace(/\s+/g, '-');
    router.push(`/category/${slug}`);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <CartPage 
        onCheckoutClick={handleCheckoutClick}
        onContinueShoppingClick={handleContinueShopping}
      />
      <Footer onCategoryClick={handleCategoryClick} />
    </div>
  );
}