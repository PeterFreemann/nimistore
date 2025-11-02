"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import AboutUs from '../../components/Aboutus';
import Footer from '../../components/Footer';

export default function AboutPage() {
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    const slug = category.toLowerCase().replace(/\s+/g, '-');
    router.push(`/category/${slug}`);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <AboutUs />
      <Footer onCategoryClick={handleCategoryClick} />
    </div>
  );
}