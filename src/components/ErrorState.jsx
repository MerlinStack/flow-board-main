import { AlertTriangle } from 'lucide-react';

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="card shadow-elevation-6 p-12 max-w-md w-full">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-error-100 dark:bg-error-900/30 mb-6">
            <AlertTriangle
              size={40}
              className="text-error-600 dark:text-error-400"
            />
          </div>
          <h3 className="text-h4 font-semibold text-gray-900 dark:text-white mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-body2 text-error-600 dark:text-error-400 mb-6 max-w-sm">
            {message}
          </p>
          {onRetry && (
            <button onClick={onRetry} className="btn-primary">
              🔄 Try Again
            </button>
          )}
          <p className="text-caption text-gray-500 dark:text-gray-400 mt-6">
            If the problem persists, please try refreshing the page.
          </p>
        </div>
      </div>
    </div>
  );
}
