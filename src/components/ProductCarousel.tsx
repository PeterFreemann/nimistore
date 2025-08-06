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
  autoScrollInterval = 800
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const userScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto scroll effect - now considers touch and user scrolling
  useEffect(() => {
    const scrollProducts = () => {
      if (!scrollRef.current || isHovering || isTouching || isUserScrolling) return;
      
      const container = scrollRef.current;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      
      if (scrollWidth > clientWidth) {
        const currentScroll = container.scrollLeft;
        const cardWidth = 320;
        
        if (currentScroll >= scrollWidth - clientWidth - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }
    };

    const timer = setInterval(scrollProducts, autoScrollInterval);
    return () => clearInterval(timer);
  }, [isHovering, isTouching, isUserScrolling, autoScrollInterval]);

  // Handle user scroll detection
  const handleScroll = () => {
    setIsUserScrolling(true);
    
    // Clear existing timeout
    if (userScrollTimeoutRef.current) {
      clearTimeout(userScrollTimeoutRef.current);
    }
    
    // Set timeout to resume auto-scroll after user stops scrolling
    userScrollTimeoutRef.current = setTimeout(() => {
      setIsUserScrolling(false);
    }, 2000); // Resume auto-scroll 2 seconds after user stops scrolling
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
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

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
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            onScroll={handleScroll}
          >
            {products.map((product) => (
              <div key={product.id} className="flex-none w-80">
                <ProductCard
                  product={product}
                  onProductClick={onProductClick}
                  onViewClick={onViewClick}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}