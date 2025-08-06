import React from 'react';
import market from '../images/market.jpg';
import { StaticImageData } from 'next/image';

interface PromotionalAdProps {
  onCategoryClick: (category: string) => void;
}

// Helper function to get the src as a string
const getImageSrc = (src: string | StaticImageData): string => {
  return typeof src === 'string' ? src : src.src;
};

export default function PromotionalAd({ onCategoryClick }: PromotionalAdProps): React.JSX.Element {
  return (
    <section className="py-8 bg-amber-50" style={{ minHeight: '570px' }}>
      <div className="max-w-7xl mx-auto px-4 h-full">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full animate-fadeInScale">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-[500px]">
            <div className="bg-gradient-to-br from-amber-500 to-red-500 p-8 text-white flex flex-col justify-center">
              <div className="mb-4">
                <span className="inline-block bg-yellow-400 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold mb-4 animate-pulse-glow">
                  LIMITED TIME OFFER
                </span>
                <h3 className="text-2xl md:text-3xl font-bold mb-2 animate-slideInLeft">
                  Free delivery on orders over £25
                </h3>
                <p className="text-amber-100 text-lg animate-slideInLeft opacity-0" 
                   style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                  Stock up on your favorite African & Caribbean essentials
                </p>
              </div>
              <div className="flex items-center space-x-4 animate-slideInUp opacity-0" 
                   style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                <button 
                  onClick={() => onCategoryClick('all')}
                  className="bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-bounce-subtle"
                >
                  Shop Now
                </button>
                <span className="text-amber-200 text-sm animate-blink">*Valid until end of month</span>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <img
                src={getImageSrc(market)}
                alt="African Caribbean Groceries"
                className="w-full h-full object-cover animate-zoomIn opacity-0"
                style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(1.1);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.7);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(255, 193, 7, 0);
          }
        }

        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0.7;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }

        .animate-fadeInScale {
          animation: fadeInScale 0.8s ease-out;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out;
        }

        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out;
        }

        .animate-zoomIn {
          animation: zoomIn 0.8s ease-out;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite;
        }

        .animate-blink {
          animation: blink 2s infinite;
        }

        .animate-shimmer {
          background: linear-gradient(90deg, #fed7aa 0%, #fdba74 50%, #fed7aa 100%);
          background-size: 200px 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
}