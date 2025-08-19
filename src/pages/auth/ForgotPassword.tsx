import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Loader } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);


  const {forgotPassword, forgetingPassword} = useAuthStore();
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const  success = await forgotPassword(email);
    if (success){
        setIsSubmitted(true);
    } else {
        setIsSubmitted(false)
    }
  
    console.log('Password reset requested for:', email);
   
  };

  return (
    <main className="w-full min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Main Content - Centered */}
      <div className="w-full flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Reset Your Password</h1>
            <p className="text-gray-500">
              {isSubmitted 
                ? "Check your email for further instructions" 
                : "Enter your email to receive a reset link"}
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={!email}
                className={`w-full flex items-center justify-center py-3 px-6 rounded-xl text-white font-medium transition-all ${
                  email
                    ? "bg-gradient-to-r from-green-500 to-blue-600 shadow-lg hover:shadow-xl"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {
                  forgetingPassword ? <Loader className='animate-spin' size={24} /> : "             Send Reset Link"
                }
   
              </motion.button>
            </form>
          ) : (
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <svg
                className="w-12 h-12 mx-auto text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="mt-4 text-gray-700">
                We've sent password reset instructions to your email.
              </p>
            </div>
          )}

          {/* Back to Login Link */}
          <div className="text-center text-sm text-gray-600 pt-4">
            Remember your password?{' '}
            <Link to="/signin" className="font-medium text-green-600 hover:text-green-500">
              Sign in
            </Link>
          </div>

          {/* Divider */}
          <div className="relative pt-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Need help?</span>
            </div>
          </div>

          {/* Support Contact */}
          <div className="text-center text-sm text-gray-500">
            Contact support at{' '}
            <a href="mailto:support@example.com" className="text-green-600 hover:underline">
              support@example.com
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;