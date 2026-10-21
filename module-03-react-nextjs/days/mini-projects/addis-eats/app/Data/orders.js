// In-memory order store using a global to survive Next.js hot-module reloads in dev.
// Replace with a real DB in production.

if (!global._orders) {
  global._orders = [];
}

export const orders = global._orders;

export function createOrder(data) {
  const order = {
    id: Date.now(),
    ...data,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  return order;
}

export function getOrdersByOwner(ownerId) {
  return orders.filter((o) => o.owner === ownerId);
}
