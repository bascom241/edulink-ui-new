import React from "react";
import { FileText, ClipboardList } from "lucide-react";

interface StudentContentTabProps {
  resources: {
    title?: string;
    fileUrl?: string;
    uploadedAt?: string;
  }[];
  tasks: {
    title?: string;
    description?: string;
    dueDate?: string;
  }[];
}

const StudentContentTab: React.FC<StudentContentTabProps> = ({ resources, tasks }) => {
  return (
    <div className="space-y-10">
      {/* Resources Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <FileText className="text-indigo-500" size={20} />
          Classroom Resources
        </h2>

        {resources?.length ? (
          <div className="space-y-4">
            {resources.map((r, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition"
              >
                <div>
                  <p className="font-medium text-gray-800">{r.title || `Resource ${index + 1}`}</p>
                  {r.uploadedAt && (
                    <p className="text-sm text-gray-500">
                      Uploaded on {new Date(r.uploadedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                {r.fileUrl && (
                  <a
                    href={r.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    View
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-6 bg-gray-50 rounded-xl">
            No resources uploaded yet
          </p>
        )}
      </section>

      {/* Tasks Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <ClipboardList className="text-emerald-500" size={20} />
          Class Tasks
        </h2>

        {tasks?.length ? (
          <div className="space-y-4">
            {tasks.map((t, index) => (
              <div
                key={index}
                className="p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition"
              >
                <p className="font-medium text-gray-900">{t.title || `Task ${index + 1}`}</p>
                {t.description && (
                  <p className="text-gray-600 text-sm mt-1">{t.description}</p>
                )}
                {t.dueDate && (
                  <p className="text-xs text-gray-500 mt-2">
                    Due: {new Date(t.dueDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-6 bg-gray-50 rounded-xl">
            No tasks available yet
          </p>
        )}
      </section>
    </div>
  );
};

export default StudentContentTab;
