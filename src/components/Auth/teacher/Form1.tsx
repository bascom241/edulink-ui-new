
import Image1 from "../../../assets/woman-typing-laptop-keyboard.jpg";
import useMultiformStore from "../../../store/Multiform";
import { motion } from "framer-motion";

const Form1T = () => {
  const { 
    formData, 
    handleFormDataChange, 
    currentStep, 
    setCurrentStep, 
totalTeacherSteps 
  } = useMultiformStore();

  const handleContinue = () => {
    // Basic validation before proceeding
    if (
      formData.email && 
      formData.password && 
      formData.password === formData.confirmPassword
    ) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleFormDataChange(name as keyof typeof formData, value);
  };



  // Calculate progress percentage
  const progressPercentage = (currentStep / totalTeacherSteps) * 100;

  return (
    <main className="w-full sm:h-screen flex flex-col lg:flex-row bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Left Section - Visual */}
      <div className="relative w-full lg:w-1/2 h-1/3 lg:h-full overflow-hidden">
        {/* Image (base layer) */}
        <img
          src={Image1}
          alt="Teacher working"
          className="w-full h-full object-cover object-center transform scale-105"
        />

        {/* Overlay (between image and content) */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 z-10" />

        {/* CONTENT (top layer) - centered on small, left on lg) */}
        <div className="absolute inset-0 z-20 flex items-center justify-center lg:justify-start lg:pl-12 px-6">
          <div className="flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left">
            <h2 className="text-2xl lg:text-3xl font-bold text-white drop-shadow-md">
              Teacher Registration
            </h2>

            <div className="flex space-x-2">
              {Array.from({ length: totalTeacherSteps  }, (_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    currentStep >= i + 1 ? "w-8 bg-white" : "w-4 bg-white/50"
                  }`}
                />
              ))}
            </div>

            {/* Circular progress indicator */}
            <div className="relative w-16 h-16">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                {/* Background circle */}
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#ffffff30"
                  strokeWidth="3"
                />
                {/* Progress circle */}
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeDasharray={`${progressPercentage}, 100`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-medium text-sm">
                {Math.round(progressPercentage)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 h-2/3 lg:h-full flex flex-col items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Create Teacher Account</h1>
            <p className="text-gray-500">Step {currentStep} of {totalTeacherSteps }</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Professional Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="your@school.edu"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
                minLength={8}
              />
              <p className="mt-1 text-xs text-gray-500">Minimum 8 characters</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword || ""}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
                placeholder="••••••••"
                required
              />
              {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">Passwords don't match</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex-1 py-3 px-6 rounded-xl border border-gray-300 bg-white text-gray-700 font-medium transition-all hover:bg-gray-50"
            >
              Back
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleContinue}
              disabled={
                !formData.email || 
                !formData.password || 
                !formData.confirmPassword || 
                formData.password !== formData.confirmPassword
              }
              className={`flex-1 py-3 px-6 rounded-xl text-white font-medium transition-all ${
                formData.email && 
                formData.password && 
                formData.confirmPassword && 
                formData.password === formData.confirmPassword
                  ? "bg-gradient-to-r from-green-500 to-blue-600 shadow-lg hover:shadow-xl"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Continue
            </motion.button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Form1T;