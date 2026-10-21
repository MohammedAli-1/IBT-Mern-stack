"use client";

import dynamic from "next/dynamic";

// Ex 1: dynamic import with ssr:false — Leaflet requires the browser DOM
const Map = dynamic(() => import("./MapInner"), {
  ssr: false,
  // Sized placeholder shown while the map JS loads
  loading: () => (
    <div
      className="flex items-center justify-center rounded-xl bg-gray-100 text-gray-400 text-sm"
      style={{ height: 320 }}
    >
      Loading map…
    </div>
  ),
});

export default function DeliveryMap({ orderId, courierPos, deliveryPos }) {
  return <Map orderId={orderId} courierPos={courierPos} deliveryPos={deliveryPos} />;
}
