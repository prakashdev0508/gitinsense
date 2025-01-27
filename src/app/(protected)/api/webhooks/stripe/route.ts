import { db } from "@/server/db";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(request: Request) {
  console.log("Yahaa ayaa ");
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

  const userId = session.client_reference_id;
  const transectionId = session.metadata?.["transectionId"];

  if (event.type == "checkout.session.completed") {
    const credits = Number(session?.metadata?.["credits"]);

    console.log("sess" , session)

    if (!userId || !credits) {
      return NextResponse.json({ error: "Invlaid" }, { status: 400 });
    }

    await db.stripeTransection.update({
      where: {
        id: transectionId,
      },
      data: {
        status: "COMPLETED",
        transection_id: session?.id,
      },
    });

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
  } else if (event.type == "charge.failed") {
    await db.stripeTransection.update({
      where: {
        id: transectionId,
      },
      data: {
        status: "FAILED",
        transection_id: session?.id,
      },
    });
  }

  return NextResponse.json({
    message: "Credit has been creadetd successfully ",
  });
}
