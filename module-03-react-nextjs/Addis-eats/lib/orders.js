/**
 * lib/orders.js
 * In-memory order store. In production replace with a real database.
 * Server-only — prices and totals are always recalculated here.
 */
import 'server-only';
import { getDishById } from './dishes';

/** @type {Map<string, Object>} */
const orderStore = new Map();

let nextId = 1000;

export const ORDER_STATUSES = ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'];

function generateId() {
  return String(nextId++);
}

/**
 * Calculate the true server-side total for a list of cart items.
 * Returns enriched items with server-verified prices, or null if a dish is missing.
 */
function calculateItems(cartItems) {
  const enriched = [];
  for (const item of cartItems) {
    const dish = getDishById(item.dishId);
    if (!dish) return null;
    const qty = Math.max(1, Math.min(20, Math.floor(Number(item.quantity))));
    enriched.push({
      dishId: dish.id,
      name: dish.name,
      price: dish.price,
      quantity: qty,
    });
  }
  return enriched;
}

/**
 * Create a new order. userId comes from the verified session, never from the client.
 */
export function createOrder({ userId, items, deliveryAddress, phone }) {
  const enrichedItems = calculateItems(items);
  if (!enrichedItems || enrichedItems.length === 0) {
    throw new Error('Invalid order items.');
  }
  const total = enrichedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const order = {
    id: generateId(),
    userId,
    items: enrichedItems,
    deliveryAddress: String(deliveryAddress).trim(),
    phone: String(phone).trim(),
    total,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  orderStore.set(order.id, order);
  return order;
}

/**
 * Get all orders for a specific user.
 */
export function getOrdersForUser(userId) {
  return [...orderStore.values()]
    .filter((o) => o.userId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

/**
 * Get a single order — only if it belongs to userId (pass null to skip ownership check for staff).
 */
export function getOrderById(orderId, userId = null) {
  const order = orderStore.get(String(orderId));
  if (!order) return null;
  if (userId !== null && order.userId !== userId) return null;
  return order;
}

/**
 * Get all orders (staff-only).
 */
export function getAllOrders() {
  return [...orderStore.values()].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}

/**
 * Update an order's status.
 * @param {string} orderId
 * @param {string} newStatus
 * @param {string|null} userId - if set, enforces ownership
 * @returns updated order or null
 */
export function updateOrderStatus(orderId, newStatus, userId = null) {
  if (!ORDER_STATUSES.includes(newStatus)) return null;
  const order = getOrderById(orderId, userId);
  if (!order) return null;
  order.status = newStatus;
  order.updatedAt = new Date().toISOString();
  orderStore.set(order.id, order);
  return order;
}

/**
 * Seed some demo orders for testing without a database.
 */
export function seedDemoOrders() {
  if (orderStore.size > 0) return;
  createOrder({
    userId: 'u1',
    items: [{ dishId: '1', quantity: 2 }, { dishId: '10', quantity: 3 }],
    deliveryAddress: 'Bole Road, Addis Ababa',
    phone: '+251911000001',
  });
  createOrder({
    userId: 'u2',
    items: [{ dishId: '3', quantity: 1 }, { dishId: '5', quantity: 2 }],
    deliveryAddress: 'Kazanchis, Addis Ababa',
    phone: '+251911000002',
  });
  const o3 = createOrder({
    userId: 'u1',
    items: [{ dishId: '4', quantity: 1 }],
    deliveryAddress: 'Bole Road, Addis Ababa',
    phone: '+251911000001',
  });
  updateOrderStatus(o3.id, 'delivered');
  const o4 = createOrder({
    userId: 'u2',
    items: [{ dishId: '2', quantity: 2 }, { dishId: '9', quantity: 2 }],
    deliveryAddress: 'Kazanchis, Addis Ababa',
    phone: '+251911000002',
  });
  updateOrderStatus(o4.id, 'preparing');
}

// Seed once on module load
seedDemoOrders();
