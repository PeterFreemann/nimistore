import React, { useState, useEffect } from 'react';
import { ShoppingCart, Package, Truck, Star, Clock, Shield, Heart, CheckCircle } from 'lucide-react';
import CombinedCategorySection from '../components/CombinedCategorySectio';

export default function HowItWorks(): React.JSX.Element {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // Trigger entrance animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-rotate through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      icon: ShoppingCart,
      title: "Browse & Shop",
      description: "Explore our wide selection of authentic African & Caribbean groceries. Add your favorite items to cart with just a click.",
      details: ["Search by product or category", "Detailed product descriptions", "High-quality product images", "Customer reviews & ratings"],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Package,
      title: "We Pack Fresh",
      description: "Our team carefully selects and packs your items, ensuring freshness and quality. We source directly from trusted suppliers.",
      details: ["Hand-picked fresh produce", "Quality control checks", "Secure packaging", "Temperature-controlled storage"],
      color: "from-green-500 to-green-600"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Your order is dispatched quickly with tracking information. We deliver across the UK with next-day delivery available.",
      details: ["Next-day delivery available", "Real-time tracking", "SMS & email updates", "Contactless delivery options"],
      color: "from-amber-500 to-amber-600"
    },
    {
      icon: Heart,
      title: "Enjoy at Home",
      description: "Receive your authentic ingredients and create delicious meals that remind you of home. Share the joy with family and friends.",
      details: ["Fresh ingredients delivered", "Recipe suggestions included", "24/7 customer support", "100% satisfaction guarantee"],
      color: "from-red-500 to-red-600"
    }
  ];

  const features = [
    {
      icon: Clock,
      title: "Next-Day Delivery",
      description: "Order before 6PM and receive your groceries the next day across most UK locations."
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "We stand behind every product. Not satisfied? We'll make it right with our quality guarantee."
    },
    {
      icon: Star,
      title: "Authentic Products",
      description: "Sourced directly from trusted suppliers, bringing you the most authentic taste of home."
    }
  ];

  return (
    <section className="how-it-works-section bg-white py-16 px-5 bg-gradient-to-br from-gray-50 to-amber-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="inline-block animate-bounce delay-100">How</span>{' '}
            <span className="inline-block animate-bounce delay-200">It</span>{' '}
            <span className="inline-block animate-bounce delay-300 text-amber-500">Works</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Getting your favorite African & Caribbean groceries delivered is simple. Follow these easy steps to taste home.
          </p>
        </div>

        {/* Steps Section */}
        <div className={`mb-16 transform transition-all duration-1000 ease-out delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === activeStep;
              
              return (
                <div 
                  key={index}
                  className={`relative bg-white rounded-2xl shadow-lg p-6 transition-all duration-500 cursor-pointer ${
                    isActive ? 'scale-105 shadow-2xl' : 'hover:scale-102 hover:shadow-xl'
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  {/* Step Number */}
                  <div className={`absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-r ${step.color} text-white flex items-center justify-center font-bold text-sm shadow-lg`}>
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center ${isActive ? 'animate-pulse' : ''}`}>
                    <Icon className="text-white" size={32} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{step.title}</h3>
                  <p className="text-gray-600 text-center mb-4">{step.description}</p>

                  {/* Details */}
                  <div className={`space-y-2 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={16} />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeStep ? 'bg-amber-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className={`mb-16 transform transition-all duration-1000 ease-out delay-600 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose Nimi Store?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-500 to-red-500 flex items-center justify-center animate-pulse">
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mb-16 bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-1000 ease-out delay-900 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Numbers Speak</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 animate-pulse">1000+</div>
              <div className="text-gray-600 mt-2">Products Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-500 animate-pulse">5000+</div>
              <div className="text-gray-600 mt-2">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 animate-pulse">99.5%</div>
              <div className="text-gray-600 mt-2">On-Time Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-500 animate-pulse">24/7</div>
              <div className="text-gray-600 mt-2">Customer Support</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center bg-gradient-to-r from-green-600 to-amber-600 rounded-2xl p-12 text-white transform transition-all duration-1000 ease-out delay-1200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who trust Nimi Store for their authentic grocery needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
              Start Shopping Now
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-all duration-300 hover:scale-105">
              Browse Categories
            </button>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className={`mt-16 text-center transform transition-all duration-1000 delay-1500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
          <p className="text-gray-600 mb-8">
            Our friendly customer service team is here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-all duration-300 hover:scale-105">
              Contact Support
            </button>
            <button className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-green-600 hover:text-white transition-all duration-300 hover:scale-105">
              View FAQ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}