import { motion } from 'framer-motion';
import { Cpu, ArrowDown, HardDrive, Brain, Shield, FileText, Radio, Lock, Wifi, WifiOff } from 'lucide-react';
import { SiteNav } from '@/components/SiteNav';

const layers = [
  { icon: Radio, label: 'HARDWARE SENSOR LAYER', desc: 'Temperature, voltage, pressure, motion, audio, vibration sensors', color: 'text-info', bg: 'bg-info/10 border-info/30' },
  { icon: Cpu, label: 'SIGNAL PROCESSING', desc: 'Real-time FFT, anomaly thresholding, multi-sensor fusion, edge preprocessing', color: 'text-primary', bg: 'bg-primary/10 border-primary/30' },
  { icon: Brain, label: 'AI CAUSAL REASONING ENGINE', desc: 'Event-sequence memory graph, causal inference, confidence scoring, pattern matching', color: 'text-critical', bg: 'bg-critical/10 border-critical/30' },
  { icon: Lock, label: 'SECURE LEDGER STORAGE', desc: 'AES-256 encryption, tamper-evident hashing, chain-of-custody validation', color: 'text-nominal', bg: 'bg-nominal/10 border-nominal/30' },
  { icon: FileText, label: 'HUMAN REPORT INTERFACE', desc: 'Auto-generated causal narratives, simple/technical views, forensic-grade export', color: 'text-primary', bg: 'bg-primary/10 border-primary/30' },
];

const specs = [
  { label: 'Inference Latency', value: '< 150ms' },
  { label: 'Sensor Channels', value: '120+' },
  { label: 'Data Processed', value: '3.2M pts' },
  { label: 'Detection Accuracy', value: '97.3%' },
  { label: 'Storage Capacity', value: '2TB local' },
  { label: 'MTTE', value: '< 2 min' },
];

const deploymentModels = [
  { title: 'Embedded Hardware Unit', desc: 'Custom SoC integration for mission-critical systems' },
  { title: 'Edge Linux Device', desc: 'ARM/x86 based ruggedized compute module' },
  { title: 'FPGA-Compatible Module', desc: 'Hardware-accelerated inference pipeline' },
  { title: 'Air-Gapped Configuration', desc: 'Zero network dependency operation mode' },
];

export default function Architecture() {
  return (
    <div className="min-h-screen bg-background noise-bg">
      <SiteNav />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 sm:mb-16">
          <h1 className="font-sans text-2xl sm:text-4xl font-bold text-primary text-glow-amber mb-3">SYSTEM ARCHITECTURE</h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Five-layer edge AI architecture — fully offline, tamper-proof, court-ready.
          </p>
        </motion.div>

        {/* Architecture Stack */}
        <div className="max-w-xl mx-auto mb-12 sm:mb-20">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.label}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 }}
              className="flex flex-col items-center"
            >
              <div className={`w-full rounded border p-4 ${layer.bg}`}>
                <div className="flex items-center gap-3">
                  <layer.icon className={`h-5 w-5 shrink-0 ${layer.color}`} />
                  <div>
                    <h3 className={`text-xs font-bold tracking-widest ${layer.color}`}>{layer.label}</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{layer.desc}</p>
                  </div>
                </div>
              </div>
              {i < layers.length - 1 && (
                <ArrowDown className="h-5 w-5 text-muted-foreground my-2" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Optional Secure Export */}
        <div className="max-w-xl mx-auto mb-12 sm:mb-20 rounded border border-nominal/30 bg-nominal/5 p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <WifiOff className="h-4 w-4 text-nominal" />
            <span className="text-xs font-bold tracking-widest text-nominal">OPTIONAL SECURE EXPORT CHANNEL</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Encrypted, authenticated data export via air-gapped USB or secure mesh network. Full chain-of-custody preserved.
          </p>
        </div>

        {/* Technical Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12 sm:mb-20"
        >
          <h2 className="text-center font-sans text-lg font-bold tracking-wider text-foreground mb-6">PERFORMANCE METRICS</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {specs.map(s => (
              <div key={s.label} className="rounded border border-border bg-card p-3 text-center">
                <div className="text-xl font-bold text-primary text-glow-amber">{s.value}</div>
                <div className="text-[9px] tracking-widest text-muted-foreground mt-1">{s.label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Deployment Models */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <h2 className="text-center font-sans text-lg font-bold tracking-wider text-foreground mb-6">DEPLOYMENT MODELS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {deploymentModels.map(d => (
              <div key={d.title} className="rounded border border-border bg-card p-4">
                <HardDrive className="h-5 w-5 text-primary mb-2" />
                <h3 className="text-xs font-bold text-foreground tracking-wider">{d.title}</h3>
                <p className="text-[11px] text-muted-foreground mt-1">{d.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="mt-12 sm:mt-20">
          <h2 className="text-center font-sans text-lg font-bold tracking-wider text-foreground mb-6">TECHNOLOGY STACK</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="rounded border border-border bg-card p-4">
              <h3 className="text-[10px] font-bold tracking-widest text-info mb-3">FRONTEND</h3>
              <ul className="space-y-1 text-[11px] text-muted-foreground">
                <li>▸ React / TypeScript</li><li>▸ Tailwind CSS</li><li>▸ Recharts / SVG</li><li>▸ Framer Motion</li>
              </ul>
            </div>
            <div className="rounded border border-border bg-card p-4">
              <h3 className="text-[10px] font-bold tracking-widest text-primary mb-3">AI / BACKEND</h3>
              <ul className="space-y-1 text-[11px] text-muted-foreground">
                <li>▸ Local inference engine</li><li>▸ Event memory graph</li><li>▸ Causal inference pipeline</li><li>▸ Multi-sensor fusion</li>
              </ul>
            </div>
            <div className="rounded border border-border bg-card p-4">
              <h3 className="text-[10px] font-bold tracking-widest text-nominal mb-3">EDGE LOGIC</h3>
              <ul className="space-y-1 text-[11px] text-muted-foreground">
                <li>▸ Anomaly detection</li><li>▸ Adaptive thresholding</li><li>▸ Tamper-proof ledger</li><li>▸ AES-256 encryption</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
