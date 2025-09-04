import React from "react";
import Image1 from "../../../assets/wi-fi-router-with-blue-optical-fiber.jpg";
import useMultiformStore from "../../../store/Multiform";
import { motion } from "framer-motion";
import { useAuthStore } from "../../../store/useAuthStore";
import { Loader } from "lucide-react";
const Form2S = () => {
  const { 
    formData, 
    handleFormDataChange, 
    currentStep, 
    setCurrentStep, 
   totalStudentSteps 
  } = useMultiformStore();

  const handleContinue = () => {
    // Basic validation before proceeding
    if (formData.firstName && formData.lastName && formData.phoneNumber) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleFormDataChange(name as keyof typeof formData, value);
  };

  // Calculate progress percentage
  const progressPercentage = (currentStep / totalStudentSteps ) * 100;


  const {registerUser,isRegistering} = useAuthStore();


   const formDataToSend = new FormData();
    formDataToSend.append(
      "userRequestDTO", new Blob([JSON.stringify({
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: formData.role,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        student: formData.student,
        teacher: formData.teacher
      })], { type: "application/json" })
    )


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
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 z-10" />

        {/* CONTENT (top layer) - centered on small, left on lg) */}
        <div className="absolute inset-0 z-20 flex items-center justify-center lg:justify-start lg:pl-12 px-6">
          <div className="flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left">
            <h2 className="text-2xl lg:text-3xl font-bold text-white drop-shadow-md">
              Personal Information
            </h2>

            <div className="flex space-x-2">
              {Array.from({ length: totalStudentSteps  }, (_, i) => (
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
            <h1 className="text-3xl font-bold text-gray-900">About You</h1>
            <p className="text-gray-500">Step {currentStep} of {totalStudentSteps }</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="John"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Doe"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="+1 (555) 123-4567"
                required
                pattern="[+]{0,1}[0-9\s\-\(\)]{8,20}"
              />
              <p className="mt-1 text-xs text-gray-500">Include country code</p>
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
              onClick={()=>registerUser(formDataToSend)}
              disabled={!formData.firstName || !formData.lastName || !formData.phoneNumber}
              className={`flex-1 items-center justify-center py-3 px-6 rounded-xl text-white font-medium transition-all ${
                formData.firstName && formData.lastName && formData.phoneNumber
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg hover:shadow-xl"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
                  {
                isRegistering ?  <Loader className='animate-spin' size={24} /> : "Register as Student"        
              }
            </motion.button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Form2S;