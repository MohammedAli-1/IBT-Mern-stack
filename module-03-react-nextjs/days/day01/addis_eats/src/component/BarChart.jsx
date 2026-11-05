/**
 * BarChart — SVG bar chart, readable without colour (pattern fills + labels).
 * Axis always starts at zero.
 */

const WIDTH = 480;
const HEIGHT = 260;
const PADDING = { top: 20, right: 20, bottom: 50, left: 70 };
const INNER_W = WIDTH - PADDING.left - PADDING.right;
const INNER_H = HEIGHT - PADDING.top - PADDING.bottom;

// Distinct patterns so bars are distinguishable without colour.
const PATTERNS = ["url(#p0)", "url(#p1)", "url(#p2)", "url(#p3)"];

function Defs() {
  return (
    <defs>
      {/* Horizontal lines */}
      <pattern id="p0" width="6" height="6" patternUnits="userSpaceOnUse">
        <line x1="0" y1="3" x2="6" y2="3" stroke="#555" strokeWidth="1.5" />
      </pattern>
      {/* Vertical lines */}
      <pattern id="p1" width="6" height="6" patternUnits="userSpaceOnUse">
        <line x1="3" y1="0" x2="3" y2="6" stroke="#555" strokeWidth="1.5" />
      </pattern>
      {/* Diagonal */}
      <pattern id="p2" width="6" height="6" patternUnits="userSpaceOnUse">
        <line x1="0" y1="6" x2="6" y2="0" stroke="#555" strokeWidth="1.5" />
      </pattern>
      {/* Cross-hatch */}
      <pattern id="p3" width="6" height="6" patternUnits="userSpaceOnUse">
        <line x1="0" y1="3" x2="6" y2="3" stroke="#555" strokeWidth="1" />
        <line x1="3" y1="0" x2="3" y2="6" stroke="#555" strokeWidth="1" />
      </pattern>
    </defs>
  );
}

function fmt(n) {
  return n.toLocaleString("en-ET") + " ETB";
}

export default function BarChart({ data, unit = "ETB" }) {
  if (!data || data.length === 0) return null;

  const maxVal = Math.max(...data.map((d) => d.total));
  const barW = INNER_W / data.length - 10;

  // Nice round Y axis max.
  const yMax = Math.ceil(maxVal / 1000) * 1000 || 1000;
  const yTicks = [0, yMax * 0.25, yMax * 0.5, yMax * 0.75, yMax];

  function yPos(val) {
    return INNER_H - (val / yMax) * INNER_H;
  }

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      width="100%"
      role="img"
      aria-label={`Bar chart: revenue by neighbourhood in ${unit}`}
      style={{ display: "block", maxWidth: WIDTH }}
    >
      <Defs />

      <g transform={`translate(${PADDING.left},${PADDING.top})`}>
        {/* Y axis ticks + gridlines */}
        {yTicks.map((tick) => (
          <g key={tick} transform={`translate(0,${yPos(tick)})`}>
            <line x1={-6} y1={0} x2={INNER_W} y2={0} stroke="#ccc" />
            <text
              x={-10}
              y={4}
              textAnchor="end"
              fontSize={11}
              fill="currentColor"
            >
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

        {/* Bars */}
        {data.map((d, i) => {
          const x = i * (INNER_W / data.length) + (INNER_W / data.length - barW) / 2;
          const barH = (d.total / yMax) * INNER_H;
          const y = yPos(d.total);

          return (
            <g key={d.neighbourhood}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={barH}
                fill={PATTERNS[i % PATTERNS.length]}
                stroke="#333"
                strokeWidth={1}
                aria-label={`${d.neighbourhood}: ${fmt(d.total)}`}
              />
              {/* Value label above bar */}
              <text
                x={x + barW / 2}
                y={y - 4}
                textAnchor="middle"
                fontSize={10}
                fill="currentColor"
              >
                {(d.total / 1000).toFixed(1)}k
              </text>
              {/* X axis label */}
              <text
                x={x + barW / 2}
                y={INNER_H + 18}
                textAnchor="middle"
                fontSize={11}
                fill="currentColor"
              >
                {d.neighbourhood}
              </text>
            </g>
          );
        })}

        {/* Axes */}
        <line x1={0} y1={0} x2={0} y2={INNER_H} stroke="#333" />
        <line x1={0} y1={INNER_H} x2={INNER_W} y2={INNER_H} stroke="#333" />
      </g>
    </svg>
  );
}
