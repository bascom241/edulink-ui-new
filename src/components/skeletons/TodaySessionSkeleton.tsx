

const TodaySessionSkeleton = () => {
  return (
   <div className="w-full p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                {/* Header skeleton */}
                <div className="flex items-center justify-between mb-6">
                    <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                    <div className="h-5 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>

                {/* Session cards skeleton */}
                <div className="space-y-4">
                    {[...Array(2)].map((_, i) => (
                        <div
                            key={i}
                            className="p-4 rounded-xl border border-gray-100 bg-gradient-to-r from-white to-gray-50"
                        >
                            {/* Title + dot */}
                            <div className="flex justify-between items-start">
                                <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                                <div className="w-2 h-2 bg-gray-200 rounded-full mt-2 animate-pulse"></div>
                            </div>

                            {/* Time */}
                            <div className="flex items-center mt-2">
                                <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                            </div>

                            {/* Progress bar */}
                            <div className="mt-3">
                                <div className="w-full bg-gray-200 rounded-full h-1.5 animate-pulse"></div>
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                    <div className="h-3 bg-gray-200 rounded w-10 animate-pulse"></div>
                                    <div className="h-3 bg-gray-200 rounded w-6 animate-pulse"></div>
                                </div>
                            </div>

                            {/* Button */}
                            <div className="mt-3 h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                        </div>
                    ))}
                </div>

                {/* Join button skeleton */}
                <div className="w-full mt-6 py-3 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
  )
}

export default TodaySessionSkeleton
