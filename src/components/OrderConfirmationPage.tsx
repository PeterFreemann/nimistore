import React from 'react';
import { CheckCircle, Truck, Mail, ArrowRight } from 'lucide-react';

interface OrderConfirmationPageProps {
  onContinueShoppingClick: () => void;
}

export default function OrderConfirmationPage({ onContinueShoppingClick }: OrderConfirmationPageProps) {
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <CheckCircle size={64} className="mx-auto text-emerald-500" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your order. We've received your payment and will process your order shortly.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-gray-600">Order Number</p>
                <p className="font-semibold text-lg">#{orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Order Date</p>
                <p className="font-semibold">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estimated Delivery</p>
                <p className="font-semibold">2-3 business days</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Delivery Method</p>
                <p className="font-semibold">Home Delivery</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-emerald-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Mail className="text-emerald-600" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Email Confirmation</h3>
              <p className="text-sm text-gray-600">
                A confirmation email has been sent to your email address with order details.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Truck className="text-emerald-600" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Track Your Order</h3>
              <p className="text-sm text-gray-600">
                You'll receive tracking information once your order has been dispatched.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onContinueShoppingClick}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight size={16} />
            </button>
            <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors">
              View Order Details
            </button>
          </div>

          {/* Help Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Need help with your order?{' '}
              <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Contact our customer service
              </a>{' '}
              or call{' '}
              <a href="tel:+447944581441" className="text-emerald-600 hover:text-emerald-700 font-medium">
                07563007938
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}