
import { InputField } from "../fields/InputField";
import { SelectField } from "../fields/SelectField";
import { EditStudentModal } from "../cards/EditStudentsModal";
import { StudentTable } from "../cards/StudentTable";
import  { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useClassRoomStore } from "../store/useClassRoom";

import type { Student } from "../store/useClassRoom";
import { StatCard } from "../cards/StartCard";

const ManageStudents: React.FC = () => {
  const { user } = useAuthStore();
  const { fetchStudentsInClassrooms, myStudentsContainer } = useClassRoomStore();

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [sortBy, setSortBy] = useState<"name" | "progress" | "status">("name");

  useEffect(() => {
    if (user?.email && fetchStudentsInClassrooms) {
      fetchStudentsInClassrooms(user.email);
    } 
  }, [user, fetchStudentsInClassrooms]);


  if(myStudentsContainer == null ){
    return (
        <div>
            No Details Found 
        </div>
    )
  }
  // Filter and sort students
  const filteredStudents: Student[] = (myStudentsContainer || [])
    .filter((student: Student) => {
      const matchesSearch =
        student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || student.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a: Student, b: Student) => {
      if (sortBy === "name") return a.fullName.localeCompare(b.fullName);
      if (sortBy === "progress") return  (b.progress ?? 0)  - (a.progress ?? 0);
      if (sortBy === "status") return (a.status ?? "inactive").localeCompare(b.status ?? "inactive");
      return 0;
    });  

  // Handle editing a student
  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  // Stats calculations
  const totalStudents = myStudentsContainer?.length || 0;
  const activeStudents =
    myStudentsContainer?.filter((s: Student) => s.status === "active").length || 0;
  const averageProgress =
    totalStudents > 0
      ? Math.round(
          myStudentsContainer.reduce(
            (sum: number, student: Student) => sum + (student.progress ?? 0),
            0
          ) / totalStudents
        )
      : 0;
  const averageAttendance =
    totalStudents > 0
      ? Math.round(
          myStudentsContainer.reduce(
            (sum: number, student: Student) => sum + (student.attendanceRate ?? 0),
            0
          ) / totalStudents
        )
      : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600 mt-2">Manage all students in your classrooms</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Students" value={totalStudents} />
          <StatCard title="Active Students" value={activeStudents} />
          <StatCard title="Avg Progress" value={`${averageProgress}%`} />
          <StatCard title="Avg Attendance" value={`${averageAttendance}%`} />
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <InputField
              id="search"
              label="Search Students"
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />

            <SelectField
              id="status"
              label="Filter by Status"
              value={statusFilter}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setStatusFilter(e.target.value as "all" | "active" | "inactive")
              }
              options={[
                { value: "all", label: "All Statuses" },
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ]}
            />

            <SelectField
              id="sort"
              label="Sort By"
              value={sortBy}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setSortBy(e.target.value as "name" | "progress" | "status")
              }
              options={[
                { value: "name", label: "Name" },
                { value: "progress", label: "Progress" },
                { value: "status", label: "Status" },
              ]}
            />
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Students List</h2>
          </div>

          {filteredStudents.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500">No students found matching your criteria.</p>
            </div>
          ) : (
            <StudentTable students={filteredStudents} onEdit={handleEditStudent} />
          )}
        </div>

        {/* Edit Student Modal */}
        {isEditModalOpen && selectedStudent && (
          <EditStudentModal
            student={selectedStudent}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ManageStudents;