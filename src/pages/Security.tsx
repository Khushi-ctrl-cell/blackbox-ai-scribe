import { motion } from 'framer-motion';
import { Shield, Lock, Key, Eye, Server, CheckCircle, FileCheck, AlertTriangle } from 'lucide-react';
import { SiteNav } from '@/components/SiteNav';

const features = [
  { icon: Lock, title: 'AES-256 Local Encryption', desc: 'All data encrypted at rest and in transit using military-grade AES-256-GCM encryption. Keys never leave the device.' },
  { icon: Shield, title: 'Tamper-Evident Storage', desc: 'Hash-chain verification ensures any modification to stored data is immediately detectable. Full integrity guarantee.' },
  { icon: Key, title: 'Role-Based Access Control', desc: 'Granular RBAC with multi-factor authentication. Operator, Engineer, Auditor, and Admin permission levels.' },
  { icon: Server, title: 'Secure Boot', desc: 'Hardware-verified boot chain prevents unauthorized firmware. Signed updates only via authenticated channels.' },
  { icon: Eye, title: 'Comprehensive Audit Logs', desc: 'Every access, query, and export is logged with cryptographic timestamps. Full chain-of-custody preserved.' },
  { icon: FileCheck, title: 'Forensic-Grade Export', desc: 'Court-admissible evidence export with digital signatures, timestamps, and tamper-evident packaging.' },
];

const compliance = [
  { framework: 'ISO 26262', area: 'Functional Safety', status: 'Aligned', desc: 'Automotive & industrial safety lifecycle compliance' },
  { framework: 'NIST CSF', area: 'Cybersecurity', status: 'Aligned', desc: 'Identify, Protect, Detect, Respond, Recover framework' },
  { framework: 'IEC 61508', area: 'Industrial Safety', status: 'In Progress', desc: 'Safety integrity levels for industrial equipment' },
  { framework: 'ISO 27001', area: 'Information Security', status: 'Aligned', desc: 'Information security management systems' },
  { framework: 'DO-178C', area: 'Aviation Software', status: 'Planned', desc: 'Software considerations in airborne systems' },
  { framework: 'HIPAA', area: 'Healthcare', status: 'Aligned', desc: 'Health data protection and privacy standards' },
];

const certRoadmap = [
  { phase: 'Phase 1', title: 'Industrial Pilot', timeline: 'Q1-Q2 2026', items: ['IEC 61508 SIL-2 assessment', 'Penetration testing', '3rd party audit'] },
  { phase: 'Phase 2', title: 'IEC Certification', timeline: 'Q3-Q4 2026', items: ['Full SIL-3 certification', 'ISO 27001 audit', 'NIST compliance report'] },
  { phase: 'Phase 3', title: 'Aerospace Validation', timeline: 'Q1-Q2 2027', items: ['DO-178C assessment', 'FAA coordination', 'Aviation pilot program'] },
  { phase: 'Phase 4', title: 'Defense Integration', timeline: 'Q3-Q4 2027', items: ['NIST 800-171 compliance', 'CMMC certification', 'Classified deployment'] },
];

export default function Security() {
  return (
    <div className="min-h-screen bg-background noise-bg">
      <SiteNav />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 sm:mb-16">
          <h1 className="font-sans text-2xl sm:text-4xl font-bold text-nominal text-glow-green mb-3">SECURITY & TRUST</h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade security. Industrial compliance. Forensic admissibility.
          </p>
        </motion.div>

        {/* Security Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 sm:mb-20">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded border border-border bg-card p-5"
            >
              <f.icon className="h-6 w-6 text-nominal mb-3" />
              <h3 className="text-xs font-bold tracking-wider text-foreground mb-2">{f.title}</h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Compliance Matrix */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-12 sm:mb-20">
          <h2 className="text-center font-sans text-lg font-bold tracking-wider text-foreground mb-6">COMPLIANCE ALIGNMENT</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-[10px] tracking-widest text-muted-foreground">FRAMEWORK</th>
                  <th className="text-left py-2 px-3 text-[10px] tracking-widest text-muted-foreground">AREA</th>
                  <th className="text-left py-2 px-3 text-[10px] tracking-widest text-muted-foreground">STATUS</th>
                  <th className="text-left py-2 px-3 text-[10px] tracking-widest text-muted-foreground hidden sm:table-cell">DESCRIPTION</th>
                </tr>
              </thead>
              <tbody>
                {compliance.map(c => (
                  <tr key={c.framework} className="border-b border-border/50">
                    <td className="py-2.5 px-3 font-bold text-foreground">{c.framework}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{c.area}</td>
                    <td className="py-2.5 px-3">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold tracking-wider ${
                        c.status === 'Aligned' ? 'text-nominal' : c.status === 'In Progress' ? 'text-primary' : 'text-muted-foreground'
                      }`}>
                        {c.status === 'Aligned' ? <CheckCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                        {c.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-muted-foreground hidden sm:table-cell">{c.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Certification Roadmap */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <h2 className="text-center font-sans text-lg font-bold tracking-wider text-foreground mb-6">CERTIFICATION ROADMAP</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certRoadmap.map((phase, i) => (
              <div key={phase.phase} className="rounded border border-border bg-card p-4">
                <div className="text-[10px] font-bold tracking-widest text-primary mb-1">{phase.phase}</div>
                <h3 className="text-sm font-bold text-foreground mb-1">{phase.title}</h3>
                <div className="text-[10px] text-muted-foreground mb-3">{phase.timeline}</div>
                <ul className="space-y-1">
                  {phase.items.map(item => (
                    <li key={item} className="text-[11px] text-muted-foreground flex items-start gap-1.5">
                      <span className="text-nominal mt-0.5">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Legal Positioning */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mt-12 sm:mt-20">
          <div className="rounded border border-primary/20 bg-primary/5 p-6 text-center max-w-2xl mx-auto">
            <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-sans text-sm font-bold tracking-wider text-primary mb-2">FORENSIC ADMISSIBILITY</h3>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Chain-of-custody validation • Tamper-evident timestamping • Legal-grade export mode<br />
              Compatible with ISO forensic principles and NIST digital evidence handling guidelines.<br /><br />
              <span className="text-primary font-bold">BlackBox AI isn't just monitoring — it's court-ready.</span>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
