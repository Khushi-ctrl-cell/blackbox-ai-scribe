import { useState, useCallback } from 'react';

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

const sampleIncidents: Incident[] = [
  {
    id: 'inc-001',
    industry: 'aviation',
    title: 'Engine Sensor Desynchronization — Flight AX-7742',
    timestamp: new Date(Date.now() - 3600000),
    status: 'failure',
    duration: '14m 23s',
    rootCause: 'Voltage instability on bus B-3 caused sensor desynchronization, which delayed the safety shutdown by 2.3 seconds.',
    simpleExplanation: 'A power fluctuation caused the engine sensors to send data at the wrong time. The safety system didn\'t get the right signals fast enough and shut down 2 seconds late. No damage occurred, but the margin was dangerously thin.',
    technicalExplanation: 'Bus B-3 voltage dropped to 18.2V (threshold: 22V) at T+0:00, triggering sensor clock drift on accelerometers ACC-01 through ACC-04. The desynchronization propagated through the FADEC input buffer, causing a 2.3s latency spike in the shutdown logic path. The shutdown eventually triggered via the redundant pressure-based failsafe at T+14:23. Post-incident analysis shows capacitor C-447 on the voltage regulator board exhibited ESR degradation consistent with thermal cycling fatigue. MTBF estimate: component was at 94% of expected life.',
    contributingFactors: [
      'Capacitor aging on voltage regulator (94% lifecycle)',
      'Ambient temperature 4°C above operational baseline',
      'Sensor firmware v2.1.3 lacks clock drift compensation',
      'Redundant shutdown path added 2.1s processing overhead',
    ],
    evidence: [
      { id: 'ev-1', type: 'sensor', label: 'Bus B-3 Voltage', data: [24.1, 24.0, 23.8, 22.5, 18.2, 17.9, 19.4, 21.0, 22.8, 23.5, 24.0, 24.1, 24.0, 23.9, 24.1], unit: 'V', anomalyRange: [3, 6], description: 'Voltage drop below 22V threshold at T+0:00' },
      { id: 'ev-2', type: 'sensor', label: 'Engine Temp', data: [342, 344, 348, 356, 371, 389, 402, 418, 410, 395, 378, 360, 350, 345, 343], unit: '°C', anomalyRange: [4, 8], description: 'Thermal spike correlated with sensor desync' },
      { id: 'ev-3', type: 'log', label: 'FADEC Buffer Latency', data: [2, 3, 2, 4, 45, 120, 280, 310, 150, 45, 8, 3, 2, 2, 3], unit: 'ms', anomalyRange: [4, 8], description: 'Processing latency spike in FADEC system' },
      { id: 'ev-4', type: 'audio', label: 'Vibration FFT 4.2kHz', data: [0.1, 0.1, 0.2, 0.3, 0.8, 2.1, 3.4, 2.8, 1.2, 0.4, 0.2, 0.1, 0.1, 0.1, 0.1], unit: 'g', anomalyRange: [4, 7], description: 'Anomalous vibration frequency detected' },
    ],
    timeline: [
      { id: 'tl-1', timestamp: new Date(Date.now() - 3600000), label: 'Voltage drop detected', severity: 'warning', detail: 'Bus B-3 drops to 18.2V' },
      { id: 'tl-2', timestamp: new Date(Date.now() - 3540000), label: 'Sensor clock drift', severity: 'warning', detail: 'ACC-01 to ACC-04 desynchronized by 340ms' },
      { id: 'tl-3', timestamp: new Date(Date.now() - 3480000), label: 'FADEC buffer overflow', severity: 'critical', detail: 'Input buffer latency exceeds 200ms threshold' },
      { id: 'tl-4', timestamp: new Date(Date.now() - 3420000), label: 'Thermal spike detected', severity: 'critical', detail: 'Engine temp reaches 418°C (limit: 450°C)' },
      { id: 'tl-5', timestamp: new Date(Date.now() - 3360000), label: 'Primary shutdown delayed', severity: 'critical', detail: 'FADEC shutdown path unresponsive for 2.3s' },
      { id: 'tl-6', timestamp: new Date(Date.now() - 3300000), label: 'Redundant failsafe triggered', severity: 'info', detail: 'Pressure-based backup initiated shutdown' },
      { id: 'tl-7', timestamp: new Date(Date.now() - 3240000), label: 'System stabilized', severity: 'info', detail: 'All parameters returning to nominal' },
    ],
  },
  {
    id: 'inc-002',
    industry: 'industrial',
    title: 'Turbine Overspeed — Plant Sector 7',
    timestamp: new Date(Date.now() - 7200000),
    status: 'failure',
    duration: '8m 41s',
    rootCause: 'Flow regulator calibration drift caused turbine RPM to exceed safe limits, triggering emergency shutdown.',
    simpleExplanation: 'A valve that controls fuel flow slowly went out of calibration over several weeks. The turbine spun too fast, pressure built up in the wrong places, and the emergency system had to shut everything down to prevent an explosion.',
    technicalExplanation: 'Flow regulator FR-07 exhibited progressive calibration drift of +3.2% over 18 days (detected via trend analysis). At T+0:00, accumulated drift caused fuel flow to exceed 67.4 L/min (nominal: 62 L/min), resulting in turbine RPM surge to 9,520 (redline: 9,000). The RPM surge propagated to pressure valve P-07, which exceeded safety margin by 14%. Thermal load increased 23% within 45s. Emergency shutdown triggered via redundant overspeed protection at T+8:41.',
    contributingFactors: [
      'Flow regulator drift +3.2% over 18 days undetected',
      'Calibration interval set to 30 days (should be 14)',
      'Trend monitoring alarm threshold set too high',
      'Operator dashboard did not display drift rate',
    ],
    evidence: [
      { id: 'ev-5', type: 'sensor', label: 'Turbine RPM', data: [8500, 8520, 8580, 8700, 8900, 9100, 9350, 9520, 9200, 8800, 8600, 8500, 8500, 8500, 8500], unit: 'RPM', anomalyRange: [4, 8], description: 'RPM surge above 9000 redline' },
      { id: 'ev-6', type: 'sensor', label: 'Flow Rate', data: [62.0, 62.3, 63.1, 64.2, 65.8, 66.9, 67.4, 67.2, 65.0, 63.1, 62.0, 62.0, 62.0, 62.0, 62.0], unit: 'L/min', anomalyRange: [3, 7], description: 'Fuel flow exceeding nominal by 8.7%' },
      { id: 'ev-7', type: 'sensor', label: 'Pressure P-07', data: [310, 312, 318, 335, 358, 380, 395, 388, 350, 325, 312, 310, 310, 310, 310], unit: 'kPa', anomalyRange: [4, 7], description: 'Pressure exceeds safety margin by 14%' },
      { id: 'ev-8', type: 'environmental', label: 'Ambient Temp', data: [28, 28, 29, 31, 34, 38, 42, 45, 40, 35, 30, 28, 28, 28, 28], unit: '°C', anomalyRange: [4, 8], description: 'Local thermal increase near turbine housing' },
    ],
    timeline: [
      { id: 'tl-8', timestamp: new Date(Date.now() - 7200000), label: 'Flow rate anomaly', severity: 'warning', detail: 'Flow exceeds 65 L/min' },
      { id: 'tl-9', timestamp: new Date(Date.now() - 7140000), label: 'RPM approaching redline', severity: 'warning', detail: 'Turbine at 8,900 RPM' },
      { id: 'tl-10', timestamp: new Date(Date.now() - 7080000), label: 'Pressure spike P-07', severity: 'critical', detail: 'Pressure at 395 kPa (limit: 350)' },
      { id: 'tl-11', timestamp: new Date(Date.now() - 7020000), label: 'Thermal overload', severity: 'critical', detail: 'Ambient temp 45°C near housing' },
      { id: 'tl-12', timestamp: new Date(Date.now() - 6960000), label: 'Emergency shutdown', severity: 'critical', detail: 'Overspeed protection activated' },
      { id: 'tl-13', timestamp: new Date(Date.now() - 6900000), label: 'Cooldown initiated', severity: 'info', detail: 'Controlled thermal dissipation' },
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
    simpleExplanation: 'A software bug in the hospital network switch accidentally silenced alarms on three breathing machines at the same time. Nurses caught it quickly through manual rounds, but the system should have alerted them automatically.',
    technicalExplanation: 'Network switch SW-4B running firmware v4.2.1 entered a race condition during multicast alarm distribution at T+0:00. The condition caused alarm packets for ventilators V-401, V-402, and V-403 to be dropped for 187 seconds. The bug is triggered when alarm priority reclassification coincides with VLAN rebalancing (every 300s). Patient safety was maintained through manual nurse rounds (q15min protocol). Firmware patch v4.2.2 addresses the race condition.',
    contributingFactors: [
      'Firmware v4.2.1 race condition in multicast handler',
      'VLAN rebalancing interval coincided with alarm burst',
      'No redundant alarm path configured for Ward 4B',
      'Alarm monitoring dashboard showed "OK" despite dropped packets',
    ],
    evidence: [
      { id: 'ev-9', type: 'sensor', label: 'SpO2 Patient 401', data: [97, 97, 96, 95, 93, 91, 90, 92, 94, 96, 97, 97, 97, 97, 97], unit: '%', anomalyRange: [3, 7], description: 'Oxygen saturation dip during alarm gap' },
      { id: 'ev-10', type: 'log', label: 'Alarm Packets', data: [12, 14, 11, 13, 0, 0, 0, 2, 8, 12, 13, 14, 12, 13, 12], unit: 'pkt/s', anomalyRange: [4, 7], description: 'Zero alarm packets for 187s' },
      { id: 'ev-11', type: 'sensor', label: 'Network Latency', data: [2, 3, 2, 4, 450, 520, 380, 120, 8, 3, 2, 2, 3, 2, 2], unit: 'ms', anomalyRange: [4, 7], description: 'Network latency spike during race condition' },
    ],
    timeline: [
      { id: 'tl-14', timestamp: new Date(Date.now() - 1800000), label: 'VLAN rebalancing triggered', severity: 'info', detail: 'Routine network maintenance' },
      { id: 'tl-15', timestamp: new Date(Date.now() - 1740000), label: 'Alarm packets dropped', severity: 'critical', detail: 'Multicast handler race condition' },
      { id: 'tl-16', timestamp: new Date(Date.now() - 1680000), label: 'SpO2 dip detected', severity: 'warning', detail: 'Patient 401 at 90%' },
      { id: 'tl-17', timestamp: new Date(Date.now() - 1620000), label: 'Manual detection by nurse', severity: 'info', detail: 'Routine rounds caught the anomaly' },
      { id: 'tl-18', timestamp: new Date(Date.now() - 1560000), label: 'Alarms restored', severity: 'info', detail: 'Network recovered after rebalance' },
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
    simpleExplanation: 'The GPS signal that keeps radar antennas synchronized became unreliable. The antennas slowly fell out of sync, causing the radar to show ghost targets and miss real ones. The system switched to backup timing after 22 minutes.',
    technicalExplanation: 'GPS timing receiver TR-B1 experienced C/N0 degradation from 42 dB-Hz to 18 dB-Hz due to atmospheric scintillation event. Phase alignment across the 16-element array drifted from <0.5° to 12.4° over 22 minutes. This caused beam squinting of 3.2° and sidelobe level increase of 8 dB. False target generation rate increased from 0.1/hr to 47/hr. The system automatic integrity monitoring (AIM) detected the fault at T+18:30 but required operator confirmation for switchover to rubidium oscillator backup. Operator response time: 3m 37s.',
    contributingFactors: [
      'Atmospheric scintillation event (solar activity index: 7.2)',
      'GPS receiver lacks automatic failover to backup oscillator',
      'AIM threshold set too conservatively (12° vs recommended 5°)',
      'Operator was managing two concurrent alerts',
    ],
    evidence: [
      { id: 'ev-12', type: 'sensor', label: 'GPS C/N0', data: [42, 41, 38, 34, 28, 24, 20, 18, 19, 22, 28, 35, 40, 42, 42], unit: 'dB-Hz', anomalyRange: [3, 8], description: 'GPS signal degradation below operational threshold' },
      { id: 'ev-13', type: 'sensor', label: 'Phase Alignment', data: [0.3, 0.4, 0.8, 2.1, 4.5, 7.2, 9.8, 12.4, 11.0, 6.2, 2.1, 0.8, 0.4, 0.3, 0.3], unit: '°', anomalyRange: [3, 8], description: 'Array phase drift exceeding 5° threshold' },
      { id: 'ev-14', type: 'sensor', label: 'False Targets/hr', data: [0.1, 0.2, 0.5, 3, 12, 28, 39, 47, 35, 15, 3, 0.5, 0.1, 0.1, 0.1], unit: '/hr', anomalyRange: [3, 8], description: 'Ghost target generation rate spike' },
      { id: 'ev-15', type: 'environmental', label: 'Solar Activity', data: [5.0, 5.2, 5.8, 6.4, 6.9, 7.1, 7.2, 7.0, 6.5, 5.8, 5.2, 5.0, 5.0, 5.0, 5.0], unit: 'idx', anomalyRange: [3, 7], description: 'Elevated solar activity correlating with GPS degradation' },
    ],
    timeline: [
      { id: 'tl-19', timestamp: new Date(Date.now() - 5400000), label: 'GPS signal degradation', severity: 'warning', detail: 'C/N0 dropping below 35 dB-Hz' },
      { id: 'tl-20', timestamp: new Date(Date.now() - 5340000), label: 'Phase drift detected', severity: 'warning', detail: 'Array misalignment >2°' },
      { id: 'tl-21', timestamp: new Date(Date.now() - 5280000), label: 'False targets increasing', severity: 'critical', detail: '28 false targets per hour' },
      { id: 'tl-22', timestamp: new Date(Date.now() - 5220000), label: 'AIM fault detected', severity: 'critical', detail: 'Phase alignment >12°, operator notified' },
      { id: 'tl-23', timestamp: new Date(Date.now() - 5160000), label: 'Operator switchover', severity: 'info', detail: 'Rubidium backup oscillator activated' },
      { id: 'tl-24', timestamp: new Date(Date.now() - 5100000), label: 'Array recalibrated', severity: 'info', detail: 'Phase alignment restored to <0.5°' },
    ],
  },
];

export function useIncidentStore() {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | 'all'>('all');
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('simple');
  const [systemStatus, setSystemStatus] = useState<SystemStatus>('anomaly');

  const filteredIncidents = selectedIndustry === 'all'
    ? sampleIncidents
    : sampleIncidents.filter(i => i.industry === selectedIndustry);

  const selectIncident = useCallback((id: string) => {
    const inc = sampleIncidents.find(i => i.id === id) || null;
    setSelectedIncident(inc);
  }, []);

  return {
    incidents: filteredIncidents,
    allIncidents: sampleIncidents,
    selectedIndustry,
    setSelectedIndustry,
    selectedIncident,
    selectIncident,
    setSelectedIncident,
    viewMode,
    setViewMode,
    systemStatus,
    setSystemStatus,
  };
}
