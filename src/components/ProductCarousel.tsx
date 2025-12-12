import { useRef, useEffect, useState, useCallback } from 'react';
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
  autoScrollInterval = 3000 // Increased interval for better mobile experience
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const userScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const getCardWidth = useCallback(() => {
    if (typeof window === 'undefined') return 320; 
    
    if (isMobile) {
      return window.innerWidth * 0.85; // 85% of screen width for mobile
    }
    return 320 + 24; // desktop card width + gap
  }, [isMobile]);

  const getVisibleCardsCount = useCallback(() => {
    if (typeof window === 'undefined') return 1;
    
    if (isMobile) {
      return 1; // Show one card at a time on mobile
    }
    const containerWidth = scrollRef.current?.clientWidth || window.innerWidth;
    return Math.floor(containerWidth / (320 + 24));
  }, [isMobile]);

  // Smooth scroll to index with mobile-friendly behavior
  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    if (!scrollRef.current || products.length === 0) return;
    
    const container = scrollRef.current;
    const cardWidth = getCardWidth();
    const containerWidth = container.clientWidth;
    
    let scrollPosition;
    
    if (isMobile) {
      // On mobile, scroll to show the product at the start of the container
      scrollPosition = index * cardWidth;
    } else {
      // On desktop, center the product
      scrollPosition = (index * cardWidth) - (containerWidth / 2) + (cardWidth / 2);
    }
    
    // Ensure scroll position is within bounds
    const maxScroll = container.scrollWidth - containerWidth;
    scrollPosition = Math.max(0, Math.min(scrollPosition, maxScroll));
    
    container.scrollTo({
      left: scrollPosition,
      behavior: behavior
    });
    
    setCurrentIndex(index);
  }, [isMobile, getCardWidth, products.length]);

  // Improved auto-scroll with mobile consideration
  useEffect(() => {
    const autoScroll = () => {
      if (!scrollRef.current || isHovering || isTouching || isUserScrolling || products.length <= 1) {
        // Clear any existing timeout and reschedule
        if (autoScrollTimeoutRef.current) {
          clearTimeout(autoScrollTimeoutRef.current);
        }
        autoScrollTimeoutRef.current = setTimeout(autoScroll, autoScrollInterval);
        return;
      }
      
      const container = scrollRef.current;
      const containerWidth = container.clientWidth;
      const scrollWidth = container.scrollWidth;
      
      if (scrollWidth <= containerWidth) return; // No need to scroll if all products are visible
      
      let nextIndex = currentIndex + 1;
      
      // If we've reached or passed the last visible product
      const visibleCards = getVisibleCardsCount();
      if (nextIndex >= products.length - (visibleCards - 1)) {
        nextIndex = 0;
      }
      
      scrollToIndex(nextIndex);
      
      // Schedule next auto-scroll
      autoScrollTimeoutRef.current = setTimeout(autoScroll, autoScrollInterval);
    };

    // Initial call with delay to ensure DOM is ready
    const initialDelay = setTimeout(() => {
      autoScroll();
    }, 500);

    return () => {
      clearTimeout(initialDelay);
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current);
      }
    };
  }, [isHovering, isTouching, isUserScrolling, autoScrollInterval, currentIndex, products.length, getVisibleCardsCount, scrollToIndex]);

  // Enhanced scroll handling with debouncing
  const handleScroll = useCallback(() => {
    if (!scrollRef.current || isTouching) return;
    
    setIsUserScrolling(true);
    
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = getCardWidth();
    
    // Calculate current index based on scroll position
    const newIndex = Math.round(scrollLeft / cardWidth);
    const boundedIndex = Math.max(0, Math.min(newIndex, products.length - 1));
    
    if (boundedIndex !== currentIndex) {
      setCurrentIndex(boundedIndex);
    }
    
    // Debounce the user scroll state reset
    if (userScrollTimeoutRef.current) {
      clearTimeout(userScrollTimeoutRef.current);
    }
    
    userScrollTimeoutRef.current = setTimeout(() => {
      setIsUserScrolling(false);
    }, 1500); // Increased timeout for mobile
  }, [isTouching, getCardWidth, currentIndex, products.length]);

  // Improved touch event handlers
  const handleTouchStart = () => {
    setIsTouching(true);
    setIsUserScrolling(true);
    
    // Clear auto-scroll during touch
    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current);
    }
  };

  const handleTouchEnd = useCallback(() => {
    setIsTouching(false);
    
    // Snap to nearest card on touch end for better mobile UX
    if (isMobile && scrollRef.current) {
      const container = scrollRef.current;
      const scrollLeft = container.scrollLeft;
      const cardWidth = getCardWidth();
      const newIndex = Math.round(scrollLeft / cardWidth);
      
      scrollToIndex(newIndex, 'smooth');
    }
    
    // Resume auto-scroll after a delay
    setTimeout(() => {
      setIsUserScrolling(false);
    }, 500);
  }, [isMobile, getCardWidth, scrollToIndex]);

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

  // Initialize scroll position
  useEffect(() => {
    if (scrollRef.current && products.length > 0) {
      // Small delay to ensure DOM is fully rendered
      setTimeout(() => {
        scrollToIndex(0, 'auto');
      }, 100);
    }
  }, [products, scrollToIndex]);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current);
      }
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-black">{title}</h2>
          <button
            onClick={() => onCategoryClick('all')}
            className="text-emerald-600 hover:text-emerald-700 font-semibold"
          >
            View All →
          </button>
        </div>
        <div className="relative group">
          {/* Desktop Navigation Buttons - Hidden on Mobile */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 md:block hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 md:block hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
          
          {/* Carousel Container */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth',
              cursor: isMobile ? 'grab' : 'auto'
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleScroll}
            onScroll={handleScroll}
          >
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className={`flex-none ${isMobile ? 'w-[85vw] px-2' : 'w-80'} snap-center`}
              >
                <ProductCard
                  product={product}
                  onProductClick={onProductClick}
                  onViewClick={onViewClick}
                />
              </div>
            ))}
          </div>
          
          {/* Mobile Indicators and Navigation - Only show on mobile */}
          {isMobile && (
            <>
              <div className="flex justify-center items-center mt-6 space-x-4">
                <button
                  onClick={scrollLeft}
                  className="bg-white shadow-md rounded-full p-2"
                  aria-label="Previous product"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                
                <div className="flex space-x-2">
                  {products.slice(0, Math.min(products.length, 10)).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'bg-emerald-600 w-6' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to product ${index + 1}`}
                    />
                  ))}
                  {/* {products.length > 10 && (
                    <span className="text-xs text-gray-500 self-center ml-1">
                      +{products.length - 10}
                    </span>
                  )} */}
                </div>
                
                <button
                  onClick={scrollRight}
                  className="bg-white shadow-md rounded-full p-2"
                  aria-label="Next product"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              {/* Mobile counter */}
              {/* {products.length > 0 && (
                <div className="text-center mt-3 text-sm text-gray-600">
                  {currentIndex + 1} / {products.length}
                </div>
              )} */}
            </>
          )}
        </div>
      </div>
    </section>
  );
}