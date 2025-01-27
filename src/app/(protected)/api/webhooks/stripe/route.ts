import { db } from "@/server/db";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(request: Request) {
  console.log("Yahaa ayaa ")
  const body = await request.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_KEY!,
    );
  } catch (error) {
    return NextResponse.json({ error: "Invlaid Signature" }, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  console.log(event.type);

  if (event.type == "checkout.session.completed") {
    const credits = Number(session?.metadata?.["credits"]);
    const userId = session.client_reference_id;

    if (!userId || !credits) {
      return NextResponse.json({ error: "Invlaid" }, { status: 400 });
    }

    console.log("sessionData " , session)


    const trans = await db.stripeTransection.create({
      data: {
        userId: userId,
        credit: credits,
      },
    });

    console.log("Transs" , trans)

    await db.user.update({
      where: {
        externalId: userId,
      },
      data: {
        credits: {
          increment: credits,
        },
      },
    });
  }

  return NextResponse.json({
    message: "Credit has been creadetd successfully ",
  });
}
