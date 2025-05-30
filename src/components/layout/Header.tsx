import React from 'react';
import { cn } from '@/lib/utils';
import TopHeader from '../Dashboard/TopHeader';

interface HeaderProps {
  title: string;
  isSidebarCollapsed: boolean;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, isSidebarCollapsed, className }) => {
  // This Header layout component wraps the TopHeader organism.
  // For the Header's position to dynamically adjust based on the sidebar's collapsed state,
  // the TopHeader component (from src/components/Dashboard/TopHeader.tsx)
  // would need to be refactored.
  //
  // Refactoring TopHeader would involve:
  // 1. Accepting an `isSidebarCollapsed: boolean` prop.
  // 2. Dynamically calculating its `left` CSS property or Tailwind class (e.g., 'left-20' or 'left-64')
  //    based on this prop, instead of using a hardcoded 'left-64' as in the context code.
  //    The existing 'left-64' class in TopHeader's `className` would be removed and replaced by this dynamic logic.
  //
  // The props being passed below assume TopHeader has been refactored as such.
  return (
    <TopHeader
      title={title}
      className={cn(className)} // Pass through className for potential styling overrides
      // Prop for a refactored TopHeader to be aware of sidebar state:
      isSidebarCollapsed={isSidebarCollapsed} 
    />
  );
};

export default Header;
