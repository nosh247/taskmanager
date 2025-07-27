import React, { useMemo, useCallback } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import type { TaskItem } from '../types/task';
import { TaskStatus } from '../types/task';
import Task from './Task';

interface VirtualizedTaskGridProps {
  tasks: TaskItem[];
  onEdit: (task: TaskItem) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: TaskStatus) => void;
  containerWidth?: number;
  containerHeight?: number;
}

const VirtualizedTaskGrid: React.FC<VirtualizedTaskGridProps> = ({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
  containerWidth = 1200,
  containerHeight = 600
}) => {
  // Grid configuration
  const COLUMN_COUNT = 3;
  const ROW_HEIGHT = 280; // Height of each task card
  const COLUMN_WIDTH = containerWidth / COLUMN_COUNT;
  
  const rowCount = Math.ceil(tasks.length / COLUMN_COUNT);

  const Cell = useCallback(({ columnIndex, rowIndex, style }: any) => {
    const taskIndex = rowIndex * COLUMN_COUNT + columnIndex;
    const task = tasks[taskIndex];

    if (!task) {
      return (
        <div style={style} className="p-3">
          {/* Empty cell */}
        </div>
      );
    }

    return (
      <div style={style} className="p-3">
        <Task
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      </div>
    );
  }, [tasks, onEdit, onDelete, onStatusChange]);

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📝</div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No tasks yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Create your first task to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Grid
        columnCount={COLUMN_COUNT}
        columnWidth={COLUMN_WIDTH}
        height={containerHeight}
        rowCount={rowCount}
        rowHeight={ROW_HEIGHT}
        width={containerWidth}
        className="scrollbar-hide"
      >
        {Cell}
      </Grid>
    </div>
  );
};

export default React.memo(VirtualizedTaskGrid); 