import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "VREN — Algorithm-first gaming thumbnail design";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Red glow — top right */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 500,
            height: 500,
            background: "radial-gradient(circle, rgba(239,68,68,0.18) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        {/* Red glow — bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 360,
            height: 360,
            background: "radial-gradient(circle, rgba(239,68,68,0.10) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Top badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #27272a",
            borderRadius: 9999,
            padding: "6px 20px",
            marginBottom: 28,
            color: "#71717a",
            fontSize: 18,
            letterSpacing: "0.06em",
          }}
        >
          3 years · CS2 · Minecraft · Roblox
        </div>

        {/* VREN wordmark */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            color: "#f4f4f5",
            letterSpacing: "-0.05em",
            lineHeight: 1,
          }}
        >
          VREN
        </div>

        {/* Tagline in red */}
        <div
          style={{
            marginTop: 12,
            fontSize: 30,
            fontWeight: 600,
            color: "#ef4444",
            letterSpacing: "-0.02em",
          }}
        >
          Algorithm-first thumbnail design
        </div>

        {/* Description */}
        <div
          style={{
            marginTop: 28,
            maxWidth: 680,
            textAlign: "center",
            fontSize: 20,
            color: "#52525b",
            lineHeight: 1.6,
          }}
        >
          Gaming channels average 3–5% CTR. VREN thumbnails are engineered to push yours to 7%+.
        </div>

        {/* Price pill */}
        <div
          style={{
            marginTop: 44,
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#111111",
            border: "1px solid #27272a",
            borderRadius: 14,
            padding: "14px 28px",
          }}
        >
          <span style={{ color: "#71717a", fontSize: 20 }}>Starting at</span>
          <span style={{ color: "#ef4444", fontSize: 32, fontWeight: 700 }}>$7</span>
          <span style={{ color: "#71717a", fontSize: 20 }}>per thumbnail · vren.store</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
