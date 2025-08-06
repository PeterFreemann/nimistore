import React from 'react';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartPageProps {
  onCheckoutClick: () => void;
  onContinueShoppingClick: () => void;
}

export default function CartPage({ onCheckoutClick, onContinueShoppingClick }: CartPageProps) {
  const { items, total, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some delicious products to get started!</p>
            <button
              onClick={onContinueShoppingClick}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900">Cart Items ({items.length})</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-[auto,1fr,auto,auto,auto] gap-4 items-center">
                      {/* Image */}
                      <div className="sm:col-span-1">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg mx-auto sm:mx-0"
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className="sm:col-span-1 text-center sm:text-left">
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.category}</p>
                        {item.weight && (
                          <p className="text-sm text-gray-500">{item.weight}</p>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="sm:col-span-1 flex justify-center sm:justify-start">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 text-gray-600 hover:text-gray-900"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4 py-2 border-x border-gray-300 font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-gray-600 hover:text-gray-900"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="sm:col-span-1 text-center sm:text-right min-w-[80px]">
                        <p className="text-lg font-semibold text-emerald-600">
                          £{(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          £{item.price.toFixed(2)} each
                        </p>
                      </div>

                      {/* Remove Button */}
                      <div className="sm:col-span-1 flex justify-center sm:justify-start">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={onContinueShoppingClick}
                className="text-emerald-600 hover:text-emerald-700 font-semibold"
              >
                ← Continue Shopping
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-900">
                  <span>Subtotal</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-900">
                  <span>Delivery</span>
                  <span className="text-emerald-600">
                    {total >= 50 ? 'Free' : '£4.99'}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>£{(total + (total >= 50 ? 0 : 4.99)).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {total < 50 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-amber-800">
                    Add £{(50 - total).toFixed(2)} more for free delivery!
                  </p>
                </div>
              )}

              <button
                onClick={() => {
                  console.log('Checkout button clicked!'); // Debug log
                  onCheckoutClick();
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Proceed to Checkout
              </button>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}