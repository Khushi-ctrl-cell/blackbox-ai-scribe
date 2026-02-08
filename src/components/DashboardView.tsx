import { SensorCard } from '@/components/SensorCard';
import { EventTimeline } from '@/components/EventTimeline';
import { CausalChain } from '@/components/CausalChain';
import { SystemLog } from '@/components/SystemLog';
import type { SensorReading, EventLog, CausalNode } from '@/hooks/useSensorData';

interface Props {
  sensors: SensorReading[];
  events: EventLog[];
  causalChain: CausalNode[];
}

export function DashboardView({ sensors, events, causalChain }: Props) {
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Sensor Grid */}
      <section>
        <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-muted-foreground mb-2 uppercase">
          Sensor Array
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {sensors.map(sensor => (
            <SensorCard key={sensor.id} sensor={sensor} />
          ))}
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" style={{ minHeight: 'calc(100vh - 380px)' }}>
        <div className="lg:col-span-1">
          <EventTimeline events={events} />
        </div>
        <div className="lg:col-span-1">
          <CausalChain nodes={causalChain} />
        </div>
        <div className="lg:col-span-1">
          <SystemLog />
        </div>
      </div>
    </div>
  );
}
