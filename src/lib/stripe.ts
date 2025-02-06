"use server";

import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export async function createCheckoutSession(credits: number, email: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized ");
  }

  const transection_data = await db.stripeTransection.create({
    data: {
      userId: userId,
      credit: credits,
    },
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${credits} gitinsense Credits `,
          },
          unit_amount: Math.round((credits / 50) * 100),
        },
        quantity: 1,
      },
    ],
    customer_creation: "always",
    customer_email: email,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/billings`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billings`,
    client_reference_id: userId.toString(),
    metadata: {
      credits,
      transectionId: transection_data.id,
    },
  });
  if (!session) {
    throw new Error("No session found");
  }
  return redirect(session.url!);
}
