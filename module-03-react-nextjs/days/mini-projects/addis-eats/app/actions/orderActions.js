"use server";

import { revalidatePath } from "next/cache";
import { createOrder } from "@/app/Data/orders";

// Validation — same rules as the API route
function validate(fields) {
  const fieldErrors = {};

  if (!fields.name || fields.name.trim().length < 2) {
    fieldErrors.name = "Name must be at least 2 characters.";
  }
  if (!fields.address || fields.address.trim().length < 5) {
    fieldErrors.address = "Address must be at least 5 characters.";
  }
  if (!fields.phone || !/^\+?[\d\s\-]{7,15}$/.test(fields.phone.trim())) {
    fieldErrors.phone = "Enter a valid phone number.";
  }

  return fieldErrors;
}

// submitOrder — called by the checkout form via useActionState
export async function submitOrder(prevState, formData) {
  const fields = {
    name: formData.get("name"),
    address: formData.get("address"),
    phone: formData.get("phone"),
    // items come from a hidden JSON field set by the client
    items: (() => {
      try {
        return JSON.parse(formData.get("items") || "[]");
      } catch {
        return [];
      }
    })(),
  };

  const fieldErrors = validate(fields);

  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, fieldErrors };
  }

  const order = createOrder(fields);

  // Revalidate the orders page so it reflects the new order on next visit
  revalidatePath("/orders");

  return { success: true, orderId: order.id };
}

// cancelOrder — checks session cookie and record ownership before writing
export async function cancelOrder(orderId) {
  const { cookies } = await import("next/headers");
  const { orders } = await import("@/app/Data/orders");

  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  // Must be logged in
  if (!session?.value) {
    return { success: false, error: "Unauthorised — no session." };
  }

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return { success: false, error: "Order not found." };
  }

  // Owner check — session value must match the order's owner field
  if (order.owner && order.owner !== session.value) {
    return { success: false, error: "Forbidden — you do not own this order." };
  }

  order.status = "cancelled";
  revalidatePath("/orders");

  return { success: true };
}
