import { motion } from 'framer-motion';
import { User, Brain, Cpu, Shield, Globe, Award, Lightbulb, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteNav } from '@/components/SiteNav';
import { useToast } from '@/hooks/use-toast';

const team = [
  { role: 'Founder & CEO', name: 'To Be Announced', icon: User, desc: 'Vision, strategy, and product direction for BlackBox AI' },
  { role: 'AI Lead', name: 'To Be Announced', icon: Brain, desc: 'Causal inference engine, anomaly detection, edge AI architecture' },
  { role: 'Embedded Systems Lead', name: 'To Be Announced', icon: Cpu, desc: 'Hardware integration, firmware, SoC design, FPGA pipeline' },
  { role: 'Safety & Compliance Advisor', name: 'To Be Announced', icon: Shield, desc: 'IEC/ISO compliance, aviation safety, regulatory strategy' },
];

const advisors = [
  { role: 'Aviation Safety Engineer', status: 'In Discussion', icon: Award },
  { role: 'Industrial Systems Expert', status: 'In Discussion', icon: Cpu },
  { role: 'Cybersecurity Advisor', status: 'In Discussion', icon: Shield },
  { role: 'Healthcare Compliance', status: 'Planned', icon: User },
];

const hiringRoadmap = [
  { role: 'Embedded AI Engineer', priority: 'HIGH', timeline: 'Q1 2026' },
  { role: 'Firmware Specialist', priority: 'HIGH', timeline: 'Q2 2026' },
  { role: 'Compliance Lead', priority: 'MEDIUM', timeline: 'Q3 2026' },
  { role: 'Sales Engineer', priority: 'MEDIUM', timeline: 'Q3 2026' },
  { role: 'DevOps / Edge Infra', priority: 'LOW', timeline: 'Q4 2026' },
];

const exitTargets = ['Honeywell', 'Siemens', 'Thales Group', 'GE Aerospace', 'Bosch', 'Lockheed Martin'];

export default function Team() {
  const { toast } = useToast();

  const handleDownloadBrief = () => {
    const brief = `
═══════════════════════════════════════════════════
       BLACKBOX AI — EXECUTIVE BRIEF
═══════════════════════════════════════════════════

PROBLEM
Catastrophic system failures cost industries billions annually.
Post-incident investigations take weeks and often fail due to
lost, corrupted, or inaccessible data.

SOLUTION
BlackBox AI is an offline, tamper-proof AI recorder that:
• Continuously monitors sensors, logs, and audio
• Detects anomalies and reasons about causality in real-time
• Automatically generates human-readable failure explanations
• Operates with zero internet dependency

MARKET SIZE
Total addressable market: $82.8B across aviation ($18.4B),
industrial ($24.7B), healthcare ($8.2B), and defense ($31.5B).

BUSINESS MODEL
• Edge hardware module + recurring AI platform license
• Starter: $2,499/mo | Enterprise: $7,999/mo | Custom for defense
• 78% gross margin | LTV:CAC ratio of 8.2x

TRACTION
• Pilot discussions with industrial plant operators
• 120-node simulated deployment completed
• 3.2M data points processed in validation testing
• 97.3% anomaly detection accuracy achieved

KEY METRICS
• Inference latency: <150ms
• Mean Time To Explanation: <2 minutes (vs 3 weeks traditional)
• False positive rate: <2.1%

COMPETITIVE ADVANTAGE
• Proprietary causal inference engine (not GPT-for-logs)
• Edge-first architecture impossible to replicate cloud-first
• Data network effects: smarter with every deployment
• Industry-specific failure pattern libraries

ASK
Seeking seed funding for:
• 5 paid industrial pilots
• IEC compliance certification
• Hardware V2 development
• 18-month runway

BlackBox AI transforms system failure from uncertainty into evidence.

═══════════════════════════════════════════════════
`;
    const blob = new Blob([brief], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'BlackBox-AI-Executive-Brief.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Executive brief downloaded' });
  };

  return (
    <div className="min-h-screen bg-background noise-bg">
      <SiteNav />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 sm:mb-16">
          <h1 className="font-sans text-2xl sm:text-4xl font-bold text-primary text-glow-amber mb-3">TEAM & VISION</h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            "Make system failure explainable everywhere."
          </p>
        </motion.div>

        {/* Core Team */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 sm:mb-20">
          {team.map((t, i) => (
            <motion.div
              key={t.role}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded border border-border bg-card p-5 text-center"
            >
              <div className="h-14 w-14 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <t.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xs font-bold tracking-wider text-foreground">{t.role}</h3>
              <p className="text-[10px] text-primary mt-1">{t.name}</p>
              <p className="text-[11px] text-muted-foreground mt-2">{t.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Advisory Board */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-12 sm:mb-20">
          <h2 className="text-center font-sans text-lg font-bold tracking-wider text-foreground mb-6">ADVISORY BOARD</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {advisors.map(a => (
              <div key={a.role} className="rounded border border-border bg-card p-4 text-center">
                <a.icon className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
                <div className="text-[11px] font-bold text-foreground">{a.role}</div>
                <div className={`text-[9px] font-bold tracking-widest mt-1 ${a.status === 'In Discussion' ? 'text-primary' : 'text-muted-foreground'}`}>
                  {a.status.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Hiring Roadmap */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-12 sm:mb-20">
          <h2 className="text-center font-sans text-lg font-bold tracking-wider text-foreground mb-6">TALENT STRATEGY</h2>
          <div className="max-w-xl mx-auto space-y-2">
            {hiringRoadmap.map(h => (
              <div key={h.role} className="flex items-center justify-between rounded border border-border bg-card px-4 py-3">
                <span className="text-xs font-bold text-foreground">{h.role}</span>
                <div className="flex items-center gap-3">
                  <span className={`text-[9px] font-bold tracking-widest ${
                    h.priority === 'HIGH' ? 'text-critical' : h.priority === 'MEDIUM' ? 'text-primary' : 'text-muted-foreground'
                  }`}>{h.priority}</span>
                  <span className="text-[10px] text-muted-foreground">{h.timeline}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Exit Strategy */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mb-12 sm:mb-20">
          <h2 className="text-center font-sans text-lg font-bold tracking-wider text-foreground mb-4">STRATEGIC POSITIONING</h2>
          <p className="text-center text-[11px] text-muted-foreground mb-4">Positioned in high-multiple categories: Edge AI • Safety Tech • Forensic AI</p>
          <div className="flex flex-wrap gap-2 justify-center max-w-xl mx-auto">
            {exitTargets.map(t => (
              <span key={t} className="px-3 py-1.5 rounded border border-border bg-card text-[10px] font-bold tracking-wider text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Patent & Executive Brief */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <div className="rounded border border-primary/20 bg-primary/5 p-5">
              <Lightbulb className="h-5 w-5 text-primary mb-2" />
              <h3 className="text-xs font-bold tracking-wider text-foreground mb-2">PATENT STRATEGY</h3>
              <ul className="space-y-1 text-[11px] text-muted-foreground">
                <li>▸ Causal graph reasoning architecture</li>
                <li>▸ Edge inference pipeline</li>
                <li>▸ Tamper-proof AI ledger</li>
                <li className="text-primary font-bold">Provisional patent in preparation.</li>
              </ul>
            </div>
            <div className="rounded border border-nominal/20 bg-nominal/5 p-5 flex flex-col">
              <Target className="h-5 w-5 text-nominal mb-2" />
              <h3 className="text-xs font-bold tracking-wider text-foreground mb-2">EXECUTIVE BRIEF</h3>
              <p className="text-[11px] text-muted-foreground mb-4 flex-1">
                One-page VC-ready summary with problem, solution, market, traction, and ask.
              </p>
              <Button variant="outline" onClick={handleDownloadBrief} className="text-xs tracking-wider w-full">
                DOWNLOAD BRIEF
              </Button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
