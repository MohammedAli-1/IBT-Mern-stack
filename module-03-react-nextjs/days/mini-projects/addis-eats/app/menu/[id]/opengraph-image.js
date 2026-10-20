import { ImageResponse } from "next/og";
import foods from "@/app/Data/foods";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({ params }) {
  const { id } = await params;
  const food = foods.find((f) => f.id === Number(id));

  const name = food?.name ?? "Addis-Eats Dish";
  const price = food ? `${food.price} ETB` : "";
  const category = food?.category ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          fontFamily: "sans-serif",
        }}
      >
        <p style={{ fontSize: 28, color: "#ea580c", margin: 0, letterSpacing: 4 }}>
          {category.toUpperCase()}
        </p>
        <h1
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: "#111827",
            margin: "20px 0",
            textAlign: "center",
          }}
        >
          {name}
        </h1>
        <p style={{ fontSize: 48, color: "#ea580c", margin: 0, fontWeight: 600 }}>
          {price}
        </p>
        <p style={{ fontSize: 28, color: "#6b7280", marginTop: 32 }}>
          addis-eats.vercel.app
        </p>
      </div>
    ),
    { ...size }
  );
}
