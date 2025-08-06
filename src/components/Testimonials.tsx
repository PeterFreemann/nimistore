import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  rating: number;
  comment: string;
  location: string;
}

const testimonialData: Testimonial[] = [
  {
    name: "Adaora Johnson",
    rating: 5,
    comment: "Finally found authentic Nigerian ingredients in the UK! The palm oil is exactly like home.",
    location: "London"
  },
  {
    name: "Marcus Williams",
    rating: 5,
    comment: "Fast delivery and excellent quality. The plantains were perfectly ripe and fresh.",
    location: "Birmingham"
  },
  {
    name: "Grace Mensah",
    rating: 4,
    comment: "Great selection of Ghanaian products. Will definitely order again!",
    location: "Manchester"
  }
];

export default function Testimonials(){
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-black text-center mb-8 animate-fadeInUp">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialData.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 hover:shadow-xl transition-all duration-300 animate-slideInUp opacity-0"
              style={{
                animationDelay: `${0.2 + index * 0.2}s`,
                animationFillMode: 'forwards'
              }}
            >
              <div className="flex items-center mb-4 animate-fadeInLeft opacity-0"
                   style={{
                     animationDelay: `${0.4 + index * 0.2}s`,
                     animationFillMode: 'forwards'
                   }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${i < testimonial.rating ? 'text-yellow-400 fill-current animate-starGlow' : 'text-gray-300'} transition-all duration-300`}
                    style={{
                      animationDelay: `${0.6 + index * 0.2 + i * 0.1}s`
                    }}
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4 animate-fadeInUp opacity-0"
                 style={{
                   animationDelay: `${0.6 + index * 0.2}s`,
                   animationFillMode: 'forwards'
                 }}>
                "{testimonial.comment}"
              </p>
              <div className="animate-slideInRight opacity-0"
                   style={{
                     animationDelay: `${0.8 + index * 0.2}s`,
                     animationFillMode: 'forwards'
                   }}>
                <p className="font-semibold animate-typewriter text-black">{testimonial.name}</p>
                <p className="text-sm text-gray-500 animate-fadeIn"
                   style={{
                     animationDelay: `${1.0 + index * 0.2}s`,
                     animationFillMode: 'forwards'
                   }}>
                  {testimonial.location}
                </p>
              </div>
            </div>
          ))}
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

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes starGlow {
          from {
            opacity: 0;
            transform: scale(0.5) rotate(-180deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes typewriter {
          from {
            opacity: 0;
            transform: translateX(10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.5s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
          opacity: 0;
        }

        .animate-starGlow {
          animation: starGlow 0.4s ease-out;
        }

        .animate-typewriter {
          animation: typewriter 0.4s ease-out;
        }

        /* Hover enhancement for cards */
        .bg-white:hover .animate-starGlow {
          animation: starGlow 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}