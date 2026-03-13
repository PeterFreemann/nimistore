import React, { useMemo } from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import { Product } from '../context/CartContext';

interface SearchPageProps {
  searchQuery: string;
  onProductClick: (product: Product) => void;
}

export default function SearchPage({ searchQuery, onProductClick }: SearchPageProps) {
  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    
    const query = searchQuery.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results for "{searchQuery}"
          </h1>
          <p className="text-gray-600">
            {searchResults.length} product{searchResults.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={onProductClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              No products found for "{searchQuery}"
            </p>
            <p className="text-gray-400">
              Try searching with different keywords or browse our categories
            </p>
          </div>
        )}
      </div>
    </div>
  );
}