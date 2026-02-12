import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  onSimulate: () => void;
}

export function SimulateButton({ onSimulate }: Props) {
  const [simulating, setSimulating] = useState(false);

  const handleClick = () => {
    setSimulating(true);
    onSimulate();
    setTimeout(() => setSimulating(false), 5000);
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="destructive"
        onClick={handleClick}
        disabled={simulating}
        className="gap-2 text-xs tracking-wider font-bold relative overflow-hidden"
      >
        {simulating ? (
          <>
            <Zap className="h-4 w-4 animate-pulse" />
            SIMULATING FAILURE...
          </>
        ) : (
          <>
            <AlertTriangle className="h-4 w-4" />
            🚨 SIMULATE CRITICAL FAILURE
          </>
        )}
        {simulating && (
          <motion.div
            className="absolute inset-0 bg-critical/20"
            animate={{ opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}
      </Button>
      {simulating && (
        <span className="text-[10px] text-critical font-bold tracking-widest pulse-recording">
          ● FAILURE IN PROGRESS
        </span>
      )}
    </div>
  );
}
