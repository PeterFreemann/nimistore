"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import CategoryPage from '../../../components/CategoryPage';
import Footer from '../../../components/Footer';
import { Product } from '../../../context/CartContext';
import { products } from '../../../data/products';

export default function CategoryRoute() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [actualCategory, setActualCategory] = useState<string>('all');

  useEffect(() => {
    // Get all unique categories from products
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    
    // Create a direct mapping from URL slugs to actual category names
    const createCategoryMapping = () => {
      const mapping: { [key: string]: string } = {
        'all': 'all'
      };
      
      uniqueCategories.forEach(category => {
        const slug = category.toLowerCase().replace(/\s+/g, '-');
        mapping[slug] = category;
      });
      
      // Add any additional mappings for URL variations - NO DUPLICATE KEYS
      if (!mapping['frozen-proteins']) {
        mapping['frozen-proteins'] = 'Frozen proteins';
      }
      if (!mapping['beauty']) {
        mapping['beauty'] = 'Beauty & Personal Care';
      }
      if (!mapping['beauty-personal-care']) {
        mapping['beauty-personal-care'] = 'Beauty & Personal Care';
      }
      
      return mapping;
    };
    
    const categoryMapping = createCategoryMapping();
    console.log('Category Mapping:', categoryMapping);
    console.log('Looking for slug:', slug);
    
    const matchedCategory = categoryMapping[slug] || 'all';
    console.log('Matched category:', matchedCategory);
    
    setActualCategory(matchedCategory);
  }, [slug]);

  const handleProductClick = (product: Product) => {
    router.push(`/product/${product.id}`);
  };

  const handleCategoryClick = (category: string) => {
    // Use the exact category from the product data
    const newSlug = category.toLowerCase().replace(/\s+/g, '-');
    router.push(`/category/${newSlug}`);
  };

  return (
    <div className="min-h-screen">
      <Header selectedCategory={actualCategory} />
      <CategoryPage 
        category={actualCategory}
        onProductClick={handleProductClick}
      />
      <Footer onCategoryClick={handleCategoryClick} />
    </div>
  );
}