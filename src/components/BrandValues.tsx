import React from 'react';
import Image from 'next/image';
import imagei from '../images/Marketi.jpg';

interface BrandValuesProps {
  onCategoryClick: (category: string) => void;
}

export default function BrandValues({ onCategoryClick }: BrandValuesProps): React.JSX.Element {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Why Choose Us?</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative">
            <Image
              src={imagei}
              alt="African Caribbean Family Cooking"
              className="w-full h-80 object-cover rounded-xl shadow-lg"
              width={500}
              height={320}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl"></div>
          </div>
          
          {/* Right side - Content */}
          <div>
            
            <div className="mb-8">
              
              <p className="text-gray-600 text-lg">
                We're more than just a grocery store - we're your connection to home
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="text-center sm:text-left">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto sm:mx-0">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Authentic Sources</h3>
                <p className="text-gray-600">Direct imports from Africa & Caribbean</p>
              </div>
              
              <div className="text-center sm:text-left">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto sm:mx-0">
                  <span className="text-2xl">🚛</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Rapid Delivery</h3>
                <p className="text-gray-600">Same-day delivery across major UK cities</p>
              </div>
              
              <div className="text-center sm:text-left">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto sm:mx-0">
                  <span className="text-2xl">❄️</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Fresh Guarantee</h3>
                <p className="text-gray-600">Temperature-controlled storage & transport</p>
              </div>
              
              <div className="text-center sm:text-left">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto sm:mx-0">
                  <span className="text-2xl">👨‍👩‍👧‍👦</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Family Business</h3>
                <p className="text-gray-600">Serving our community with love</p>
              </div>
            </div>
            
            <div className="mt-8">
              {/* <button 
                onClick={() => onCategoryClick('all')}
                className="bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                Experience the Difference
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}