import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Save,
  X,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Sun,
  Sunrise,
  Sparkles,
  Clock,
  Flag,
  Trash2,
  Edit3,
  Star,
  Zap,
} from 'lucide-react';

const priorityOptions = [
  {
    value: 'low',
    label: 'Low Priority',
    emoji: '🟢',
    color: 'green',
    icon: '🌿',
  },
  {
    value: 'medium',
    label: 'Medium Priority',
    emoji: '🟡',
    color: 'yellow',
    icon: '⭐',
  },
  {
    value: 'high',
    label: 'High Priority',
    emoji: '🔴',
    color: 'red',
    icon: '⚡',
  },
];

const statusOptions = [
  {
    value: 'pending',
    label: 'Pending',
    emoji: '⏳',
    color: 'gray',
    description: 'Task not started yet',
  },
  {
    value: 'in-progress',
    label: 'In Progress',
    emoji: '⚙️',
    color: 'blue',
    description: 'Currently working on it',
  },
  {
    value: 'completed',
    label: 'Completed',
    emoji: '✅',
    color: 'green',
    description: 'Task finished',
  },
];

export default function TaskForm({ onSubmit, initialData, onCancel }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [characterCount, setCharacterCount] = useState({
    title: 0,
    description: 0,
  });
  const [isFocused, setIsFocused] = useState({
    title: false,
    description: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid, isDirty, isSubmitting },
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: initialData || {
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      status: 'pending',
    },
  });

  const titleValue = watch('title');
  const descriptionValue = watch('description');
  const dueDateValue = watch('dueDate');
  const priorityValue = watch('priority');
  const statusValue = watch('status');

  // Update character counts
  useEffect(() => {
    setCharacterCount({
      title: titleValue?.length || 0,
      description: descriptionValue?.length || 0,
    });
  }, [titleValue, descriptionValue]);

  useEffect(() => {
    if (initialData) {
      reset(initialData);
      setSelectedDate(initialData.dueDate || '');
    }
  }, [initialData, reset]);

  // Helper function to format date to YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Get relative date description
  const getRelativeDateDescription = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    if (date < today) return 'Overdue';
    const daysDiff = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
    if (daysDiff <= 7) return `${daysDiff} days left`;
    return null;
  };

  // Set due date to today
  const setToday = () => {
    const today = new Date();
    const formattedDate = formatDate(today);
    setSelectedDate(formattedDate);
    setValue('dueDate', formattedDate, { shouldValidate: true });
  };

  // Set due date to tomorrow
  const setTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = formatDate(tomorrow);
    setSelectedDate(formattedDate);
    setValue('dueDate', formattedDate, { shouldValidate: true });
  };

  // Set due date to next week (7 days from now)
  const setNextWeek = () => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const formattedDate = formatDate(nextWeek);
    setSelectedDate(formattedDate);
    setValue('dueDate', formattedDate, { shouldValidate: true });
  };

  // Set due date to next month (30 days from now)
  const setNextMonth = () => {
    const nextMonth = new Date();
    nextMonth.setDate(nextMonth.getDate() + 30);
    const formattedDate = formatDate(nextMonth);
    setSelectedDate(formattedDate);
    setValue('dueDate', formattedDate, { shouldValidate: true });
  };

  // Clear due date
  const clearDate = () => {
    setSelectedDate('');
    setValue('dueDate', '', { shouldValidate: true });
  };

  // Get priority icon and color
  const getPriorityStyle = (priority) => {
    const styles = {
      low: {
        border: 'border-green-500',
        bg: 'bg-green-50 dark:bg-green-900/20',
        text: 'text-green-700 dark:text-green-300',
      },
      medium: {
        border: 'border-yellow-500',
        bg: 'bg-yellow-50 dark:bg-yellow-900/20',
        text: 'text-yellow-700 dark:text-yellow-300',
      },
      high: {
        border: 'border-red-500',
        bg: 'bg-red-50 dark:bg-red-900/20',
        text: 'text-red-700 dark:text-red-300',
      },
    };
    return styles[priority] || styles.medium;
  };

  const priorityStyle = getPriorityStyle(priorityValue);
  const relativeDate = getRelativeDateDescription(dueDateValue);

  const getDateStatusColor = () => {
    if (!relativeDate) return 'text-gray-500';
    if (relativeDate === 'Overdue') return 'text-red-500';
    if (relativeDate === 'Today') return 'text-blue-500';
    if (relativeDate === 'Tomorrow') return 'text-orange-500';
    return 'text-green-500';
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header with visual feedback */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-primary-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {initialData ? 'Edit Task' : 'New Task'}
          </h3>
        </div>
        {isDirty && (
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Edit3 size={12} />
            Unsaved changes
          </span>
        )}
      </div>

      {/* Title Input */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
          Task Title <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            {...register('title', {
              required: 'Title is required',
              minLength: {
                value: 3,
                message: 'Title must be at least 3 characters',
              },
              maxLength: {
                value: 100,
                message: 'Title must not exceed 100 characters',
              },
            })}
            onFocus={() => setIsFocused({ ...isFocused, title: true })}
            onBlur={() => setIsFocused({ ...isFocused, title: false })}
            className={`w-full px-4 py-2 border rounded-lg transition-all focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white ${
              errors.title
                ? 'border-red-500'
                : isFocused.title
                  ? 'border-primary-500'
                  : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="What needs to be done?"
          />
        </div>
        <div className="flex justify-between items-start mt-1.5">
          {errors.title ? (
            <p className="text-red-600 text-xs flex items-center gap-1">
              <AlertCircle size={14} /> {errors.title.message}
            </p>
          ) : titleValue && titleValue.length >= 3 ? (
            <p className="text-green-600 text-xs flex items-center gap-1">
              <CheckCircle2 size={14} /> Good to go
            </p>
          ) : titleValue && titleValue.length > 0 ? (
            <p className="text-yellow-600 text-xs flex items-center gap-1">
              <AlertCircle size={14} /> Need at least 3 characters
            </p>
          ) : null}
          <span
            className={`text-xs ${characterCount.title >= 90 ? 'text-orange-500' : characterCount.title >= 100 ? 'text-red-500' : 'text-gray-500'}`}
          >
            {characterCount.title}/100
          </span>
        </div>
      </div>

      {/* Description Input */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
          Description
          {descriptionValue && descriptionValue.length > 0 && (
            <span className="ml-2 text-xs text-gray-500">(Optional)</span>
          )}
        </label>
        <textarea
          {...register('description', {
            maxLength: {
              value: 500,
              message: 'Description must not exceed 500 characters',
            },
          })}
          onFocus={() => setIsFocused({ ...isFocused, description: true })}
          onBlur={() => setIsFocused({ ...isFocused, description: false })}
          className={`w-full px-4 py-2 border rounded-lg transition-all resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white ${
            errors.description
              ? 'border-red-500'
              : isFocused.description
                ? 'border-primary-500'
                : 'border-gray-300 dark:border-gray-600'
          }`}
          rows="4"
          placeholder="Add task details, notes, or requirements... (max 500 characters)"
        />
        <div className="flex justify-between items-end mt-1.5">
          {errors.description && (
            <p className="text-red-600 text-xs flex items-center gap-1">
              <AlertCircle size={14} /> {errors.description.message}
            </p>
          )}
          <span
            className={`text-xs ml-auto ${characterCount.description >= 450 ? 'text-orange-500' : characterCount.description >= 500 ? 'text-red-500' : 'text-gray-500'}`}
          >
            {characterCount.description}/500
          </span>
        </div>
      </div>

      {/* Grid Layout for Priority and Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Priority Select with visual indicator */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white flex items-center gap-1">
            <Flag size={14} />
            Priority
          </label>
          <div
            className={`rounded-lg border-2 transition-all ${priorityStyle.border}`}
          >
            <select
              {...register('priority')}
              className="w-full px-4 py-2 rounded-lg bg-transparent dark:bg-gray-800 dark:text-white focus:outline-none"
            >
              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.emoji} {option.label} {option.icon}
                </option>
              ))}
            </select>
          </div>
          <p
            className={`text-xs mt-1 ${priorityStyle.text} flex items-center gap-1`}
          >
            {priorityValue === 'low' && '🌿 Not urgent, can wait'}
            {priorityValue === 'medium' && '⭐ Important but not critical'}
            {priorityValue === 'high' &&
              '⚡ Critical - needs immediate attention'}
          </p>
        </div>

        {/* Status Select with visual indicator */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white flex items-center gap-1">
            <Clock size={14} />
            Status
          </label>
          <select
            {...register('status')}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.emoji} {option.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            {
              statusOptions.find((opt) => opt.value === statusValue)
                ?.description
            }
          </p>
        </div>
      </div>

      {/* Due Date Input with Quick Actions */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white flex items-center gap-1">
          <Calendar size={14} />
          Due Date
        </label>

        {/* Quick Date Selection Buttons */}
        <div className="flex flex-wrap gap-2 mb-3">
          <button
            type="button"
            onClick={setToday}
            className="px-3 py-1.5 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all flex items-center gap-1 hover:scale-105 transform"
          >
            <Sun size={14} />
            Today
          </button>
          <button
            type="button"
            onClick={setTomorrow}
            className="px-3 py-1.5 text-sm bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-all flex items-center gap-1 hover:scale-105 transform"
          >
            <Sunrise size={14} />
            Tomorrow
          </button>
          <button
            type="button"
            onClick={setNextWeek}
            className="px-3 py-1.5 text-sm bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-all flex items-center gap-1 hover:scale-105 transform"
          >
            <Calendar size={14} />
            Next Week
          </button>
          <button
            type="button"
            onClick={setNextMonth}
            className="px-3 py-1.5 text-sm bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-all flex items-center gap-1 hover:scale-105 transform"
          >
            <Zap size={14} />
            Next Month
          </button>
          {dueDateValue && (
            <button
              type="button"
              onClick={clearDate}
              className="px-3 py-1.5 text-sm bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all flex items-center gap-1"
            >
              <Trash2 size={14} />
              Clear
            </button>
          )}
        </div>

        {/* Date Input */}
        <input
          type="date"
          {...register('dueDate')}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setValue('dueDate', e.target.value, { shouldValidate: true });
          }}
        />

        <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
          <Calendar size={12} />
          Optional - set a deadline or use the quick buttons above
        </p>

        {/* Show selected date preview with relative info */}
        {dueDateValue && (
          <div
            className={`mt-2 p-3 rounded-lg transition-all ${relativeDate === 'Overdue' ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'}`}
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <p
                className={`text-sm flex items-center gap-1 ${getDateStatusColor()}`}
              >
                <CheckCircle2 size={14} />
                Due:{' '}
                {new Date(dueDateValue).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              {relativeDate && (
                <span
                  className={`text-xs px-2 py-1 rounded-full ${relativeDate === 'Overdue' ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300' : 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'}`}
                >
                  {relativeDate}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="flex-1 bg-primary-500 text-white px-6 py-2.5 rounded-lg hover:bg-primary-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transform"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              {initialData ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            <>
              <Save size={18} />
              {initialData ? 'Update Task' : 'Create Task'}
            </>
          )}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
          >
            <X size={18} />
            Cancel
          </button>
        )}
      </div>

      {/* Form footer with helpful tips */}
      <div className="pt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            ✨ <span>Press Enter to submit</span>
          </span>
          <span className="flex items-center gap-1">
            ⌨️ <span>Esc to cancel</span>
          </span>
        </div>
        {isValid && (
          <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
            <CheckCircle2 size={12} />
            Ready to submit
          </span>
        )}
      </div>
    </form>
  );
}
