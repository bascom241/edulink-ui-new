import  { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { User, Edit3, Save, X, Mail, Phone, Camera } from 'lucide-react';

const StudentProfile = () => {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phoneNumber: user?.phoneNumber || '',
  });

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Saving student profile:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phoneNumber: user?.phoneNumber || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Student Profile</h1>
            <p className="text-gray-600">Manage your personal information</p>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-md"
            >
              <Edit3 size={18} />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-4 py-2 rounded-xl transition-all"
              >
                <Save size={18} />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-xl transition-all"
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center shadow-lg">
              <User size={64} className="text-green-600" />
            </div>
            {isEditing && (
              <button className="absolute bottom-2 right-2 bg-green-600 text-white p-2 rounded-full shadow-md">
                <Camera size={16} />
              </button>
            )}
          </div>

          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
            {isEditing ? (
              <div className="flex flex-col items-center gap-2">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="text-center bg-gray-100 rounded-xl px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="text-center bg-gray-100 rounded-xl px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            ) : (
              `${user?.firstName} ${user?.lastName}`
            )}
          </h2>

          <p className="text-gray-600 mb-2 flex items-center gap-2 mt-1">
            <Mail size={16} />
            {user?.email}
          </p>

          <div className="w-full mt-6 space-y-4 max-w-md">
            <div className="flex items-center gap-3 text-gray-600 p-3 bg-gray-50 rounded-xl">
              <Phone size={18} />
              {isEditing ? (
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="flex-1 bg-white rounded-lg px-3 py-1.5 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              ) : (
                <span>{user?.phoneNumber || 'No phone number added'}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
