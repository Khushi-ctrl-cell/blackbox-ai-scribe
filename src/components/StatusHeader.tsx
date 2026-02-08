import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, WifiOff, HardDrive, Lock, Database, Settings, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { SystemStatus } from '@/hooks/useIncidentStore';

interface StatusHeaderProps {
  isRecording: boolean;
  uptime: number;
  systemStatus: SystemStatus;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'dashboard', label: 'DASHBOARD' },
  { id: 'timeline', label: 'TIMELINE' },
  { id: 'failure', label: 'WHY IT FAILED' },
  { id: 'evidence', label: 'EVIDENCE' },
  { id: 'report', label: 'REPORT' },
];

const statusConfig: Record<SystemStatus, { label: string; class: string }> = {
  normal: { label: 'NORMAL', class: 'text-nominal text-glow-green' },
  anomaly: { label: 'ANOMALY DETECTED', class: 'text-primary text-glow-amber' },
  failure: { label: 'FAILURE', class: 'text-critical text-glow-red' },
};

function formatUptime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function StatusHeader({ isRecording, uptime, systemStatus, activeTab, onTabChange }: StatusHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const status = statusConfig[systemStatus];

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h1 className="font-sans text-lg font-bold tracking-wider text-primary text-glow-amber">
              BLACKBOX AI
            </h1>
          </div>
          <span className="text-[10px] text-muted-foreground font-mono">v3.2.1</span>
          <div className="h-4 w-px bg-border" />
          <div className={`text-xs font-bold tracking-widest ${status.class}`}>
            ● {status.label}
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <WifiOff className="h-3.5 w-3.5" />
            <span>OFFLINE</span>
          </div>
          <div className="flex items-center gap-1.5 text-nominal">
            <HardDrive className="h-3.5 w-3.5" />
            <span>847GB</span>
          </div>
          <div className="flex items-center gap-1.5 text-nominal">
            <Lock className="h-3.5 w-3.5" />
            <span>TAMPER-PROOF</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Database className="h-3.5 w-3.5" />
            <span>LOCAL</span>
          </div>
          <div className="flex items-center gap-2">
            {isRecording && (
              <motion.div className="h-2 w-2 rounded-full bg-critical pulse-recording" />
            )}
            <span className={isRecording ? 'text-critical font-bold' : 'text-muted-foreground'}>
              {isRecording ? 'REC' : 'STANDBY'}
            </span>
          </div>
          <div className="font-mono text-foreground tabular-nums">
            {formatUptime(uptime)}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-3.5 w-3.5" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-critical pulse-recording" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Settings className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="px-6 flex gap-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`nav-tab ${activeTab === tab.id ? 'active text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
