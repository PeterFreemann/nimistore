import React from 'react';
import { ShoppingBag, Clock, Heart, Award } from 'lucide-react';

export default function BrandBanner(): JSX.Element {
  return (
    <section className="bg-gradient-to-r from-emerald-600 to-green-700 py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center text-white">
          {/* Animated header with shopping bag */}
          
          
          {/* Animated subtitle */}
          <p className="text-emerald-100 text-lg mb-6 animate-fadeInUp opacity-0"
             style={{
               animation: 'fadeInUp 0.8s ease-out 0.3s forwards'
             }}>
            Experience the taste of home with our premium African & Caribbean groceries
          </p>
          
          {/* Animated feature list */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center animate-slideInLeft opacity-0 hover:scale-105 transition-transform duration-300"
                 style={{
                   animation: 'slideInLeft 0.6s ease-out 0.6s forwards'
                 }}>
              <Clock className="mr-2 animate-pulse" size={16} />
              <span>Order by 2PM for same-day delivery</span>
            </div>
            <div className="flex items-center animate-slideInUp opacity-0 hover:scale-105 transition-transform duration-300"
                 style={{
                   animation: 'slideInUp 0.6s ease-out 0.8s forwards'
                 }}>
              <Heart className="mr-2 text-red-300 animate-pulse" 
                     size={16}
                     style={{
                       animation: 'heartbeat 1.5s ease-in-out infinite'
                     }} />
              <span>Loved by families across the UK</span>
            </div>
            <div className="flex items-center animate-slideInRight opacity-0 hover:scale-105 transition-transform duration-300"
                 style={{
                   animation: 'slideInRight 0.6s ease-out 1s forwards'
                 }}>
              <Award className="mr-2 text-yellow-300 animate-pulse" size={16} />
              <span>Trusted </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out forwards;
        }

        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}