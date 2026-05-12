// ============================================
// TaskFilters Component — Search, Filter & Sort
// ============================================
// Provides search input, status/priority filter dropdowns,
// sort options, and a create task button.

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SortAsc, SortDesc, Plus, X, LayoutGrid, List } from 'lucide-react';
import { useTasks } from '../../context/TaskContext';
import { STATUS_LABELS, PRIORITY_LABELS, SORT_OPTIONS } from '../../utils/constants';
import { debounce } from '../../utils/helpers';

const TaskFilters = ({ onCreateTask, viewMode, onViewModeChange }) => {
  const { filters, updateFilters } = useTasks();
  const [searchInput, setSearchInput] = useState(filters.search);
  const [showFilters, setShowFilters] = useState(false);

  // Debounced search to avoid too many API calls
  const debouncedSearch = useCallback(
    debounce((value) => {
      updateFilters({ search: value });
    }, 400),
    [updateFilters]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  const clearSearch = () => {
    setSearchInput('');
    updateFilters({ search: '' });
  };

  const hasActiveFilters = filters.status !== 'all' || filters.priority !== 'all' || filters.search;

  return (
    <div className="space-y-4">
      {/* Top row: Search + Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchInput}
            onChange={handleSearchChange}
            className="input-field pl-10 pr-10"
          />
          {searchInput && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
            >
              <X className="w-4 h-4 text-surface-400" />
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Toggle filter panel */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary relative ${showFilters ? 'ring-2 ring-primary-500/30' : ''}`}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full" />
            )}
          </button>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center glass rounded-xl p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Create Task */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCreateTask}
            className="btn-primary"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Task</span>
          </motion.button>
        </div>
      </div>

      {/* Filter Panel (collapsible) */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="glass rounded-xl p-4"
        >
          <div className="flex flex-wrap items-center gap-4">
            {/* Status Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => updateFilters({ status: e.target.value })}
                className="input-field py-2 pr-8 text-sm"
              >
                <option value="all">All Status</option>
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {/* Priority Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                Priority
              </label>
              <select
                value={filters.priority}
                onChange={(e) => updateFilters({ priority: e.target.value })}
                className="input-field py-2 pr-8 text-sm"
              >
                <option value="all">All Priority</option>
                {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilters({ sortBy: e.target.value })}
                className="input-field py-2 pr-8 text-sm"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                Order
              </label>
              <button
                onClick={() => updateFilters({ order: filters.order === 'desc' ? 'asc' : 'desc' })}
                className="btn-secondary py-2"
              >
                {filters.order === 'desc' ? (
                  <><SortDesc className="w-4 h-4" /> Newest</>
                ) : (
                  <><SortAsc className="w-4 h-4" /> Oldest</>
                )}
              </button>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-transparent">Clear</label>
                <button
                  onClick={() => {
                    updateFilters({ status: 'all', priority: 'all', search: '', sortBy: 'createdAt', order: 'desc' });
                    setSearchInput('');
                  }}
                  className="btn-ghost text-sm text-red-500 hover:text-red-600"
                >
                  <X className="w-4 h-4" /> Clear All
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TaskFilters;
