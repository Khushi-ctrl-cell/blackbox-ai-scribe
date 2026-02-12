import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Target, TrendingUp, Clock, Zap, Shield, Globe, Download, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteNav } from '@/components/SiteNav';
import { useToast } from '@/hooks/use-toast';

const investorQuestions = [
  { q: 'Why you?', a: 'Proprietary causal inference engine built for edge — not GPT-for-logs. Deep domain expertise in safety-critical systems.' },
  { q: 'Why now?', a: 'Industrial IoT adoption at inflection point. Regulatory pressure increasing. Cloud AI fails in offline environments.' },
  { q: "Why can't this be copied?", a: 'Edge-first architecture, industry-specific causal libraries, data network effects from each deployment.' },
  { q: 'How big is this?', a: '$82.8B TAM across aviation, industrial, healthcare, defense markets growing at 8-14% CAGR.' },
  { q: 'How do you make money?', a: 'Hardware module + recurring AI platform license. 78% gross margin. $2,499-$7,999/mo per deployment.' },
  { q: 'How do you scale?', a: 'OEM partnerships → Government contracts → Global licensing. Platform ecosystem with white-label program.' },
  { q: 'What proof do you have?', a: '97.3% accuracy, 150ms latency, 3.2M data points processed. Industrial pilot discussions active.' },
  { q: 'Who will buy it?', a: 'Plant operators, aviation maintenance, hospital IT, defense contractors. Direct sales → channel partners.' },
];

const capitalStrategy = {
  raising: '$2.5M Seed',
  runway: '18 months',
  milestones: ['5 paid industrial pilots', 'IEC compliance certification', 'Hardware V2 design complete', 'First government contract LOI'],
};

const recurringRevenue = [
  { stream: 'AI Reasoning License', type: 'Annual', desc: 'Core causal inference platform access' },
  { stream: 'Maintenance Contracts', type: 'Annual', desc: 'Hardware support and firmware updates' },
  { stream: 'Compliance Reporting', type: 'Monthly', desc: 'Automated compliance report generation' },
  { stream: 'Model Updates', type: 'Quarterly', desc: 'Industry-specific pattern library updates' },
];

export default function Investor() {
  const { toast } = useToast();
  const [demoPlaying, setDemoPlaying] = useState(false);
  const [demoStep, setDemoStep] = useState(0);

  const demoSteps = [
    'Sensors monitoring... All nominal.',
    '⚠ Temperature spike detected — Core Temp at 178°C',
    '🔴 Pressure valve P-07 exceeded safety margin',
    '🧠 AI: "Flow regulator drift caused turbine RPM surge..."',
    '📄 Report auto-generated. SHA256 hash sealed.',
  ];

  const startDemo = () => {
    setDemoPlaying(true);
    setDemoStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= demoSteps.length) {
        clearInterval(interval);
        setDemoPlaying(false);
      }
      setDemoStep(step);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background noise-bg">
      <SiteNav />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 sm:mb-16">
          <h1 className="font-sans text-2xl sm:text-4xl font-bold text-primary text-glow-amber mb-3">INVESTOR OVERVIEW</h1>
          <p className="text-sm text-foreground max-w-2xl mx-auto font-bold">
            "BlackBox AI transforms system failure from uncertainty into evidence."
          </p>
        </motion.div>

        {/* Quick Demo */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-12 sm:mb-20">
          <div className="max-w-2xl mx-auto rounded-lg border border-primary/30 bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-sans text-sm font-bold tracking-wider text-primary">90-SECOND DEMO</h2>
              <Button
                variant={demoPlaying ? 'secondary' : 'default'}
                onClick={startDemo}
                disabled={demoPlaying}
                className="gap-2 text-xs"
              >
                {demoPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                {demoPlaying ? 'RUNNING...' : 'START DEMO'}
              </Button>
            </div>
            <div className="rounded border border-border bg-background p-4 font-mono text-sm space-y-2 min-h-[160px]">
              {demoSteps.slice(0, demoStep + 1).map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`text-xs ${
                    step.includes('🔴') ? 'text-critical font-bold' :
                    step.includes('⚠') ? 'text-primary' :
                    step.includes('🧠') ? 'text-info' :
                    step.includes('📄') ? 'text-nominal font-bold' :
                    'text-muted-foreground'
                  }`}
                >
                  <span className="text-muted-foreground mr-2">[{String(i).padStart(2, '0')}]</span>
                  {step}
                </motion.div>
              ))}
              {demoPlaying && <span className="inline-block w-1.5 h-3.5 bg-primary pulse-recording" />}
            </div>
          </div>
        </motion.div>

        {/* Investor Q&A */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-12 sm:mb-20">
          <h2 className="text-center font-sans text-lg font-bold tracking-wider text-foreground mb-6">THE INVESTOR TEST</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-4xl mx-auto">
            {investorQuestions.map((iq, i) => (
              <motion.div
                key={iq.q}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="rounded border border-border bg-card p-4"
              >
                <div className="text-xs font-bold text-primary mb-1">{iq.q}</div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{iq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Capital Strategy */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-12 sm:mb-20">
          <h2 className="text-center font-sans text-lg font-bold tracking-wider text-foreground mb-6">CAPITAL STRATEGY</h2>
          <div className="max-w-xl mx-auto rounded-lg border border-primary/30 bg-primary/5 p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary text-glow-amber">{capitalStrategy.raising}</div>
                <div className="text-[10px] tracking-widest text-muted-foreground">RAISING</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-nominal">{capitalStrategy.runway}</div>
                <div className="text-[10px] tracking-widest text-muted-foreground">RUNWAY</div>
              </div>
            </div>
            <div className="text-[10px] font-bold tracking-widest text-muted-foreground mb-2">MILESTONES</div>
            <ul className="space-y-1">
              {capitalStrategy.milestones.map(m => (
                <li key={m} className="text-xs text-foreground/80 flex items-start gap-2">
                  <Target className="h-3 w-3 text-primary shrink-0 mt-0.5" />{m}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Recurring Revenue */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mb-12 sm:mb-20">
          <h2 className="text-center font-sans text-lg font-bold tracking-wider text-foreground mb-6">RECURRING REVENUE STREAMS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {recurringRevenue.map(r => (
              <div key={r.stream} className="rounded border border-border bg-card p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xs font-bold text-foreground">{r.stream}</h3>
                  <span className="text-[9px] font-bold tracking-widest text-nominal">{r.type.toUpperCase()}</span>
                </div>
                <p className="text-[11px] text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* International */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <div className="rounded border border-info/30 bg-info/5 p-6 text-center max-w-2xl mx-auto">
            <Globe className="h-6 w-6 text-info mx-auto mb-3" />
            <h3 className="font-sans text-sm font-bold tracking-wider text-info mb-2">INTERNATIONAL EXPANSION READY</h3>
            <p className="text-[11px] text-muted-foreground">
              Designed for: North America • EU regulatory alignment • Asia industrial markets
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
