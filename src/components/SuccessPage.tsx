// components/SuccessPage.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ShoppingBag, Home, Package } from 'lucide-react';

export default function SuccessPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    // Countdown for automatic redirect
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShouldRedirect(true); // Set flag instead of calling router directly
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Separate useEffect for the redirect
  useEffect(() => {
    if (shouldRedirect) {
      router.push('/');
    }
  }, [shouldRedirect, router]);

  const handleReturnHome = () => {
    setIsLoading(true);
    router.push('/');
  };

  const handleContinueShopping = () => {
    setIsLoading(true);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Success Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-lg text-gray-600 mb-2">
            Thank you for your order
          </p>
          
          <p className="text-gray-500 mb-6">
            Your order has been confirmed and will be processed shortly.
          </p>

          {/* Auto-redirect notice */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg mb-6">
            <p className="text-sm text-blue-700">
              Redirecting to home page in {countdown} seconds...
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleReturnHome}
              disabled={isLoading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Home className="h-5 w-5" />
              <span>{isLoading ? 'Redirecting...' : 'Return to Home'}</span>
            </button>
            
            <button
              onClick={handleContinueShopping}
              disabled={isLoading}
              className="border border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            What happens next?
          </h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start space-x-3">
              <div className="bg-emerald-100 text-emerald-600 rounded-full p-1 mt-0.5">
                <CheckCircle className="h-4 w-4" />
              </div>
              <p>Your order is being processed and will be prepared for shipment</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-emerald-100 text-emerald-600 rounded-full p-1 mt-0.5">
                <CheckCircle className="h-4 w-4" />
              </div>
              <p>You will receive a shipping confirmation email with tracking information</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-emerald-100 text-emerald-600 rounded-full p-1 mt-0.5">
                <CheckCircle className="h-4 w-4" />
              </div>
              <p>Expected delivery: 2-3 business days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}