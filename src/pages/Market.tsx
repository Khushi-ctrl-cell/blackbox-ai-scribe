import { motion } from 'framer-motion';
import { Globe, TrendingUp, Target, ArrowRight, Briefcase, DollarSign, Users, BarChart3 } from 'lucide-react';
import { SiteNav } from '@/components/SiteNav';

const markets = [
  { name: 'Aviation Safety Tech', tam: '$18.4B', growth: '12.3% CAGR', desc: 'Flight data recorders, predictive maintenance, safety analytics' },
  { name: 'Industrial Monitoring', tam: '$24.7B', growth: '14.1% CAGR', desc: 'SCADA, IIoT sensors, plant safety systems' },
  { name: 'Medical Device Compliance', tam: '$8.2B', growth: '9.8% CAGR', desc: 'Healthcare equipment monitoring, alarm management' },
  { name: 'Defense Infrastructure', tam: '$31.5B', growth: '8.4% CAGR', desc: 'Radar systems, base monitoring, secure communications' },
];

const gtmPhases = [
  { phase: 'Phase 1', title: 'Industrial Pilots', timeline: '2026 H1', items: ['3-5 manufacturing plant pilots', 'Direct sales approach', '45-day sales cycle', '2-week deployment'] },
  { phase: 'Phase 2', title: 'OEM Partnerships', timeline: '2026 H2', items: ['Embedded integration with Siemens, ABB', 'Channel partner program', 'System integrator network'] },
  { phase: 'Phase 3', title: 'Government Contracts', timeline: '2027 H1', items: ['SBIR/STTR applications', 'Defense pilot programs', 'FedRAMP equivalent prep'] },
  { phase: 'Phase 4', title: 'Global Licensing', timeline: '2027 H2+', items: ['International expansion', 'White-label program', 'Platform ecosystem'] },
];

const moatFactors = [
  { title: 'Proprietary Causal Engine', desc: 'Not GPT-for-logs — structured causal inference with event-sequence memory graphs' },
  { title: 'Industry-Specific Libraries', desc: 'Domain-tuned failure patterns for aviation, industrial, healthcare, defense' },
  { title: 'Data Network Effects', desc: 'Each deployment improves anomaly models. Cross-industry pattern database.' },
  { title: 'Edge-First Architecture', desc: 'Offline-native design impossible to replicate with cloud-first approaches' },
];

const esgPoints = [
  'Reduces catastrophic failures',
  'Reduces environmental damage from industrial incidents',
  'Improves infrastructure resilience',
  'Supports climate-safe operations',
];

export default function Market() {
  return (
    <div className="min-h-screen bg-background noise-bg">
      <SiteNav />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 sm:mb-16">
          <h1 className="font-sans text-2xl sm:text-4xl font-bold text-primary text-glow-amber mb-3">MARKET OPPORTUNITY</h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            $82.8B total addressable market across safety-critical industries.
          </p>
        </motion.div>

        {/* TAM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 sm:mb-20">
          {markets.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded border border-border bg-card p-5"
            >
              <Globe className="h-5 w-5 text-primary mb-3" />
              <h3 className="text-xs font-bold tracking-wider text-foreground mb-1">{m.name}</h3>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-xl font-bold text-primary">{m.tam}</span>
                <span className="text-[10px] text-nominal font-bold">{m.growth}</span>
              </div>
              <p className="text-[11px] text-muted-foreground">{m.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Data Moat */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-12 sm:mb-20">
          <h2 className="text-center font-sans text-lg font-bold tracking-wider text-foreground mb-6">COMPETITIVE MOAT</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {moatFactors.map(f => (
              <div key={f.title} className="rounded border border-primary/20 bg-primary/5 p-4">
                <h3 className="text-xs font-bold text-primary tracking-wider mb-1">{f.title}</h3>
                <p className="text-[11px] text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-primary font-bold mt-4">
            "BlackBox AI becomes smarter with every failure it explains."
          </p>
        </motion.div>

        {/* GTM */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-12 sm:mb-20">
          <h2 className="text-center font-sans text-lg font-bold tracking-wider text-foreground mb-6">GO-TO-MARKET STRATEGY</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {gtmPhases.map((p, i) => (
              <div key={p.phase} className="rounded border border-border bg-card p-4 relative">
                <div className="text-[10px] font-bold tracking-widest text-primary mb-1">{p.phase}</div>
                <h3 className="text-sm font-bold text-foreground mb-1">{p.title}</h3>
                <div className="text-[10px] text-muted-foreground mb-3">{p.timeline}</div>
                <ul className="space-y-1">
                  {p.items.map(item => (
                    <li key={item} className="text-[11px] text-muted-foreground flex items-start gap-1.5">
                      <ArrowRight className="h-3 w-3 text-primary shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pilot Evidence */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mb-12 sm:mb-20">
          <h2 className="text-center font-sans text-lg font-bold tracking-wider text-foreground mb-6">TRACTION & VALIDATION</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { icon: Briefcase, label: 'Pilot in discussion with mid-size industrial plant' },
              { icon: BarChart3, label: 'Simulated deployment across 120 sensor nodes' },
              { icon: DollarSign, label: '3.2M data points processed in stress test' },
            ].map(p => (
              <div key={p.label} className="rounded border border-nominal/30 bg-nominal/5 p-4 flex items-start gap-3">
                <p.icon className="h-5 w-5 text-nominal shrink-0" />
                <p className="text-xs text-foreground/80">{p.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ESG */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          <div className="rounded border border-nominal/30 bg-nominal/5 p-6 max-w-2xl mx-auto text-center">
            <h3 className="font-sans text-sm font-bold tracking-wider text-nominal mb-3">ESG & SUSTAINABILITY IMPACT</h3>
            <div className="grid grid-cols-2 gap-2">
              {esgPoints.map(p => (
                <div key={p} className="text-[11px] text-muted-foreground flex items-center gap-2 justify-center">
                  <span className="text-nominal">●</span>{p}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
