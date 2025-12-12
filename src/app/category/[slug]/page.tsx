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
    console.log('=== DEBUG: CategoryRoute Loaded ===');
    console.log('Raw slug from URL:', slug);
    
    if (!slug) {
      setActualCategory('all');
      return;
    }
    
    // Decode the URL-encoded slug
    const decodedSlug = decodeURIComponent(slug);
    console.log('Decoded slug:', decodedSlug);
    
    // Get all unique categories from products
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    console.log('All unique categories:', uniqueCategories);
    
    // FIRST: Check if the decoded slug exactly matches any category
    let matchedCategory = uniqueCategories.find(cat => 
      cat.toLowerCase() === decodedSlug.toLowerCase()
    );
    
    if (matchedCategory) {
      console.log('Found exact match:', matchedCategory);
      setActualCategory(matchedCategory);
      return;
    }
    
    // SECOND: Check common variations
    const categoryVariations: Record<string, string> = {
      // Direct category name mappings
      'fruit-wine': 'Fruit wine',
      'fruitwine': 'Fruit wine',
      'wine': 'Fruit wine',
      'frozen-proteins': 'Frozen proteins',
      'frozenproteins': 'Frozen proteins',
      'frozen': 'Frozen proteins',
      'drinks': 'Drinks',
      'soft-drinks': 'Drinks',
      'beverages': 'Drinks',
      'snacks': 'Snacks',
      'beauty': 'Beauty & Personal Care',
      'beauty-care': 'Beauty & Personal Care',
      'beauty-and-personal-care': 'Beauty & Personal Care',
      'beauty-personal-care': 'Beauty & Personal Care',
      'fresh-food': 'Fresh Food',
      'freshfood': 'Fresh Food',
      'fresh': 'Fresh Food',
      'all': 'all',
      'all-products': 'all',
      'everything': 'all'
    };
    
    // Check if slug matches any variation
    if (categoryVariations[decodedSlug.toLowerCase()]) {
      matchedCategory = categoryVariations[decodedSlug.toLowerCase()];
      console.log('Found variation match:', matchedCategory);
      setActualCategory(matchedCategory);
      return;
    }
    
    // THIRD: Try partial matching
    for (const cat of uniqueCategories) {
      const catLower = cat.toLowerCase();
      const slugLower = decodedSlug.toLowerCase();
      
      if (catLower.includes(slugLower) || slugLower.includes(catLower)) {
        console.log('Found partial match:', cat);
        setActualCategory(cat);
        return;
      }
    }
    
    // If nothing matches, default to 'all'
    console.warn(`No category found for slug: "${decodedSlug}", defaulting to 'all'`);
    setActualCategory('all');
    
  }, [slug]);

  const handleProductClick = (product: Product) => {
    router.push(`/product/${product.id}`);
  };

  const handleCategoryClick = (category: string) => {
    console.log('handleCategoryClick called with:', category);
    
    if (category === 'all') {
      router.push('/category/all');
      return;
    }
    
    // For category clicks, use the actual category name (not slugified)
    // The CategoryPage component should handle the URL encoding
    const encodedCategory = encodeURIComponent(category);
    router.push(`/category/${encodedCategory}`);
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