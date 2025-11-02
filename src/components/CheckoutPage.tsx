"use client";

import React, { useState } from 'react';
import { CreditCard, MapPin, Truck, Clock, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import getStripe from '../../lib/getStripe';

interface CheckoutPageProps {
  onOrderComplete: () => void;
}

export default function CheckoutPage({ onOrderComplete }: CheckoutPageProps) {
  const { items, total, clearCart } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const deliveryFee = total >= 50 ? 0 : 4.99;
  const finalTotal = total + deliveryFee;

  const validateForm = () => {
    const errors: string[] = [];

    // Basic validation
    if (items.length === 0) {
      errors.push('Your cart is empty');
    }
    if (total === 0) {
      errors.push('Total amount cannot be zero');
    }

    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleCheckout = async () => {
    // Validate form before proceeding
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    setFormErrors([]);
    
    try {
      // Debug: Log the cart data before sending
      console.log('Cart items:', items);
      console.log('Cart total:', total);
      console.log('Delivery method:', deliveryMethod);
      console.log('Delivery fee:', deliveryFee);

      // Validate cart items before sending
      if (!items || items.length === 0) {
        throw new Error('Cart is empty');
      }

      const stripe = await getStripe();

      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      // Prepare checkout data
      const checkoutData = {
        items: items,
        deliveryMethod: deliveryMethod,
        deliveryFee: deliveryMethod === 'pickup' ? 0 : deliveryFee,
        total: deliveryMethod === 'pickup' ? total : finalTotal
      };

      // Debug: Log the data being sent to API
      console.log('Sending checkout data:', checkoutData);

      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      });

      // Debug: Log response details
      console.log('Response status:', response.status);

      const responseText = await response.text();
      console.log('Raw response:', responseText);

      // Check if response is ok before parsing JSON
      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.error || errorMessage;
          console.log('Error details:', errorData);
        } catch (parseError) {
          console.log('Could not parse error response as JSON');
        }
        
        throw new Error(errorMessage);
      }

      let session;
      try {
        session = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error('Invalid JSON response from server');
      }

      // Validate session data
      if (!session || !session.id) {
        throw new Error('Invalid session data received');
      }

      console.log('Session created:', session);

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message || 'Stripe checkout failed');
      }

    } catch (error) {
      console.error('Checkout error:', error);
      setIsProcessing(false);
      
      // More detailed error message
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setFormErrors([`Payment failed: ${errorMessage}. Please try again.`]);
    }
  };

  // If cart is empty, show empty state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6">
              Add some delicious items to your cart before checking out.
            </p>
            <button
              onClick={() => window.history.back()}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {/* Error Messages */}
        {formErrors.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="text-red-500 mr-2" size={20} />
              <h3 className="text-red-800 font-semibold">Please fix the following errors:</h3>
            </div>
            <ul className="mt-2 list-disc list-inside">
              {formErrors.map((error, index) => (
                <li key={index} className="text-red-700 text-sm">{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Truck className="mr-2" size={20} />
                Delivery Method
              </h2>
              
              <div className="space-y-3">
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="delivery"
                    value="delivery"
                    checked={deliveryMethod === 'delivery'}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="mr-3 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Truck size={16} className="mr-2 text-emerald-600" />
                      <span className="font-medium">Home Delivery</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Delivered to your door. {total >= 50 ? 'Free' : '£4.99'}
                    </p>
                  </div>
                </label>
                
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={deliveryMethod === 'pickup'}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="mr-3 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2 text-emerald-600" />
                      <span className="font-medium">Click & Collect</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Pick up from our Birmingham store. Free
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <MapPin className="mr-2" size={20} />
                {deliveryMethod === 'delivery' ? 'Delivery Address' : 'Pickup Information'}
              </h2>
              
              {deliveryMethod === 'delivery' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Doe"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Birmingham"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postcode
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="B1 1AA"
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Nimi Store - Birmingham</h3>
                  <p className="text-gray-600 mb-2">Unit 6F S10 Morelands Trading Estate</p>
                  <p className="text-gray-600 mb-2">Birmingham, GL1 5SA</p>
                  <p className="text-gray-600">Open: Mon-Sat 9AM-6PM, Sun 10AM-4PM</p>
                  <p className="text-sm text-emerald-600 mt-2">
                    Your order will be ready for pickup within 2 hours
                  </p>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <CreditCard className="mr-2" size={20} />
                Payment Method
              </h2>
              
              <div className="space-y-3 mb-4">
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="flex-1">
                    <span className="font-medium">Credit/Debit Card</span>
                    <div className="flex space-x-2 mt-1">
                      <div className="bg-gray-100 px-2 py-1 rounded text-xs">Stripe</div>
                    </div>
                  </div>
                </label>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold">
                      £{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className={deliveryFee === 0 ? 'text-emerald-600 font-semibold' : ''}>
                    {deliveryMethod === 'pickup' ? 'Free' : deliveryFee === 0 ? 'Free' : `£${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                {total < 50 && deliveryMethod === 'delivery' && (
                  <div className="text-sm text-emerald-600 bg-emerald-50 p-2 rounded">
                    Add £{(50 - total).toFixed(2)} more for free delivery!
                  </div>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>£{(deliveryMethod === 'pickup' ? total : finalTotal).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className={`w-full mt-6 py-3 px-6 rounded-lg font-semibold transition-colors ${
                  isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700'
                } text-white`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  `Pay £${(deliveryMethod === 'pickup' ? total : finalTotal).toFixed(2)}`
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                By placing this order, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}