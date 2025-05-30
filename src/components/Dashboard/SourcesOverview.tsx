import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from 'recharts';

interface SourceData {
  name: string;
  value: number; // Deals value ($)
  leads: number; // Percentage or count, depends on tab
  color: string;
}

const sourcesData: SourceData[] = [
  { name: 'Clutch' as const, value: 3000, leads: 50, color: 'hsl(var(--destructive))' }, // 50%
  { name: 'Behance' as const, value: 1000, leads: 16.67, color: '#FBBF24' }, // approx 16.7%
  { name: 'Instagram' as const, value: 1000, leads: 16.67, color: '#2DD4BF' }, // approx 16.7%
  { name: 'Dribbble' as const, value: 1000, leads: 16.67, color: 'hsl(var(--accent-green-val))' }, // approx 16.7%
];

// Ensure percentages add up to 100 for the pie chart
const chartData = sourcesData.map(s => ({ name: s.name, value: s.leads, color: s.color, dealValue: s.value }));

interface SourcesOverviewProps {
  className?: string;
}

const SourcesOverview: React.FC<SourcesOverviewProps> = ({ className }) => {
  const [activeTab, setActiveTab] = React.useState<string>('leadsConverted');

  // Data could change based on activeTab, for now it's static
  const currentChartData = chartData; 

  return (
    <TooltipProvider>
      <Card className={cn('w-full', className)}>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-lg font-semibold text-foreground'>Sources</CardTitle>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="text-xs">
            <TabsList className="p-0 h-auto bg-transparent">
              <TabsTrigger value="leadsCame" className="text-xs px-2 py-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none rounded-md">Leads came</TabsTrigger>
              <TabsTrigger value="leadsConverted" className="text-xs px-2 py-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none rounded-md">Leads Converted</TabsTrigger>
              <TabsTrigger value="totalDealsSize" className="text-xs px-2 py-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none rounded-md">Total deals size</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 gap-4 items-center'>
            <div className='h-[200px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={currentChartData}
                    cx='50%'
                    cy='50%'
                    innerRadius={50} // Creates the donut hole
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey='value'
                    labelLine={false}
                  >
                    {currentChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'white', borderRadius: '0.375rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'}} 
                    formatter={(value: number, name: string) => [`${value.toFixed(0)}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className='space-y-2'>
              {currentChartData.map((source) => (
                <div key={source.name} className='flex items-center justify-between text-sm'>
                  <div className='flex items-center'>
                    <span className='w-2.5 h-2.5 rounded-full mr-2' style={{ backgroundColor: source.color }}></span>
                    <span className='text-foreground'>{source.name}</span>
                  </div>
                  <div className='text-muted-foreground'>
                    <span className='font-medium text-foreground'>$ {source.dealValue.toLocaleString()}</span>
                    <span className='ml-2'>{source.value.toFixed(0)}%</span> 
                  </div>
                </div>
              ))}
              <div className='text-right mt-1'>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <span className='text-xs text-muted-foreground cursor-default bg-gray-100 px-2 py-0.5 rounded'>from leads total</span>
                    </TooltipTrigger>
                    <TooltipContent side='top' className='bg-gray-800 text-white text-xs'>
                        Percentage of total leads converted
                    </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default SourcesOverview;
