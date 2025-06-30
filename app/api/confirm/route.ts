import { NextResponse } from 'next/server';
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import db from '@/utils/db';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get('session_id');

  if (!session_id) {
    return NextResponse.json(
      { error: 'Missing session_id parameter' },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    
    if (!session.metadata?.orderId || !session.metadata?.cartId) {
      return NextResponse.json(
        { error: 'Missing metadata in session' },
        { status: 400 }
      );
    }

    const { orderId, cartId } = session.metadata;

    if (session.payment_status === 'paid') {
      // 1. First delete all cart items
      await db.cartItem.deleteMany({
        where: { cartId: cartId }
      });

      // 2. Then delete the cart
      await db.cart.delete({
        where: { id: cartId }
      });

      // 3. Update the order status
      await db.order.update({
        where: { id: orderId },
        data: { isPaid: true }
      });

      return NextResponse.redirect(new URL('/orders', req.url));
    }

    return NextResponse.json(
      { error: 'Payment not completed' },
      { status: 402 }
    );

  } catch (error) {
    console.error('Confirmation error:', error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error', 
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
};