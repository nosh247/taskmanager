import { TaskStatus } from '../types/task';

export const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.Pending:
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case TaskStatus.InProgress:
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case TaskStatus.Done:
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getStatusText = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.Pending:
      return 'Pending';
    case TaskStatus.InProgress:
      return 'In Progress';
    case TaskStatus.Done:
      return 'Done';
    default:
      return 'Unknown';
  }
}; 