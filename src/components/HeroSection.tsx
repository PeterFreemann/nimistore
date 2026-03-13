import React, { useState, useEffect } from 'react';
import image from '../images/hero.png';
import { StaticImageData } from 'next/image';

// Define the image type to handle both string URLs and StaticImageData
interface ImageItem {
  src: string | StaticImageData;
  alt: string;
}

export default function HeroSection(): React.JSX.Element {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Array of African/Caribbean grocery store images
  const images: ImageItem[] = [
    {
      src: "https://images.unsplash.com/photo-1546052516-ad0cffc51327?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHx8fDE3NTI1Mzc5NTV8MA&ixlib=rb-4.1.0&q=85",
      alt: "African Caribbean Market"
    },
    {
      src: image,
      alt: "Fresh Tropical Produce"
    },
    {
      src: "https://images.unsplash.com/photo-1542838132-92c53300491e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwyeHx8fDE3NTI1Mzc5NTV8MA&ixlib=rb-4.1.0&q=85",
      alt: "Spices and Ingredients"
    },
  ];

  // Trigger entrance animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  // Helper function to get the src as a string
  const getImageSrc = (src: string | StaticImageData): string => {
    return typeof src === 'string' ? src : src.src;
  };

  return (
    <section className="hero-section overflow-hidden">
      <div className="hero-content grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className={`hero-text transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-pulse">
            <span className="inline-block animate-bounce delay-100">Authentic</span>{' '}
            <span className="inline-block animate-bounce delay-200">African</span>{' '}
            <span className="inline-block animate-bounce delay-300">&</span>{' '}
            <span className="inline-block animate-bounce delay-400">Caribbean</span>{' '}
            <span className="inline-block animate-bounce delay-500">Groceries</span>
          </h1>
          <p className={`text-lg text-gray-600 mb-8 transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            Fresh ingredients from home, delivered to your door across the UK
          </p>
          <div className={`hero-features grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 transform transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <div className="feature p-4 rounded-lg bg-gradient-to-br from-amber-50 to-red-50 hover:scale-105 transition-transform duration-300">
              <span className="text-2xl mb-2 block animate-pulse">🚚</span>
              <h3 className="font-semibold text-gray-900 mb-1">Fast Delivery</h3>
              <p className="text-sm text-gray-600">Next-day delivery available</p>
            </div>
            <div className="feature p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 hover:scale-105 transition-transform duration-300 delay-100">
              <span className="text-2xl mb-2 block animate-pulse">💰</span>
              <h3 className="font-semibold text-gray-900 mb-1">Fair Prices</h3>
              <p className="text-sm text-gray-600">Best prices guaranteed</p>
            </div>
            <div className="feature p-4 rounded-lg bg-gradient-to-br from-yellow-50 to-amber-50 hover:scale-105 transition-transform duration-300 delay-200">
              <span className="text-2xl mb-2 block animate-pulse">✨</span>
              <h3 className="font-semibold text-gray-900 mb-1">Quality Products</h3>
              <p className="text-sm text-gray-600">Fresh, authentic ingredients</p>
            </div>
          </div>
          <div className={`hero-rating flex items-center gap-2 transform transition-all duration-1000 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <span className="text-yellow-400 animate-pulse">⭐⭐⭐⭐⭐</span>
            <span className="text-gray-600 font-medium">(4.2) Google Reviews</span>
          </div>
        </div>
        <div className={`hero-image relative transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-75'
        }`}>
          <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-2xl shadow-2xl group">
            {images.map((image, index) => (
              <img
                key={index}
                src={getImageSrc(image.src)}
                alt={image.alt}
                className={`w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                  index === currentImageIndex 
                    ? 'opacity-100 scale-100 rotate-0 relative z-10' 
                    : 'opacity-0 scale-110 rotate-1 absolute top-0 left-0 z-0'
                }`}
                style={{
                  position: index === currentImageIndex ? 'relative' : 'absolute',
                  top: index === currentImageIndex ? 'auto' : '0',
                  left: index === currentImageIndex ? 'auto' : '0'
                }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>
            
            {/* Image indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'bg-white shadow-lg scale-125' 
                      : 'bg-white/60 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}