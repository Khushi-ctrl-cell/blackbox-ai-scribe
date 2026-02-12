import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Building2, ShieldAlert, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteNav } from '@/components/SiteNav';
import { useToast } from '@/hooks/use-toast';

const plans = [
  {
    tier: 'STARTER',
    name: 'Industrial Pilot',
    price: '$2,499',
    period: '/month',
    desc: 'Single-site deployment for proof of concept',
    icon: Zap,
    color: 'border-info/40',
    features: ['Up to 24 sensor channels', 'Real-time anomaly detection', 'Basic causal inference', 'Standard report generation', 'Email support', '90-day data retention'],
  },
  {
    tier: 'ENTERPRISE',
    name: 'Multi-Site',
    price: '$7,999',
    period: '/month',
    desc: 'Multi-facility deployment with advanced AI',
    icon: Building2,
    color: 'border-primary/50',
    highlight: true,
    features: ['Up to 120 sensor channels', 'Advanced multi-sensor fusion', 'Full causal chain analysis', 'Custom report templates', 'Priority 24/7 support', 'Unlimited data retention', 'API access', 'Multi-site dashboard'],
  },
  {
    tier: 'CRITICAL INFRASTRUCTURE',
    name: 'Air-Gapped Secure',
    price: 'Custom',
    period: '',
    desc: 'Government & defense grade deployment',
    icon: ShieldAlert,
    color: 'border-critical/40',
    features: ['Unlimited sensor channels', 'Air-gapped operation', 'FIPS 140-2 encryption', 'Forensic-grade export', 'Dedicated support team', 'Custom compliance', 'Hardware integration', 'SLA guaranteed'],
  },
];

const roiDefaults = {
  avgInvestigationWeeks: 3,
  incidentsPerYear: 12,
  downtimeCostPerHour: 15000,
  avgDowntimeHours: 48,
  legalCostPerIncident: 50000,
};

export default function Pricing() {
  const { toast } = useToast();
  const [roi, setRoi] = useState(roiDefaults);
  const [showROI, setShowROI] = useState(false);

  const annualSavings =
    (roi.avgDowntimeHours * 0.7 * roi.downtimeCostPerHour * roi.incidentsPerYear) +
    (roi.legalCostPerIncident * 0.6 * roi.incidentsPerYear);

  const handleContact = (tier: string) => {
    toast({ title: `${tier} inquiry received`, description: 'Our team will contact you within 24 hours.' });
  };

  return (
    <div className="min-h-screen bg-background noise-bg">
      <SiteNav />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 sm:mb-16">
          <h1 className="font-sans text-2xl sm:text-4xl font-bold text-primary text-glow-amber mb-3">PRICING</h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Edge module license + recurring AI platform fee. Hardware included in enterprise tiers.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-20">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.tier}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-lg border bg-card p-6 flex flex-col ${plan.color} ${plan.highlight ? 'ring-1 ring-primary/30 scale-[1.02]' : ''}`}
            >
              {plan.highlight && (
                <div className="text-[9px] font-bold tracking-widest text-primary text-center mb-3 bg-primary/10 rounded py-1">
                  MOST POPULAR
                </div>
              )}
              <plan.icon className="h-6 w-6 text-primary mb-3" />
              <div className="text-[10px] font-bold tracking-widest text-muted-foreground mb-1">{plan.tier}</div>
              <h3 className="font-sans text-lg font-bold text-foreground mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-2xl font-bold text-primary">{plan.price}</span>
                <span className="text-xs text-muted-foreground">{plan.period}</span>
              </div>
              <p className="text-[11px] text-muted-foreground mb-4">{plan.desc}</p>
              <ul className="space-y-2 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-foreground/80">
                    <Check className="h-3.5 w-3.5 text-nominal shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-6 w-full text-xs tracking-wider"
                variant={plan.highlight ? 'default' : 'outline'}
                onClick={() => handleContact(plan.tier)}
              >
                {plan.price === 'Custom' ? 'CONTACT SALES' : 'GET STARTED'}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* ROI Calculator */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="text-center mb-6">
            <Button variant="outline" onClick={() => setShowROI(!showROI)} className="gap-2 text-xs tracking-wider">
              <Calculator className="h-4 w-4" />
              {showROI ? 'HIDE' : 'SHOW'} ROI CALCULATOR
            </Button>
          </div>

          {showROI && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="rounded-lg border border-primary/30 bg-card p-6 max-w-3xl mx-auto"
            >
              <h2 className="font-sans text-sm font-bold tracking-wider text-primary text-glow-amber mb-6 text-center">
                ROI CALCULATOR
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {[
                  { key: 'incidentsPerYear' as const, label: 'Incidents / Year', unit: '' },
                  { key: 'avgDowntimeHours' as const, label: 'Avg Downtime / Incident', unit: 'hrs' },
                  { key: 'downtimeCostPerHour' as const, label: 'Downtime Cost', unit: '$/hr' },
                  { key: 'legalCostPerIncident' as const, label: 'Legal Cost / Incident', unit: '$' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="text-[10px] font-bold tracking-widest text-muted-foreground block mb-1">
                      {field.label.toUpperCase()} {field.unit && `(${field.unit})`}
                    </label>
                    <input
                      type="number"
                      value={roi[field.key]}
                      onChange={e => setRoi(prev => ({ ...prev, [field.key]: Number(e.target.value) }))}
                      className="w-full rounded border border-border bg-background px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="rounded border border-critical/30 bg-critical/5 p-4">
                  <div className="text-[10px] tracking-widest text-muted-foreground mb-1">WITHOUT BLACKBOX</div>
                  <div className="text-lg font-bold text-critical">
                    ${(roi.avgDowntimeHours * roi.downtimeCostPerHour * roi.incidentsPerYear + roi.legalCostPerIncident * roi.incidentsPerYear).toLocaleString()}
                  </div>
                  <div className="text-[10px] text-muted-foreground">annual incident cost</div>
                </div>
                <div className="rounded border border-nominal/30 bg-nominal/5 p-4">
                  <div className="text-[10px] tracking-widest text-muted-foreground mb-1">WITH BLACKBOX AI</div>
                  <div className="text-lg font-bold text-nominal">
                    ${(roi.avgDowntimeHours * 0.3 * roi.downtimeCostPerHour * roi.incidentsPerYear + roi.legalCostPerIncident * 0.4 * roi.incidentsPerYear).toLocaleString()}
                  </div>
                  <div className="text-[10px] text-muted-foreground">70% faster resolution</div>
                </div>
                <div className="rounded border border-primary/30 bg-primary/5 p-4">
                  <div className="text-[10px] tracking-widest text-muted-foreground mb-1">ANNUAL SAVINGS</div>
                  <div className="text-xl font-bold text-primary text-glow-amber">
                    ${annualSavings.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-muted-foreground">estimated ROI</div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs text-muted-foreground">
                  Average investigation time: <span className="text-critical font-bold">3 weeks</span> →
                  BlackBox AI: <span className="text-nominal font-bold">15 minutes</span>
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Unit Economics */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-12 sm:mt-20">
          <h2 className="text-center font-sans text-lg font-bold tracking-wider text-foreground mb-6">UNIT ECONOMICS</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {[
              { label: 'Hardware COGS', value: '$1,200' },
              { label: 'Gross Margin', value: '78%' },
              { label: 'Monthly ARR', value: '$2,499+' },
              { label: 'LTV:CAC Ratio', value: '8.2x' },
            ].map(m => (
              <div key={m.label} className="rounded border border-border bg-card p-3 text-center">
                <div className="text-lg font-bold text-primary">{m.value}</div>
                <div className="text-[9px] tracking-widest text-muted-foreground mt-1">{m.label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
