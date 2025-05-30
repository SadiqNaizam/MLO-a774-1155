import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CalendarDays, ChevronDown } from 'lucide-react';

interface TopHeaderProps {
  className?: string;
  title?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ 
  className,
  title = 'Dashboard' // Default title as per image
}) => {
  const [selectedTimeRange, setSelectedTimeRange] = React.useState<string>('last 6 months');
  const timeRanges = ['last 24 hours', 'last 7 days', 'last 30 days', 'last 6 months', 'last 12 months'] as const;

  return (
    <header 
      className={cn(
        'fixed top-0 h-16 bg-card border-b border-border flex items-center justify-between px-6',
        'left-64 right-0', // This should be dynamic if sidebar is collapsible, e.g. left: isSidebarCollapsed ? 'calc(theme(spacing.20))' : 'calc(theme(spacing.64))'
        // For this component, assuming fixed sidebar width of w-64 as per layout requirements for header
        className
      )}
      // Style note: if sidebar is collapsible, the `left-64` needs to be dynamic based on sidebar state.
      // This component itself doesn't know about sidebar state, so it's set to fixed `left-64`.
      // In a real app, this would be managed by a layout context or prop.
    >
      <h1 className='text-2xl font-semibold text-foreground'>{title}</h1>
      <div className='flex items-center space-x-4'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='text-sm'>
              <CalendarDays className='mr-2 h-4 w-4 text-muted-foreground' />
              <span className='text-muted-foreground'>{selectedTimeRange}</span>
              <ChevronDown className='ml-2 h-4 w-4 text-muted-foreground' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {timeRanges.map((range) => (
              <DropdownMenuItem key={range} onClick={() => setSelectedTimeRange(range)}>
                {range}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='default' className='bg-primary hover:bg-primary/90 text-primary-foreground'>
              Create
              <ChevronDown className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem>New Lead</DropdownMenuItem>
            <DropdownMenuItem>New Contact</DropdownMenuItem>
            <DropdownMenuItem>New Task</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
