import { motion } from 'framer-motion';
import { AlertTriangle, AlertCircle, CheckCircle, ChevronRight } from 'lucide-react';
import type { Incident, SystemStatus } from '@/hooks/useIncidentStore';

const statusIcons: Record<SystemStatus, typeof AlertCircle> = {
  normal: CheckCircle,
  anomaly: AlertTriangle,
  failure: AlertCircle,
};

const statusColors: Record<SystemStatus, string> = {
  normal: 'text-nominal border-nominal/30',
  anomaly: 'text-primary border-primary/30',
  failure: 'text-critical border-critical/30',
};

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

interface Props {
  incidents: Incident[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function IncidentList({ incidents, selectedId, onSelect }: Props) {
  return (
    <div className="space-y-2">
      {incidents.map((inc, i) => {
        const Icon = statusIcons[inc.status];
        const color = statusColors[inc.status];
        const isSelected = selectedId === inc.id;
        return (
          <motion.button
            key={inc.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelect(inc.id)}
            className={`w-full text-left rounded border px-3 py-2.5 transition-all duration-200 ${
              isSelected
                ? `${color} bg-card border-l-2`
                : 'border-border bg-card/50 hover:bg-card hover:border-muted-foreground/20'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2 flex-1 min-w-0">
                <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${color.split(' ')[0]}`} />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">{inc.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-muted-foreground tabular-nums">{formatTime(inc.timestamp)}</span>
                    <span className="text-[10px] text-muted-foreground">•</span>
                    <span className="text-[10px] text-muted-foreground">{inc.duration}</span>
                    <span className="text-[10px] text-muted-foreground">•</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${color.split(' ')[0]}`}>
                      {inc.status}
                    </span>
                  </div>
                </div>
              </div>
              <ChevronRight className={`h-4 w-4 shrink-0 mt-1 transition-transform ${isSelected ? 'text-foreground rotate-90' : 'text-muted-foreground'}`} />
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
