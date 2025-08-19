import React from "react";
import useMultiformStore from "../../../store/Multiform";
import { motion } from "framer-motion";
import { CircleAlertIcon } from "lucide-react";
import { useAuthStore } from "../../../store/useAuthStore";
import { Loader } from "lucide-react";
const Form4T = () => {
  const {
    formData,
    currentStep,
    setCurrentStep,
    totalTeacherSteps,
  } = useMultiformStore();

  const progressPercentage = (currentStep / totalTeacherSteps) * 100;

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
      teachingSubjects: formData.teachingSubjects,
      teachingLevel: formData.teachingLevel,
      shortBio: formData.shortBio,
      yearsOfExperience: formData.yearsOfExperience,
      socialLink: formData.socialLink,
      bankAccount: formData.bankAccount,
      bankName: formData.bankName,
      student: formData.student,
      teacher: formData.teacher
    })], { type: "application/json" })
  )

  formDataToSend.append("certificate", formData.certificateUrl);
  formDataToSend.append("governmentId", formData.governmentIdUrl);



  const { registerUser, isRegistering } = useAuthStore();
  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-8 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl lg:text-3xl font-bold">Review Your Information</h1>
              <p className="text-blue-100">Step {currentStep} of {totalTeacherSteps}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#ffffff30"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
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
          <div className="mt-6 flex space-x-2">
            {Array.from({ length: totalTeacherSteps }, (_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-500 ${currentStep >= i + 1 ? "w-8 bg-white" : "w-4 bg-white/50"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-8 px-4 lg:px-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Review Sections */}
          <div className="p-6 lg:p-8 space-y-8">
            {/* Account Info */}
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900 flex items-center">
                <CircleAlertIcon className="h-5 w-5 text-green-500 mr-2" />
                Account Information
              </h3>
              <div className="space-y-1 pl-7 text-sm text-gray-600">
                <p><span className="font-medium">Email:</span> {formData.email}</p>
                <p className="text-xs text-gray-400">Password: ********</p>
              </div>
            </div>

            {/* Personal Info */}
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900 flex items-center">
                <CircleAlertIcon className="h-5 w-5 text-green-500 mr-2" />
                Personal Information
              </h3>
              <div className="space-y-1 pl-7 text-sm text-gray-600">
                <p><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</p>
                <p><span className="font-medium">Phone:</span> {formData.phoneNumber}</p>
              </div>
            </div>

            {/* Professional Info */}
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900 flex items-center">
                <CircleAlertIcon className="h-5 w-5 text-green-500 mr-2" />
                Professional Information
              </h3>
              <div className="space-y-1 pl-7 text-sm text-gray-600">
                <p><span className="font-medium">Level:</span> {formData.teachingLevel}</p>
                <p><span className="font-medium">Experience:</span> {formData.yearsOfExperience} years</p>
                <p><span className="font-medium">Subjects:</span> {formData.teachingSubjects?.join(', ')}</p>
                <p className="line-clamp-3"><span className="font-medium">Bio:</span> {formData.shortBio}</p>
                {formData.socialLink && (
                  <p className="truncate"><span className="font-medium">Profile:</span> {formData.socialLink}</p>
                )}
              </div>
            </div>

            {/* Verification Docs */}
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900 flex items-center">
                <CircleAlertIcon className="h-5 w-5 text-green-500 mr-2" />
                Verification Documents
              </h3>
              <div className="space-y-1 pl-7 text-sm text-gray-600">
                <p><span className="font-medium">Certificate:</span> {formData.certificateImageName}</p>
                <p><span className="font-medium">ID Document:</span> {formData.governmentIdImageName}</p>
              </div>
            </div>

            {/* Payment Info */}
            {formData.bankName && (
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900 flex items-center">
                  <CircleAlertIcon className="h-5 w-5 text-green-500 mr-2" />
                  Payment Information
                </h3>
                <div className="space-y-1 pl-7 text-sm text-gray-600">
                  <p><span className="font-medium">Bank:</span> {formData.bankName}</p>
                  <p><span className="font-medium">Account:</span> •••• {formData.bankAccount?.slice(-4)}</p>
                </div>
              </div>
            )}
          </div>

          {/* Terms Agreement */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  I agree to the <a href="#" className="text-green-600 hover:text-green-500">Terms of Service</a> and <a href="#" className="text-green-600 hover:text-green-500">Privacy Policy</a>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentStep(currentStep - 1)}
              className="w-full sm:w-auto px-6 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium transition-all hover:bg-gray-100"
            >
              Back
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => registerUser(formDataToSend)}
              className="w-full sm:w-auto px-6 py-3 rounded-lg text-white bg-gradient-to-r from-green-500 to-blue-600 font-medium shadow hover:shadow-md transition-all"
            >

              {
                isRegistering ?  <Loader className='animate-spin' size={24} /> : "Submit Application"        
              }
              
            </motion.button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Form4T;