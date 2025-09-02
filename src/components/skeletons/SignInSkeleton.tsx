

const SignInSkeleton = () => {
  return (
    <main className="w-full sm:h-screen flex flex-col lg:flex-row bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Left Section - Visual */}
      <div className="relative w-full lg:w-1/2 h-1/3 lg:h-full overflow-hidden">
        {/* Skeleton for image */}
        <div className="w-full h-full bg-gray-300 animate-pulse"></div>
        
        {/* Skeleton for overlay content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="h-8 w-48 bg-gray-400/80 rounded-md animate-pulse"></div>
            <div className="h-4 w-64 bg-gray-400/70 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 h-2/3 lg:h-full flex flex-col items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md space-y-6">
          {/* Header Skeleton */}
          <div className="text-center space-y-4">
            <div className="h-8 w-64 bg-gray-300 rounded-md animate-pulse mx-auto"></div>
            <div className="h-4 w-48 bg-gray-300 rounded-md animate-pulse mx-auto"></div>
          </div>

          {/* Form Skeleton */}
          <div className="space-y-5">
            {/* Email Field */}
            <div>
              <div className="h-4 w-16 bg-gray-300 rounded-md animate-pulse mb-2"></div>
              <div className="h-12 w-full bg-gray-300 rounded-xl animate-pulse"></div>
            </div>
            
            {/* Password Field */}
            <div>
              <div className="h-4 w-20 bg-gray-300 rounded-md animate-pulse mb-2"></div>
              <div className="h-12 w-full bg-gray-300 rounded-xl animate-pulse"></div>
              <div className="h-3 w-28 bg-gray-300 rounded-md animate-pulse mt-2 ml-auto"></div>
            </div>
            
            {/* Submit Button */}
            <div className="h-12 w-full bg-gray-300 rounded-xl animate-pulse"></div>
          </div>

          {/* Divider Skeleton */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="h-4 w-24 bg-white animate-pulse"></div>
            </div>
          </div>

          {/* Social Login Skeleton */}
          <div className="grid grid-cols-2 gap-4">
            <div className="h-10 w-full bg-gray-300 rounded-xl animate-pulse"></div>
            <div className="h-10 w-full bg-gray-300 rounded-xl animate-pulse"></div>
          </div>

          {/* Sign Up Link Skeleton */}
          <div className="text-center">
            <div className="h-4 w-48 bg-gray-300 rounded-md animate-pulse mx-auto"></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignInSkeleton;