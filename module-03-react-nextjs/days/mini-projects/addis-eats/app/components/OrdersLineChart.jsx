"use client";

// Ex 3: Orders-per-day line chart with heading naming range and unit
export default function OrdersLineChart({ data }) {
  if (!data.length) {
    return <p className="text-gray-500 text-sm">No order data yet.</p>;
  }

  const W = 600;
  const H = 200;
  const PADDING = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartW = W - PADDING.left - PADDING.right;
  const chartH = H - PADDING.top - PADDING.bottom;

  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const range = data.length > 1
    ? `${data[0].day} – ${data[data.length - 1].day}`
    : data[0].day;

  const points = data.map((d, i) => {
    const x = PADDING.left + (i / Math.max(data.length - 1, 1)) * chartW;
    const y = PADDING.top + chartH - (d.count / maxCount) * chartH;
    return { x, y, ...d };
  });

  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");

  const yTicks = 3;

  return (
    <div>
      {/* Heading names the range and unit */}
      <h3 className="mb-2 text-sm font-semibold text-gray-700">
        Orders per day — {range} (count)
      </h3>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          style={{ maxWidth: W }}
          role="img"
          aria-label={`Orders per day line chart, ${range}`}
        >
          {/* Y ticks */}
          {Array.from({ length: yTicks + 1 }).map((_, i) => {
            const val = Math.round((maxCount * i) / yTicks);
            const y = PADDING.top + chartH - (chartH * i) / yTicks;
            return (
              <g key={i}>
                <line
                  x1={PADDING.left}
                  x2={PADDING.left + chartW}
                  y1={y}
                  y2={y}
                  stroke="#e5e7eb"
                  strokeWidth={1}
                />
                <text x={PADDING.left - 8} y={y + 4} textAnchor="end" fontSize={10} fill="#6b7280">
                  {val}
                </text>
              </g>
            );
          })}

          {/* Line */}
          <polyline
            points={polyline}
            fill="none"
            stroke="#ea580c"
            strokeWidth={2}
          />

          {/* Dots */}
          {points.map((p) => (
            <circle key={p.day} cx={p.x} cy={p.y} r={4} fill="#ea580c" />
          ))}

          {/* X labels */}
          {points.map((p) => (
            <text
              key={p.day}
              x={p.x}
              y={PADDING.top + chartH + 16}
              textAnchor="middle"
              fontSize={9}
              fill="#6b7280"
            >
              {p.day.slice(5)}
            </text>
          ))}

          {/* Axes */}
          <line x1={PADDING.left} x2={PADDING.left} y1={PADDING.top} y2={PADDING.top + chartH} stroke="#d1d5db" />
          <line x1={PADDING.left} x2={PADDING.left + chartW} y1={PADDING.top + chartH} y2={PADDING.top + chartH} stroke="#d1d5db" />
        </svg>
      </div>

      {/* Ex 4: accessible table beneath the chart for non-SVG users */}
      <details className="mt-2">
        <summary className="cursor-pointer text-xs text-gray-500 hover:text-gray-700">
          View data table
        </summary>
        <table className="mt-2 w-full text-sm">
          <caption className="sr-only">Orders per day</caption>
          <thead>
            <tr className="border-b">
              <th scope="col" className="py-1 text-left font-medium text-gray-700">Date</th>
              <th scope="col" className="py-1 text-right font-medium text-gray-700">Orders</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.day} className="border-b last:border-0">
                <td className="py-1 text-gray-600">{d.day}</td>
                <td className="py-1 text-right text-gray-600">{d.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
