import { motion } from 'framer-motion';
import { Check, X, AlertTriangle, Brain, Zap, Shield } from 'lucide-react';
import { SiteNav } from '@/components/SiteNav';

const features = [
  { feature: 'Fully Offline', traditional: false, cloudAI: false, blackbox: true },
  { feature: 'Real-time Causality', traditional: false, cloudAI: 'partial', blackbox: true },
  { feature: 'Tamper-proof Storage', traditional: false, cloudAI: false, blackbox: true },
  { feature: 'Edge AI Inference', traditional: false, cloudAI: false, blackbox: true },
  { feature: 'Auto-Generated Reports', traditional: false, cloudAI: true, blackbox: true },
  { feature: 'Multi-Sensor Fusion', traditional: false, cloudAI: 'partial', blackbox: true },
  { feature: 'Court-Ready Evidence', traditional: false, cloudAI: false, blackbox: true },
  { feature: 'Air-Gapped Operation', traditional: 'partial', cloudAI: false, blackbox: true },
  { feature: '< 2 min Explanation', traditional: false, cloudAI: 'partial', blackbox: true },
  { feature: 'Data Sovereignty', traditional: true, cloudAI: false, blackbox: true },
];

function StatusIcon({ val }: { val: boolean | string }) {
  if (val === true) return <Check className="h-4 w-4 text-nominal" />;
  if (val === 'partial') return <AlertTriangle className="h-4 w-4 text-primary" />;
  return <X className="h-4 w-4 text-critical/50" />;
}

const aiDefensibility = [
  { title: 'Proprietary Causal Inference Engine', desc: 'Not a wrapper around GPT. Structured event-sequence reasoning with probabilistic causal graphs.' },
  { title: 'Multi-Sensor Fusion Architecture', desc: 'Correlates signals across hardware sensors, software logs, audio, and environmental data simultaneously.' },
  { title: 'Event-Sequence Memory Graph', desc: 'Maintains temporal relationships between events for pattern matching across failure modes.' },
  { title: 'Local Reasoning Architecture', desc: 'All inference happens on-device. No cloud dependency. No data leaves the hardware.' },
];

const riskMitigation = [
  { risk: 'Sensor integration variability', mitigation: 'Adaptive thresholding with auto-calibration' },
  { risk: 'False positive alerts', mitigation: 'Redundant multi-sensor fusion + confidence scoring' },
  { risk: 'Model drift over time', mitigation: 'Continuous edge retraining with domain-locked bounds' },
  { risk: 'Hardware failure', mitigation: 'Redundant storage + graceful degradation protocols' },
];

export default function Competitive() {
  return (
    <div className="min-h-screen bg-background noise-bg">
      <SiteNav />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 sm:mb-16">
          <h1 className="font-sans text-2xl sm:text-4xl font-bold text-primary text-glow-amber mb-3">COMPETITIVE POSITIONING</h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            BlackBox AI vs. traditional logging and cloud AI platforms.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-12 sm:mb-20">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-3 text-[10px] tracking-widest text-muted-foreground">FEATURE</th>
                  <th className="text-center py-3 px-3 text-[10px] tracking-widest text-muted-foreground">TRADITIONAL LOGS</th>
                  <th className="text-center py-3 px-3 text-[10px] tracking-widest text-muted-foreground">CLOUD AI</th>
                  <th className="text-center py-3 px-3 text-[10px] tracking-widest text-primary font-bold">BLACKBOX AI</th>
                </tr>
              </thead>
              <tbody>
                {features.map(f => (
                  <tr key={f.feature} className="border-b border-border/50">
                    <td className="py-2.5 px-3 font-bold text-foreground">{f.feature}</td>
                    <td className="py-2.5 px-3 text-center"><div className="flex justify-center"><StatusIcon val={f.traditional} /></div></td>
                    <td className="py-2.5 px-3 text-center"><div className="flex justify-center"><StatusIcon val={f.cloudAI} /></div></td>
                    <td className="py-2.5 px-3 text-center"><div className="flex justify-center"><StatusIcon val={f.blackbox} /></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* AI Defensibility */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-12 sm:mb-20">
          <h2 className="text-center font-sans text-lg font-bold tracking-wider text-foreground mb-2">AI DEFENSIBILITY</h2>
          <p className="text-center text-xs text-muted-foreground mb-6">This is NOT "ChatGPT for logs" — it's a structured causal engine.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {aiDefensibility.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="rounded border border-primary/20 bg-primary/5 p-4"
              >
                <Brain className="h-4 w-4 text-primary mb-2" />
                <h3 className="text-xs font-bold tracking-wider text-foreground mb-1">{a.title}</h3>
                <p className="text-[11px] text-muted-foreground">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Explainable AI */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-12 sm:mb-20">
          <h2 className="text-center font-sans text-lg font-bold tracking-wider text-foreground mb-6">HOW THE AI REACHES CONCLUSIONS</h2>
          <div className="max-w-xl mx-auto rounded border border-border bg-card p-5">
            <div className="space-y-4">
              {[
                { label: 'Signal Deviation', value: '23.4%', desc: 'Core temp exceeded rolling 30-min average by 3.2σ' },
                { label: 'Sequence Detection', value: 'MATCHED', desc: 'Pattern correlates with known turbine overspeed sequence' },
                { label: 'Causal Weighting', value: '0.94', desc: 'Flow regulator → RPM surge causal link scored highest' },
                { label: 'Confidence Level', value: '97.3%', desc: 'High confidence based on 4-sensor correlation' },
              ].map(m => (
                <div key={m.label} className="flex items-center justify-between border-b border-border/50 pb-3 last:border-0">
                  <div>
                    <div className="text-xs font-bold text-foreground">{m.label}</div>
                    <div className="text-[10px] text-muted-foreground">{m.desc}</div>
                  </div>
                  <div className="text-sm font-bold text-primary text-glow-amber">{m.value}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Risk Mitigation */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <h2 className="text-center font-sans text-lg font-bold tracking-wider text-foreground mb-6">RISK DISCLOSURE & MITIGATION</h2>
          <div className="max-w-2xl mx-auto space-y-3">
            {riskMitigation.map(r => (
              <div key={r.risk} className="flex items-start gap-4 rounded border border-border bg-card px-4 py-3">
                <div className="flex-1">
                  <div className="text-xs font-bold text-critical">{r.risk}</div>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-nominal">{r.mitigation}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
