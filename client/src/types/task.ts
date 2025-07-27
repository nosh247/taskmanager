export interface TaskItem {
  id: number;
  title: string;
  description: string;
  dueDate?: string;
  status: TaskStatus;
  createdBy: string;
  assignedTo: string;
  createdAt: string;
  updatedAt?: string;
  createdById?: number;
  assignedToId?: number;
}

export const TaskStatus = {
  Pending: 0,
  InProgress: 1,
  Done: 2
} as const;

export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus];

export interface CreateTaskRequest {
  title: string;
  description: string;
  dueDate?: string;
  status: TaskStatus;
  createdBy: string;
  assignedTo: string;
}

export interface UpdateTaskRequest {
  title: string;
  description: string;
  dueDate?: string;
  status: TaskStatus;
  createdBy: string;
  assignedTo: string;
} 