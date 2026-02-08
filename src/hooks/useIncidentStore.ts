import { useState, useEffect, useCallback, useMemo } from 'react';
import type { SensorReading, EventLog } from './useSensorData';

export type Industry = 'aviation' | 'industrial' | 'healthcare' | 'defense';
export type ViewMode = 'simple' | 'technical';
export type SystemStatus = 'normal' | 'anomaly' | 'failure';

export interface Incident {
  id: string;
  industry: Industry;
  title: string;
  timestamp: Date;
  status: SystemStatus;
  duration: string;
  rootCause: string;
  simpleExplanation: string;
  technicalExplanation: string;
  contributingFactors: string[];
  evidence: EvidenceItem[];
  timeline: TimelineEvent[];
}

export interface EvidenceItem {
  id: string;
  type: 'sensor' | 'log' | 'audio' | 'environmental';
  label: string;
  data: number[];
  unit: string;
  anomalyRange?: [number, number];
  description: string;
}

export interface TimelineEvent {
  id: string;
  timestamp: Date;
  label: string;
  severity: 'info' | 'warning' | 'critical';
  detail: string;
}

// Static historical incidents
const historicalIncidents: Incident[] = [
  {
    id: 'inc-002',
    industry: 'industrial',
    title: 'Turbine Overspeed — Plant Sector 7',
    timestamp: new Date(Date.now() - 7200000),
    status: 'failure',
    duration: '8m 41s',
    rootCause: 'Flow regulator calibration drift caused turbine RPM to exceed safe limits, triggering emergency shutdown.',
    simpleExplanation: 'A valve that controls fuel flow slowly went out of calibration. The turbine spun too fast, pressure built up, and the emergency system shut everything down.',
    technicalExplanation: 'Flow regulator FR-07 exhibited progressive calibration drift of +3.2% over 18 days. At T+0:00, fuel flow exceeded 67.4 L/min (nominal: 62 L/min), resulting in turbine RPM surge to 9,520 (redline: 9,000). Emergency shutdown triggered via redundant overspeed protection at T+8:41.',
    contributingFactors: ['Flow regulator drift +3.2% over 18 days', 'Calibration interval set to 30 days (should be 14)', 'Trend monitoring alarm threshold set too high'],
    evidence: [
      { id: 'ev-5', type: 'sensor', label: 'Turbine RPM', data: [8500, 8520, 8580, 8700, 8900, 9100, 9350, 9520, 9200, 8800, 8600, 8500, 8500, 8500, 8500], unit: 'RPM', anomalyRange: [4, 8], description: 'RPM surge above 9000 redline' },
      { id: 'ev-6', type: 'sensor', label: 'Flow Rate', data: [62.0, 62.3, 63.1, 64.2, 65.8, 66.9, 67.4, 67.2, 65.0, 63.1, 62.0, 62.0, 62.0, 62.0, 62.0], unit: 'L/min', anomalyRange: [3, 7], description: 'Fuel flow exceeding nominal by 8.7%' },
      { id: 'ev-7', type: 'sensor', label: 'Pressure P-07', data: [310, 312, 318, 335, 358, 380, 395, 388, 350, 325, 312, 310, 310, 310, 310], unit: 'kPa', anomalyRange: [4, 7], description: 'Pressure exceeds safety margin by 14%' },
    ],
    timeline: [
      { id: 'tl-8', timestamp: new Date(Date.now() - 7200000), label: 'Flow rate anomaly', severity: 'warning', detail: 'Flow exceeds 65 L/min' },
      { id: 'tl-9', timestamp: new Date(Date.now() - 7140000), label: 'RPM approaching redline', severity: 'warning', detail: 'Turbine at 8,900 RPM' },
      { id: 'tl-10', timestamp: new Date(Date.now() - 7080000), label: 'Pressure spike P-07', severity: 'critical', detail: 'Pressure at 395 kPa (limit: 350)' },
      { id: 'tl-11', timestamp: new Date(Date.now() - 7020000), label: 'Emergency shutdown', severity: 'critical', detail: 'Overspeed protection activated' },
    ],
  },
  {
    id: 'inc-003',
    industry: 'healthcare',
    title: 'ICU Ventilator Alarm Cascade — Ward 4B',
    timestamp: new Date(Date.now() - 1800000),
    status: 'anomaly',
    duration: '3m 12s',
    rootCause: 'Network switch firmware bug caused simultaneous alarm suppression across 3 ventilators.',
    simpleExplanation: 'A software bug in the hospital network switch silenced alarms on three breathing machines. Nurses caught it through manual rounds.',
    technicalExplanation: 'Network switch SW-4B running firmware v4.2.1 entered a race condition during multicast alarm distribution. Alarm packets for ventilators V-401 through V-403 were dropped for 187 seconds.',
    contributingFactors: ['Firmware v4.2.1 race condition', 'No redundant alarm path for Ward 4B', 'Dashboard showed "OK" despite dropped packets'],
    evidence: [
      { id: 'ev-9', type: 'sensor', label: 'SpO2 Patient 401', data: [97, 97, 96, 95, 93, 91, 90, 92, 94, 96, 97, 97, 97, 97, 97], unit: '%', anomalyRange: [3, 7], description: 'Oxygen saturation dip during alarm gap' },
      { id: 'ev-10', type: 'log', label: 'Alarm Packets', data: [12, 14, 11, 13, 0, 0, 0, 2, 8, 12, 13, 14, 12, 13, 12], unit: 'pkt/s', anomalyRange: [4, 7], description: 'Zero alarm packets for 187s' },
    ],
    timeline: [
      { id: 'tl-14', timestamp: new Date(Date.now() - 1800000), label: 'VLAN rebalancing triggered', severity: 'info', detail: 'Routine network maintenance' },
      { id: 'tl-15', timestamp: new Date(Date.now() - 1740000), label: 'Alarm packets dropped', severity: 'critical', detail: 'Multicast handler race condition' },
      { id: 'tl-16', timestamp: new Date(Date.now() - 1680000), label: 'Alarms restored', severity: 'info', detail: 'Network recovered' },
    ],
  },
  {
    id: 'inc-004',
    industry: 'defense',
    title: 'Radar Array Calibration Fault — Station Bravo',
    timestamp: new Date(Date.now() - 5400000),
    status: 'failure',
    duration: '22m 07s',
    rootCause: 'GPS timing signal degradation caused progressive radar array phase misalignment.',
    simpleExplanation: 'The GPS signal that keeps radar antennas synchronized became unreliable. The antennas fell out of sync, causing ghost targets.',
    technicalExplanation: 'GPS timing receiver TR-B1 experienced C/N0 degradation from 42 dB-Hz to 18 dB-Hz due to atmospheric scintillation. Phase alignment drifted to 12.4° over 22 minutes. False target rate increased to 47/hr.',
    contributingFactors: ['Atmospheric scintillation event', 'No automatic failover to backup oscillator', 'AIM threshold set too conservatively'],
    evidence: [
      { id: 'ev-12', type: 'sensor', label: 'GPS C/N0', data: [42, 41, 38, 34, 28, 24, 20, 18, 19, 22, 28, 35, 40, 42, 42], unit: 'dB-Hz', anomalyRange: [3, 8], description: 'GPS signal degradation' },
      { id: 'ev-13', type: 'sensor', label: 'Phase Alignment', data: [0.3, 0.4, 0.8, 2.1, 4.5, 7.2, 9.8, 12.4, 11.0, 6.2, 2.1, 0.8, 0.4, 0.3, 0.3], unit: '°', anomalyRange: [3, 8], description: 'Array phase drift' },
    ],
    timeline: [
      { id: 'tl-19', timestamp: new Date(Date.now() - 5400000), label: 'GPS signal degradation', severity: 'warning', detail: 'C/N0 dropping below 35 dB-Hz' },
      { id: 'tl-20', timestamp: new Date(Date.now() - 5280000), label: 'False targets increasing', severity: 'critical', detail: '28 false targets per hour' },
      { id: 'tl-21', timestamp: new Date(Date.now() - 5100000), label: 'Array recalibrated', severity: 'info', detail: 'Phase alignment restored' },
    ],
  },
];

// Build a live incident from current sensor data
function buildLiveIncident(sensors: SensorReading[], events: EventLog[]): Incident {
  const warningSensors = sensors.filter(s => s.status === 'warning' || s.status === 'critical');
  const criticalSensors = sensors.filter(s => s.status === 'critical');
  const status: SystemStatus = criticalSensors.length > 0 ? 'failure' : warningSensors.length > 0 ? 'anomaly' : 'normal';

  const sensorSummaries = warningSensors.map(s =>
    `${s.name} at ${s.value.toFixed(1)}${s.unit} (${((s.value / s.max) * 100).toFixed(0)}% of max)`
  );

  const rootCause = criticalSensors.length > 0
    ? `${criticalSensors[0].name} exceeded critical threshold at ${criticalSensors[0].value.toFixed(1)}${criticalSensors[0].unit}, triggering cascading anomalies across ${warningSensors.length} subsystems.`
    : warningSensors.length > 0
    ? `${warningSensors[0].name} trending toward critical at ${warningSensors[0].value.toFixed(1)}${warningSensors[0].unit}. ${warningSensors.length} sensor(s) in warning state.`
    : 'All systems operating within nominal parameters. No anomalies detected.';

  const simpleExplanation = criticalSensors.length > 0
    ? `One or more sensors have crossed dangerous levels. ${criticalSensors.map(s => s.name).join(', ')} ${criticalSensors.length === 1 ? 'is' : 'are'} reading dangerously high. The system is actively monitoring for further degradation.`
    : warningSensors.length > 0
    ? `Some readings are elevated but not yet dangerous. ${warningSensors.map(s => s.name).join(', ')} ${warningSensors.length === 1 ? 'is' : 'are'} higher than normal and being watched closely.`
    : 'Everything is running smoothly. All sensors are within their safe operating ranges.';

  const technicalExplanation = sensors.map(s =>
    `${s.name}: ${s.value.toFixed(2)}${s.unit} (${((s.value / s.max) * 100).toFixed(1)}% capacity, status: ${s.status})`
  ).join('. ') + `. Aggregate system health: ${status}. Active warnings: ${warningSensors.length}. Critical: ${criticalSensors.length}.`;

  const evidence: EvidenceItem[] = sensors.map(s => ({
    id: `live-ev-${s.id}`,
    type: 'sensor' as const,
    label: s.name,
    data: [...s.history.slice(-15)],
    unit: s.unit,
    anomalyRange: s.status === 'critical' ? [10, 14] as [number, number] : s.status === 'warning' ? [12, 14] as [number, number] : undefined,
    description: `Current: ${s.value.toFixed(1)}${s.unit} — ${s.status === 'critical' ? 'EXCEEDING SAFE LIMITS' : s.status === 'warning' ? 'Approaching threshold' : 'Within nominal range'}`,
  }));

  const recentEvents = events.slice(0, 8);
  const timeline: TimelineEvent[] = recentEvents.map((e, i) => ({
    id: `live-tl-${i}`,
    timestamp: e.timestamp,
    label: e.message,
    severity: e.severity,
    detail: e.aiSummary || e.message,
  }));

  return {
    id: 'inc-live',
    industry: 'industrial',
    title: `LIVE — System Status: ${status.toUpperCase()}`,
    timestamp: new Date(),
    status,
    duration: 'ONGOING',
    rootCause,
    simpleExplanation,
    technicalExplanation,
    contributingFactors: [
      ...sensorSummaries,
      ...(criticalSensors.length > 0 ? ['Immediate review recommended for critical sensors'] : []),
      ...(warningSensors.length > 1 ? ['Multiple concurrent warnings suggest correlated subsystem stress'] : []),
    ],
    evidence,
    timeline,
  };
}

export function useIncidentStore(sensors: SensorReading[], events: EventLog[]) {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | 'all'>('all');
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>('inc-live');
  const [viewMode, setViewMode] = useState<ViewMode>('simple');

  // Build live incident from current sensor data
  const liveIncident = useMemo(() => buildLiveIncident(sensors, events), [sensors, events]);

  const systemStatus = liveIncident.status;

  const allIncidents = useMemo(() => [liveIncident, ...historicalIncidents], [liveIncident]);

  const filteredIncidents = useMemo(() =>
    selectedIndustry === 'all'
      ? allIncidents
      : allIncidents.filter(i => i.industry === selectedIndustry || i.id === 'inc-live'),
    [selectedIndustry, allIncidents]
  );

  const selectedIncident = useMemo(() =>
    allIncidents.find(i => i.id === selectedIncidentId) || null,
    [allIncidents, selectedIncidentId]
  );

  const selectIncident = useCallback((id: string) => {
    setSelectedIncidentId(id);
  }, []);

  return {
    incidents: filteredIncidents,
    allIncidents,
    selectedIndustry,
    setSelectedIndustry,
    selectedIncident,
    selectIncident,
    setSelectedIncident: (inc: Incident | null) => setSelectedIncidentId(inc?.id || null),
    viewMode,
    setViewMode,
    systemStatus,
    liveIncident,
  };
}
