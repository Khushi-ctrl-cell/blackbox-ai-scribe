import { motion } from 'framer-motion';
import { Plane, Factory, Heart, ShieldAlert } from 'lucide-react';
import type { Industry } from '@/hooks/useIncidentStore';

const industries = [
  { id: 'all' as const, label: 'ALL', icon: null },
  { id: 'aviation' as const, label: 'AVIATION', icon: Plane },
  { id: 'industrial' as const, label: 'INDUSTRIAL', icon: Factory },
  { id: 'healthcare' as const, label: 'HEALTHCARE', icon: Heart },
  { id: 'defense' as const, label: 'DEFENSE', icon: ShieldAlert },
];

interface Props {
  selected: Industry | 'all';
  onSelect: (industry: Industry | 'all') => void;
}

export function IndustrySelector({ selected, onSelect }: Props) {
  return (
    <div className="flex gap-2">
      {industries.map(ind => {
        const isActive = selected === ind.id;
        const Icon = ind.icon;
        return (
          <button
            key={ind.id}
            onClick={() => onSelect(ind.id)}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded text-[10px] font-bold tracking-widest uppercase transition-all duration-200 border ${
              isActive
                ? 'border-primary/50 bg-primary/10 text-primary'
                : 'border-border bg-card text-muted-foreground hover:text-foreground hover:border-muted-foreground/30'
            }`}
          >
            {Icon && <Icon className="h-3 w-3" />}
            {ind.label}
            {isActive && (
              <motion.div
                layoutId="industry-indicator"
                className="absolute inset-0 rounded border border-primary/30 bg-primary/5"
                style={{ zIndex: -1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
