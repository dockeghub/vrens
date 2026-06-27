import { Banner } from "@/components/ui/banner";
import { AnimatedMarqueeHero } from "@/components/ui/hero-3";
import { Feature108 } from "@/components/blocks/shadcnblocks-com-feature108";
import { Pricing } from "@/components/blocks/pricing";

// Real portfolio covers from behance.net/d0cke — swap in individual thumbnail exports when ready
const THUMBNAIL_IMAGES = [
  "https://mir-s3-cdn-cf.behance.net/projects/808/b8579f197498191.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png",
  "https://mir-s3-cdn-cf.behance.net/projects/808/90022b193645233.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png",
  "https://mir-s3-cdn-cf.behance.net/projects/808/f39cf2193645039.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png",
  "https://mir-s3-cdn-cf.behance.net/projects/808/1ecb90197275609.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png",
  "https://mir-s3-cdn-cf.behance.net/projects/808/b8579f197498191.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png",
  "https://mir-s3-cdn-cf.behance.net/projects/808/90022b193645233.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png",
];

const PRICING_PLANS = [
  {
    planId: "single",
    name: "SINGLE",
    price: "7",
    yearlyPrice: "6",
    period: "thumbnail",
    features: [
      "1 algorithm-optimized thumbnail",
      "CS2, Minecraft, or Roblox",
      "24-hour delivery guaranteed",
      "1 free revision round",
      "PSD source file included",
    ],
    description: "One thumbnail. Full algorithm focus.",
    buttonText: "Order Now",
    href: "https://discord.gg/vren",
    isPopular: false,
  },
  {
    planId: "pro",
    name: "PRO PACK",
    price: "18",
    yearlyPrice: "14",
    period: "3 thumbnails",
    features: [
      "3 algorithm-optimized thumbnails",
      "Any game mix — CS2, MC, Roblox",
      "Priority 24-hour delivery",
      "2 revision rounds per thumbnail",
      "PSD source files included",
      "CTR breakdown per thumbnail",
    ],
    description: "Best for uploading 2–3 times per week.",
    buttonText: "Get the Pack",
    href: "https://discord.gg/vren",
    isPopular: true,
  },
  {
    planId: "bulk",
    name: "BULK",
    price: "44",
    yearlyPrice: "35",
    period: "8 thumbnails",
    features: [
      "8 algorithm-optimized thumbnails",
      "Any game mix — CS2, MC, Roblox",
      "Front-of-queue priority always",
      "Unlimited revisions on all 8",
      "PSD source files + layered assets",
      "Full CTR audit on your channel",
      "Dedicated Discord support",
    ],
    description: "For creators scaling their channel fast.",
    buttonText: "Order Bulk",
    href: "https://discord.gg/vren",
    isPopular: false,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Component 1 — Banner */}
      <Banner
        id="vren-banner"
        variant="rainbow"
        rainbowColors={[
          "rgba(239,68,68,0.7)",
          "rgba(249,115,22,0.7)",
          "rgba(239,68,68,0.3)",
          "rgba(234,179,8,0.5)",
        ]}
        className="text-white shadow-lg"
      >
        ⚡ Gaming CTR averages 3–5%. VREN thumbnails target 7%+. Limited slots — DM on Discord.
      </Banner>

      {/* Component 2 — Hero */}
      <AnimatedMarqueeHero
        tagline="3 years · CS2 · Minecraft · Roblox"
        title={
          <>
            Thumbnails Built
            <br />
            <span className="text-primary">to Get Clicked</span>
          </>
        }
        description="Most gaming channels average 3–5% CTR. VREN thumbnails are engineered around YouTube's algorithm — not design trends — to push yours to 7%+."
        ctaText="Order a Thumbnail"
        images={THUMBNAIL_IMAGES}
      />

      {/* Component 3 — Features */}
      <Feature108 />

      {/* Component 4 — Pricing */}
      <Pricing
        plans={PRICING_PLANS}
        title="No Subscriptions. No Surprises."
        description={"Pay per thumbnail or save with a bundle.\nTop Fiverr designers charge $50+ for less specialization. VREN starts at $35."}
      />

      {/* Footer */}
      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
        <p className="font-bold text-lg mb-1 text-foreground">VREN</p>
        <p>Algorithm-first thumbnail design by docke · CS2 · Minecraft · Roblox</p>
        <div className="mt-4 flex items-center justify-center gap-6 text-xs">
          <a href="https://www.behance.net/d0cke" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Portfolio</a>
          <a href="https://discord.gg/vren" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Discord</a>
        </div>
        <p className="mt-4 text-xs opacity-60">© {new Date().getFullYear()} VREN. All rights reserved.</p>
      </footer>
    </main>
  );
}
