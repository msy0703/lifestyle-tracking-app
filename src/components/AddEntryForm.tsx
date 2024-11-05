import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Activity } from '../types';

interface AddEntryFormProps {
  initialType: string;
  initialData: Activity | null;
  onSubmit: (activity: Activity) => void;
  onClose: () => void;
}

const AddEntryForm: React.FC<AddEntryFormProps> = ({ 
  initialType, 
  initialData, 
  onSubmit, 
  onClose 
}) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [tirednessLevel, setTirednessLevel] = useState(5);
  const [purpose, setPurpose] = useState('私用');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (initialData) {
      const activityDate = new Date(initialData.timestamp);
      setDate(activityDate.toISOString().split('T')[0]);
      setTime(
        `${String(activityDate.getHours()).padStart(2, '0')}:${String(
          activityDate.getMinutes()
        ).padStart(2, '0')}`
      );
      if (initialData.tirednessLevel) setTirednessLevel(initialData.tirednessLevel);
      if (initialData.purpose) setPurpose(initialData.purpose);
      if (initialData.note) setNote(initialData.note);
    } else {
      const now = new Date();
      setDate(now.toISOString().split('T')[0]);
      setTime(
        `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      );
      setTirednessLevel(5);
      setPurpose('私用');
      setNote('');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const timestamp = new Date(`${date}T${time}:00`).getTime();
    
    onSubmit({
      id: initialData?.id || 0,
      type: initialType,
      timestamp,
      tirednessLevel: initialType === '起床' ? tirednessLevel : undefined,
      purpose: initialType === '外出' ? purpose : undefined,
      note: note.trim() || undefined,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {initialData ? '記録を編集' : `${initialType}を記録`}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                日付
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                時刻
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {initialType === '起床' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                疲れレベル (1-10)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={tirednessLevel}
                onChange={(e) => setTirednessLevel(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-center text-sm text-gray-600">{tirednessLevel}</div>
            </div>
          )}

          {initialType === '外出' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                目的
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="私用">私用</option>
                <option value="出社">出社</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              メモ (任意)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {initialData ? '更新する' : '記録を追加'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEntryForm;