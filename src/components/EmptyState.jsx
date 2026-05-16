import { InboxIcon } from 'lucide-react';

export default function EmptyState({ message, action }) {
  return (
    <div className="card shadow-elevation-2 p-12">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/30 mb-6">
          <InboxIcon
            size={40}
            className="text-primary-600 dark:text-primary-400"
          />
        </div>
        <h3 className="text-h4 font-semibold text-gray-900 dark:text-white mb-2">
          No Tasks Yet
        </h3>
        <p className="text-body2 text-gray-600 dark:text-gray-400 max-w-sm mb-6">
          {message}
        </p>
        {action && (
          <button
            onClick={action.onClick}
            className="btn-primary flex items-center gap-2"
          >
            ➕ {action.label}
          </button>
        )}
      </div>
    </div>
  );
}
