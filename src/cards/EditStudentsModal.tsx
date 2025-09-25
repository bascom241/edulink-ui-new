
import  type { Student } from "../store/useClassRoom";
import toast from "react-hot-toast";
interface EditStudentModalProps {
  student: Student;
  onClose: () => void;
}
export const EditStudentModal: React.FC<EditStudentModalProps> = ({ student, onClose }) => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
    <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Edit Student</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          defaultValue={student.fullName}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          className="w-full p-2 border border-gray-300 rounded-md"
          defaultValue={student.email}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select className="w-full p-2 border border-gray-300 rounded-md" defaultValue={student.status}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            toast.success("Student updated successfully");
            onClose();
          }}
          className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
);