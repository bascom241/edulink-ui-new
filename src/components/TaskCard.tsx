// Task Card Component

import { ClipboardList, Download } from "lucide-react";
export const TaskCard: React.FC<{ task: any; onDownload: () => void }> = ({ 
  task, 
  onDownload 
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start">
          <div className="bg-green-100 p-2 rounded-lg mr-4">
            <ClipboardList className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">{task.title}</h3>
            {task.description && (
              <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            )}
          </div>
        </div>
        <button 
          onClick={onDownload}
          className="p-2 text-gray-400 hover:text-green-600 transition-colors"
          title="Download"
        >
          <Download size={18} />
        </button>
      </div>
      <div className="text-xs text-gray-500 mt-2">
        Due date: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
      </div>
    </div>
  );
};