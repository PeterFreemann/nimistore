"use client";

import React, { useState, useMemo } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import { products } from '../data/products';
import { Product } from '../context/CartContext';
import { useCart } from '../context/CartContext';

interface CategoryPageProps {
  category: string;
  onProductClick: (product: Product) => void;
  onViewClick?: (product: Product) => void;
}

export default function CategoryPage({ category, onProductClick, onViewClick }: CategoryPageProps) {
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [weightRange, setWeightRange] = useState([0, 5000]); // in grams
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16; // 4 columns x 4 rows
  
  const { addItem } = useCart();

  // Category mapping to match your actual product categories
  const categoryMapping = [
    { name: 'Fresh Food', category: 'Fresh Food' },
    { name: 'Frozen Proteins', category: 'Frozen proteins' },
    { name: 'African Soft Drinks', category: 'Drinks' },
    { name: 'Fruit Wine', category: 'Wine' },
    { name: 'Snacks', category: 'Snacks' },
    { name: 'Beauty & Personal Care', category: 'Beauty & Personal Care' },
  ];

  const categories = categoryMapping.map(item => item.category);

  const filteredProducts = useMemo(() => {
    console.log('Current category:', category);
    console.log('All products count:', products.length);
    
    let filtered = category === 'all' 
      ? products 
      : products.filter(product => {
          const matches = product.category === category;
          console.log(`Product: ${product.name}, Category: ${product.category}, Matches: ${matches}`);
          return matches;
        });

    console.log('Filtered products count:', filtered.length);

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category)
      );
    }

    // Apply price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply weight filter (assuming weight is in format like "500g", "1kg", etc.)
    filtered = filtered.filter(product => {
      if (!product.weight) return true; // Include products without weight info
      
      const weightStr = product.weight.toLowerCase();
      let weightInGrams = 0;
      
      if (weightStr.includes('kg')) {
        weightInGrams = parseFloat(weightStr.replace('kg', '')) * 1000;
      } else if (weightStr.includes('g')) {
        weightInGrams = parseFloat(weightStr.replace('g', ''));
      } else if (weightStr.includes('ml')) {
        weightInGrams = parseFloat(weightStr.replace('ml', ''));
      } else if (weightStr.includes('l')) {
        weightInGrams = parseFloat(weightStr.replace('l', '')) * 1000;
      }
      
      return weightInGrams >= weightRange[0] && weightInGrams <= weightRange[1];
    });

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [category, sortBy, priceRange, weightRange, selectedCategories]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryName)
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 100]);
    setWeightRange([0, 5000]);
    setCurrentPage(1);
  };

  // Add this function to handle add to cart
  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  // Handle product click for both grid and list views
  const handleProductClick = (product: Product) => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  // Handle view click
  const handleViewClick = (product: Product) => {
    if (onViewClick) {
      onViewClick(product);
    }
  };

  const categoryTitle = category === 'all' ? 'All Products' : 
    categoryMapping.find(item => item.category === category)?.name || category;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryTitle}</h1>
          <p className="text-gray-600">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            {category !== 'all' && ` in ${categoryTitle}`}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-black">Filters</h3>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Clear All
                </button>
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3 text-black">Categories</h4>
                <div className="space-y-2">
                  {categoryMapping.map((item) => (
                    <label key={item.category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(item.category)}
                        onChange={() => handleCategoryChange(item.category)}
                        className="mr-2 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-black">{item.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2 text-black">
                  Price Range: £{priceRange[0]} - £{priceRange[1]}
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>

              {/* Weight/Size Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2 text-black">
                  Weight Range: {weightRange[0]}g - {weightRange[1] >= 5000 ? '5kg+' : `${weightRange[1]}g`}
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={weightRange[1]}
                    onChange={(e) => setWeightRange([weightRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>

              {/* In Stock Filter */}
              <div className="mt-6">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="mr-2 text-emerald-600 focus:ring-emerald-500" 
                    defaultChecked 
                  />
                  <span className="text-sm text-black">In Stock Only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and View Controls */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Filter size={20} />
                  <span>Filters</span>
                </button>

                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700 text-black">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 text-black rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="name">Name (A-Z)</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg border ${
                      viewMode === 'grid' 
                        ? 'bg-emerald-600 text-white border-emerald-600' 
                        : 'text-gray-400 border-gray-300 hover:bg-gray-50'
                    } transition-colors`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg border ${
                      viewMode === 'list' 
                        ? 'bg-emerald-600 text-white border-emerald-600' 
                        : 'text-gray-400 border-gray-300 hover:bg-gray-50'
                    } transition-colors`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {viewMode === 'grid' && (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {paginatedProducts.map((product) => (
      <div 
        key={product.id} 
        className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
        onClick={() => handleProductClick(product)} // This should trigger navigation
      >
        {/* Fixed Image Container */}
        <div className="relative h-48 bg-gray-50 flex items-center justify-center p-4">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = '/images/fallback.jpg';
            }}
          />
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              product.inStock 
                ? 'bg-emerald-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h4 className="font-semibold text-black text-lg mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
            {product.name}
          </h4>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-emerald-600">
              £{product.price.toFixed(2)}
            </span>
            {product.weight && (
              <span className="text-sm text-gray-500">{product.weight}</span>
            )}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click when clicking button
                handleAddToCart(product, e);
              }}
              disabled={!product.inStock}
              className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium text-sm"
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click when clicking button
                handleViewClick(product);
              }}
              className="px-4 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors font-medium text-sm"
            >
              View
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
)}


            {/* List View */}
            {viewMode === 'list' && (
              <div className="space-y-4">
                {paginatedProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Fixed Image Container for List View */}
                      <div className="sm:w-48 h-48 bg-gray-50 flex items-center justify-center p-4 flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = '/images/fallback.jpg';
                          }}
                        />
                      </div>
                      
                      <div className="flex-1 p-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-black text-xl mb-2 group-hover:text-emerald-600 transition-colors">
                              {product.name}
                            </h4>
                            <p className="text-gray-600 mb-3">
                              {product.description}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            product.inStock 
                              ? 'bg-emerald-500 text-white' 
                              : 'bg-red-500 text-white'
                          }`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                          <span className="text-2xl font-bold text-emerald-600">
                            £{product.price.toFixed(2)}
                          </span>
                          {product.weight && (
                            <span className="text-sm text-gray-500">{product.weight}</span>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => handleAddToCart(product, e)}
                            disabled={!product.inStock}
                            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
                          >
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewClick(product);
                            }}
                            className="px-6 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors font-medium"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Products Found */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <div className="text-gray-400 text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                  {category === 'all' 
                    ? "We couldn't find any products matching your filters." 
                    : `We couldn't find any products in "${categoryTitle}" matching your filters.`
                  }
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && filteredProducts.length > 0 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 7) {
                      pageNum = i + 1;
                    } else if (currentPage <= 4) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 3) {
                      pageNum = totalPages - 6 + i;
                    } else {
                      pageNum = currentPage - 3 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          currentPage === pageNum
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add some custom styles for the range sliders */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #059669;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #059669;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}