"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import ProductPage from '../../../components/ProductPage';
import Footer from '../../../components/Footer';
import { Product } from '../../../context/CartContext';
import { products } from '../../../data/products'; // IMPORT THE MAIN products ARRAY

export default function ProductRoute() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const productId = params.id as string;

  // Find product by ID
  useEffect(() => {
    console.log('ProductRoute: Looking for product ID:', productId);
    console.log('ProductRoute: Total products available:', products.length);
    
    // Log all products for debugging
    console.log('ProductRoute: All product IDs:', products.map(p => ({ id: p.id, name: p.name })));
    
    // Find product directly from the main products array
    const foundProduct = products.find(p => p.id === productId);
    
    console.log('ProductRoute: Found product:', foundProduct);
    
    if (foundProduct) {
      console.log('ProductRoute: Product details:', {
        id: foundProduct.id,
        name: foundProduct.name,
        category: foundProduct.category
      });
    } else {
      console.error('ProductRoute: Product not found!');
      // You might want to redirect to 404 or show an error
    }
    
    setProduct(foundProduct || null);
    setLoading(false);
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

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading product...</p>
          </div>
        </div>
        <Footer onCategoryClick={handleCategoryClick} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
            <p className="text-gray-600 mb-6">
              We couldn't find the product you're looking for.
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
            >
              Back to Home
            </button>
          </div>
        </div>
        <Footer onCategoryClick={handleCategoryClick} />
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