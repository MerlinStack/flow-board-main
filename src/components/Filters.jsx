import { useState, useEffect } from 'react';
import { useTasks } from '../contexts/TaskContext';
import { Search, X, Filter, RotateCcw } from 'lucide-react';

export default function Filters() {
  const { filters, setFilters, taskCounts } = useTasks();
  const [searchInput, setSearchInput] = useState(filters.search);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters({ searchQuery: searchInput });
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput, setFilters]);

  const hasActiveFilters =
    filters.status !== 'all' || filters.priority !== 'all' || filters.search;

  const clearAllFilters = () => {
    setFilters({
      statusFilter: 'all',
      priorityFilter: 'all',
      searchQuery: '',
    });
    setSearchInput('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-200 dark:border-gray-700">
        <Filter size={18} className="text-primary-500" />
        <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>
        {hasActiveFilters && (
          <span className="ml-auto text-xs px-2 py-0.5 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-full">
            {filters.search ? '1' : 
             filters.status !== 'all' && filters.priority !== 'all' ? '2' :
             filters.status !== 'all' || filters.priority !== 'all' ? '1' : '0'} active
          </span>
        )}
      </div>

      <div className="space-y-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
            Search
          </label>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
            {searchInput && (
              <button
                onClick={() => {
                  setSearchInput('');
                  setFilters({ searchQuery: '' });
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ statusFilter: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All ({taskCounts.all})</option>
            <option value="pending">⏳ Pending ({taskCounts.pending})</option>
            <option value="in-progress">⚙️ In Progress ({taskCounts['in-progress']})</option>
            <option value="completed">✅ Completed ({taskCounts.completed})</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
            Priority
          </label>
          <select
            value={filters.priority}
            onChange={(e) => setFilters({ priorityFilter: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All Priorities</option>
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="w-full mt-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw size={14} />
            Clear filters
          </button>
        )}

        {/* Active Filters Tags - Only show when filters are active */}
        {hasActiveFilters && (
          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-1.5">
              {filters.search && (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full">
                  Search: "{filters.search.length > 15 ? filters.search.slice(0, 15) + '...' : filters.search}"
                  <button onClick={() => {
                    setSearchInput('');
                    setFilters({ searchQuery: '' });
                  }} className="ml-0.5 hover:text-red-500">×</button>
                </span>
              )}
              {filters.status !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full">
                  {filters.status}
                  <button onClick={() => setFilters({ statusFilter: 'all' })} className="ml-0.5 hover:text-red-500">×</button>
                </span>
              )}
              {filters.priority !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full">
                  {filters.priority}
                  <button onClick={() => setFilters({ priorityFilter: 'all' })} className="ml-0.5 hover:text-red-500">×</button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}