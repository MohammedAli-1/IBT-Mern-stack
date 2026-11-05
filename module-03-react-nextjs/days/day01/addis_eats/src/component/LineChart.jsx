/**
 * LineChart — SVG line chart for orders over time.
 * Uses distinct point markers so it's readable without colour.
 */

const WIDTH = 480;
const HEIGHT = 260;
const PADDING = { top: 20, right: 20, bottom: 60, left: 70 };
const INNER_W = WIDTH - PADDING.left - PADDING.right;
const INNER_H = HEIGHT - PADDING.top - PADDING.bottom;

function fmt(n) {
  return n.toLocaleString("en-ET") + " ETB";
}

function shortDate(iso) {
  const [, , day] = iso.split("-");
  return `Sep ${parseInt(day, 10)}`;
}

export default function LineChart({ data, unit = "ETB" }) {
  if (!data || data.length === 0) return null;

  const maxVal = Math.max(...data.map((d) => d.total));
  const yMax = Math.ceil(maxVal / 1000) * 1000 || 1000;
  const yTicks = [0, yMax * 0.25, yMax * 0.5, yMax * 0.75, yMax];

  function xPos(i) {
    return data.length === 1 ? INNER_W / 2 : (i / (data.length - 1)) * INNER_W;
  }

  function yPos(val) {
    return INNER_H - (val / yMax) * INNER_H;
  }

  const points = data.map((d, i) => `${xPos(i)},${yPos(d.total)}`).join(" ");

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      width="100%"
      role="img"
      aria-label={`Line chart: total revenue over time in ${unit}`}
      style={{ display: "block", maxWidth: WIDTH }}
    >
      <g transform={`translate(${PADDING.left},${PADDING.top})`}>
        {/* Y axis ticks + gridlines */}
        {yTicks.map((tick) => (
          <g key={tick} transform={`translate(0,${yPos(tick)})`}>
            <line x1={-6} y1={0} x2={INNER_W} y2={0} stroke="#ccc" />
            <text x={-10} y={4} textAnchor="end" fontSize={11} fill="currentColor">
              {(tick / 1000).toFixed(tick % 1000 === 0 ? 0 : 1)}k
            </text>
          </g>
        ))}

        {/* Y axis label */}
        <text
          transform={`translate(${-PADDING.left + 12},${INNER_H / 2}) rotate(-90)`}
          textAnchor="middle"
          fontSize={11}
          fill="currentColor"
        >
          {unit}
        </text>

        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke="#333"
          strokeWidth={2}
          strokeDasharray="none"
        />

        {/* Points + X labels */}
        {data.map((d, i) => (
          <g key={d.date} transform={`translate(${xPos(i)},${yPos(d.total)})`}>
            {/* Diamond marker — visible without colour */}
            <polygon
              points="0,-5 5,0 0,5 -5,0"
              fill="#333"
              aria-label={`${shortDate(d.date)}: ${fmt(d.total)}`}
            />
            <text
              y={-10}
              textAnchor="middle"
              fontSize={10}
              fill="currentColor"
            >
              {(d.total / 1000).toFixed(1)}k
            </text>
          </g>
        ))}

        {/* X axis labels */}
        {data.map((d, i) => (
          <text
            key={`label-${d.date}`}
            x={xPos(i)}
            y={INNER_H + 16}
            textAnchor="end"
            transform={`rotate(-40, ${xPos(i)}, ${INNER_H + 16})`}
            fontSize={10}
            fill="currentColor"
          >
            {shortDate(d.date)}
          </text>
        ))}

        {/* Axes */}
        <line x1={0} y1={0} x2={0} y2={INNER_H} stroke="#333" />
        <line x1={0} y1={INNER_H} x2={INNER_W} y2={INNER_H} stroke="#333" />
      </g>
    </svg>
  );
}
