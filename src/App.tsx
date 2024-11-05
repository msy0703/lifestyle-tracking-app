import React, { useState, useEffect } from 'react';
import { Sun, Moon, Coffee, Building2, Calendar } from 'lucide-react';
import ActivityLog from './components/ActivityLog';
import AddEntryForm from './components/AddEntryForm';
import ActivityButton from './components/ActivityButton';
import TimelineView from './components/TimelineView';
import { Activity } from './types';

function App() {
  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem('activities');
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('');
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(activities));
  }, [activities]);

  const addActivity = (activity: Activity) => {
    if (editingActivity) {
      setActivities(activities.map(a => 
        a.id === editingActivity.id ? { ...activity, id: editingActivity.id } : a
      ));
      setEditingActivity(null);
    } else {
      setActivities([...activities, { ...activity, id: Date.now() }]);
    }
    setShowForm(false);
  };

  const handleActivityButtonClick = (type: string) => {
    setSelectedType(type);
    setEditingActivity(null);
    setShowForm(true);
  };

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setSelectedType(activity.type);
    setShowForm(true);
  };

  const handleDelete = (activityId: number) => {
    if (window.confirm('この記録を削除してもよろしいですか？')) {
      setActivities(activities.filter(a => a.id !== activityId));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-indigo-900 mb-2">生活リズム記録</h1>
          <p className="text-indigo-600">毎日の生活パターンを記録して、より良い習慣づくりを</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TimelineView activities={activities} />
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center space-x-2 text-indigo-600 mb-6">
                <Calendar className="w-5 h-5" />
                <span className="font-medium">
                  {new Date().toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <ActivityButton
                  icon={<Sun className="w-5 h-5" />}
                  label="起床"
                  color="orange"
                  onClick={() => handleActivityButtonClick('起床')}
                />
                <ActivityButton
                  icon={<Moon className="w-5 h-5" />}
                  label="就寝"
                  color="blue"
                  onClick={() => handleActivityButtonClick('就寝')}
                />
                <ActivityButton
                  icon={<Coffee className="w-5 h-5" />}
                  label="食事"
                  color="green"
                  onClick={() => handleActivityButtonClick('食事')}
                />
                <ActivityButton
                  icon={<Building2 className="w-5 h-5" />}
                  label="外出"
                  color="purple"
                  onClick={() => handleActivityButtonClick('外出')}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <ActivityLog 
                activities={activities} 
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>

        {showForm && (
          <AddEntryForm
            initialType={selectedType}
            initialData={editingActivity}
            onSubmit={addActivity}
            onClose={() => {
              setShowForm(false);
              setEditingActivity(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;