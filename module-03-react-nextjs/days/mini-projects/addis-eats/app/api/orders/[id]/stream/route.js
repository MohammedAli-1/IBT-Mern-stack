import { orders } from "@/app/Data/orders";

// Ex 3: SSE stream for a single order's status
// Correct SSE framing: each event is "data: ...\n\n"
export async function GET(request, { params }) {
  const { id } = await params;
  const orderId = Number(id);

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Send current status immediately (seed — Ex 4)
      const order = orders.find((o) => o.id === orderId);
      const initial = order
        ? JSON.stringify({ id: orderId, status: order.status })
        : JSON.stringify({ id: orderId, status: "not_found" });

      controller.enqueue(encoder.encode(`data: ${initial}\n\n`));

      // Poll for status changes every 2 s
      const interval = setInterval(() => {
        const current = orders.find((o) => o.id === orderId);
        const payload = current
          ? JSON.stringify({ id: orderId, status: current.status })
          : JSON.stringify({ id: orderId, status: "not_found" });

        controller.enqueue(encoder.encode(`data: ${payload}\n\n`));

        // Ex 5: close the stream when delivered or cancelled
        if (current?.status === "delivered" || current?.status === "cancelled") {
          clearInterval(interval);
          controller.close();
        }
      }, 2000);

      // Clean up if client disconnects
      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
