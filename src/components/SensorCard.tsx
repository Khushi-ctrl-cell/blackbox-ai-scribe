import { motion } from 'framer-motion';
import type { SensorReading, SensorStatus } from '@/hooks/useSensorData';

const statusStyles: Record<SensorStatus, { text: string; glow: string; bar: string }> = {
  nominal: { text: 'text-nominal text-glow-green', glow: 'border-nominal/30', bar: 'bg-nominal' },
  warning: { text: 'text-primary text-glow-amber', glow: 'border-glow-amber', bar: 'bg-primary' },
  critical: { text: 'text-critical text-glow-red', glow: 'border-critical/50 glow-red', bar: 'bg-critical' },
  offline: { text: 'text-muted-foreground', glow: 'border-muted', bar: 'bg-muted-foreground' },
};

function MiniSparkline({ data, status }: { data: number[]; status: SensorStatus }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 32;
  const w = 120;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');

  const colors: Record<SensorStatus, string> = {
    nominal: 'hsl(145, 65%, 42%)',
    warning: 'hsl(38, 95%, 55%)',
    critical: 'hsl(0, 75%, 50%)',
    offline: 'hsl(220, 10%, 45%)',
  };

  return (
    <svg width={w} height={h} className="opacity-60">
      <polyline fill="none" stroke={colors[status]} strokeWidth="1.5" points={points} />
    </svg>
  );
}

export function SensorCard({ sensor }: { sensor: SensorReading }) {
  const style = statusStyles[sensor.status];
  const percentage = ((sensor.value - sensor.min) / (sensor.max - sensor.min)) * 100;

  return (
    <motion.div
      layout
      className={`rounded-md border bg-card p-3 transition-all ${style.glow}`}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-[10px] font-semibold tracking-widest text-muted-foreground">
          {sensor.name}
        </span>
        <span className={`text-[10px] font-bold uppercase tracking-wider ${style.text}`}>
          {sensor.status}
        </span>
      </div>

      <div className={`text-2xl font-bold tabular-nums ${style.text}`}>
        {sensor.value.toFixed(1)}
        <span className="text-xs text-muted-foreground ml-1">{sensor.unit}</span>
      </div>

      <div className="mt-2">
        <MiniSparkline data={sensor.history} status={sensor.status} />
      </div>

      <div className="mt-2 h-1 w-full rounded-full bg-secondary overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${style.bar}`}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="flex justify-between text-[9px] text-muted-foreground mt-0.5">
        <span>{sensor.min}</span>
        <span>{sensor.max}</span>
      </div>
    </motion.div>
  );
}
