"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { StaticImageData } from 'next/image';
import logo from '../images/logo.jpg';
import farmproducehero from '../images/farmproducehero.jpg';
import frozenproteinshero from '../../public/frozenproteins.png';
import drinkshero from '../../public/softdrinks.jpg';
import fruitwinehero from '../../public/fruitwine.jpg';
import snackshero from '../../public/snacks.jpeg';
import beautyhero from '../../public/beauty.jpg';

interface HeaderProps {
  selectedCategory?: string;
}

interface CategoryItem {
  name: string;
  category: string;
  href: string;
}

interface MainNavItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
}

type HeroImageKey = 'Fresh Food' | 'Frozen proteins' | 'Drinks' | 'Wine' | 'Snacks' | 'Beauty & Personal Care';

export default function Header({ selectedCategory }: HeaderProps): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState<boolean>(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState<boolean>(false);
  const { itemCount, total } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  // Hero images mapping
  const heroImages: Record<HeroImageKey, StaticImageData> = {
    'Fresh Food': farmproducehero,
    'Frozen proteins': frozenproteinshero,
    'Drinks': drinkshero,
    'Wine': fruitwinehero,
    'Snacks': snackshero,
    'Beauty & Personal Care': beautyhero,
  };

  // Function to get hero image for current page/category
  const getCurrentHeroImage = (): StaticImageData | null => {
    if (pathname === '/' || pathname === '/about') {
      return null;
    }
    if (pathname.startsWith('/category/') && selectedCategory) {
      return heroImages[selectedCategory as HeroImageKey] || null;
    }
    return null;
  };

  // Main navigation items
  const mainNavItems: MainNavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Shop All', href: '/category/all' },
    { name: 'Categories', href: '#', hasDropdown: true },
    { name: 'About Us', href: '/about-us' },
    { name: 'Contact Us', href: '/contact-us' },
    { name: 'How it Works', href: '/how-it-work' },
  ];

  // Category items for dropdown
  const categoryItems: CategoryItem[] = [
    { name: 'Fresh Food', category: 'Fresh Food', href: '/category/fresh-food' },
    { name: 'Frozen Proteins', category: 'Frozen proteins', href: '/category/frozen-proteins' },
    { name: 'African Soft Drinks', category: 'Drinks', href: '/category/drinks' },
    { name: 'Fruit Wine', category: 'Wine', href: '/category/wine' },
    { name: 'Snacks', category: 'Snacks', href: '/category/snacks' },
    { name: 'Beauty & Personal Care', category: 'Beauty & Personal Care', href: '/category/beauty' },
  ];

  // Check if a nav item is active
  const isActive = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Check if category is active
  const isCategoryActive = (categoryHref: string): boolean => {
    return pathname === categoryHref;
  };

  const currentHeroImage = getCurrentHeroImage();

  return (
    <>
      <header className="bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white sticky top-0 z-50 shadow-lg">
        {/* Main Header */}
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex items-center justify-between py-4 flex-wrap gap-5">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className='flex flex-row items-center space-x-2'>
                <img src={logo.src} alt="Nimi Store Logo" className='h-[40px]' />
                <div className='company-name flex flex-col items-start'>
                  <h1 className="text-2xl font-black font-sans text-amber-500 drop-shadow-lg">
                    Nimi Store
                  </h1>
                  <p className='text-[10px] font-sans'>African & Caribbean Groceries</p>
                </div>
              </div>
            </Link>

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
              <Link
                href="/cart"
                className="relative bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-full font-semibold transition-colors duration-300 flex items-center space-x-2"
              >
                <ShoppingCart size={20} />
                <span className="hidden sm:block">£{total.toFixed(2)}</span>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white font-sans text-amber-500 text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </Link>

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
              {mainNavItems.map((item) => (
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
                          isActive(item.href)
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
                          isActive(item.href)
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
                        {categoryItems.map((categoryItem) => (
                          <Link
                            key={categoryItem.name}
                            href={categoryItem.href}
                            className={`block w-full text-left px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200 ${
                              isCategoryActive(categoryItem.href) ? 'bg-amber-50 text-amber-600 border-r-2 border-amber-500' : ''
                            }`}
                          >
                            {categoryItem.name}
                          </Link>
                        ))}
                      </div>

                      {/* Mobile Dropdown */}
                      <div className={`md:hidden overflow-hidden transition-all duration-300 ${
                        isMobileCategoriesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="pl-4 mt-2 space-y-1">
                          {categoryItems.map((categoryItem) => (
                            <Link
                              key={categoryItem.name}
                              href={categoryItem.href}
                              onClick={() => {
                                setIsMobileCategoriesOpen(false);
                                setIsMobileMenuOpen(false);
                              }}
                              className={`block w-full text-left py-2 px-4 rounded-full font-medium transition-all duration-300 ${
                                isCategoryActive(categoryItem.href)
                                  ? 'text-amber-400 bg-white bg-opacity-20' 
                                  : 'text-white hover:bg-white hover:bg-opacity-10 hover:text-amber-300'
                              }`}
                            >
                              {categoryItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Regular navigation items
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-2 px-4 rounded-full font-medium transition-all duration-300 ${
                        isActive(item.href)
                          ? 'text-amber-400 bg-white bg-opacity-20' 
                          : 'text-white hover:bg-white hover:bg-opacity-10 hover:text-amber-300'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
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
                {pathname === '/' ? 'Welcome to Nimi Store' : 
                 categoryItems.find((item) => item.href === pathname)?.name || 'Our Products'}
              </h2>
              <p className="text-lg md:text-xl opacity-90">
                {pathname === '/' ? 'Fresh, Quality Products Delivered to Your Door' : 
                 'Premium quality at unbeatable prices'}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}