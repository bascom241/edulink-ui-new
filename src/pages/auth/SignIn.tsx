import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image1 from "../../assets/wi-fi-router-with-blue-optical-fiber.jpg"
import { useAuthStore } from '../../store/useAuthStore';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import SignInSkeleton from '../../components/skeletons/SignInSkeleton';
import toast from 'react-hot-toast';
const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [forgotPassword, setForgotPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { login, loggingIn } = useAuthStore();

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);


  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(formData);
    if (success) {
      navigate("/dashboard");
      setForgotPassword(false);
      // toast.success("Login successful!");
    } else {
      toast.error("Login failed. Please try again.");
      setForgotPassword(true);
    }

    console.log('Login submitted:', formData);
  };

  // Show skeleton while loading
  if (isLoading) {
    return <SignInSkeleton />;
  }

  return (
    <main className="w-full sm:h-screen flex flex-col lg:flex-row bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Left Section - Visual */}
      <div className="relative w-full lg:w-1/2 h-1/3 lg:h-full overflow-hidden">
        {/* Image (base layer) */}
        <motion.img
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          src={Image1}
          alt="Teacher working"
          className="w-full h-full object-cover object-center"
        />

        {/* Overlay (between image and content) */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 z-10" />

        {/* CONTENT (top layer) - centered */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col items-center space-y-6 text-center"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-white drop-shadow-md">
              Welcome Back
            </h2>
            <p className="text-white/90 max-w-md">
              Sign in to access your dashboard
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 h-2/3 lg:h-full flex flex-col items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-2"
          >
            <h1 className="text-3xl font-bold text-gray-900">Login To Your Account</h1>
            <p className="text-gray-500">Enter your credentials to continue</p>
          </motion.div>

          {/* Form */}
          <motion.form 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit} 
            className="space-y-4"
          >
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
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
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
              <div className="flex justify-between items-center mt-1">
                <a href="#" className="text-xs text-green-600 hover:text-green-700">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={!formData.email || !formData.password}
              className={`w-full flex justify-center items-center py-3 px-6 rounded-xl text-white font-medium transition-all ${formData.email && formData.password
                ? "bg-gradient-to-r from-green-500 to-blue-600 shadow-lg hover:shadow-xl"
                : "bg-gray-300 cursor-not-allowed"
                }`}
            >
              {loggingIn ? <Loader className='animate-spin' size={24} /> : "Sign In"}
            </motion.button>

            {forgotPassword &&
              <div className='flex gap-2 '>
                <p>Forgot Password?</p>
                <p><Link to="/forgot-password" className='text-red-500 font-bold'> Click Here</Link></p>
              </div>}
          </motion.form>

          {/* Divider */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </motion.div>

          {/* Social Login */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="w-full py-2 px-4 border border-gray-300 rounded-xl bg-white text-gray-700 font-medium flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.786-1.664-4.143-2.675-6.735-2.675-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.668-0.069-1.325-0.189-1.961h-9.811z" />
              </svg>
              <span>Google</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="w-full py-2 px-4 border border-gray-300 rounded-xl bg-white text-gray-700 font-medium flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
              <span>Facebook</span>
            </motion.button>
          </motion.div>

          {/* Sign Up Link */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-sm text-gray-600"
          >
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-green-600 hover:text-green-500">
              Sign up
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;