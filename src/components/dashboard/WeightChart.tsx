import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Sample data - would be replaced with real data from API/state
const sampleData = [
  { date: 'Jan 1', benchPress: 135, squat: 185, deadlift: 225 },
  { date: 'Jan 8', benchPress: 145, squat: 195, deadlift: 235 },
  { date: 'Jan 15', benchPress: 145, squat: 205, deadlift: 245 },
  { date: 'Jan 22', benchPress: 155, squat: 215, deadlift: 255 },
  { date: 'Jan 29', benchPress: 165, squat: 225, deadlift: 265 },
  { date: 'Feb 5', benchPress: 175, squat: 235, deadlift: 275 },
  { date: 'Feb 12', benchPress: 175, squat: 245, deadlift: 285 },
];

type TimeRange = '1M' | '3M' | '6M' | '1Y' | 'ALL';

const WeightChart = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('1M');
  
  // In a real app, this would filter data based on the selected time range
  const filteredData = sampleData;
  
  return (
    <Card className="shadow-lg border-t-4 border-t-orange-500">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-['Montserrat'] text-blue-900">Weight Progress</CardTitle>
          <Tabs defaultValue="1M" className="w-auto">
            <TabsList className="grid grid-cols-5 h-8">
              <TabsTrigger 
                value="1M" 
                onClick={() => setTimeRange('1M')}
                className="text-xs"
              >
                1M
              </TabsTrigger>
              <TabsTrigger 
                value="3M" 
                onClick={() => setTimeRange('3M')}
                className="text-xs"
              >
                3M
              </TabsTrigger>
              <TabsTrigger 
                value="6M" 
                onClick={() => setTimeRange('6M')}
                className="text-xs"
              >
                6M
              </TabsTrigger>
              <TabsTrigger 
                value="1Y" 
                onClick={() => setTimeRange('1Y')}
                className="text-xs"
              >
                1Y
              </TabsTrigger>
              <TabsTrigger 
                value="ALL" 
                onClick={() => setTimeRange('ALL')}
                className="text-xs"
              >
                ALL
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={filteredData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                stroke="#64748B"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#64748B"
                label={{ value: 'Weight (lbs)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="benchPress" 
                name="Bench Press"
                stroke="#1E40AF" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6, stroke: '#1E40AF', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="squat" 
                name="Squat"
                stroke="#F97316" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6, stroke: '#F97316', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="deadlift" 
                name="Deadlift"
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeightChart;