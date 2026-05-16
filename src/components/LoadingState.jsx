import { Loader } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="card shadow-elevation-6 p-12 max-w-md w-full">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/30 mb-6">
            <Loader
              size={40}
              className="text-primary-600 dark:text-primary-400 animate-spin"
            />
          </div>
          <h3 className="text-h4 font-semibold text-gray-900 dark:text-white mb-2">
            Loading
          </h3>
          <p className="text-body2 text-gray-600 dark:text-gray-400">
            Please wait while we fetch your tasks...
          </p>
          <div className="mt-6 flex gap-1">
            <div
              className="w-2 h-2 rounded-full bg-primary-500 animate-bounce"
              style={{ animationDelay: '0s' }}
            />
            <div
              className="w-2 h-2 rounded-full bg-primary-500 animate-bounce"
              style={{ animationDelay: '0.2s' }}
            />
            <div
              className="w-2 h-2 rounded-full bg-primary-500 animate-bounce"
              style={{ animationDelay: '0.4s' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
