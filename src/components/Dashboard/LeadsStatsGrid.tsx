import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ReasonStat {
  id: string;
  percentage: number;
  description: string;
}

interface OtherDataStat {
  id: string;
  value: string | number;
  label: string;
  hasInfo?: boolean;
  infoText?: string;
}

const reasonsData: ReasonStat[] = [
  { id: 'unclearProposal1', percentage: 40, description: 'The proposal is unclear' as const },
  { id: 'venturePursuit', percentage: 20, description: 'However venture pursuit' as const },
  { id: 'other', percentage: 10, description: 'Other' as const },
  { id: 'unclearProposal2', percentage: 30, description: 'The proposal is unclear' as const }, // Duplicate description as per image
];

const otherDataStats: OtherDataStat[] = [
  { id: 'totalLeads', value: 900, label: 'total leads count' as const },
  { id: 'avgConvertTime', value: 12, label: 'days in average to convert lead' as const },
  { id: 'inactiveLeads', value: 30, label: 'inactive leads' as const, hasInfo: true, infoText: 'Leads with no activity for 30+ days' },
];

interface LeadsStatsGridProps {
  className?: string;
}

const LeadsStatsGrid: React.FC<LeadsStatsGridProps> = ({ className }) => {
  return (
    <TooltipProvider>
      <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6', className)}>
        <Card>
          <CardHeader>
            <CardTitle className='text-md font-semibold text-foreground'>Reasons of leads lost</CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-2 gap-x-6 gap-y-8'>
            {reasonsData.map((reason) => (
              <div key={reason.id}>
                <p className='text-3xl font-bold text-foreground'>{reason.percentage}%</p>
                <p className='text-sm text-muted-foreground'>{reason.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='text-md font-semibold text-foreground'>Other data</CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
            {otherDataStats.map((stat) => (
              <div key={stat.id}>
                <p className='text-3xl font-bold text-foreground'>{stat.value}</p>
                <div className='flex items-center text-sm text-muted-foreground'>
                  <span>{stat.label}</span>
                  {stat.hasInfo && (
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <Info className='h-3.5 w-3.5 ml-1.5 text-muted-foreground cursor-pointer' />
                      </TooltipTrigger>
                      <TooltipContent side='top' className='bg-gray-800 text-white text-xs max-w-xs'>
                        {stat.infoText}
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default LeadsStatsGrid;
