import { ImageResponse } from "next/og";
import { getNameBySlug } from "@/lib";

export const alt = "NonbiNames name preview";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const name = getNameBySlug(slug);

  if (!name) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#09090b",
            color: "#ffffff",
            fontSize: 64,
            fontWeight: 700,
          }}
        >
          NonbiNames
        </div>
      ),
      size
    );
  }

  const themes = name.themes.slice(0, 3);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "64px",
          background: "#09090b",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 700,
            color: "#a78bfa",
          }}
        >
          NonbiNames
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "90px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 88,
              lineHeight: 1,
              fontWeight: 800,
            }}
          >
            {name.name}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "24px",
              fontSize: 32,
              color: "#a1a1aa",
            }}
          >
            {name.meaning}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "20px",
              fontSize: 24,
              color: "#71717a",
            }}
          >
            {name.origin} · Gender-neutral name
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "auto",
          }}
        >
          {themes.map((theme) => (
            <div
              key={theme}
              style={{
                display: "flex",
                padding: "10px 18px",
                borderRadius: 999,
                background: "#27272a",
                color: "#d4d4d8",
                fontSize: 22,
              }}
            >
              {theme}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
