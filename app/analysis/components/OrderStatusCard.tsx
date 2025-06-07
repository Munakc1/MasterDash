'use client';

export default function OrderStatusCard({ label, count, total, bgColor }: { label: string; count: number; total: number; bgColor: string }) {
  const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : '0';
  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: 'white',
        borderRadius: 10,
        padding: '20px 15px',
        textAlign: 'center',
        fontWeight: '600',
        boxShadow: '0 2px 8px rgb(0 0 0 / 0.15)',
      }}
    >
      <div style={{ fontSize: 22 }}>{label}</div>
      <div style={{ fontSize: 32 }}>{count}</div>
      <div style={{ fontSize: 14, opacity: 0.9 }}>{percentage}%</div>
    </div>
  );
}
