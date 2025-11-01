// app/success/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import SuccessPage from '../../components/SuccessPage';

export default function SuccessRoute() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const sessionId = searchParams.get('session_id');
  const [isCartCleared, setIsCartCleared] = useState(false);

  useEffect(() => {
    // Clear cart when success page loads
    if (!isCartCleared) {
      clearCart();
      setIsCartCleared(true);
    }
    
    // You can also verify the session with your backend here
    if (sessionId) {
      console.log('Payment successful, session:', sessionId);
      // You might want to verify the payment with your backend API
    }
  }, [clearCart, sessionId, isCartCleared]);

  return <SuccessPage />;
}