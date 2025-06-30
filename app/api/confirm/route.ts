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
    // 1. Retrieve the Stripe session
    const session = await stripe.checkout.sessions.retrieve(session_id);
    console.log('Stripe session:', session);

    if (!session.metadata?.orderId || !session.metadata?.cartId) {
      return NextResponse.json(
        { error: 'Missing metadata in session' },
        { status: 400 }
      );
    }

    const { orderId, cartId } = session.metadata;

    // 2. Verify payment is complete
    if (session.payment_status === 'paid') {
      console.log('Updating order:', orderId);
      
      // 3. Update order status
      const updatedOrder = await db.order.update({
        where: { id: orderId },
        data: { isPaid: true },
      });

      console.log('Order updated:', updatedOrder);

      // 4. Delete cart
      if (cartId) {
        console.log('Deleting cart:', cartId);
        await db.cart.delete({
          where: { id: cartId },
        });
      }

      // 5. Redirect to success page
      return NextResponse.redirect(new URL('/orders', req.url));
    }

    return NextResponse.json(
      { error: 'Payment not completed' },
      { status: 402 }
    );

  } catch (error) {
    console.error('Confirmation error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
};