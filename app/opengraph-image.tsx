import { ImageResponse } from "next/og";

export const alt = "Spoltec funktionssäkrar ert avloppssystem";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #2c4696 0%, #1b2c60 100%)",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            width: "96px",
            height: "8px",
            background: "#fc8512",
            marginBottom: "40px",
          }}
        />
        <div
          style={{
            fontSize: "76px",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          Spoltec
        </div>
        <div
          style={{
            fontSize: "40px",
            lineHeight: 1.3,
            marginTop: "24px",
            color: "#ebf4f8",
          }}
        >
          Funktionssäkrar ert avloppssystem
        </div>
        <div
          style={{
            fontSize: "28px",
            marginTop: "auto",
            color: "#fc8512",
          }}
        >
          spoltec.se
        </div>
      </div>
    ),
    size
  );
}
