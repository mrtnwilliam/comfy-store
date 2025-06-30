"use client";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

function CheckoutContent() {
  const searchParams = useSearchParams();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const orderId = searchParams.get("orderId");
  const cartId = searchParams.get("cartId");

  useEffect(() => {
    if (!orderId || !cartId) {
      setError("Missing order or cart information");
      setLoading(false);
      return;
    }

    const fetchClientSecret = async () => {
      try {
        const response = await axios.post("/api/payment", {
          orderId,
          cartId,
        });
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        console.error("Checkout error:", err);
        setError("Failed to initialize checkout. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchClientSecret();
  }, [orderId, cartId]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading checkout...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  if (!clientSecret) {
    return <div className="flex justify-center items-center h-screen">Unable to start checkout session</div>;
  }

  return (
    <div className="w-full h-[calc(100vh-64px)]">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ clientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}