import React, { useEffect, useState } from 'react';

interface PerformanceMonitorProps {
  enabled?: boolean;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ enabled = false }) => {
  const [metrics, setMetrics] = useState({
    memory: 0,
    tasks: 0,
    renderTime: 0
  });

  useEffect(() => {
    if (!enabled) return;

    const updateMetrics = () => {
      if ('memory' in performance) {
        const memory = (performance as Performance & { memory: { usedJSHeapSize: number } }).memory;
        setMetrics(prev => ({
          ...prev,
          memory: Math.round(memory.usedJSHeapSize / 1024 / 1024) // MB
        }));
      }
    };

    const interval = setInterval(updateMetrics, 2000);
    return () => clearInterval(interval);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-3 rounded-lg text-xs font-mono z-50">
      <div>Memory: {metrics.memory}MB</div>
      <div>Tasks: {metrics.tasks}</div>
      <div>Render: {metrics.renderTime}ms</div>
    </div>
  );
};

export default PerformanceMonitor; 