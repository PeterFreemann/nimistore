import React from 'react';
import { Truck, DollarSign, Award } from 'lucide-react';

export default function TrustBadges(): JSX.Element {
  return (
    <section className="bg-white py-8 border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-emerald-100 p-4 rounded-full mb-4">
              <Truck className="text-emerald-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Same day delivery available across the UK</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-amber-100 p-4 rounded-full mb-4">
              <DollarSign className="text-amber-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Fair Prices</h3>
            <p className="text-gray-600">Competitive prices on all authentic products</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <Award className="text-blue-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Quality Products</h3>
            <p className="text-gray-600">Authentic ingredients from trusted suppliers</p>
          </div>
        </div>
      </div>
    </section>
  );
}