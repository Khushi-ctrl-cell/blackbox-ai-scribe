import { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const logLines = [
  '[SYS] Kernel watchdog: OK',
  '[AI] Model inference: 12ms latency',
  '[SENS] Calibration check: PASS',
  '[AUDIO] FFT analysis: 4096 samples processed',
  '[STORE] Write buffer: 23.4 MB/s',
  '[SYS] Memory usage: 2.1GB / 8.0GB',
  '[AI] Anomaly detection: scanning window T-300s',
  '[SENS] Accelerometer bias: 0.002g drift',
  '[STRUCT] Strain gauge S-12: 847 µε',
  '[ELEC] Ground fault monitor: clear',
  '[AI] Pattern match: 94.2% confidence',
  '[SYS] Thermal throttle: inactive',
  '[AUDIO] Bearing signature: within tolerance',
  '[STORE] Index rebuild: complete',
];

export function SystemLog() {
  const [lines, setLines] = useState<string[]>(logLines.slice(0, 6));

  useEffect(() => {
    const interval = setInterval(() => {
      const newLine = logLines[Math.floor(Math.random() * logLines.length)];
      const timestamp = new Date().toLocaleTimeString('en-US', {
        hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit',
      });
      setLines(prev => [...prev, `${timestamp} ${newLine}`].slice(-12));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-md border border-border bg-card p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <Terminal className="h-4 w-4 text-nominal" />
        <h2 className="font-sans text-sm font-semibold tracking-wider text-nominal text-glow-green">
          SYSTEM LOG
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto bg-background/50 rounded p-2 scanline">
        {lines.map((line, i) => (
          <div key={i} className="text-[11px] leading-5 text-foreground/80 font-mono">
            <span className="text-muted-foreground">&gt; </span>
            {line}
          </div>
        ))}
        <span className="inline-block w-1.5 h-3.5 bg-nominal pulse-recording ml-0.5" />
      </div>
    </div>
  );
}
