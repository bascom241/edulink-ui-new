import { File, Download } from "lucide-react";
export const ResourceCard: React.FC<{ resource: any; onDownload: () => void }> = ({ 
  resource, 
  onDownload 
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start">
          <div className="bg-indigo-100 p-2 rounded-lg mr-4">
            <File className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">{resource.title}</h3>
            {resource.description && (
              <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
            )}
          </div>
        </div>
        <button 
          onClick={onDownload}
          className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
          title="Download"
        >
          <Download size={18} />
        </button>
      </div>
      <div className="text-xs text-gray-500 mt-2">
        Added on {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};