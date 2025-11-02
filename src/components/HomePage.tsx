'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductModal from './ProductModal';
import Chatbot from './chatbot';
import { 
  groceriesProducts, 
  ethnicFoodsProducts, 
  meatFishProducts, 
  beautyHouseholdProducts 
} from '../data/products';
import { Product } from '../context/CartContext';

// Import the existing components
import HeroSection from './HeroSection';
import BrandBanner from './BrandBanner';
import TrustBadges from './TrustBBadges';
import CategoriesSection from './CategoriesSection';
import PromotionalAd from './PromotionalAd';
import ProductCarousel from './ProductCarousel';
import BrandValues from './BrandValues';
import Testimonials from './Testimonials';
import Ads from './Ads';

// Import the new combined section
import CombinedCategorySection from '../components/CombinedCategorySectio';

interface HomePageProps {
  onProductClick: (product: Product) => void;
  onCategoryClick: (category: string) => void;
}

export default function HomePage({ onProductClick, onCategoryClick }: HomePageProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // Handle product view modal
  const handleProductView = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen">
      <HeroSection />
      <BrandBanner />
      {/* <TrustBadges /> */}
      <CategoriesSection onCategoryClick={onCategoryClick} />
      <PromotionalAd onCategoryClick={onCategoryClick} />
      
      {/* Groceries Categories - Keep as is */}
      <ProductCarousel
        title="Groceries "
        products={groceriesProducts}
        onProductClick={onProductClick}
        onCategoryClick={onCategoryClick}
        onViewClick={handleProductView}
        autoScrollInterval={1000}
      />
      
      <BrandValues onCategoryClick={onCategoryClick} />
      
      {/* Replace the three separate ProductCarousel sections with the combined one */}
      <CombinedCategorySection
        ethnicFoodsProducts={ethnicFoodsProducts}
        meatFishProducts={meatFishProducts}
        beautyHouseholdProducts={beautyHouseholdProducts}
        onProductClick={onProductClick}
        onCategoryClick={onCategoryClick}
        onViewClick={handleProductView}
      />

      <Ads />
      
      <Testimonials />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      {/* Customer Support Chatbot - This should appear as a floating button */}
      <Chatbot onCategoryClick={onCategoryClick} />
    </div>
  );
}