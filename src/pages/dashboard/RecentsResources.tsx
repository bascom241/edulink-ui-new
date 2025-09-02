const RecentResources = () => {
  const resources = [
    { id: 1, title: "Calculus Textbook", type: "PDF", subject: "Mathematics" },
    { id: 2, title: "Chemistry Lab Notes", type: "Document", subject: "Science" }
  ];

  return (
    <div className='w-full mt-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-100'>
      <h2 className='text-xl font-bold text-gray-800 mb-4'>Recent Resources</h2>
      <div className='space-y-3'>
        {resources.map(resource => (
          <div key={resource.id} className='flex items-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50'>
            <div className='bg-blue-100 p-2 rounded-lg mr-3'>
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div>
              <h3 className='font-medium'>{resource.title}</h3>
              <p className='text-sm text-gray-500'>{resource.type} • {resource.subject}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentResources