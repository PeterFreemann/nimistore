"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import ProductPage from '../../../components/ProductPage';
import Footer from '../../../components/Footer';
import { Product } from '../../../context/CartContext';
import { groceriesProducts, ethnicFoodsProducts, meatFishProducts, beautyHouseholdProducts } from '../../../data/products';

export default function ProductRoute() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const productId = params.id as string;

  // Find product by ID
  useEffect(() => {
    const allProducts = [
      ...groceriesProducts,
      ...ethnicFoodsProducts,
      ...meatFishProducts,
      ...beautyHouseholdProducts
    ];
    
    const foundProduct = allProducts.find(p => p.id === productId);
    setProduct(foundProduct || null);
  }, [productId]);

  const handleProductClick = (clickedProduct: Product) => {
    router.push(`/product/${clickedProduct.id}`);
  };

  const handleCategoryClick = (category: string) => {
    const slug = category.toLowerCase().replace(/\s+/g, '-');
    router.push(`/category/${slug}`);
  };

  const handleBackClick = () => {
    router.back();
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <ProductPage
        product={product}
        onBackClick={handleBackClick}
        onProductClick={handleProductClick}
        onCategoryClick={handleCategoryClick}
      />
      <Footer onCategoryClick={handleCategoryClick} />
    </div>
  );
}