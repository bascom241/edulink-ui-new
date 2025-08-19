import React, { useState } from "react";
import useMultiformStore from "../../../store/Multiform";
import { motion } from "framer-motion";

const Form3T = () => {
  const { 
    formData, 
    handleFormDataChange, 
    currentStep, 
    setCurrentStep, 
    totalTeacherSteps 
  } = useMultiformStore();

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(formData.teachingSubjects || []);

  const teachingLevels = ["HIGHSCHOOL", "UNDERGRADUATE", "POSTGRADUATE"];
  const subjectOptions = [
   "Utme Prep", "Waec Prep", "Technology", "Vocational Skills", "Science", "Arts"
  ];

  const handleContinue = () => {
    handleFormDataChange("teachingSubjects", selectedSubjects);
    setCurrentStep(currentStep + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    handleFormDataChange(name as keyof typeof formData, value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'certificate' | 'governmentId') => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];

      handleFormDataChange(`${type}Url`, file);
      handleFormDataChange(`${type}ImageName`, file.name);
      handleFormDataChange(`${type}ImageType`, file.type);
    }
  };

  const toggleSubject = (subject: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject) 
        : [...prev, subject]
    );
  };

  const progressPercentage = (currentStep / totalTeacherSteps) * 100;

  const isFormValid = () => {
    return (
      formData.teachingLevel &&
      formData.yearsOfExperience &&
      formData.shortBio &&
      selectedSubjects.length > 0 &&
      formData.certificateUrl &&
      formData.governmentIdUrl
    );
  };

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-8 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl lg:text-3xl font-bold">Professional Information</h1>
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
                className={`h-2 rounded-full transition-all duration-500 ${
                  currentStep >= i + 1 ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto py-8 px-4 lg:px-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 lg:p-8 space-y-6">
            {/* Teaching Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teaching Level *
                </label>
                <select
                  name="teachingLevel"
                  value={formData.teachingLevel || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select your teaching level</option>
                  {teachingLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience *
                </label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience || ""}
                  onChange={handleInputChange}
                  min="0"
                  max="50"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="5"
                  required
                />
              </div>
            </div>

            {/* Subjects */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subjects You Teach *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {subjectOptions.map(subject => (
                  <motion.div
                    key={subject}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleSubject(subject)}
                    className={`px-3 py-2 rounded-lg border cursor-pointer text-sm text-center transition-colors ${
                      selectedSubjects.includes(subject)
                        ? "bg-green-100 border-green-500 text-green-800"
                        : "bg-white border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {subject}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Professional Bio (200 chars max) *
              </label>
              <textarea
                name="shortBio"
                value={formData.shortBio || ""}
                onChange={handleInputChange}
                maxLength={200}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Describe your teaching experience and philosophy..."
                required
              />
              <p className="text-xs text-gray-500 text-right mt-1">
                {formData.shortBio?.length || 0}/200 characters
              </p>
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teaching Certificate *
                </label>
                <label className="block">
                  <div className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all cursor-pointer ${
                    formData.certificateUrl ? "bg-green-50 border-green-400" : "bg-white"
                  }`}>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange(e, 'certificate')}
                      className="hidden"
                    
                    />
                    <p className="text-sm text-center">
                      {formData.certificateImageName || "Upload certificate (PDF or image)"}
                    </p>
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Government ID *
                </label>
                <label className="block">
                  <div className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all cursor-pointer ${
                    formData.governmentIdUrl ? "bg-green-50 border-green-400" : "bg-white"
                  }`}>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange(e, 'governmentId')}
                      className="hidden"
                      
                    />
                    <p className="text-sm text-center">
                      {formData.governmentIdImageName || "Upload ID document (PDF or image)"}
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Social Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Professional Profile (Optional)
              </label>
              <input
                type="url"
                name="socialLink"
                value={formData.socialLink || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            {/* Bank Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Name
                </label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Bank Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Number
                </label>
                <input
                  type="text"
                  name="bankAccount"
                  value={formData.bankAccount || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="1234567890"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-4">
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
              onClick={handleContinue}
              disabled={!isFormValid()}
              className={`w-full sm:w-auto px-6 py-3 rounded-lg text-white font-medium transition-all ${
                isFormValid()
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

export default Form3T;