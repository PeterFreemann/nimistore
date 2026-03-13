"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import ContactUs from '../../components/Contactus';
import Footer from '../../components/Footer';

export default function ContactPage() {
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    const slug = category.toLowerCase().replace(/\s+/g, '-');
    router.push(`/category/${slug}`);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <ContactUs />
      <Footer onCategoryClick={handleCategoryClick} />
    </div>
  );
}