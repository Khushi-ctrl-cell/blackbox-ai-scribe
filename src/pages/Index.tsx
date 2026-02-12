import { useState, useCallback } from 'react';
import { StatusHeader } from '@/components/StatusHeader';
import { DashboardView } from '@/components/DashboardView';
import { IndustrySelector } from '@/components/IndustrySelector';
import { IncidentList } from '@/components/IncidentList';
import { IncidentTimeline } from '@/components/IncidentTimeline';
import { FailurePanel } from '@/components/FailurePanel';
import { EvidenceExplorer } from '@/components/EvidenceExplorer';
import { ReportPanel } from '@/components/ReportPanel';
import { SimulateButton } from '@/components/SimulateButton';
import { SiteNav } from '@/components/SiteNav';
import { useSensorData } from '@/hooks/useSensorData';
import { useIncidentStore } from '@/hooks/useIncidentStore';

const Index = () => {
  const { sensors, events, causalChain, isRecording, uptime, triggerFailure } = useSensorData();
  const store = useIncidentStore(sensors, events);
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidePanel = (
    <div className="lg:col-span-1 space-y-3">
      <IndustrySelector selected={store.selectedIndustry} onSelect={store.setSelectedIndustry} />
      <IncidentList
        incidents={store.incidents}
        selectedId={store.selectedIncident?.id || null}
        onSelect={store.selectIncident}
      />
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView sensors={sensors} events={events} causalChain={causalChain} />;
      case 'timeline':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-fade-in" style={{ minHeight: 'calc(100vh - 200px)' }}>
            {sidePanel}
            <div className="lg:col-span-2">
              <IncidentTimeline incident={store.selectedIncident} />
            </div>
          </div>
        );
      case 'failure':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-fade-in" style={{ minHeight: 'calc(100vh - 200px)' }}>
            {sidePanel}
            <div className="lg:col-span-2">
              <FailurePanel incident={store.selectedIncident} viewMode={store.viewMode} onViewModeChange={store.setViewMode} />
            </div>
          </div>
        );
      case 'evidence':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-fade-in" style={{ minHeight: 'calc(100vh - 200px)' }}>
            {sidePanel}
            <div className="lg:col-span-2">
              <EvidenceExplorer incident={store.selectedIncident} />
            </div>
          </div>
        );
      case 'report':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-fade-in" style={{ minHeight: 'calc(100vh - 200px)' }}>
            {sidePanel}
            <div className="lg:col-span-2">
              <ReportPanel incident={store.selectedIncident} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background noise-bg">
      <SiteNav />
      <StatusHeader
        isRecording={isRecording}
        uptime={uptime}
        systemStatus={store.systemStatus}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <main className="flex-1 p-4 overflow-hidden relative z-10">
        <div className="flex items-center justify-between mb-4">
          <SimulateButton onSimulate={triggerFailure} />
        </div>
        {renderTabContent()}
      </main>
    </div>
  );
};

export default Index;
