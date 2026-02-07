import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import type { EventLog } from '@/hooks/useSensorData';

const severityConfig = {
  info: { icon: Info, color: 'text-muted-foreground', border: 'border-muted' },
  warning: { icon: AlertTriangle, color: 'text-primary', border: 'border-primary/30' },
  critical: { icon: AlertCircle, color: 'text-critical', border: 'border-critical/40' },
};

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function EventTimeline({ events }: { events: EventLog[] }) {
  return (
    <div className="rounded-md border border-border bg-card p-4 h-full flex flex-col">
      <h2 className="font-sans text-sm font-semibold tracking-wider text-primary mb-3 text-glow-amber">
        EVENT TIMELINE
      </h2>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
        <AnimatePresence initial={false}>
          {events.map(event => {
            const config = severityConfig[event.severity];
            const Icon = config.icon;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`border-l-2 ${config.border} pl-3 py-2`}
              >
                <div className="flex items-start gap-2">
                  <Icon className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${config.color}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-bold tracking-wider text-muted-foreground">
                        [{event.source}]
                      </span>
                      <span className="text-[10px] tabular-nums text-muted-foreground">
                        {formatTime(event.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs text-foreground leading-relaxed">{event.message}</p>
                    {event.aiSummary && (
                      <div className="mt-1.5 rounded border border-primary/10 bg-primary/5 px-2 py-1.5">
                        <span className="text-[9px] font-bold tracking-widest text-primary">AI ANALYSIS</span>
                        <p className="text-[11px] text-secondary-foreground leading-relaxed mt-0.5">
                          {event.aiSummary}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
