

const ClassroomSkeleton = () => {
  return (
     <div className="pt-20 px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48 pb-10 bg-gray-50 min-h-screen">
            <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                    <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-1/2 animate-pulse"></div>
                </div>
                <div className="w-full md:w-auto">
                    <div className="h-10 bg-gray-200 rounded-lg w-40 animate-pulse"></div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-5 animate-pulse">
                        <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-6"></div>
                        
                        <div className="flex justify-between mb-6">
                            <div className="flex items-center">
                                <div className="h-5 w-5 bg-gray-200 rounded-full mr-2"></div>
                                <div className="h-4 bg-gray-200 rounded-md w-16"></div>
                            </div>
                            <div className="flex items-center">
                                <div className="h-5 w-5 bg-gray-200 rounded-full mr-2"></div>
                                <div className="h-4 bg-gray-200 rounded-md w-16"></div>
                            </div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-6">
                            <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                            <div className="flex items-center">
                                <div className="h-4 w-4 bg-gray-200 rounded-md mr-2"></div>
                                <div className="h-4 bg-gray-200 rounded-md w-24"></div>
                            </div>
                        </div>
                        
                        <div className="flex space-x-3">
                            <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
                            <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default ClassroomSkeleton
