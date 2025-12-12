"use client";

import React, { useState, useEffect } from 'react';
import { Heart, Truck, Shield, Users, Award, Globe, Star, CheckCircle, Calendar, Target } from 'lucide-react';

export default function AboutUs(): React.JSX.Element {
  const [isVisible, setIsVisible] = useState(false);
  const [activeValue, setActiveValue] = useState(0);

  // Trigger entrance animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-rotate through values
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % 4);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const values = [
    {
      icon: Heart,
      title: "Quality First",
      description: "We source only the finest African and Caribbean products, ensuring authenticity and freshness in every item.",
      details: ["Hand-picked suppliers", "Quality control checks", "Freshness guarantee", "Authentic ingredients"],
      color: "from-red-500 to-pink-600"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick and reliable delivery service to bring the taste of home directly to your doorstep.",
      details: ["Next-day delivery", "Real-time tracking", "Safe packaging", "Nationwide coverage"],
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Secure shopping experience with guaranteed product quality and customer satisfaction.",
      details: ["Secure payments", "Money-back guarantee", "SSL encryption", "Customer support"],
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Building bridges between cultures and bringing communities together through authentic food experiences.",
      details: ["Cultural preservation", "Community events", "Recipe sharing", "Heritage celebration"],
      color: "from-amber-500 to-orange-600"
    }
  ];

  const achievements = [
    { number: "5000+", label: "Happy Customers", icon: Users },
    { number: "200+", label: "Quality Products", icon: Star },
    { number: "50+", label: "Partner Suppliers", icon: Globe },
    { number: "99%", label: "Customer Satisfaction", icon: Heart }
  ];

  const teamMembers = [
    {
      name: "Nimi Johnson",
      role: "Founder & CEO",
      description: "With over 15 years of experience in the food industry, Nimi founded the store to bridge the gap between authentic African & Caribbean cuisine and the UK market.",
      icon: Award,
      color: "from-purple-500 to-indigo-600"
    },
    {
      name: "Adaora Williams",
      role: "Head of Operations",
      description: "Ensures smooth operations and maintains our high standards of quality control and customer service.",
      icon: Target,
      color: "from-green-500 to-teal-600"
    },
    {
      name: "Marcus Thompson",
      role: "Supply Chain Manager",
      description: "Manages our network of trusted suppliers across Africa and the Caribbean to ensure authenticity and freshness.",
      icon: Globe,
      color: "from-blue-500 to-cyan-600"
    }
  ];

  const timeline = [
    {
      year: "2015",
      title: "The Beginning",
      description: "Nimi Store started as a small family business with a dream to bring authentic flavors to the UK."
    },
    {
      year: "2018",
      title: "Going Digital",
      description: "Launched our online platform, making authentic groceries accessible nationwide."
    },
    {
      year: "2021",
      title: "Expansion",
      description: "Expanded our supplier network across Africa and the Caribbean for better variety."
    },
    {
      year: "2024",
      title: "Today",
      description: "Serving 5000+ happy customers with 200+ authentic products and growing strong."
    }
  ];

  return (
    <section className="aboutus-section bg-gradient-to-br from-gray-50 to-green-50 min-h-screen">
      {/* Header Section */}
      <div className="relative bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className={`relative max-w-6xl mx-auto px-5 py-20 transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-black font-sans mb-4">
              <span className="inline-block animate-bounce delay-100">About</span>{' '}
              <span className="inline-block animate-bounce delay-200 text-amber-500">Nimi</span>{' '}
              <span className="inline-block animate-bounce delay-300">Store</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Your trusted destination for authentic African & Caribbean groceries, 
              bringing the taste of home to communities across the UK.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5">
        {/* Our Story Section */}
        <div className={`py-16 transform transition-all duration-1000 ease-out delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  Founded in 2015, Nimi Store began as a small family business with a simple mission: 
                  to provide authentic African and Caribbean food products to communities who missed 
                  the flavors of home.
                </p>
                <p>
                  What started as a local shop has grown into a trusted online destination, serving 
                  thousands of customers across the UK. We understand the importance of authentic 
                  ingredients in creating those cherished family recipes and cultural connections.
                </p>
                <p>
                  Today, we work with trusted suppliers across Africa and the Caribbean to ensure 
                  that every product we offer meets our high standards of quality and authenticity.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-br from-green-500 to-amber-500 w-16 h-16 rounded-full flex items-center justify-center mb-4 animate-pulse">
                  <Globe className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  Connecting Cultures
                </h3>
                <p className="text-gray-600">
                  We believe food is more than sustenance – it's culture, memory, and connection. 
                  Every product we sell carries with it the stories and traditions of its origin.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className={`py-16 transform transition-all duration-1000 ease-out delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">Our Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {timeline.map((item, index) => (
              <div 
                key={index}
                className="relative bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="absolute -top-4 left-6 bg-gradient-to-r from-green-500 to-amber-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                  {item.year}
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Values Section */}
        <div className={`py-16 transform transition-all duration-1000 ease-out delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Nimi Store
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              const isActive = index === activeValue;
              
              return (
                <div 
                  key={index}
                  className={`bg-white rounded-2xl shadow-lg p-6 transition-all duration-500 cursor-pointer ${
                    isActive ? 'scale-105 shadow-2xl' : 'hover:scale-102 hover:shadow-xl'
                  }`}
                  onClick={() => setActiveValue(index)}
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${value.color} flex items-center justify-center ${isActive ? 'animate-pulse' : ''}`}>
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{value.title}</h3>
                  <p className="text-gray-600 text-center mb-4">{value.description}</p>
                  
                  {/* Details */}
                  <div className={`space-y-2 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                    {value.details.map((detail, detailIndex) => (
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

          {/* Progress indicators */}
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              {values.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveValue(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeValue ? 'bg-amber-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className={`py-16 bg-white rounded-2xl shadow-2xl transform transition-all duration-1000 ease-out delay-900 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Our Journey in Numbers
              </h2>
              <p className="text-xl text-gray-600">
                The milestones that mark our growth and success
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className="bg-gradient-to-br from-green-500 to-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 animate-pulse">
                      <Icon className="text-white" size={28} />
                    </div>
                    <div className="text-4xl md:text-5xl font-black text-green-600 mb-2">
                      {achievement.number}
                    </div>
                    <div className="text-gray-600 text-lg font-medium">
                      {achievement.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        
        <div className={`py-16 transform transition-all duration-1000 ease-out delay-1100 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate people behind Nimi Store
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => {
              const Icon = member.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
                  <div className={`h-32 bg-gradient-to-br ${member.color} flex items-center justify-center`}>
                    <Icon className="text-white animate-pulse" size={48} />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-amber-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        
        <div className={`py-16 bg-gradient-to-r from-green-600 to-amber-600 rounded-2xl text-white text-center transform transition-all duration-1000 ease-out delay-1300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="px-8">
            <Award className="w-16 h-16 text-white mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Mission
            </h2>
            <p className="text-xl leading-relaxed mb-8 max-w-4xl mx-auto opacity-90">
              "To preserve and celebrate African and Caribbean culinary traditions by providing 
              authentic, high-quality ingredients that connect people to their heritage and 
              introduce others to the rich flavors of these vibrant cultures."
            </p>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm px-8 py-4 rounded-full inline-block font-semibold text-lg">
              Building Communities Through Authentic Food
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className={`py-16 text-center transform transition-all duration-1000 ease-out delay-1500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Ready to Experience Authentic Flavors?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of satisfied customers and discover the taste of home
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg">
              Start Shopping Now
            </button>
            <button className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105">
              Contact Us Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}