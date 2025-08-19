
import Image1 from "../../assets/close-up-employee-typing-laptop-keyboard-inputting-data-metrics (1).jpg";
import useMultiformStore from "../../store/Multiform";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Form0 = () => {
  const { formData, handleFormDataChange, currentStep, setCurrentStep, totalStudentSteps, totalTeacherSteps } =
    useMultiformStore();

  const handleSelect = (type: "student" | "teacher") => {
    handleFormDataChange("student", type === "student");
    handleFormDataChange("teacher", type === "teacher");
  };

  const handleContinue = () => {
    if (formData.student || formData.teacher) {
      setCurrentStep(2);
    }
  };

  return (
    <main className="w-full sm:h-screen flex flex-col lg:flex-row bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Left Section - Visual */}
      <div className="relative w-full lg:w-1/2 h-1/3 lg:h-full overflow-hidden">
        {/* Image (base layer) */}
        <img
          src={Image1}
          alt="Background"
          className="w-full h-full object-cover object-center transform scale-105"
        />

        {/* Overlay (between image and content) */}
        <div className="absolute  inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 z-10" />

        {/* CONTENT (top layer) - centered on small, left on lg) */}
        <div className="absolute inset-0 z-20 flex items-center justify-center lg:justify-start lg:pl-12 px-6">
          <div className="flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left">
            <h2 className="text-2xl lg:text-3xl font-bold text-white drop-shadow-md">
              Choose Your Path
            </h2>

            <div className="flex flex-col space-y-4">
              {/* Teacher Progress */}
              <div className="flex items-center space-x-4">
                <p className="w-16 text-sm font-medium text-white">Teacher</p>
                <div className="flex items-center space-x-2 flex-1">
                  {Array.from({ length: totalTeacherSteps }, (_, i) => (
                    <div
                      key={`teacher-${i}`}
                      className={`h-2 rounded-full transition-all duration-300 ${currentStep >= i + 1
                          ? "w-6 bg-emerald-400"
                          : "w-3 bg-gray-500"
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* Student Progress */}
              <div className="flex items-center space-x-4">
                <p className="w-16 text-sm font-medium text-white">Student</p>
                <div className="flex items-center space-x-2 flex-1">
                  {Array.from({ length: totalStudentSteps }, (_, i) => (
                    <div
                      key={`student-${i}`}
                      className={`h-2 rounded-full transition-all duration-300 ${currentStep >= i + 1
                          ? "w-6  bg-indigo-400"
                          : "w-3 bg-gray-500"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 h-2/3 lg:h-full flex flex-col items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md space-y-10">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Join Our Community</h1>
            <p className="text-gray-500">Select your role to get started</p>
          </div>

          {/* Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Card */}
            <motion.div
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect("student")}
              className={`relative cursor-pointer rounded-2xl p-6 border-2 flex flex-col items-center justify-center transition-all duration-300 
                ${formData.student
                  ? "border-blue-500 bg-blue-50 shadow-lg shadow-blue-100/50"
                  : "border-gray-200 bg-white hover:border-gray-300"}`}
            >
              {formData.student && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              <div className="w-16 h-16 mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Student</h3>
              <p className="text-gray-500 text-center text-sm">
                Join to learn and explore courses from experts
              </p>
            </motion.div>

            {/* Teacher Card */}
            <motion.div
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect("teacher")}
              className={`relative cursor-pointer rounded-2xl p-6 border-2 flex flex-col items-center justify-center transition-all duration-300 
                ${formData.teacher
                  ? "border-green-500 bg-green-50 shadow-lg shadow-green-100/50"
                  : "border-gray-200 bg-white hover:border-gray-300"}`}
            >
              {formData.teacher && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              <div className="w-16 h-16 mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Teacher</h3>
              <p className="text-gray-500 text-center text-sm">
                Join to teach and inspire students worldwide
              </p>
            </motion.div>
          </div>

          {/* Continue Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            disabled={!formData.student && !formData.teacher}
            className={`w-full py-3 px-6 rounded-xl text-white font-medium transition-all duration-300 ${formData.student || formData.teacher
              ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg hover:shadow-xl"
              : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            Continue
          </motion.button>

            <div className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
              Log In 
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Form0;