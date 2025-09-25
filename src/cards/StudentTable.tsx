
import type { Student } from "../store/useClassRoom";

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
}
export const StudentTable: React.FC<StudentTableProps> = ({ students, onEdit }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {["Student", "Status", "Progress", "Attendance", "Last Active", "Actions"].map(
            (heading) => (
              <th
                key={heading}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {heading}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {students.map((student) => (
          <tr key={student.studentId}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-800 font-medium">
                    {student.fullName.charAt(0)}
                  </span>
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{student.fullName}</div>
                  <div className="text-sm text-gray-500">{student.email}</div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  student.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {student.status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full"
                  style={{ width: `${student.progress}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 mt-1">{student.progress}%</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {student.attendanceRate}%
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {student.lastActive ? new Date(student.lastActive).toLocaleDateString() : "Never"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                onClick={() => onEdit(student)}
                className="text-indigo-600 hover:text-indigo-900 mr-3"
              >
                Edit
              </button>
              <button className="text-red-600 hover:text-red-900">Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
