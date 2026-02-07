import { motion } from 'framer-motion';
import { Shield, Wifi, WifiOff, HardDrive } from 'lucide-react';

interface StatusHeaderProps {
  isRecording: boolean;
  uptime: number;
}

function formatUptime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function StatusHeader({ isRecording, uptime }: StatusHeaderProps) {
  return (
    <header className="border-b border-border bg-card px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h1 className="font-sans text-lg font-bold tracking-wider text-primary text-glow-amber">
              BLACKBOX AI
            </h1>
          </div>
          <span className="text-xs text-muted-foreground">v3.2.1</span>
        </div>

        <div className="flex items-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <WifiOff className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">OFFLINE MODE</span>
          </div>

          <div className="flex items-center gap-2">
            <HardDrive className="h-3.5 w-3.5 text-nominal" />
            <span className="text-nominal">LOCAL STORAGE: 847GB FREE</span>
          </div>

          <div className="flex items-center gap-2">
            {isRecording && (
              <motion.div
                className="h-2 w-2 rounded-full bg-critical pulse-recording"
              />
            )}
            <span className={isRecording ? 'text-critical' : 'text-muted-foreground'}>
              {isRecording ? 'REC' : 'STANDBY'}
            </span>
          </div>

          <div className="font-mono text-foreground tabular-nums">
            {formatUptime(uptime)}
          </div>
        </div>
      </div>
    </header>
  );
}
