'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function ProductBarChart({ data, colors }: { data: { category: string; count: number }[]; colors: any }) {
  return (
    <div style={{ width: '100%', height: 300, backgroundColor: colors.lightBlue, borderRadius: 8, padding: 16 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          barCategoryGap="30%"
        >
          <XAxis dataKey="category" stroke={colors.darkText} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill={colors.primary} barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
