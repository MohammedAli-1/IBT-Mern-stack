"use client";

import { useEffect, useRef } from "react";

// Renders a Leaflet map with courier + delivery markers using only the CDN
// (no npm package needed — avoids the SSR issue entirely)
export default function MapInner({ courierPos, deliveryPos }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  // Addis Ababa centre as default
  const courier = courierPos ?? [9.005, 38.763];
  const delivery = deliveryPos ?? [9.02, 38.78];

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    // Dynamically load Leaflet CSS + JS from CDN
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    import("https://unpkg.com/leaflet@1.9.4/dist/leaflet-src.esm.js")
      .then((L) => {
        const map = L.map(containerRef.current).setView(courier, 13);
        mapRef.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(map);

        // Ex 2: courier marker (🛵) and delivery marker (📍)
        const courierIcon = L.divIcon({ html: "🛵", className: "", iconSize: [28, 28] });
        const deliveryIcon = L.divIcon({ html: "📍", className: "", iconSize: [28, 28] });

        const courierMarker = L.marker(courier, { icon: courierIcon })
          .addTo(map)
          .bindPopup("Courier");
        const deliveryMarker = L.marker(delivery, { icon: deliveryIcon })
          .addTo(map)
          .bindPopup("Delivery address");

        // Fit the view to both markers
        map.fitBounds([courier, delivery], { padding: [40, 40] });

        return () => map.remove();
      })
      .catch(() => {});
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: 320 }}
      className="rounded-xl overflow-hidden"
      aria-label="Delivery map"
    />
  );
}
