import { useTasks } from '../contexts/TaskContext'

export default function Filters() {
  const { filters, setFilters, taskCounts } = useTasks()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <div className="space-y-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium mb-1">Search</label>
          <input
            type="text"
            placeholder="Search by title..."
            value={filters.search}
            onChange={(e) => setFilters({ searchQuery: e.target.value })}
            className="input"
          />
        </div>
        
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ statusFilter: e.target.value })}
            className="input"
          >
            <option value="all">All ({taskCounts.all})</option>
            <option value="pending">Pending ({taskCounts.pending})</option>
            <option value="in-progress">In Progress ({taskCounts['in-progress']})</option>
            <option value="completed">Completed ({taskCounts.completed})</option>
          </select>
        </div>
        
        {/* Priority Filter */}
        <div>
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select
            value={filters.priority}
            onChange={(e) => setFilters({ priorityFilter: e.target.value })}
            className="input"
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        {/* Clear Filters */}
        {(filters.status !== 'all' || filters.priority !== 'all' || filters.search) && (
          <button
            onClick={() => setFilters({ statusFilter: 'all', priorityFilter: 'all', searchQuery: '' })}
            className="text-sm text-primary-500 hover:text-primary-600"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  )
}