import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, FileText, AudioLines, Thermometer, Search } from 'lucide-react';
import type { EvidenceItem, Incident } from '@/hooks/useIncidentStore';

const typeIcons: Record<EvidenceItem['type'], typeof Activity> = {
  sensor: Activity,
  log: FileText,
  audio: AudioLines,
  environmental: Thermometer,
};

const typeColors: Record<EvidenceItem['type'], string> = {
  sensor: 'text-info',
  log: 'text-primary',
  audio: 'text-nominal',
  environmental: 'text-warning',
};

function EvidenceChart({ item, isSelected }: { item: EvidenceItem; isSelected: boolean }) {
  const max = Math.max(...item.data);
  const min = Math.min(...item.data);
  const range = max - min || 1;
  const h = isSelected ? 120 : 60;
  const w = 280;

  const points = item.data.map((v, i) => ({
    x: (i / (item.data.length - 1)) * w,
    y: h - ((v - min) / range) * (h - 8) - 4,
  }));

  const polyline = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <svg width={w} height={h} className="w-full" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      {/* Anomaly highlight */}
      {item.anomalyRange && (
        <rect
          x={(item.anomalyRange[0] / (item.data.length - 1)) * w}
          y={0}
          width={((item.anomalyRange[1] - item.anomalyRange[0]) / (item.data.length - 1)) * w}
          height={h}
          fill="hsl(0, 75%, 50%)"
          opacity={0.08}
        />
      )}
      {/* Grid lines */}
      {[0.25, 0.5, 0.75].map(r => (
        <line key={r} x1={0} y1={h * r} x2={w} y2={h * r} stroke="hsl(225, 18%, 12%)" strokeWidth="0.5" />
      ))}
      {/* Data line */}
      <polyline fill="none" stroke="hsl(210, 70%, 55%)" strokeWidth={isSelected ? 2 : 1.5} points={polyline} />
      {/* Data points for selected */}
      {isSelected && points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={item.anomalyRange && i >= item.anomalyRange[0] && i <= item.anomalyRange[1] ? 3 : 2}
          fill={item.anomalyRange && i >= item.anomalyRange[0] && i <= item.anomalyRange[1]
            ? 'hsl(0, 75%, 50%)' : 'hsl(210, 70%, 55%)'}
        />
      ))}
    </svg>
  );
}

interface Props {
  incident: Incident | null;
}

export function EvidenceExplorer({ incident }: Props) {
  const [selectedEvidence, setSelectedEvidence] = useState<string | null>(null);
  const [filter, setFilter] = useState<EvidenceItem['type'] | 'all'>('all');

  if (!incident) {
    return (
      <div className="rounded-md border border-border bg-card p-8 h-full flex flex-col items-center justify-center">
        <Search className="h-12 w-12 text-muted-foreground/30 mb-4" />
        <p className="text-sm text-muted-foreground">Select an incident to explore evidence</p>
      </div>
    );
  }

  const filtered = filter === 'all' ? incident.evidence : incident.evidence.filter(e => e.type === filter);
  const selected = incident.evidence.find(e => e.id === selectedEvidence);

  return (
    <div className="rounded-md border border-border bg-card p-4 h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-info" />
          <h2 className="font-sans text-sm font-semibold tracking-wider text-info text-glow-blue">
            EVIDENCE EXPLORER
          </h2>
        </div>
        <div className="flex gap-1">
          {(['all', 'sensor', 'log', 'audio', 'environmental'] as const).map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase rounded transition-colors ${
                filter === t ? 'bg-info/15 text-info' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Selected evidence detail */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-3 rounded border border-info/20 bg-info/5 p-3"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-info">{selected.label}</span>
            <span className="text-[10px] text-muted-foreground">{selected.unit}</span>
          </div>
          <EvidenceChart item={selected} isSelected />
          <p className="text-[11px] text-secondary-foreground mt-2 leading-relaxed">{selected.description}</p>
        </motion.div>
      )}

      {/* Evidence list */}
      <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin">
        {filtered.map((ev, i) => {
          const Icon = typeIcons[ev.type];
          const color = typeColors[ev.type];
          const isActive = selectedEvidence === ev.id;
          return (
            <motion.button
              key={ev.id}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setSelectedEvidence(isActive ? null : ev.id)}
              className={`w-full text-left rounded border px-3 py-2 transition-all ${
                isActive
                  ? 'border-info/30 bg-info/5'
                  : 'border-border hover:border-muted-foreground/20'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Icon className={`h-3 w-3 ${color}`} />
                <span className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground">{ev.type}</span>
                <span className="text-xs font-semibold text-foreground">{ev.label}</span>
                <span className="text-[10px] text-muted-foreground ml-auto">{ev.unit}</span>
              </div>
              <EvidenceChart item={ev} isSelected={false} />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
