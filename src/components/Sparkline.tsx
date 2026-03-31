import { ResponsiveContainer, LineChart, Line } from "recharts";

export function Sparkline({
  data,
  stroke,
}: {
  data: number[];
  stroke: string;
}) {
  const chartData = data.map((v, i) => ({ i, v }));
  return (
    <div className="h-12">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
          <Line
            type="monotone"
            dataKey="v"
            stroke={stroke}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
