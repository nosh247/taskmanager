import React, { Suspense } from 'react';
import type { TaskItem, CreateTaskRequest, UpdateTaskRequest } from '../types/task';

// Lazy load the TaskForm component
const TaskForm = React.lazy(() => import('./TaskForm'));

interface LazyTaskFormProps {
  task?: TaskItem;
  onSubmit: (task: CreateTaskRequest | UpdateTaskRequest) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const LazyTaskForm: React.FC<LazyTaskFormProps> = (props) => {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    }>
      <TaskForm {...props} />
    </Suspense>
  );
};

export default LazyTaskForm; 