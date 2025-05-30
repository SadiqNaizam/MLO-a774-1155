import React from 'react';
import { cn } from '@/lib/utils';
import SidebarNav from '../Dashboard/SidebarNav';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggleCollapse, className }) => {
  // This Sidebar layout component wraps the SidebarNav organism.
  // For the collapsible sidebar feature to be controlled by MainAppLayout,
  // the SidebarNav component (from src/components/Dashboard/SidebarNav.tsx)
  // would need to be refactored to accept `isCollapsed` and `onToggleCollapse` (or similar) props.
  // This would allow its state to be lifted and managed by MainAppLayout.
  //
  // Example refactoring for SidebarNav (conceptual):
  // - Accept `isCollapsed?: boolean` prop.
  // - Accept `onToggle?: () => void` prop.
  // - If `isCollapsed` is provided, use it to determine collapsed state.
  // - If `onToggle` is provided, call it when the internal collapse button is clicked.
  // - If props are not provided, it can fallback to its internal useState for standalone use.
  //
  // The props being passed below assume SidebarNav has been refactored as such.
  // Specifically, SidebarNav would need to accept `isCollapsed` and `onToggle` props.
  return (
    <SidebarNav
      className={cn(className)} // Pass through className for potential styling overrides
      // Props for a refactored, controlled SidebarNav:
      isCollapsed={isCollapsed}       // Controls the collapsed state from MainAppLayout
      onToggle={onToggleCollapse}     // Callback to MainAppLayout when toggle is requested
    />
  );
};

export default Sidebar;
