import { useState, useEffect, useCallback } from 'react';

export type SensorStatus = 'nominal' | 'warning' | 'critical' | 'offline';

export interface SensorReading {
  id: string;
  name: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  status: SensorStatus;
  history: number[];
}

export interface EventLog {
  id: string;
  timestamp: Date;
  severity: 'info' | 'warning' | 'critical';
  source: string;
  message: string;
  aiSummary?: string;
}

export interface CausalNode {
  id: string;
  label: string;
  severity: SensorStatus;
  timestamp: Date;
  children: string[];
}

const sensorTemplates = [
  { id: 'temp-core', name: 'CORE TEMP', unit: '°C', min: 0, max: 200, base: 85 },
  { id: 'pressure-main', name: 'PRESSURE', unit: 'kPa', min: 0, max: 500, base: 310 },
  { id: 'vibration', name: 'VIBRATION', unit: 'mm/s', min: 0, max: 50, base: 4.2 },
  { id: 'rpm-turbine', name: 'TURBINE RPM', unit: 'RPM', min: 0, max: 15000, base: 8500 },
  { id: 'voltage', name: 'VOLTAGE', unit: 'V', min: 0, max: 480, base: 380 },
  { id: 'flow-rate', name: 'FLOW RATE', unit: 'L/min', min: 0, max: 100, base: 62 },
];

function getStatus(value: number, max: number): SensorStatus {
  const ratio = value / max;
  if (ratio > 0.9) return 'critical';
  if (ratio > 0.75) return 'warning';
  return 'nominal';
}

const eventMessages: Array<{ severity: EventLog['severity']; source: string; message: string; aiSummary: string }> = [
  { severity: 'info', source: 'SYS', message: 'Routine diagnostic completed', aiSummary: 'All subsystems within operational parameters.' },
  { severity: 'warning', source: 'THERMAL', message: 'Core temperature approaching upper threshold', aiSummary: 'Thermal runaway risk detected. Cooling system output at 92% capacity. Recommend reducing load.' },
  { severity: 'critical', source: 'PRESSURE', message: 'Pressure valve P-07 exceeded safety margin', aiSummary: 'Valve P-07 pressure spike correlated with turbine RPM surge at T-3s. Root cause: feedback loop in flow regulator.' },
  { severity: 'info', source: 'AUDIO', message: 'Anomalous frequency detected at 4.2kHz', aiSummary: 'Bearing wear signature identified. Estimated remaining life: 340 hours.' },
  { severity: 'warning', source: 'ELEC', message: 'Voltage fluctuation on bus B-3', aiSummary: 'Intermittent ground fault detected. Correlates with vibration peaks on sensor V-02.' },
  { severity: 'critical', source: 'STRUCT', message: 'Micro-fracture detected in strut S-12', aiSummary: 'Fatigue crack propagation rate exceeds threshold. Immediate inspection required. Failure probability: 12% within 48h.' },
];

const causalChain: CausalNode[] = [
  { id: '1', label: 'Flow regulator drift', severity: 'warning', timestamp: new Date(Date.now() - 180000), children: ['2'] },
  { id: '2', label: 'Turbine RPM surge +12%', severity: 'warning', timestamp: new Date(Date.now() - 120000), children: ['3', '4'] },
  { id: '3', label: 'Pressure spike P-07', severity: 'critical', timestamp: new Date(Date.now() - 60000), children: ['5'] },
  { id: '4', label: 'Thermal load increase', severity: 'warning', timestamp: new Date(Date.now() - 45000), children: ['5'] },
  { id: '5', label: 'Emergency shutdown triggered', severity: 'critical', timestamp: new Date(Date.now() - 10000), children: [] },
];

export function useSensorData() {
  const [sensors, setSensors] = useState<SensorReading[]>(() =>
    sensorTemplates.map(t => ({
      ...t,
      value: t.base,
      status: 'nominal' as SensorStatus,
      history: Array.from({ length: 30 }, () => t.base + (Math.random() - 0.5) * t.base * 0.1),
    }))
  );

  const [events, setEvents] = useState<EventLog[]>(() =>
    eventMessages.slice(0, 3).map((e, i) => ({
      ...e,
      id: `evt-${i}`,
      timestamp: new Date(Date.now() - (3 - i) * 30000),
    }))
  );

  const [isRecording, setIsRecording] = useState(true);
  const [uptime, setUptime] = useState(14423);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev =>
        prev.map(s => {
          const template = sensorTemplates.find(t => t.id === s.id)!;
          const drift = (Math.random() - 0.48) * template.base * 0.05;
          const newValue = Math.max(template.min, Math.min(template.max, s.value + drift));
          const newHistory = [...s.history.slice(1), newValue];
          return { ...s, value: newValue, history: newHistory, status: getStatus(newValue, template.max) };
        })
      );
      setUptime(u => u + 1);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const template = eventMessages[Math.floor(Math.random() * eventMessages.length)];
        const newEvent: EventLog = {
          ...template,
          id: `evt-${Date.now()}`,
          timestamp: new Date(),
        };
        setEvents(prev => [newEvent, ...prev].slice(0, 20));
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return { sensors, events, causalChain, isRecording, uptime, setIsRecording };
}
