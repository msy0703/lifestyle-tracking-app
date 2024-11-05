import React from 'react';

interface ActivityButtonProps {
  icon: React.ReactNode;
  label: string;
  color: 'orange' | 'blue' | 'green' | 'purple';
  onClick: () => void;
}

const colorClasses = {
  orange: 'bg-orange-50 text-orange-600 hover:bg-orange-100',
  blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
  green: 'bg-green-50 text-green-600 hover:bg-green-100',
  purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
};

const ActivityButton: React.FC<ActivityButtonProps> = ({ icon, label, color, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${colorClasses[color]} p-4 rounded-xl w-full transition-colors duration-200 group`}
    >
      <div className="flex items-center space-x-2">
        <div className="group-hover:scale-110 transition-transform duration-200">
          {icon}
        </div>
        <span className="font-medium">{label}</span>
      </div>
    </button>
  );
};

export default ActivityButton;