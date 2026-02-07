import { motion } from 'framer-motion';
import { ArrowDown, Zap } from 'lucide-react';
import type { CausalNode, SensorStatus } from '@/hooks/useSensorData';

const nodeColors: Record<SensorStatus, string> = {
  nominal: 'border-nominal/50 bg-nominal/10 text-nominal',
  warning: 'border-primary/50 bg-primary/10 text-primary',
  critical: 'border-critical/50 bg-critical/10 text-critical',
  offline: 'border-muted bg-muted/10 text-muted-foreground',
};

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function CausalChain({ nodes }: { nodes: CausalNode[] }) {
  return (
    <div className="rounded-md border border-border bg-card p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-4 w-4 text-primary" />
        <h2 className="font-sans text-sm font-semibold tracking-wider text-primary text-glow-amber">
          CAUSAL CHAIN ANALYSIS
        </h2>
      </div>

      <div className="flex-1 flex flex-col items-center gap-1 overflow-y-auto">
        {nodes.map((node, i) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            className="flex flex-col items-center w-full"
          >
            <div className={`w-full max-w-xs rounded border px-3 py-2 ${nodeColors[node.severity]}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold">{node.label}</span>
                <span className="text-[9px] tabular-nums opacity-70">{formatTime(node.timestamp)}</span>
              </div>
            </div>
            {i < nodes.length - 1 && (
              <ArrowDown className="h-4 w-4 text-muted-foreground my-1" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-3 rounded border border-primary/20 bg-primary/5 px-3 py-2">
        <span className="text-[9px] font-bold tracking-widest text-primary">ROOT CAUSE</span>
        <p className="text-[11px] text-secondary-foreground mt-1 leading-relaxed">
          Flow regulator calibration drift initiated cascading failure through turbine overspeed → pressure exceedance → thermal overload. Recommend immediate regulator replacement and turbine inspection.
        </p>
      </div>
    </div>
  );
}
