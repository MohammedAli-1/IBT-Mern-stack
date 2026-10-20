// In-memory order store — resets on server restart.
// Replace with a real DB in production.
export const orders = [];

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
