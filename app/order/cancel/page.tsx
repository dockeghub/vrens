import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-md space-y-6">
        <div className="text-5xl">↩</div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          No charge made.
        </h1>
        <p className="text-muted-foreground text-lg">
          Your order was cancelled and nothing was charged. Head back and pick a plan whenever you&apos;re ready.
        </p>
        <Link
          href="/#pricing"
          className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold px-8 py-3 hover:bg-primary/90 transition-colors"
        >
          View Pricing
        </Link>
      </div>
    </main>
  );
}
