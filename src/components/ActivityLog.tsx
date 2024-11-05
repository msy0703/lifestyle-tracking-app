import React from 'react';
import { Sun, Moon, Coffee, Building2, Home, Pencil, Trash2 } from 'lucide-react';
import { Activity } from '../types';

interface ActivityLogProps {
  activities: Activity[];
  onEdit: (activity: Activity) => void;
  onDelete: (activityId: number) => void;
}

const ActivityLog: React.FC<ActivityLogProps> = ({ activities, onEdit, onDelete }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case '起床':
        return <Sun className="w-5 h-5 text-orange-500" />;
      case '就寝':
        return <Moon className="w-5 h-5 text-blue-500" />;
      case '食事':
        return <Coffee className="w-5 h-5 text-green-500" />;
      case '外出':
        return <Building2 className="w-5 h-5 text-purple-500" />;
      default:
        return <Home className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">活動記録</h2>
      {activities.length === 0 ? (
        <p className="text-center text-gray-500 py-8">まだ記録がありません</p>
      ) : (
        activities
          .sort((a, b) => b.timestamp - a.timestamp)
          .map((activity) => (
            <div
              key={activity.id}
              className="bg-gray-50 rounded-lg p-4 flex items-center space-x-4 group"
            >
              {getActivityIcon(activity.type)}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">{activity.type}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {new Date(activity.timestamp).toLocaleString('ja-JP', {
                        month: 'numeric',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                      <button
                        onClick={() => onEdit(activity)}
                        className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                        title="編集"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(activity.id)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded"
                        title="削除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                {activity.type === '起床' && (
                  <div className="mt-1 text-sm text-gray-600">
                    疲れレベル: {activity.tirednessLevel}/10
                  </div>
                )}
                {activity.type === '外出' && (
                  <div className="mt-1 text-sm text-gray-600">
                    目的: {activity.purpose}
                  </div>
                )}
                {activity.note && (
                  <div className="mt-1 text-sm text-gray-600">{activity.note}</div>
                )}
              </div>
            </div>
          ))
      )}
    </div>
  );
};

export default ActivityLog;