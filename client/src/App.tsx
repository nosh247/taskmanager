import { useState, useEffect, useMemo } from 'react';
import type { TaskItem, CreateTaskRequest, UpdateTaskRequest } from './types/task';
import { TaskStatus } from './types/task';
import { taskApi } from './services/api';
import ResponsiveVirtualizedList from './components/ResponsiveVirtualizedList';
import LazyTaskForm from './components/LazyTaskForm';
import EnhancedFilterBar from './components/EnhancedFilterBar';
import PerformanceMonitor from './components/PerformanceMonitor';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskItem | null>(null);
  const [filterStatus, setFilterStatus] = useLocalStorage<TaskStatus | 'all'>('filterStatus', 'all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const fetchedTasks = await taskApi.getTasks();
      setTasks(fetchedTasks);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks. Please check if the backend is running.');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: CreateTaskRequest) => {
    try {
      const newTask = await taskApi.createTask(taskData);
      setTasks(prev => [...prev, newTask]);
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to create task.');
      console.error('Error creating task:', err);
    }
  };

  const handleUpdateTask = async (taskData: UpdateTaskRequest) => {
    if (!editingTask) return;

    try {
      await taskApi.updateTask(editingTask.id, taskData);
      setTasks(prev => prev.map(task =>
        task.id === editingTask.id
          ? { ...task, ...taskData, updatedAt: new Date().toISOString() }
          : task
      ));
      setEditingTask(null);
      setError(null);
    } catch (err) {
      setError('Failed to update task.');
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await taskApi.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete task.');
      console.error('Error deleting task:', err);
    }
  };

  const handleStatusChange = async (id: number, status: TaskStatus) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (!task) return;

      await taskApi.updateTask(id, {
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        status,
        createdBy: task.createdBy,
        assignedTo: task.assignedTo,
      });

      setTasks(prev => prev.map(t =>
        t.id === id ? { ...t, status, updatedAt: new Date().toISOString() } : t
      ));
      setError(null);
    } catch (err) {
      setError('Failed to update task status.');
      console.error('Error updating task status:', err);
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
      const matchesSearch = searchQuery === '' ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.createdBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [tasks, filterStatus, searchQuery]);

  const getStatusCount = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Task Manager
          </h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{tasks.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</div>
          </div>
          <div className="bg-yellow-100 dark:bg-yellow-900 rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">{getStatusCount(TaskStatus.Pending)}</div>
            <div className="text-sm text-yellow-600 dark:text-yellow-400">Pending</div>
          </div>
          <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">{getStatusCount(TaskStatus.InProgress)}</div>
            <div className="text-sm text-blue-600 dark:text-blue-400">In Progress</div>
          </div>
          <div className="bg-green-100 dark:bg-green-900 rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">{getStatusCount(TaskStatus.Done)}</div>
            <div className="text-sm text-green-600 dark:text-green-400">Completed</div>
          </div>
        </div>

        {/* Enhanced Filter Bar */}
        <EnhancedFilterBar
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          totalTasks={tasks.length}
          filteredTasks={filteredTasks.length}
          onClearFilters={() => {
            setFilterStatus('all');
            setSearchQuery('');
          }}
        />

        {/* Add Task Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            + Add New Task
          </button>
        </div>

        {/* Virtualized Tasks List */}
        <ResponsiveVirtualizedList
          tasks={filteredTasks}
          onEdit={setEditingTask}
          onDelete={handleDeleteTask}
          onStatusChange={handleStatusChange}
        />

        {/* Task Form Modal */}
        {showForm && (
          <LazyTaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setShowForm(false)}
          />
        )}

        {editingTask && (
          <LazyTaskForm
            task={editingTask}
            onSubmit={handleUpdateTask}
            onCancel={() => setEditingTask(null)}
            isEditing={true}
          />
        )}
      </div>

      {/* Performance Monitor (only in development) */}
      <PerformanceMonitor enabled={import.meta.env.DEV} />
    </div>
  );
}

export default App;
