import React from 'react';
import { Activity } from '../types';
import { Sun, Moon, Coffee, Building2 } from 'lucide-react';

interface MonthlyTimelineProps {
  activities: Activity[];
  currentDate: Date;
}

const MonthlyTimeline: React.FC<MonthlyTimelineProps> = ({ activities, currentDate }) => {
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const daysInMonth = getDaysInMonth(currentDate);

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

  return (
    <div className="grid grid-cols-7 gap-2">
      {['日', '月', '火', '水', '木', '金', '土'].map((day) => (
        <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
          {day}
        </div>
      ))}

      {Array.from({ length: firstDay.getDay() }).map((_, index) => (
        <div key={`empty-${index}`} className="h-24" />
      ))}

      {Array.from({ length: daysInMonth }).map((_, index) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1);
        const dayActivities = activities.filter((activity) => {
          const activityDate = new Date(activity.timestamp);
          return (
            activityDate.getFullYear() === date.getFullYear() &&
            activityDate.getMonth() === date.getMonth() &&
            activityDate.getDate() === date.getDate()
          );
        });

        return (
          <div
            key={date.toISOString()}
            className="h-24 border border-gray-200 rounded-lg p-1"
          >
            <div className="text-sm text-gray-600 mb-1">{index + 1}</div>
            <div className="space-y-1">
              {dayActivities.map((activity) => (
                <div
                  key={activity.id}
                  className={`${getActivityColor(
                    activity.type
                  )} text-white rounded-md p-1 flex items-center space-x-1 text-xs`}
                >
                  {getActivityIcon(activity.type)}
                  <span>
                    {new Date(activity.timestamp).toLocaleTimeString('ja-JP', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MonthlyTimeline;