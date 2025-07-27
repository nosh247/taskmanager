import React, { useMemo, useCallback } from 'react';
import { TaskStatus } from '../types/task';
import SearchBar from './SearchBar';

interface EnhancedFilterBarProps {
  filterStatus: TaskStatus | 'all';
  setFilterStatus: (status: TaskStatus | 'all') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalTasks: number;
  filteredTasks: number;
  onClearFilters: () => void;
}

const EnhancedFilterBar: React.FC<EnhancedFilterBarProps> = ({
  filterStatus,
  setFilterStatus,
  searchQuery,
  setSearchQuery,
  totalTasks,
  filteredTasks,
  onClearFilters,
}) => {
  const hasActiveFilters = useMemo(() => {
    return filterStatus !== 'all' || searchQuery !== '';
  }, [filterStatus, searchQuery]);

  const handleStatusChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilterStatus(value === 'all' ? 'all' : Number(value) as TaskStatus);
  }, [setFilterStatus]);

  const handleClearFilters = useCallback(() => {
    setFilterStatus('all');
    setSearchQuery('');
    onClearFilters();
  }, [setFilterStatus, setSearchQuery, onClearFilters]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Status:
            </label>
            <select
              value={filterStatus}
              onChange={handleStatusChange}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Tasks</option>
              <option value={TaskStatus.Pending}>Pending</option>
              <option value={TaskStatus.InProgress}>In Progress</option>
              <option value={TaskStatus.Done}>Done</option>
            </select>
          </div>

          {/* Search Bar */}
          <div className="flex-1 min-w-0">
            <SearchBar onSearch={setSearchQuery} placeholder="Search tasks..." />
          </div>
        </div>

        {/* Results and Actions */}
        <div className="flex items-center justify-between lg:justify-end space-x-4">
          {/* Results Count */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {hasActiveFilters ? (
              <span>
                Showing {filteredTasks} of {totalTasks} tasks
              </span>
            ) : (
              <span>{totalTasks} total tasks</span>
            )}
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">Active filters:</span>
            
            {filterStatus !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                Status: {filterStatus === TaskStatus.Pending ? 'Pending' : 
                         filterStatus === TaskStatus.InProgress ? 'In Progress' : 'Done'}
                <button
                  onClick={() => setFilterStatus('all')}
                  className="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                >
                  ×
                </button>
              </span>
            )}
            
            {searchQuery && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Search: "{searchQuery}"
                <button
                  onClick={() => setSearchQuery('')}
                  className="ml-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(EnhancedFilterBar); 