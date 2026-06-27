import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Webhook verification failed: ${message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const contact = session.custom_fields?.find((f) => f.key === "contact")?.text?.value ?? "unknown";
    const game = session.custom_fields?.find((f) => f.key === "game")?.text?.value ?? "unknown";
    const details = session.custom_fields?.find((f) => f.key === "details")?.text?.value ?? "";

    console.log("[VREN] New order:", {
      sessionId: session.id,
      planId: session.metadata?.planId,
      billing: session.metadata?.billing,
      amount: session.amount_total,
      email: session.customer_details?.email,
      contact,
      game,
      details,
    });

    if (process.env.DISCORD_WEBHOOK_URL) {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: [
            `🎉 **New VREN Order!**`,
            `**Plan:** ${session.metadata?.planId} (${session.metadata?.billing})`,
            `**Amount:** $${((session.amount_total ?? 0) / 100).toFixed(2)}`,
            `**Contact:** ${contact}`,
            `**Game:** ${game}`,
            details ? `**Details:** ${details}` : null,
            `**Email:** ${session.customer_details?.email ?? "N/A"}`,
          ].filter(Boolean).join("\n"),
        }),
      });
    }
  }

  return NextResponse.json({ received: true });
}
