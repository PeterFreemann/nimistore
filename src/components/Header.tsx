"use client";

import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { StaticImageData } from 'next/image';
import logo from '../images/logo.jpg';
import farmproducehero from '../images/farmproducehero.jpg';
import frozenproteinshero from '../images/farmproducehero.jpg';
import drinkshero from '../images/farmproducehero.jpg';
import fruitwinehero from '../images/farmproducehero.jpg';
import snackshero from '../images/farmproducehero.jpg';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onSearch: (query: string) => void;
  selectedCategory?: string;
}

interface CategoryItem {
  name: string;
  category: string;
}

interface MainNavItem {
  name: string;
  page: string;
  hasDropdown?: boolean;
}

type HeroImageKey = 'Fresh Food' | 'Frozen proteins' | 'Drinks' | 'Wine' | 'Snacks' | 'Beauty & Personal Care';

export default function Header({ currentPage, onPageChange, onSearch, selectedCategory }: HeaderProps): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState<boolean>(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState<boolean>(false);
  const { itemCount, total } = useCart();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSearch(searchQuery);
    onPageChange('search');
  };

  // Hero images mapping
  const heroImages: Record<HeroImageKey, StaticImageData> = {
    'Fresh Food': farmproducehero,
    'Frozen proteins': frozenproteinshero,
    'Drinks': drinkshero,
    'Wine': fruitwinehero,
    'Snacks': snackshero,
    'Beauty & Personal Care': snackshero, // Placeholder image
  };

  // Function to get hero image for current page/category
  const getCurrentHeroImage = (): StaticImageData | null => {
    if (currentPage === 'home' || currentPage === 'about') {
      return null; // No hero for home page or about page
    }
    if (currentPage === 'category' && selectedCategory) {
      return heroImages[selectedCategory as HeroImageKey] || null;
    }
    return null;
  };

  // Main navigation items
  const mainNavItems: MainNavItem[] = [
    { name: 'Home', page: 'home' },
    { name: 'Shop All', page: 'shop-all' },
    { name: 'Categories', page: 'categories', hasDropdown: true },
    { name: 'About Us', page: 'about' },
    { name: 'Contact Us', page: 'contact' },
    { name: 'How it Works', page: 'how-it-works' },
  ];

  // Category items for dropdown
  const categoryItems: CategoryItem[] = [
    { name: 'Fresh Food', category: 'Fresh Food' },
    { name: 'Frozen Proteins', category: 'Frozen proteins' },
    { name: 'African Soft Drinks', category: 'Drinks' },
    { name: 'Fruit Wine', category: 'Wine' },
    { name: 'Snacks', category: 'Snacks' },
    { name: 'Beauty & Personal Care', category: 'Beauty & Personal Care' },
  ];

  const currentHeroImage = getCurrentHeroImage();

  return (
    <>
      <header className="bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white sticky top-0 z-50 shadow-lg">
        {/* Main Header */}
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex items-center justify-between py-4 flex-wrap gap-5">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className='flex flex-row items-center space-x-2'>
                <img src={logo.src} alt="Nimi Store Logo" className='h-[40px]' />
                <div className='company-name flex flex-col items-start'>
                  <h1 className="text-2xl font-black font-sans text-amber-500 drop-shadow-lg">
                    Nimi Store
                  </h1>
                  <p className='text-[10px] font-sans'>African & Caribbean Groceries</p>
                </div>
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <div className="flex-1 max-w-lg mx-8 hidden md:block">
              <form onSubmit={handleSearch} className="flex bg-white rounded-full overflow-hidden shadow-lg">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  className="flex-1 px-5 py-3 text-gray-800 text-base outline-none placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 text-xl transition-colors duration-300"
                >
                  <Search size={20} />
                </button>
              </form>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-5">
              {/* Cart Button */}
              <button
                onClick={() => onPageChange('cart')}
                className="relative bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-full font-semibold transition-colors duration-300 flex items-center space-x-2"
              >
                <ShoppingCart size={20} />
                <span className="hidden sm:block">£{total.toFixed(2)}</span>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white font-sans text-amber-500 text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-white"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="flex bg-white rounded-full overflow-hidden shadow-lg">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="flex-1 px-5 py-3 text-gray-800 text-base outline-none placeholder-gray-500"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 text-xl transition-colors duration-300"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`border-t border-white border-opacity-20 ${isMobileMenuOpen ? 'block' : 'hidden'} md:block relative`}>
          <div className="max-w-6xl mx-auto px-5 py-2">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-8 gap-2">
              {mainNavItems.map((item: MainNavItem) => {
                let isActive = false;
                
                if (item.page === 'shop-all') {
                  // Shop All is active only when viewing all products
                  isActive = currentPage === 'category' && selectedCategory === 'all';
                } else if (item.page === 'categories') {
                  // Categories is active only when viewing specific categories (not 'all')
                  isActive = currentPage === 'category' && selectedCategory !== 'all';
                } else {
                  // Other pages use direct comparison
                  isActive = currentPage === item.page;
                }
                
                return (
                  <div key={item.name} className="relative">
                    {item.hasDropdown ? (
                      // Categories with dropdown
                      <div className="relative">
                        {/* Desktop Categories Button */}
                        <button
                          onMouseEnter={() => setIsCategoriesOpen(true)}
                          onMouseLeave={() => setIsCategoriesOpen(false)}
                          onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                          className={`hidden md:flex items-center space-x-1 py-2 px-4 rounded-full font-medium transition-all duration-300 ${
                            isActive
                              ? 'text-amber-400 bg-white bg-opacity-20' 
                              : 'text-white hover:bg-white hover:bg-opacity-10 hover:text-amber-300'
                          }`}
                        >
                          <span>{item.name}</span>
                          <ChevronDown size={16} className={`transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Mobile Categories Button */}
                        <button
                          onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
                          className={`md:hidden flex items-center justify-between w-full text-left py-2 px-4 rounded-full font-medium transition-all duration-300 ${
                            isActive
                              ? 'text-amber-400 bg-white bg-opacity-20' 
                              : 'text-white hover:bg-white hover:bg-opacity-10 hover:text-amber-300'
                          }`}
                        >
                          <span>{item.name}</span>
                          <ChevronDown size={16} className={`transition-transform duration-200 ${isMobileCategoriesOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Desktop Dropdown */}
                        <div
                          onMouseEnter={() => setIsCategoriesOpen(true)}
                          onMouseLeave={() => setIsCategoriesOpen(false)}
                          className={`hidden md:block absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 transition-all duration-200 ${
                            isCategoriesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                          }`}
                        >
                          {categoryItems.map((categoryItem: CategoryItem) => (
                            <button
                              key={categoryItem.name}
                              onClick={() => {
                                onPageChange(`category-${categoryItem.category}`);
                                setIsCategoriesOpen(false);
                              }}
                              className={`w-full text-left px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200 ${
                                selectedCategory === categoryItem.category ? 'bg-amber-50 text-amber-600 border-r-2 border-amber-500' : ''
                              }`}
                            >
                              {categoryItem.name}
                            </button>
                          ))}
                        </div>

                        {/* Mobile Dropdown */}
                        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
                          isMobileCategoriesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                          <div className="pl-4 mt-2 space-y-1">
                            {categoryItems.map((categoryItem: CategoryItem) => (
                              <button
                                key={categoryItem.name}
                                onClick={() => {
                                  onPageChange(`category-${categoryItem.category}`);
                                  setIsMobileCategoriesOpen(false);
                                  setIsMobileMenuOpen(false);
                                }}
                                className={`block w-full text-left py-2 px-4 rounded-full font-medium transition-all duration-300 ${
                                  selectedCategory === categoryItem.category
                                    ? 'text-amber-400 bg-white bg-opacity-20' 
                                    : 'text-white hover:bg-white hover:bg-opacity-10 hover:text-amber-300'
                                }`}
                              >
                                {categoryItem.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Regular navigation items
                      <button
                        onClick={() => {
                          if (item.page === 'shop-all') {
                            // Navigate to category page with 'all' filter to show all products
                            onPageChange('category-all');
                          } else {
                            onPageChange(item.page);
                          }
                          setIsMobileMenuOpen(false);
                        }}
                        className={`text-left py-2 px-4 rounded-full font-medium transition-all duration-300 ${
                          isActive
                            ? 'text-amber-400 bg-white bg-opacity-20' 
                            : 'text-white hover:bg-white hover:bg-opacity-10 hover:text-amber-300'
                        }`}
                      >
                        {item.name}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      {currentHeroImage && (
        <div className="relative h-64 md:h-100 overflow-hidden px-10">
          <img 
            src={currentHeroImage.src} 
            alt="Category Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-2">
                {currentPage === 'home' ? 'Welcome to Nimi Store' : 
                 categoryItems.find((item: CategoryItem) => item.category === selectedCategory)?.name || 'Our Products'}
              </h2>
              <p className="text-lg md:text-xl opacity-90">
                {currentPage === 'home' ? 'Fresh, Quality Products Delivered to Your Door' : 
                 'Premium quality at unbeatable prices'}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}