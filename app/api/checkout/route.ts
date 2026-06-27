import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

type PlanId = "single" | "pro" | "bulk";
type Billing = "standard" | "bundle";

const PLANS: Record<PlanId, Record<Billing, { amount: number; label: string; description: string }>> = {
  single: {
    standard: {
      amount: 700,
      label: "Single Thumbnail",
      description: "1 algorithm-optimized thumbnail · CS2, Minecraft, or Roblox · 24-hour delivery",
    },
    bundle: {
      amount: 600,
      label: "Single Thumbnail (Bundle Rate)",
      description: "1 algorithm-optimized thumbnail · 20% bundle discount applied",
    },
  },
  pro: {
    standard: {
      amount: 1800,
      label: "Pro Pack — 3 Thumbnails",
      description: "3 algorithm-optimized thumbnails · Any game mix · Priority 24-hour delivery",
    },
    bundle: {
      amount: 1400,
      label: "Pro Pack — 3 Thumbnails (Bundle Rate)",
      description: "3 algorithm-optimized thumbnails · 20% bundle discount applied",
    },
  },
  bulk: {
    standard: {
      amount: 4400,
      label: "Bulk Pack — 8 Thumbnails",
      description: "8 algorithm-optimized thumbnails · Any game mix · Unlimited revisions + CTR audit",
    },
    bundle: {
      amount: 3500,
      label: "Bulk Pack — 8 Thumbnails (Bundle Rate)",
      description: "8 algorithm-optimized thumbnails · 20% bundle discount applied",
    },
  },
};

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const body = await req.json() as { planId: PlanId; billing: Billing };
  const { planId, billing } = body;

  if (!planId || !PLANS[planId]) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const plan = PLANS[planId][billing ?? "standard"];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? req.nextUrl.origin;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `VREN — ${plan.label}`,
            description: plan.description,
            images: ["https://mir-s3-cdn-cf.behance.net/projects/808/b8579f197498191.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png"],
          },
          unit_amount: plan.amount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${baseUrl}/order/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/#pricing`,
    metadata: {
      planId,
      billing: billing ?? "standard",
    },
    custom_fields: [
      {
        key: "contact",
        label: { type: "custom", custom: "Discord username (where we'll reach you)" },
        type: "text",
        optional: false,
      },
      {
        key: "game",
        label: { type: "custom", custom: "Game (CS2 / Minecraft / Roblox)" },
        type: "text",
        optional: false,
      },
      {
        key: "details",
        label: { type: "custom", custom: "Order details (video title, style notes, references)" },
        type: "text",
        optional: true,
      },
    ],
  });

  return NextResponse.json({ url: session.url });
}
