import { ImageResponse } from "next/og";
import { meta } from "@/lib/site";

export const runtime = "nodejs";
export const alt = meta.siteName;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          fontFamily: '"Yu Mincho", serif',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 400,
            color: "#1A1A1A",
            letterSpacing: "0.15em",
            lineHeight: 1.6,
            textAlign: "center",
            whiteSpace: "pre-wrap",
          }}
        >
          {meta.tagline}
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 24,
            color: "#999999",
            letterSpacing: "0.2em",
          }}
        >
          {meta.taglineEn || ""}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
