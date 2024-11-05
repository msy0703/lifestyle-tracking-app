import React from 'react';
import { Activity } from '../types';
import { Sun, Moon, Coffee, Building2 } from 'lucide-react';

interface WeeklyTimelineProps {
  activities: Activity[];
  currentDate: Date;
}

const WeeklyTimeline: React.FC<WeeklyTimelineProps> = ({ activities, currentDate }) => {
  const weekStart = new Date(currentDate);
  weekStart.setDate(currentDate.getDate() - currentDate.getDay());
  weekStart.setHours(0, 0, 0, 0);

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return date;
  });

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

  return (
    <div className="space-y-4">
      {days.map((day) => {
        const dayActivities = activities.filter((activity) => {
          const activityDate = new Date(activity.timestamp);
          return (
            activityDate.getFullYear() === day.getFullYear() &&
            activityDate.getMonth() === day.getMonth() &&
            activityDate.getDate() === day.getDate()
          );
        });

        return (
          <div key={day.toISOString()} className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              {day.toLocaleDateString('ja-JP', {
                weekday: 'long',
                month: 'numeric',
                day: 'numeric',
              })}
            </h3>
            <div className="relative h-16">
              {/* Time indicators */}
              <div className="absolute inset-x-0 top-0 flex justify-between text-xs text-gray-400">
                {[0, 6, 12, 18, 23].map((hour) => (
                  <span key={hour}>{`${hour}:00`}</span>
                ))}
              </div>

              {/* Timeline */}
              <div className="absolute inset-x-0 top-6 h-8 flex">
                {Array.from({ length: 24 }, (_, i) => (
                  <div
                    key={i}
                    className="flex-1 border-l border-gray-200 first:border-l-0"
                    style={{
                      backgroundColor: i % 2 === 0 ? 'rgb(249, 250, 251)' : 'white',
                    }}
                  />
                ))}
              </div>

              {/* Activity markers */}
              {dayActivities.map((activity) => {
                const date = new Date(activity.timestamp);
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const position = ((hours * 60 + minutes) / (24 * 60)) * 100;

                return (
                  <div
                    key={activity.id}
                    className="absolute top-4"
                    style={{ left: `${position}%` }}
                  >
                    <div
                      className={`w-1 h-8 ${getActivityColor(
                        activity.type
                      )} transform -translate-x-1/2`}
                    />
                    <div
                      className={`absolute bottom-full mb-1 ${getActivityColor(
                        activity.type
                      )} text-white rounded-md p-1 transform -translate-x-1/2 flex items-center space-x-1`}
                    >
                      {getActivityIcon(activity.type)}
                      <span className="text-xs">
                        {date.toLocaleTimeString('ja-JP', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeeklyTimeline;