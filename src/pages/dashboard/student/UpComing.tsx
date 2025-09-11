const UpcomingAssignments = () => {
  const assignments = [
    { id: 1, title: "Math Problem Set", dueDate: "Tomorrow", subject: "Mathematics", priority: "high" },
    { id: 2, title: "Science Lab Report", dueDate: "In 3 days", subject: "Science", priority: "medium" }
  ];

  return (
    <div className='w-full p-6 bg-white rounded-2xl shadow-lg border border-gray-100'>
      <h2 className='text-xl font-bold text-gray-800 mb-4'>Upcoming Assignments</h2>
      <div className='space-y-3'>
        {assignments.map(assignment => (
          <div key={assignment.id} className='p-3 rounded-lg border border-gray-100 hover:bg-gray-50'>
            <div className='flex justify-between items-center'>
              <h3 className='font-medium'>{assignment.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${assignment.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>
                {assignment.priority}
              </span>
            </div>
            <p className='text-sm text-gray-500 mt-1'>{assignment.subject} • Due {assignment.dueDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default UpcomingAssignments;