// Ex 1: aggregate order data server-side — only the summary is passed to the client

export function aggregateOrders(orders) {
  // Revenue by day
  const revenueByDay = {};
  // Orders count by day
  const countByDay = {};

  for (const order of orders) {
    const day = order.createdAt?.slice(0, 10) ?? "unknown";
    const total = order.items?.reduce((s, i) => s + i.price * i.quantity, 0) ?? 0;
    revenueByDay[day] = (revenueByDay[day] ?? 0) + total;
    countByDay[day] = (countByDay[day] ?? 0) + 1;
  }

  const days = [...new Set([...Object.keys(revenueByDay), ...Object.keys(countByDay)])].sort();

  const revenueData = days.map((day) => ({ day, revenue: revenueByDay[day] ?? 0 }));
  const countData = days.map((day) => ({ day, count: countByDay[day] ?? 0 }));

  const totalRevenue = orders.reduce((s, o) => {
    return s + (o.items?.reduce((si, i) => si + i.price * i.quantity, 0) ?? 0);
  }, 0);

  return { revenueData, countData, totalRevenue, totalOrders: orders.length };
}
