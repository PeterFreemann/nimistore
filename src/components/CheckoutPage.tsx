import React, { useState } from 'react';
import { CreditCard, MapPin, Truck, Clock } from 'lucide-react';
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

  const deliveryFee = total >= 50 ? 0 : 4.99;
  const finalTotal = total + deliveryFee;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    clearCart();
    setIsProcessing(false);
    onOrderComplete();
  };

  // Add this updated handleCheckout function to your CheckoutPage component

const handleCheckout = async () => {
  setIsProcessing(true);
  
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
    console.log('Response headers:', response.headers);

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
    alert(`Payment failed: ${errorMessage}. Please try again.`);
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-black">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-black">
                <Truck className="mr-2 text-black" size={20} />
                Delivery Method
              </h2>
              
              <div className="space-y-3">
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="delivery"
                    value="delivery"
                    checked={deliveryMethod === 'delivery'}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Truck size={16} className="mr-2 text-emerald-600" />
                      <span className="font-medium text-black">Home Delivery</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 text-black">
                      Delivered to your door. {total >= 50 ? 'Free' : '£4.99'}
                    </p>
                  </div>
                </label>
                
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={deliveryMethod === 'pickup'}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2 text-emerald-600" />
                      <span className="font-medium text-black">Click & Collect</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 text-black">
                      Pick up from our Birmingham store. Free
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-black">
                <MapPin className="mr-2 text-black" size={20} />
                Delivery Address
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-black">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-black">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Doe"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-black">
                    Street Address
                  </label>
                  <input
                    type="text"
                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="123 Main Street"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-black">
                    City
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 text-black py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Birmingham"
                  />
                </div>
                <div>
                  <label className="block  text-sm font-medium text-gray-700 mb-1 text-black">
                    Postcode
                  </label>
                  <input
                    type="text"
                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="B1 1AA"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-black">
                <CreditCard className="mr-2 text-black" size={20} />
                Payment Method
              </h2>
              
              <div className="space-y-3 mb-4">
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3 text-black"
                  />
                  <div className="flex-1">
                    <span className="font-medium text-black" >Credit/Debit Card</span>
                    <div className="flex space-x-2 mt-1">
                      <div className="bg-gray-100 px-2 py-1 rounded text-xs text-black">Stripe</div>
                    </div>
                  </div>
                </label>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-black text-sm font-medium text-gray-700 mb-1 text-black">
                      Card Number
                    </label>
                    <input
                      type="text"
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-black text-sm font-medium text-gray-700 mb-1 text-black">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-black text-sm font-medium text-gray-700 mb-1 text-black">
                        CVV
                      </label>
                      <input
                        type="text"
                        className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
              <h2 className="text-xl font-semibold mb-4 text-black">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 text-black">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-black">{item.name}</p>
                      <p className="text-xs text-gray-500 text-black">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold text-black">
                      £{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 border-t pt-4 text-black">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className={deliveryFee === 0 ? 'text-emerald-600' : ''}>
                    {deliveryMethod === 'pickup' ? 'Free' : deliveryFee === 0 ? 'Free' : `£${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
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
                {isProcessing ? 'Processing...' : 'Place Order'}
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