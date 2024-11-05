import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Activity } from '../types';
import TimelineChart from './TimelineChart';
import WeeklyTimeline from './WeeklyTimeline';
import MonthlyTimeline from './MonthlyTimeline';

interface TimelineViewProps {
  activities: Activity[];
}

type ViewType = 'day' | 'week' | 'month';

const TimelineView: React.FC<TimelineViewProps> = ({ activities }) => {
  const [viewType, setViewType] = useState<ViewType>('day');
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    switch (viewType) {
      case 'day':
        newDate.setDate(currentDate.getDate() - 1);
        break;
      case 'week':
        newDate.setDate(currentDate.getDate() - 7);
        break;
      case 'month':
        newDate.setMonth(currentDate.getMonth() - 1);
        break;
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    switch (viewType) {
      case 'day':
        newDate.setDate(currentDate.getDate() + 1);
        break;
      case 'week':
        newDate.setDate(currentDate.getDate() + 7);
        break;
      case 'month':
        newDate.setMonth(currentDate.getMonth() + 1);
        break;
    }
    setCurrentDate(newDate);
  };

  const formatDateRange = () => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    switch (viewType) {
      case 'day':
        return currentDate.toLocaleDateString('ja-JP', options);
      case 'week': {
        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - currentDate.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return `${weekStart.toLocaleDateString('ja-JP', options)} - ${weekEnd.toLocaleDateString('ja-JP', { day: 'numeric' })}`;
      }
      case 'month':
        return currentDate.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          {(['day', 'week', 'month'] as ViewType[]).map((type) => (
            <button
              key={type}
              onClick={() => setViewType(type)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewType === type
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type === 'day' ? '1日' : type === 'week' ? '1週間' : '1ヶ月'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevious}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800">
          {formatDateRange()}
        </h2>
        <button
          onClick={handleNext}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {viewType === 'day' && (
        <TimelineChart 
          activities={activities.filter(activity => {
            const activityDate = new Date(activity.timestamp);
            return (
              activityDate.getFullYear() === currentDate.getFullYear() &&
              activityDate.getMonth() === currentDate.getMonth() &&
              activityDate.getDate() === currentDate.getDate()
            );
          })} 
        />
      )}
      {viewType === 'week' && (
        <WeeklyTimeline 
          activities={activities}
          currentDate={currentDate}
        />
      )}
      {viewType === 'month' && (
        <MonthlyTimeline 
          activities={activities}
          currentDate={currentDate}
        />
      )}
    </div>
  );
};

export default TimelineView;