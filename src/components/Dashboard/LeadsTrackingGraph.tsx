import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CalendarDays, ChevronDown } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend } from 'recharts';

interface LeadsTrackingGraphProps {
  className?: string;
}

const leadsTrackingData = [
  { name: 'March', closedWon: 65, closedLost: 82 },
  { name: 'April', closedWon: 52, closedLost: 70 },
  { name: 'May', closedWon: 78, closedLost: 40 },
  { name: 'June', closedWon: 60, closedLost: 15 },
  { name: 'July', closedWon: 75, closedLost: 42 },
  { name: 'August', closedWon: 95, closedLost: 30 },
];

const LeadsTrackingGraph: React.FC<LeadsTrackingGraphProps> = ({ className }) => {
  const [selectedTimeRange, setSelectedTimeRange] = React.useState<string>('last 6 months');
  const timeRanges = ['last 24 hours', 'last 7 days', 'last 30 days', 'last 6 months', 'last 12 months'] as const;

  const totalClosed = leadsTrackingData.reduce((sum, item) => sum + item.closedWon, 0) * 10; // Faking the 680 total closed
  const totalLost = leadsTrackingData.reduce((sum, item) => sum + item.closedLost, 0); // Faking the 70 total lost

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-4'>
        <div>
          <CardTitle className='text-lg font-semibold text-foreground'>Leads tracking</CardTitle>
          <div className='mt-2 flex items-baseline space-x-6'>
            <div>
              <span className='text-3xl font-bold text-foreground'>680</span>
              <span className='ml-1 text-sm text-muted-foreground'>total closed</span>
            </div>
            <div>
              <span className='text-3xl font-bold text-foreground'>70</span>
              <span className='ml-1 text-sm text-muted-foreground'>total lost</span>
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='sm' className='text-xs'>
              <CalendarDays className='mr-1.5 h-3.5 w-3.5 text-muted-foreground' />
              <span className='text-muted-foreground'>{selectedTimeRange}</span>
              <ChevronDown className='ml-1.5 h-3.5 w-3.5 text-muted-foreground' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {timeRanges.map((range) => (
              <DropdownMenuItem key={range} onClick={() => setSelectedTimeRange(range)} className='text-xs'>
                {range}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className='pt-0 pb-6'>
        <div className='h-[300px] w-full -ml-4'> {/* Negative margin to align axis labels with card edge */} 
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart data={leadsTrackingData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray='3 3' stroke='hsl(var(--border))' vertical={false} />
              <XAxis 
                dataKey='name' 
                axisLine={false} 
                tickLine={false} 
                fontSize={12} 
                stroke='hsl(var(--muted-foreground))'
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                fontSize={12} 
                stroke='hsl(var(--muted-foreground))'
                domain={[0, 'dataMax + 10']}
              />
              <RechartsTooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--border))'}}
                labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: '500'}}
                itemStyle={{ color: 'hsl(var(--muted-foreground))'}}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType='circle' 
                iconSize={8}
                formatter={(value, entry) => <span className='text-muted-foreground text-xs ml-1'>{value}</span>}
              />
              <Area type='monotone' dataKey='closedWon' name='Closed won' strokeWidth={2} stroke='hsl(var(--primary))' fillOpacity={1} fill='url(#colorClosedWon)' />
              <Area type='monotone' dataKey='closedLost' name='Closed lost' strokeWidth={2} stroke='hsl(var(--destructive))' fillOpacity={1} fill='url(#colorClosedLost)' />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsTrackingGraph;
