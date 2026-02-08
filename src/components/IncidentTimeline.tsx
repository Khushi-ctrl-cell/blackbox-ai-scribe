import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle, AlertCircle, Info, ChevronDown, ChevronRight } from 'lucide-react';
import type { Incident, TimelineEvent } from '@/hooks/useIncidentStore';

const severityConfig = {
  info: { icon: Info, color: 'text-muted-foreground', border: 'border-muted-foreground/30', dot: 'bg-muted-foreground' },
  warning: { icon: AlertTriangle, color: 'text-primary', border: 'border-primary/30', dot: 'bg-primary' },
  critical: { icon: AlertCircle, color: 'text-critical', border: 'border-critical/40', dot: 'bg-critical' },
};

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

interface Props {
  incident: Incident | null;
}

export function IncidentTimeline({ incident }: Props) {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  if (!incident) {
    return (
      <div className="rounded-md border border-border bg-card p-8 h-full flex flex-col items-center justify-center">
        <Clock className="h-12 w-12 text-muted-foreground/30 mb-4" />
        <p className="text-sm text-muted-foreground">Select an incident to view its timeline</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-border bg-card p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-4 w-4 text-primary" />
        <h2 className="font-sans text-sm font-semibold tracking-wider text-primary text-glow-amber">
          EVENT TIMELINE
        </h2>
        <span className="text-[10px] text-muted-foreground ml-auto">{incident.timeline.length} events</span>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="relative pl-6">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

          {incident.timeline.map((event, i) => {
            const config = severityConfig[event.severity];
            const Icon = config.icon;
            const isExpanded = expandedEvent === event.id;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative mb-4 last:mb-0"
              >
                {/* Dot */}
                <div className={`absolute -left-6 top-1.5 h-3 w-3 rounded-full border-2 border-card ${config.dot}`} />

                <button
                  onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
                  className={`w-full text-left rounded border px-3 py-2 transition-all ${
                    isExpanded ? `${config.border} bg-card` : 'border-transparent hover:border-border hover:bg-card/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`h-3.5 w-3.5 shrink-0 ${config.color}`} />
                    <span className="text-xs font-semibold text-foreground flex-1">{event.label}</span>
                    <span className="text-[10px] tabular-nums text-muted-foreground">{formatTime(event.timestamp)}</span>
                    {isExpanded ? (
                      <ChevronDown className="h-3 w-3 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-3 w-3 text-muted-foreground" />
                    )}
                  </div>
                  {isExpanded && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[11px] text-secondary-foreground mt-1.5 pl-5 leading-relaxed"
                    >
                      {event.detail}
                    </motion.p>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
