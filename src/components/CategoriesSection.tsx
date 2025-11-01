import React from 'react';
import { Leaf, Snowflake, Droplet, Cookie, Wine, Sparkles, Grid3x3 } from 'lucide-react';

interface Category {
  name: string;
  icon: React.ReactNode;
  value: string;
}

interface CategoriesSectionProps {
  onCategoryClick: (category: string) => void;
}

const categories: Category[] = [
  { name: 'All Products', icon: <Grid3x3 className="w-8 h-8" />, value: 'all' },
  { name: 'Fresh Food', icon: <Leaf className="w-8 h-8" />, value: 'Fresh Food' },
  { name: 'Frozen Proteins', icon: <Snowflake className="w-8 h-8" />, value: 'Frozen proteins' },
  { name: 'African Soft Drinks', icon: <Droplet className="w-8 h-8" />, value: 'Drinks' },
  { name: 'Snacks', icon: <Cookie className="w-8 h-8" />, value: 'Snacks' },
  { name: 'Fruit Wine', icon: <Wine className="w-8 h-8" />, value: 'Fruit wine' },
  { name: 'Beauty & Personal Care', icon: <Sparkles className="w-8 h-8" />, value: 'Beauty & Personal Care' },
];

export default function CategoriesSection({ onCategoryClick }: CategoriesSectionProps): React.JSX.Element {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-2xl font-bold text-left text-gray-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onCategoryClick(category.value)}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-24 overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400">
                <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-0 transition-all"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  {category.icon}
                </div>
              </div>
              <div className="p-3 bg-white">
                <h3 className="font-semibold text-center text-gray-800 text-sm leading-tight group-hover:text-green-700 transition-colors">
                  {category.name}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// Demo wrapper to show the component in action
function App() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    console.log('Selected category:', category);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CategoriesSection onCategoryClick={handleCategoryClick} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-700">
            <span className="font-semibold">Selected Category:</span>{' '}
            <span className="text-green-700">{selectedCategory}</span>
          </p>
        </div>
      </div>
    </div>
  );
}