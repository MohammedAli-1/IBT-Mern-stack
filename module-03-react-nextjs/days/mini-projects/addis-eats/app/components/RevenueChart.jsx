"use client";

// Ex 2: Revenue bar chart — fixed height, ETB tick formatting
export default function RevenueChart({ data }) {
  if (!data.length) {
    return <p className="text-gray-500 text-sm">No revenue data yet.</p>;
  }

  const W = 600;
  const H = 220;
  const PADDING = { top: 20, right: 20, bottom: 40, left: 70 };
  const chartW = W - PADDING.left - PADDING.right;
  const chartH = H - PADDING.top - PADDING.bottom;

  const maxRevenue = Math.max(...data.map((d) => d.revenue), 1);
  const barWidth = Math.max(8, (chartW / data.length) * 0.6);
  const gap = chartW / data.length;

  const yTicks = 4;

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ maxWidth: W }}
        role="img"
        aria-label="Revenue bar chart"
      >
        {/* Y axis ticks */}
        {Array.from({ length: yTicks + 1 }).map((_, i) => {
          const val = Math.round((maxRevenue * i) / yTicks);
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
              <text
                x={PADDING.left - 8}
                y={y + 4}
                textAnchor="end"
                fontSize={10}
                fill="#6b7280"
              >
                {val.toLocaleString()} ETB
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((d, i) => {
          const barH = (d.revenue / maxRevenue) * chartH;
          const x = PADDING.left + i * gap + gap / 2 - barWidth / 2;
          const y = PADDING.top + chartH - barH;
          return (
            <g key={d.day}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barH}
                fill="#ea580c"
                rx={3}
              />
              <text
                x={x + barWidth / 2}
                y={PADDING.top + chartH + 16}
                textAnchor="middle"
                fontSize={9}
                fill="#6b7280"
              >
                {d.day.slice(5)}
              </text>
            </g>
          );
        })}

        {/* Axes */}
        <line
          x1={PADDING.left}
          x2={PADDING.left}
          y1={PADDING.top}
          y2={PADDING.top + chartH}
          stroke="#d1d5db"
        />
        <line
          x1={PADDING.left}
          x2={PADDING.left + chartW}
          y1={PADDING.top + chartH}
          y2={PADDING.top + chartH}
          stroke="#d1d5db"
        />
      </svg>
    </div>
  );
}
