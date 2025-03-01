import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dumbbell, Calendar, Clock, ArrowRight } from 'lucide-react';

interface WorkoutCardProps {
  title: string;
  date: string;
  duration: string;
  exercises: string[];
  completed?: boolean;
  onViewDetails: () => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  title,
  date,
  duration,
  exercises,
  completed = false,
  onViewDetails
}) => {
  return (
    <Card className={`shadow-md transition-all duration-300 hover:shadow-lg ${completed ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-orange-500'}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-blue-800" />
            <CardTitle className="text-lg font-['Montserrat'] text-blue-900">{title}</CardTitle>
          </div>
          {completed ? (
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
              Completed
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
              Upcoming
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="pt-2">
            <p className="text-sm font-medium text-gray-700 mb-2">Exercises:</p>
            <div className="flex flex-wrap gap-2">
              {exercises.map((exercise, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                  {exercise}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="ghost" 
          className="w-full text-blue-800 hover:text-blue-900 hover:bg-blue-50 flex items-center justify-center gap-1"
          onClick={onViewDetails}
        >
          View Details
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkoutCard;