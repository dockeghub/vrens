import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-md space-y-6">
        <div className="text-5xl">🎉</div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Order confirmed.
        </h1>
        <p className="text-muted-foreground text-lg">
          Payment received. Now DM <span className="text-foreground font-semibold">docke</span> on
          Discord with your video link and any references — your thumbnail will be ready within 24 hours.
        </p>
        <a
          href="https://discord.gg/vren"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold px-8 py-3 hover:bg-primary/90 transition-colors"
        >
          Open Discord
        </a>
        <div className="pt-4">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to VREN
          </Link>
        </div>
      </div>
    </main>
  );
}
