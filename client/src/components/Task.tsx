import React from 'react';
import type { TaskItem } from '../types/task';
import { TaskStatus } from '../types/task';
import { getStatusColor, getStatusText } from '../utils/statusUtils';

interface TaskProps {
  task: TaskItem;
  onEdit: (task: TaskItem) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: TaskStatus) => void;
}

const Task: React.FC<TaskProps> = React.memo(({ task, onEdit, onDelete, onStatusChange }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No due date';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {task.title}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
        {task.description || 'No description'}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium mr-2">Created by:</span>
          {task.createdBy}
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium mr-2">Assigned to:</span>
          {task.assignedTo || 'Unassigned'}
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium mr-2">Due date:</span>
          {formatDate(task.dueDate)}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
            task.status
          )}`}
        >
          {getStatusText(task.status)}
        </span>
        
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as unknown as TaskStatus)}
          className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={TaskStatus.Pending}>Pending</option>
          <option value={TaskStatus.InProgress}>In Progress</option>
          <option value={TaskStatus.Done}>Done</option>
        </select>
      </div>
    </div>
  );
});

export default Task; 