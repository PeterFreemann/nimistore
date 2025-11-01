import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../context/CartContext';

interface ProductCarouselProps {
  title: string;
  products: Product[];
  onProductClick: (product: Product) => void;
  onCategoryClick: (category: string) => void;
  onViewClick: (product: Product) => void;
  autoScrollInterval?: number;
}

export default function ProductCarousel({ 
  title, 
  products, 
  onProductClick, 
  onCategoryClick,
  onViewClick,
  autoScrollInterval = 3000 // Increased interval for better UX
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const userScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate card width including gap
  const getCardWidth = () => {
    if (typeof window === 'undefined') return 320; // Default fallback
    
    // For mobile, use the actual card width + gap
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      return 280 + 24; // card width + gap (adjust based on your actual card width)
    }
    return 320 + 24; // desktop card width + gap
  };

  // Scroll to specific index with center alignment
  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const cardWidth = getCardWidth();
    const containerWidth = container.clientWidth;
    
    // Calculate scroll position to center the card
    const scrollPosition = (index * cardWidth) - (containerWidth / 2) + (cardWidth / 2);
    
    container.scrollTo({
      left: Math.max(0, scrollPosition),
      behavior: 'smooth'
    });
    
    setCurrentIndex(index);
  };

  // Auto scroll effect - centers products
  useEffect(() => {
    const scrollProducts = () => {
      if (!scrollRef.current || isHovering || isTouching || isUserScrolling || products.length === 0) return;
      
      const container = scrollRef.current;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      
      if (scrollWidth > clientWidth) {
        let nextIndex = currentIndex + 1;
        
        // Check if we've reached the end
        if (nextIndex >= products.length) {
          nextIndex = 0;
        }
        
        scrollToIndex(nextIndex);
      }
    };

    const timer = setInterval(scrollProducts, autoScrollInterval);
    return () => clearInterval(timer);
  }, [isHovering, isTouching, isUserScrolling, autoScrollInterval, currentIndex, products.length]);

  // Handle user scroll detection with index tracking
  const handleScroll = () => {
    if (!scrollRef.current) return;
    
    setIsUserScrolling(true);
    
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = getCardWidth();
    
    // Calculate current index based on scroll position
    const newIndex = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(Math.max(0, Math.min(newIndex, products.length - 1)));
    
    // Clear existing timeout
    if (userScrollTimeoutRef.current) {
      clearTimeout(userScrollTimeoutRef.current);
    }
    
    // Set timeout to resume auto-scroll after user stops scrolling
    userScrollTimeoutRef.current = setTimeout(() => {
      setIsUserScrolling(false);
    }, 2000);
  };

  // Touch event handlers for mobile
  const handleTouchStart = () => {
    setIsTouching(true);
  };

  const handleTouchEnd = () => {
    // Delay setting isTouching to false to prevent immediate auto-scroll
    setTimeout(() => {
      setIsTouching(false);
    }, 100);
  };

  // Mouse event handlers for desktop
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const scrollLeft = () => {
    if (products.length === 0) return;
    
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = products.length - 1;
    }
    scrollToIndex(prevIndex);
  };

  const scrollRight = () => {
    if (products.length === 0) return;
    
    let nextIndex = currentIndex + 1;
    if (nextIndex >= products.length) {
      nextIndex = 0;
    }
    scrollToIndex(nextIndex);
  };

  // Initialize scroll position on mount
  useEffect(() => {
    if (scrollRef.current && products.length > 0) {
      // Start from first product, centered
      setTimeout(() => {
        scrollToIndex(0);
      }, 100);
    }
  }, [products]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-black ">{title}</h2>
          <button
            onClick={() => onCategoryClick('all')}
            className="text-emerald-600 hover:text-emerald-700 font-semibold"
          >
            View All →
          </button>
        </div>
        <div className="relative group">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth'
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            onScroll={handleScroll}
          >
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="flex-none w-80 snap-center" // Added snap-center for better mobile scrolling
              >
                <ProductCard
                  product={product}
                  onProductClick={onProductClick}
                  onViewClick={onViewClick}
                />
              </div>
            ))}
          </div>
          
          {/* Mobile Indicators */}
          <div className="flex justify-center mt-4 md:hidden">
            <div className="flex space-x-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-emerald-600 w-4' 
                      : 'bg-gray-300'
                  }`}
                  aria-label={`Go to product ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}