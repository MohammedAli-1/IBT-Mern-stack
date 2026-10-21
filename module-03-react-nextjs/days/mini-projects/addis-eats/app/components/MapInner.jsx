"use client";

import { useEffect, useRef } from "react";

export default function MapInner({ courierPos, deliveryPos }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  const courier = courierPos ?? [9.005, 38.763];
  const delivery = deliveryPos ?? [9.02, 38.78];

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    // Inject Leaflet CSS if not already present
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    function initMap() {
      const L = window.L;
      if (!L || mapRef.current) return;

      const map = L.map(containerRef.current).setView(courier, 13);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      const courierIcon = L.divIcon({
        html: '<span style="font-size:24px">🛵</span>',
        className: "",
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });
      const deliveryIcon = L.divIcon({
        html: '<span style="font-size:24px">📍</span>',
        className: "",
        iconSize: [30, 30],
        iconAnchor: [15, 30],
      });

      L.marker(courier, { icon: courierIcon }).addTo(map).bindPopup("Courier location");
      L.marker(delivery, { icon: deliveryIcon }).addTo(map).bindPopup("Delivery address");

      map.fitBounds([courier, delivery], { padding: [50, 50] });
    }

    // Load Leaflet JS from CDN via script tag
    if (window.L) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.id = "leaflet-js";
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = initMap;
      document.head.appendChild(script);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: 320, width: "100%" }}
      className="rounded-xl overflow-hidden border border-gray-200"
      aria-label="Delivery map"
    />
  );
}
