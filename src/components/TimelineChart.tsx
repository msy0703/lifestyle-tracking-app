import React from 'react';
import { Activity } from '../types';
import { Sun, Moon, Coffee, Building2 } from 'lucide-react';

interface TimelineChartProps {
  activities: Activity[];
}

const TimelineChart: React.FC<TimelineChartProps> = ({ activities }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const getActivityColor = (type: string): string => {
    switch (type) {
      case '起床':
        return 'bg-orange-500';
      case '就寝':
        return 'bg-blue-500';
      case '食事':
        return 'bg-green-500';
      case '外出':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case '起床':
        return <Sun className="w-4 h-4" />;
      case '就寝':
        return <Moon className="w-4 h-4" />;
      case '食事':
        return <Coffee className="w-4 h-4" />;
      case '外出':
        return <Building2 className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const timeSlots = Array.from({ length: 24 }, (_, i) => i);

  const todayActivities = activities.filter(
    (activity) => new Date(activity.timestamp) >= today && new Date(activity.timestamp) < tomorrow
  );

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">タイムライン</h3>
      <div className="relative">
        {/* Time indicators */}
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          {[0, 6, 12, 18, 23].map((hour) => (
            <span key={hour} style={{ position: 'absolute', left: `${(hour / 23) * 100}%` }}>
              {`${hour}:00`}
            </span>
          ))}
        </div>

        {/* Timeline grid */}
        <div className="h-20 flex mt-6">
          {timeSlots.map((hour) => (
            <div
              key={hour}
              className="flex-1 border-l border-gray-200 h-full first:border-l-0"
              style={{ backgroundColor: hour % 2 === 0 ? 'rgb(249, 250, 251)' : 'white' }}
            />
          ))}
        </div>

        {/* Activity markers */}
        <div className="absolute inset-x-0 top-6 h-20">
          {todayActivities.map((activity) => {
            const date = new Date(activity.timestamp);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const position = ((hours * 60 + minutes) / (24 * 60)) * 100;

            return (
              <div
                key={activity.id}
                className="absolute transform -translate-x-1/2"
                style={{ left: `${position}%` }}
              >
                <div className={`w-2 h-2 rounded-full ${getActivityColor(activity.type)} mb-1`} />
                <div className={`p-1 rounded-md ${getActivityColor(activity.type)} text-white flex items-center space-x-1`}>
                  {getActivityIcon(activity.type)}
                  <span className="text-xs">
                    {date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelineChart;