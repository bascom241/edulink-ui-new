import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,

  LineChart,
  Line,
  CartesianGrid
} from "recharts";

interface Classroom {
  classId: number;
  className: string;
  numberOfStudents: number;
  numberOfSessions: number;
  resources: any[];
  tasks: any[];
  classCategory: string;
  classDeliveryModel: string;
  classDescription: string;
  classDurationInDays: number;
  classLocation: string;
  classroomFull: boolean;
  classroomPrice: number;
  createdAt: string;
  expiresAt: string;
  numberOfQuestions: number;
  sessionOngoing: boolean;
  targetAudience: string;
  students: any[];
  sessions: any[];
}

const ClassroomChart: React.FC<{ classroom: Classroom }> = ({ classroom }) => {
  // Calculate metrics based on provided data

  // Calculate session completion percentage
  const sessionCompletion = Math.min(100, Math.round((classroom.numberOfSessions / 16) * 100));
  
  // Calculate days remaining
  const daysRemaining = Math.max(0, Math.floor((new Date(classroom.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));
  
  // Calculate progress percentage
  const totalDuration = classroom.classDurationInDays;
  const daysSinceStart = Math.max(0, Math.floor((new Date().getTime() - new Date(classroom.createdAt).getTime()) / (1000 * 60 * 60 * 24)));
  const progressPercentage = Math.min(100, Math.round((daysSinceStart / totalDuration) * 100));
  
  // Data for bar chart
  const barData = [
    { name: "Students", value: classroom.numberOfStudents },
    { name: "Sessions", value: classroom.numberOfSessions },
    { name: "Resources", value: classroom.resources?.length || 0 },
    { name: "Tasks", value: classroom.tasks?.length || 0 },
  ];

  // Data for pie chart (distribution)
  const pieData = [
    { name: "Students", value: classroom.numberOfStudents },
    { name: "Resources", value: classroom.resources?.length || 0 },
    { name: "Tasks", value: classroom.tasks?.length || 0 },
  ];

  // Data for progress over time (calculated based on sessions)
  const progressData = [
    { week: "Week 1", sessions: 1 },
    { week: "Week 2", sessions: 0 },
    { week: "Week 3", sessions: 0 },
    { week: "Week 4", sessions: 0 },
    { week: "Week 5", sessions: 0 },
    { week: "Week 6", sessions: 0 },
  ];

  // Data for resource types (if available in resources)
  const resourceTypes = {
    pdf: classroom.resources?.filter(r => r.type === 'pdf').length || 0,
    video: classroom.resources?.filter(r => r.type === 'video').length || 0,
    article: classroom.resources?.filter(r => r.type === 'article').length || 0,
    other: classroom.resources?.filter(r => !['pdf', 'video', 'article'].includes(r.type)).length || 0
  };
  
  const resourceData = [
    { name: "PDFs", value: resourceTypes.pdf },
    { name: "Videos", value: resourceTypes.video },
    { name: "Articles", value: resourceTypes.article },
    { name: "Other", value: resourceTypes.other },
  ];

  const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  return (
    <div className="bg-gray-50 p-6 rounded-2xl">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{classroom.className}</h1>
        <p className="text-gray-600 mt-2">{classroom.classDescription}</p>
        <div className="flex flex-wrap gap-4 mt-4">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
            {classroom.classCategory}
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            {classroom.classDeliveryModel}
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
            {classroom.targetAudience}
          </span>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
            {classroom.classDurationInDays} days
          </span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Students</h3>
          <p className="text-2xl font-bold text-gray-900">{classroom.numberOfStudents}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Sessions</h3>
          <p className="text-2xl font-bold text-gray-900">{classroom.numberOfSessions}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Resources</h3>
          <p className="text-2xl font-bold text-gray-900">{classroom.resources?.length || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Tasks</h3>
          <p className="text-2xl font-bold text-gray-900">{classroom.tasks?.length || 0}</p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Progress</h2>
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Completion</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p className="font-medium">Started</p>
            <p>{new Date(classroom.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="font-medium">Ends</p>
            <p>{new Date(classroom.expiresAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="font-medium">Days Remaining</p>
            <p>{daysRemaining}</p>
          </div>
          <div>
            <p className="font-medium">Session Completion</p>
            <p>{sessionCompletion}%</p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Classroom Metrics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Bar dataKey="value" fill="#4F46E5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Content Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                labelLine={false}
              >
                {pieData.map(( index:any) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Progress Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sessions Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" />
              <YAxis allowDecimals={false} />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Line type="monotone" dataKey="sessions" stroke="#6366F1" strokeWidth={2} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Resource Types Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Resource Types</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={resourceData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                labelLine={false}
              >
                {resourceData.map(( index:any) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
              
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ClassroomChart;