'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function RepairBarChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="success" fill="#10b981" radius={[4, 4, 0, 0]} name="Successful" />
        <Bar dataKey="failure" fill="#ef4444" radius={[4, 4, 0, 0]} name="Failed" />
      </BarChart>
    </ResponsiveContainer>
  );
}