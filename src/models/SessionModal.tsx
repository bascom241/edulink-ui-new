import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClassRoomStore } from '../store/useClassRoom';
import { useSessionStore } from '../store/useSessionStore';
import type { User } from '../store/useAuthStore';
import {
  X, Clock, MapPin, Link as LinkIcon, Globe, Users,
  Settings, Shield, AlertCircle, Lock, Eye, EyeOff, Loader
} from 'lucide-react';

interface SessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  classroomId: number;
  onCreateSession: (sessionData: SessionFormData) => void;
  user: User | null;
}

export interface SessionFormData {
  topic: string;
  durationInMinutes: number;
  allowAnyoneToJoin: boolean;
  sessionClassLink: string;
  sessionClassLocation: string;
  requirePassword: boolean;
  sessionPassword: string;
}

// Animation variants
const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const modalVariants = { hidden: { opacity: 0, scale: 0.8, y: 50 }, visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as "spring", damping: 25, stiffness: 300, mass: 0.8 } }, exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.2 } } };
const tabContentVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
};

const SessionModal: React.FC<SessionModalProps> = ({
  isOpen, onClose, classroomId, onCreateSession, user
}) => {
  const { fetchSingleClassroom, singleClassroom } = useClassRoomStore();
  const { creatingSession } = useSessionStore();

  const [formData, setFormData] = useState<SessionFormData>({
    topic: '',
    durationInMinutes: 60,
    allowAnyoneToJoin: false,
    sessionClassLink: singleClassroom?.classLocation || '',
    sessionClassLocation: singleClassroom?.classLocation || '',
    requirePassword: false,
    sessionPassword: ''
  });

  const [isVirtual, setIsVirtual] = useState(true);
  const [activeTab, setActiveTab] = useState<'basic' | 'security'>('basic');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user && fetchSingleClassroom) {
      fetchSingleClassroom(user.email, Number(classroomId));
    }
  }, [user, fetchSingleClassroom, classroomId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateSession(formData);
  };

  const renderBasicInfoTab = () => (
    <motion.div variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" key="basic-tab" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session Topic</label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            placeholder="Enter session topic"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
          <div className="relative">
            <Clock size={18} className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="number"
              name="durationInMinutes"
              value={formData.durationInMinutes}
              onChange={handleChange}
              min={1}
              max={480}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Maximum session length is 8 hours (480 minutes)</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Session Type</label>
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => setIsVirtual(true)}
            className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${isVirtual ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'}`}
          >
            <div className="flex items-center justify-center">
              <LinkIcon size={16} className="mr-2" />
              Virtual
            </div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => setIsVirtual(false)}
            className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${!isVirtual ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'}`}
          >
            <div className="flex items-center justify-center">
              <MapPin size={16} className="mr-2" />
              In-Person
            </div>
          </motion.button>
        </div>
      </div>

 <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-start">
            <AlertCircle size={16} className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-blue-800 mb-1">Important Notice</p>
              <p className="text-xs text-blue-700">
                {isVirtual
                  ? "This meeting link is the default link provided when the classroom was created and will be broadcasted to all students. Ensure it is correct before starting the session, as any changes now will update what students see."
                  : "This location is the default classroom location provided when the classroom was created and will be shared with all students. Verify its accuracy before starting the session, as any edits now will update what students see."
                }
              </p>


              {singleClassroom?.classLocation && (
                <p className="text-xs text-blue-700 mt-1">
                  Classroom default: {singleClassroom.classLocation}
                </p>
              )}
            </div>
          </div>
        </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{isVirtual ? 'Meeting Link' : 'Location'}</label>
        <div className="relative">
          {isVirtual ? (
            <>
              <LinkIcon size={18} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="url"
                name="sessionClassLink"
                value={formData.sessionClassLink}
                onChange={handleChange}
                placeholder="https://meet.google.com/..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </>
          ) : (
            <>
              <MapPin size={18} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                name="sessionClassLocation"
                value={formData.sessionClassLocation}
                onChange={handleChange}
                placeholder="Enter classroom location"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </>
          )}
        </div>

        {/* Location Notice */}
       
      </div>
    </motion.div>
  );

  const renderSecurityTab = () => (
    <motion.div variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" key="security-tab" className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center">
          <div className={`p-2 rounded-lg mr-3 ${formData.allowAnyoneToJoin ? 'bg-green-100' : 'bg-blue-100'}`}>
            {formData.allowAnyoneToJoin ? <Globe size={18} className="text-green-600" /> : <Users size={18} className="text-blue-600" />}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{formData.allowAnyoneToJoin ? 'Open to everyone' : 'Classroom members only'}</p>
            <p className="text-xs text-gray-500">{formData.allowAnyoneToJoin ? 'Anyone with the link can join' : 'Only students in this classroom can join'}</p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" name="allowAnyoneToJoin" checked={formData.allowAnyoneToJoin} onChange={handleChange} className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
        </label>
      </div>

      <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
        <div className="flex items-center mb-3">
          <Shield size={18} className="text-blue-500 mr-2" />
          <h3 className="text-sm font-medium text-blue-800">Session Security</h3>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="requirePassword"
            name="requirePassword"
            checked={formData.requirePassword}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="requirePassword" className="ml-2 block text-sm text-gray-700">Require password to join</label>
        </div>

        {formData.requirePassword && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }} className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">Session Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="sessionPassword"
                value={formData.sessionPassword}
                onChange={handleChange}
                placeholder="Enter a secure password"
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Use a strong password with letters, numbers, and special characters</p>
          </motion.div>
        )}
      </div>

      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
        <div className="flex items-start">
          <AlertCircle size={18} className="text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-amber-800 mb-1">Security Recommendations</h3>
            <ul className="text-xs text-amber-700 list-disc pl-4 space-y-1">
              <li>For sensitive content, restrict access to classroom members only</li>
              <li>Use password protection for additional security</li>
              <li>Virtual sessions will generate a unique join link</li>
              <li>Session links expire when the session ends</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-2xl shadow-xl w-full max-w-2xl h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <Shield className="text-blue-600" size={20} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Create Secure Session</h2>
              </div>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={24} />
              </motion.button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setActiveTab('basic')}
                className={`flex-1 py-4 px-6 text-sm font-medium flex items-center justify-center ${activeTab === 'basic' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Settings size={16} className="mr-2" /> Basic Info
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setActiveTab('security')}
                className={`flex-1 py-4 px-6 text-sm font-medium flex items-center justify-center ${activeTab === 'security' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Shield size={16} className="mr-2" /> Security
              </motion.button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-y-auto">
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'basic' ? renderBasicInfoTab() : renderSecurityTab()}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="flex gap-3 p-6 border-t border-gray-100 shrink-0">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="flex items-center justify-center py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition-all shadow-md"
                >
                  {creatingSession ? <Loader className="animate-spin" /> : 'Start Secure Session'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SessionModal;
