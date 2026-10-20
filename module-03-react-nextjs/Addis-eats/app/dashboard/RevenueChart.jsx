'use client';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line,
} from 'recharts';

function ETBFormatter(value) {
  return `ETB ${value.toLocaleString()}`;
}

export default function RevenueChart({ revenueData, timeData }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
      {/* Bar chart — revenue by neighbourhood */}
      <div className="card" style={{ padding: '1.5rem', minHeight: '340px' }}>
        <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1.25rem', color: 'var(--color-primary-dark)' }}>
          Revenue by Neighbourhood (ETB)
        </h2>
        {revenueData.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', paddingTop: '3rem' }}>No revenue data yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2d9d3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(v) => `${v}`} tick={{ fontSize: 11 }} />
              <Tooltip formatter={ETBFormatter} />
              <Legend />
              <Bar dataKey="revenue" name="Revenue" fill="#c8390c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Line chart — orders over time */}
      <div className="card" style={{ padding: '1.5rem', minHeight: '340px' }}>
        <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1.25rem', color: 'var(--color-primary-dark)' }}>
          Orders Over Time
        </h2>
        {timeData.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', paddingTop: '3rem' }}>No order data yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={timeData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2d9d3" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="orders" orientation="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="revenue" orientation="right" tickFormatter={(v) => `${v}`} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v, name) => name === 'revenue' ? ETBFormatter(v) : v} />
              <Legend />
              <Line yAxisId="orders" type="monotone" dataKey="orders" name="Orders" stroke="#1565c0" strokeWidth={2} dot={{ r: 4 }} />
              <Line yAxisId="revenue" type="monotone" dataKey="revenue" name="Revenue" stroke="#f4a226" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
