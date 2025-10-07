import React, { useState, useCallback } from 'react';
import { Upload, FileText, X,  File,  Trash2,  Loader } from 'lucide-react';
import { useClassRoomStore } from '../store/useClassRoom';
// Upload Modal Component
interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[], titles: string[], descriptions: string[]) => void;
  type: 'resource' | 'task';
}

export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onUpload, type }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [titles, setTitles] = useState<string[]>([]);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const { uploadingResources, uploadingTasks } = useClassRoomStore()

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(file =>
      type === 'resource'
        ? file.type.startsWith('application/') || file.type.startsWith('text/') || file.type === 'application/pdf'
        : true // For tasks, accept all file types
    );

    setFiles(prev => [...prev, ...validFiles]);
    setTitles(prev => [...prev, ...validFiles.map(file => file.name)]);
    setDescriptions(prev => [...prev, ...validFiles.map(() => '')]);
  }, [type]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(file =>
      type === 'resource'
        ? file.type.startsWith('application/') || file.type.startsWith('text/') || file.type === 'application/pdf'
        : true // For tasks, accept all file types
    );

    setFiles(prev => [...prev, ...validFiles]);
    setTitles(prev => [...prev, ...validFiles.map(file => file.name)]);
    setDescriptions(prev => [...prev, ...validFiles.map(() => '')]);
  }, [type]);

  const removeFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setTitles(prev => prev.filter((_, i) => i !== index));
    setDescriptions(prev => prev.filter((_, i) => i !== index));
  }, []);

  const updateTitle = useCallback((index: number, value: string) => {
    setTitles(prev => prev.map((title, i) => i === index ? value : title));
  }, []);

  const updateDescription = useCallback((index: number, value: string) => {
    setDescriptions(prev => prev.map((desc, i) => i === index ? value : desc));
  }, []);

  const handleSubmit = useCallback(() => {
    if (files.length === 0) return;

    onUpload(files, titles, descriptions);
    setFiles([]);
    setTitles([]);
    setDescriptions([]);
    if (uploadingResources || uploadingTasks) {
      onClose();
    }

  }, [files, titles, descriptions, onUpload, onClose]);

  const handleClose = useCallback(() => {
    setFiles([]);
    setTitles([]);
    setDescriptions([]);
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Add {type === 'resource' ? 'Resources' : 'Tasks'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {/* File Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="max-w-md mx-auto">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                Drag and drop files here
              </p>
              <p className="text-sm text-gray-500 mb-4">
                {type === 'resource'
                  ? 'PDFs, documents, spreadsheets, and text files'
                  : 'Any file type accepted for tasks'
                }
              </p>
              <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <FileText className="mr-2 h-4 w-4" />
                Select files
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileSelect}
                  accept={type === 'resource' ? '.pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx' : '*'}
                />
              </label>
            </div>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Files to upload ({files.length})
              </h3>

              <div className="space-y-4">
                {files.map((file, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start">
                        <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                          <File className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 truncate">{file.name}</p>
                          <p className="text-sm text-gray-500">
                            {(file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={titles[index] || ''}
                          onChange={(e) => updateTitle(index, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Enter a title"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <input
                          type="text"
                          value={descriptions[index] || ''}
                          onChange={(e) => updateDescription(index, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Enter a description (optional)"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={files.length === 0}
            className="px-6 flex items-center justify-center  py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {
              uploadingResources || uploadingTasks ? <Loader className=' animate-spin' /> : ` Upload ${files.length > 0 ? `(${files.length})` : ''}`
            }

          </button>
        </div>
      </div>
    </div>
  );
};
