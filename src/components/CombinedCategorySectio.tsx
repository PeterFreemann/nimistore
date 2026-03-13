import React, { useState } from 'react';
import { Product } from '../context/CartContext';
import { useCart } from '../context/CartContext';
import { products } from '../data/products'; // Import products directly

interface CombinedCategorySectionProps {
  ethnicFoodsProducts: Product[];
  meatFishProducts: Product[];
  beautyHouseholdProducts: Product[];
  onProductClick: (product: Product) => void;
  onCategoryClick: (category: string) => void;
  onViewClick: (product: Product) => void;
}

const categories = [
  {
    id: 'fresh food',
    name: 'Fresh Food',
    icon: '🌽',
    description: 'Fresh vegetables and produce',
    filter: (product: Product) => product.category === 'Fresh Food'
  },
  {
    id: 'beauty',
    name: 'Beauty and Personal Care',
    icon: '🧴',
    description: 'Personal care and home essentials',
    filter: (product: Product) => product.category === 'Beauty & Personal Care'
  },
  {
    id: 'snacks',
    name: 'Snacks & Drinks',
    icon: '🍿',
    description: 'Snacks and beverages',
    filter: (product: Product) => ['Snacks', 'Drinks'].includes(product.category)
  }
];

export default function CombinedCategorySection({ 
  ethnicFoodsProducts, 
  meatFishProducts, 
  beautyHouseholdProducts,
  onProductClick,
  onCategoryClick,
  onViewClick
}: CombinedCategorySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('fresh food');
  const { addItem } = useCart();

  // Use products directly from the import instead of passed props
  const allProducts = products;

  // Debug: Check what products we have
  console.log('All products from direct import:', allProducts);
  console.log('Fresh Food products:', allProducts.filter(p => p.category === 'Fresh Food'));
  console.log('Beauty products:', allProducts.filter(p => p.category === 'Beauty & Personal Care'));
  console.log('Snacks products:', allProducts.filter(p => p.category === 'Snacks'));
  console.log('Drinks products:', allProducts.filter(p => p.category === 'Drinks'));

  const getProductsForCategory = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return allProducts.slice(0, 6);
    
    const filteredProducts = allProducts.filter(category.filter);
    console.log(`Filtered products for ${categoryId}:`, filteredProducts);
    return filteredProducts.slice(0, 6);
  };

  const selectedProducts = getProductsForCategory(selectedCategory);
  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  // Handle add to cart with proper cart functionality
  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-start mb-8 text-black">Specialty Categories</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Grid - Category Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-32">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">Categories</h3>
              <div className="space-y-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                      selectedCategory === category.id
                        ? 'border-emerald-500 bg-emerald-50 shadow-md'
                        : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{category.icon}</span>
                      <div>
                        <div className={`font-semibold ${
                          selectedCategory === category.id ? 'text-emerald-700' : 'text-gray-800'
                        }`}>
                          {category.name}
                        </div>
                        <div className="text-sm text-gray-600">{category.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Grid - Product Display */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  {selectedCategoryData?.name}
                </h3>
                <button
                  onClick={() => onCategoryClick(selectedCategoryData?.name || '')}
                  className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                >
                  View All →
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group relative">
                    {/* New Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded text-xs font-medium">
                        New
                      </span>
                    </div>
                    
                    {/* Stock Status */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.inStock 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-red-500 text-white'
                      }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>

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
                    </div>
                    
                    <div className="p-4">
                      <h4 className="font-semibold text-black text-lg mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {product.name}
                      </h4>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xl font-bold text-gray-900">
                          £{product.price.toFixed(2)}
                        </span>
                        {product.weight && (
                          <span className="text-sm text-gray-500">{product.weight}</span>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <button
                          onClick={(e) => handleAddToCart(product, e)}
                          disabled={!product.inStock}
                          className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
                        >
                          {product.inStock ? 'Add to cart' : 'Out of Stock'}
                        </button>
                        <button
                          onClick={() => onViewClick(product)}
                          className="w-full px-4 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedProducts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🛒</div>
                  <p className="text-gray-600">No products available in this category</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Available categories: {allProducts.map(p => p.category).filter((v, i, a) => a.indexOf(v) === i).join(', ')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}