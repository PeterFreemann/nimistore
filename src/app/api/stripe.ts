import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';

// Add proper type checking for environment variable
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY environment variable is not set');
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-06-30.basil', // Keep your original API version
});

// Define types for your cart items and checkout data
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string | Array<{
    asset: {
      _ref: string;
    };
  }>;
}

interface CheckoutData {
  items: CartItem[];
  deliveryMethod: 'delivery' | 'pickup';
  deliveryFee: number;
  total: number;
}

interface StripeError {
  statusCode?: number;
  message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const checkoutData: CheckoutData = req.body;
      const { items, deliveryMethod, deliveryFee, total } = checkoutData;

      // Validate the request data
      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Invalid or empty cart items' });
      }

      // Create line items for Stripe
      const lineItems = items.map((item: CartItem) => {
        let imageUrl = '';
        
        // Handle different image formats
        if (typeof item.image === 'string') {
          imageUrl = item.image;
        } else if (Array.isArray(item.image) && item.image.length > 0) {
          const img = item.image[0].asset._ref;
          imageUrl = img
            .replace('image-', 'https://cdn.sanity.io/images/vfxfwnaw/production/')
            .replace('-webp', '.webp');
        }

        return {
          price_data: {
            currency: 'gbp', // Changed to GBP to match your £ symbols
            product_data: {
              name: item.name,
              images: imageUrl ? [imageUrl] : [],
            },
            unit_amount: Math.round(item.price * 100), // Convert to pence
          },
          quantity: item.quantity,
        };
      });

      // Add delivery fee as a separate line item if applicable
      if (deliveryMethod === 'delivery' && deliveryFee > 0) {
        lineItems.push({
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'Delivery Fee',
              images: [], // Add empty images array to satisfy TypeScript
            },
            unit_amount: Math.round(deliveryFee * 100),
          },
          quantity: 1,
        });
      }

      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        line_items: lineItems,
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/checkout`,
        metadata: {
          deliveryMethod: deliveryMethod,
          orderTotal: total.toString(),
        },
      };

      // Only add shipping options for delivery orders
      if (deliveryMethod === 'delivery') {
        params.shipping_address_collection = {
          allowed_countries: ['GB'], // Restrict to UK since you're using Birmingham
        };
        
        // Remove the hardcoded shipping rate or create it dynamically
        // You can uncomment and modify this if you have created shipping rates in Stripe
        // params.shipping_options = [
        //   { shipping_rate: 'your_shipping_rate_id' },
        // ];
      }

      // Create Checkout Sessions from body params
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json({ id: session.id, url: session.url });
    } catch (err: unknown) {
      console.error('Stripe session creation error:', err);
      
      const error = err as StripeError;
      const statusCode = error.statusCode || 500;
      const message = error.message || 'An error occurred while creating the checkout session';
      
      res.status(statusCode).json({ 
        error: message,
        details: process.env.NODE_ENV === 'development' ? err : undefined 
      });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}