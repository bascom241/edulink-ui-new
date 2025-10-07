
import { Plus, BookOpen , ClipboardList} from "lucide-react";
import { ResourceCard } from "./ResourcesCard";
import { useState } from "react";
import { TaskCard } from "./TaskCard";
export const ContentTab: React.FC<{ 
  resources: any[]; 
  tasks: any[];
  onAddResource?: () => void;
  onAddTask?: () => void;
    readOnly?: boolean;
}> = ({ resources, tasks, onAddResource, onAddTask  }) => {
  const [activeContentTab, setActiveContentTab] = useState<'resources' | 'tasks'>('resources');

  const handleDownload = (fileUrl: string, fileName: string) => {
  
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Content Header with Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Class Content</h2>
        
        <div className="flex border border-gray-200 rounded-lg p-1 bg-gray-50">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeContentTab === 'resources'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveContentTab('resources')}
          >
            Resources
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeContentTab === 'tasks'
                ? 'bg-white text-green-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveContentTab('tasks')}
          >
            Tasks
          </button>
        </div>
      </div>

      {/* Resources Tab */}
      {activeContentTab === 'resources' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-800">Learning Resources</h3>
            <button 
              onClick={onAddResource}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <Plus className="mr-2" size={16} />
              Add Resources
            </button>
          </div>

          {resources && resources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map((resource, index) => (
                <ResourceCard
                  key={index}
                  resource={resource}
                  onDownload={() => resource.fileUrl && handleDownload(resource.fileUrl, resource.title)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-gray-300 rounded-xl">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No resources yet</h3>
              <p className="text-gray-500 mb-4">Add your first resource to get started</p>
              <button 
                onClick={onAddResource}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                <Plus className="mr-2" size={16} />
                Add Resources
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tasks Tab */}
      {activeContentTab === 'tasks' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-800">Class Tasks</h3>
            <button 
              onClick={onAddTask}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <Plus className="mr-2" size={16} />
              Add Tasks
            </button>
          </div>

          {tasks && tasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks.map((task, index) => (
                <TaskCard
                  key={index}
                  task={task}
                  onDownload={() => task.fileUrl && handleDownload(task.fileUrl, task.title)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-gray-300 rounded-xl">
              <ClipboardList className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No tasks yet</h3>
              <p className="text-gray-500 mb-4">Add your first task to get started</p>
              <button 
                onClick={onAddTask}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <Plus className="mr-2" size={16} />
                Add Tasks
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};