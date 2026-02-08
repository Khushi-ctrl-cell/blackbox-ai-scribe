import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Eye, Code, ChevronDown, ChevronRight, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Incident, ViewMode } from '@/hooks/useIncidentStore';

interface Props {
  incident: Incident | null;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function FailurePanel({ incident, viewMode, onViewModeChange }: Props) {
  const [showFactors, setShowFactors] = useState(true);

  if (!incident) {
    return (
      <div className="rounded-md border border-border bg-card p-8 h-full flex flex-col items-center justify-center">
        <AlertCircle className="h-12 w-12 text-muted-foreground/30 mb-4" />
        <p className="text-sm text-muted-foreground">Select an incident to view failure analysis</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-border bg-card p-4 h-full flex flex-col overflow-y-auto scrollbar-thin">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-critical" />
          <h2 className="font-sans text-sm font-semibold tracking-wider text-critical text-glow-red">
            WHY IT FAILED
          </h2>
        </div>
        <div className="flex border border-border rounded overflow-hidden">
          <button
            onClick={() => onViewModeChange('simple')}
            className={`flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold tracking-wider transition-all ${
              viewMode === 'simple' ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Eye className="h-3 w-3" />
            SIMPLE
          </button>
          <button
            onClick={() => onViewModeChange('technical')}
            className={`flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold tracking-wider border-l border-border transition-all ${
              viewMode === 'technical' ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Code className="h-3 w-3" />
            TECHNICAL
          </button>
        </div>
      </div>

      {/* Root Cause */}
      <div className="rounded border border-critical/20 bg-critical/5 px-4 py-3 mb-4">
        <span className="text-[9px] font-bold tracking-widest text-critical">ROOT CAUSE</span>
        <p className="text-sm text-foreground mt-1.5 leading-relaxed">{incident.rootCause}</p>
      </div>

      {/* Explanation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="mb-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-3.5 w-3.5 text-primary" />
            <span className="text-[10px] font-bold tracking-widest text-primary">
              {viewMode === 'simple' ? 'PLAIN ENGLISH' : 'TECHNICAL ANALYSIS'}
            </span>
          </div>
          <div className="rounded border border-border bg-secondary/30 px-4 py-3">
            <p className="text-xs text-foreground/90 leading-relaxed">
              {viewMode === 'simple' ? incident.simpleExplanation : incident.technicalExplanation}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Contributing Factors */}
      <div className="mb-2">
        <button
          onClick={() => setShowFactors(!showFactors)}
          className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-muted-foreground hover:text-foreground transition-colors w-full"
        >
          {showFactors ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          CONTRIBUTING FACTORS ({incident.contributingFactors.length})
        </button>
      </div>
      <AnimatePresence>
        {showFactors && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <ul className="space-y-1.5 pl-1">
              {incident.contributingFactors.map((factor, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-2 text-xs text-secondary-foreground"
                >
                  <span className="text-primary mt-1">▸</span>
                  {factor}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
