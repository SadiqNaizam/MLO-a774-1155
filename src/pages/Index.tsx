import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import FunnelCount from '../components/Dashboard/FunnelCount';
import SourcesOverview from '../components/Dashboard/SourcesOverview';
import LeadsTrackingGraph from '../components/Dashboard/LeadsTrackingGraph';
import LeadsStatsGrid from '../components/Dashboard/LeadsStatsGrid';

/**
 * IndexPage serves as the main dashboard page, often referred to as "Leads Overview".
 * It uses MainAppLayout to provide the overall page structure (sidebar, header)
 * and arranges various dashboard widgets (FunnelCount, SourcesOverview, etc.)
 * in the main content area.
 */
const IndexPage: React.FC = () => {
  return (
    <MainAppLayout title="Dashboard"> 
      {/* 
        The children of MainAppLayout are rendered within a container 
        that already has `flex flex-col gap-6` applied by MainAppLayout.
        Each direct child here will be a row in that flex column.
      */}

      {/* First row: FunnelCount and SourcesOverview, side-by-side on larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FunnelCount />
        <SourcesOverview />
      </div>
      
      {/* Second row: LeadsTrackingGraph, full width */}
      <LeadsTrackingGraph />
      
      {/* Third row: LeadsStatsGrid, full width */}
      <LeadsStatsGrid />
    </MainAppLayout>
  );
};

export default IndexPage;
