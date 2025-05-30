import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
  title: string; // Page title to be displayed in the Header
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, title }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  const handleToggleSidebar = React.useCallback(() => {
    setIsSidebarCollapsed(prev => !prev);
  }, []);

  // Determine margin for main content based on sidebar state.
  // Sidebar default width: w-64 (16rem), collapsed width: w-20 (5rem).
  // Header height: h-16 (4rem).
  const mainContentMarginLeftClass = isSidebarCollapsed ? 'ml-20' : 'ml-64';

  return (
    <div className="min-h-screen bg-background">
      {/* 
        Sidebar and Header components are rendered here. 
        They are assumed to use fixed positioning as per layoutRequirements specified for them.
        Their internal components (SidebarNav, TopHeader from context) handle their own fixed styling.
        MainAppLayout manages the `isSidebarCollapsed` state and passes it down, 
        allowing Sidebar, Header, and the main content area to synchronize.
        This requires SidebarNav and TopHeader (from context code) to be refactored 
        to accept props for state control and dynamic styling, as commented in Sidebar.tsx and Header.tsx.
      */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
      />
      <Header
        title={title}
        isSidebarCollapsed={isSidebarCollapsed}
      />
      <main
        className={cn(
          'pt-16', // Account for h-16 fixed header
          mainContentMarginLeftClass, // Account for fixed sidebar width (w-64 or w-20)
          'min-w-0', // From layoutRequirements.overall.sizing.mainContent, prevents content from expanding its container in some flex/grid scenarios
          'h-[calc(100vh_-_4rem)]', // Main content area should fill height below header (4rem = h-16)
          'overflow-y-auto' // Enable vertical scrolling for main content area itself
        )}
      >
        {/* 
          mainContent.layout ('p-6') from Layout Requirements defines padding for the content wrapper.
          mainContent.container ('flex flex-col gap-6') defines layout for children within this padded area.
        */}
        <div className="p-6">
          <div className="flex flex-col gap-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainAppLayout;
