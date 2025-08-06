// app/api/stripe/route.ts
import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

// Add proper type checking for environment variable
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY environment variable is not set');
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-06-30.basil',
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

export async function POST(req: NextRequest) {
  try {
    console.log('API route hit - parsing request body...');
    const checkoutData: CheckoutData = await req.json();
    console.log('Received checkout data:', checkoutData);
    
    const { items, deliveryMethod, deliveryFee, total } = checkoutData;

    // More detailed validation with logging
    console.log('Items:', items);
    console.log('Items type:', typeof items);
    console.log('Items is array:', Array.isArray(items));
    console.log('Items length:', items?.length);

    if (!items) {
      console.log('Error: No items provided');
      return NextResponse.json({ error: 'No items provided in request' }, { status: 400 });
    }

    if (!Array.isArray(items)) {
      console.log('Error: Items is not an array');
      return NextResponse.json({ error: 'Items must be an array' }, { status: 400 });
    }

    if (items.length === 0) {
      console.log('Error: Items array is empty');
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Create line items for Stripe
    console.log('Creating line items for', items.length, 'items');
    const lineItems = items.map((item: CartItem, index: number) => {
      console.log(`Processing item ${index}:`, item);
      let imageUrl = '';
      
      // Handle different image formats
      if (typeof item.image === 'string') {
        // Validate if it's a proper URL
        try {
          new URL(item.image);
          imageUrl = item.image;
        } catch {
          console.log(`Invalid URL for item ${index}:`, item.image);
          imageUrl = ''; // Set to empty if invalid
        }
      } else if (Array.isArray(item.image) && item.image.length > 0) {
        try {
          const img = item.image[0].asset._ref;
          imageUrl = img
            .replace('image-', 'https://cdn.sanity.io/images/vfxfwnaw/production/')
            .replace('-webp', '.webp');
          
          // Validate the constructed URL
          new URL(imageUrl);
        } catch {
          console.log(`Could not construct valid URL for item ${index}`);
          imageUrl = ''; // Set to empty if invalid
        }
      }

      console.log(`Image URL for item ${index}:`, imageUrl);

      const lineItem = {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: item.name,
            // Only include images array if we have a valid URL
            ...(imageUrl ? { images: [imageUrl] } : {}),
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };

      console.log(`Line item ${index}:`, lineItem);
      return lineItem;
    });

    console.log('All line items:', lineItems);

    // Add delivery fee as a separate line item if applicable
    if (deliveryMethod === 'delivery' && deliveryFee > 0) {
      lineItems.push({
        price_data: {
          currency: 'gbp',
          product_data: {
            name: 'Delivery Fee',
            images: [],
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
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/checkout`,
      metadata: {
        deliveryMethod: deliveryMethod,
        orderTotal: total.toString(),
      },
    };

    // Only add shipping options for delivery orders
    if (deliveryMethod === 'delivery') {
      params.shipping_address_collection = {
        allowed_countries: ['GB'],
      };
    }

    // Create Checkout Sessions
    const session = await stripe.checkout.sessions.create(params);

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (err: unknown) {
    console.error('Stripe session creation error:', err);
    
    const error = err as any;
    const statusCode = error.statusCode || 500;
    const message = error.message || 'An error occurred while creating the checkout session';
    
    return NextResponse.json({ 
      error: message,
      details: process.env.NODE_ENV === 'development' ? err : undefined 
    }, { status: statusCode });
  }
}