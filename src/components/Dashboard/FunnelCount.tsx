import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  days: number;
  color: string;
  percentage: number; // Percentage of the total for the bar width
}

interface FunnelCountProps {
  className?: string;
}

const funnelData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery' as const, count: 200, value: 200, days: 2, color: 'bg-destructive', percentage: 0 }, // 200 / 390 = 51.2%
  { id: 'qualified', name: 'Qualified' as const, count: 100, value: 100, days: 2, color: 'bg-yellow-400', percentage: 0 }, // 100 / 390 = 25.6%
  { id: 'inConversation', name: 'In conversation' as const, count: 50, value: 100, days: 2, color: 'bg-primary', percentage: 0 }, // 50 / 390 = 12.8%
  { id: 'negotiations', name: 'Negotiations' as const, count: 20, value: 50, days: 8, color: 'bg-accentGreen', percentage: 0 }, // 20 / 390 = 5.1%
  { id: 'closedWon', name: 'Closed won' as const, count: 20, value: 50, days: 10, color: 'bg-purple-600', percentage: 0 }, // 20 / 390 = 5.1%
];

// Calculate percentages
const totalCountForBar = funnelData.reduce((sum, stage) => sum + stage.count, 0);
const processedFunnelData = funnelData.map(stage => ({
  ...stage,
  percentage: totalCountForBar > 0 ? (stage.count / totalCountForBar) * 100 : 0,
}));

const FunnelCount: React.FC<FunnelCountProps> = ({ className }) => {
  return (
    <TooltipProvider>
      <Card className={cn('w-full', className)}>
        <CardHeader>
          <CardTitle className='text-lg font-semibold text-foreground'>Funnel count</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='mb-4'>
            <span className='text-4xl font-bold text-foreground'>600</span>
            <span className='ml-2 text-sm text-muted-foreground'>active leads</span>
          </div>

          <div className='w-full h-3 flex rounded-full overflow-hidden mb-6'>
            {processedFunnelData.map((stage) => (
              <Tooltip key={stage.id} delayDuration={100}>
                <TooltipTrigger asChild>
                  <div
                    className={cn('h-full', stage.color)}
                    style={{ width: `${stage.percentage}%` }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{stage.name}: {stage.count} ({stage.percentage.toFixed(1)}%)</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          <ul className='space-y-3 text-sm'>
            {processedFunnelData.map((stage) => (
              <li key={stage.id} className='grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-x-3 text-muted-foreground'>
                <span className={cn('w-2.5 h-2.5 rounded-full', stage.color)}></span>
                <span className='text-foreground truncate'>{stage.name}</span>
                <span className='text-right'>{stage.count}</span>
                <span className='text-right'>$ {stage.value}</span>
                <span className='text-right relative'>
                  {stage.days} days
                  {stage.id === 'inConversation' && (
                     <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                            <span className='absolute -top-6 -right-2 bg-slate-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 focus:opacity-100 group-hover:opacity-100'>average time on this stage</span>
                        </TooltipTrigger>
                        {/* Tooltip content is part of the span for this specific requirement. Alternative: position tooltip properly. For now, direct display on hover based on image */}
                        {/* Correct way with shadcn/ui tooltip for this specific text: */}
                        <TooltipContent side='top' className='bg-gray-800 text-white text-xs'>
                            average time on this stage
                        </TooltipContent>
                     </Tooltip>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default FunnelCount;
