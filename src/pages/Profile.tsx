import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useWalletStore } from '../store/useWalletStore';
import dayjs from "dayjs";
import {
  User, Edit3, Save, X, Camera, BookOpen, Award, Briefcase, Link as LinkIcon,
   CreditCard, Mail, Phone, UserCheck, DollarSign, TrendingUp, Download,
  Calendar, Shield, Globe, Bell, Zap
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart as RechartsPieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import LucideNairaIcon from '../svgs/LucidNairaIcon';

const Profile = () => {
  const { fetchUserWallet, userWallet } = useWalletStore();
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phoneNumber: user?.phoneNumber || '',
    teachingSubjects: user?.teachingSubjects || [],
    teachingLevel: user?.teachingLevel || '',
    shortBio: user?.shortBio || '',
    yearsOfExperience: user?.yearsOfExperience || 0,
    socialLink: user?.socialLink || '',
    bankAccount: user?.bankAccount || '',
    bankName: user?.bankName || ''
  });

  const [newSubject, setNewSubject] = useState('');

  useEffect(() => {
    if (user) {
      fetchUserWallet(user.userId);
    }
  }, [user, fetchUserWallet]);

  // Process monthly earnings data with classrooms
  const monthlyEarningsData = React.useMemo(() => {
    const transactions = userWallet?.transactions ?? [];
    if (!transactions.length) return [];

    return transactions.reduce((acc: any[], order: any) => {
      const createdAt = order.createdAt || order.date || order.created_at;
      const month = dayjs(createdAt).format("MMM");
      const amount = Number(order.amount ?? 0);
      const classroomName = order.classroomName || order.classroom || "Unknown";
      const classroomPrice = Number(order.classroomPrice ?? 0);

      const existing = acc.find(item => item.month === month);

      if (existing) {
        existing.earnings += amount;
        existing.classrooms.push({
          name: classroomName,
          price: classroomPrice,
        });
      } else {
        acc.push({
          month,
          earnings: amount,
          classrooms: [
            {
              name: classroomName,
              price: classroomPrice,
            },
          ],
        });
      }

      return acc;
    }, []);
  }, [userWallet?.transactions]);

  // Calculate sessions from classrooms for display purposes
  const monthlyEarningsWithSessions = React.useMemo(() => {
    return monthlyEarningsData.map(monthData => ({
      ...monthData,
      sessions: monthData.classrooms.length
    }));
  }, [monthlyEarningsData]);

  const subjectDistributionData = React.useMemo(() => {
    const transactions = userWallet?.transactions ?? [];
    if (!transactions.length) return [];

    const map: Record<string, number> = {};
    transactions.forEach((order: any) => {
      const name = order.classroomName ?? order.classroom ?? "Unknown";
      const amount = Number(order.amount ?? 0);
      map[name] = (map[name] || 0) + amount;
    });

    return Object.keys(map).map(name => ({ name, value: map[name] }));
  }, [userWallet?.transactions]);

  const sessionsThisMonth = React.useMemo(() => {
    const transactions = userWallet?.transactions ?? [];
    const currentMonth = dayjs().format("MMM");
    return transactions.filter((o: any) => 
      dayjs(o.createdAt || o.date || o.created_at).format("MMM") === currentMonth
    ).length;
  }, [userWallet?.transactions]);

  const recentTransactions = React.useMemo(() => {
    const txs = userWallet?.transactions ?? [];
    return txs
      .slice()
      .sort((a: any, b: any) => 
        new Date(b.createdAt || b.date || b.created_at).getTime() - 
        new Date(a.createdAt || a.date || a.created_at).getTime()
      )
      .slice(0, 10)
      .map((t: any) => ({
        id: t.id,
        studentName: t.studentName ?? (t.student ? `${t.student.firstName ?? ''} ${t.student.lastName ?? ''}`.trim() : 'Student'),
        date: dayjs(t.createdAt || t.date || t.created_at).format("DD MMM YYYY"),
        amount: Number(t.amount ?? 0),
        status: t.status ?? 'Unknown',
        classroomName: t.classroomName ?? t.classroom ?? 'Unknown',
      }));
  }, [userWallet?.transactions]);

  const earningsData = {
    totalEarnings: userWallet?.totalEarnings ?? 0,
    AmountWithdrawn: userWallet?.withdrawn ?? 0,
    availableBalance: userWallet?.balance ?? 0,
    sessionsThisMonth,
    transactions: recentTransactions
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSubject = () => {
    if (newSubject.trim() && !formData.teachingSubjects.includes(newSubject.trim())) {
      setFormData(prev => ({
        ...prev,
        teachingSubjects: [...prev.teachingSubjects, newSubject.trim()]
      }));
      setNewSubject('');
    }
  };

  const handleRemoveSubject = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      teachingSubjects: prev.teachingSubjects.filter(s => s !== subject)
    }));
  };

  const handleSave = () => {
    console.log('Saving profile data:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phoneNumber: user?.phoneNumber || '',
      teachingSubjects: user?.teachingSubjects || [],
      teachingLevel: user?.teachingLevel || '',
      shortBio: user?.shortBio || '',
      yearsOfExperience: user?.yearsOfExperience || 0,
      socialLink: user?.socialLink || '',
      bankAccount: user?.bankAccount || '',
      bankName: user?.bankName || ''
    });
    setIsEditing(false);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const monthData = monthlyEarningsData.find(item => item.month === label);
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 min-w-64">
          <p className="font-bold text-gray-800 mb-2">{label}</p>
          <p className="text-green-600">Earnings: ₦{payload[0]?.value?.toLocaleString()}</p>
          <p className="text-blue-600">Classrooms: {monthData?.classrooms?.length || 0}</p>
          {monthData?.classrooms && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-1">Classrooms:</p>
              {monthData.classrooms.slice(0, 3).map((classroom: any, index: number) => (
                <p key={index} className="text-xs text-gray-600">
                  • {classroom.name}: ₦{classroom.price?.toLocaleString()}
                </p>
              ))}
              {monthData.classrooms.length > 3 && (
                <p className="text-xs text-gray-500">+{monthData.classrooms.length - 3} more</p>
              )}
            </div>
          )}
        </div>
      );
    }
    return null;
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Profile & Earnings</h1>
            <p className="text-gray-600">Manage your profile and track your earnings</p>
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
                Save Changes
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

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-3 font-medium flex items-center gap-2 ${activeTab === 'profile' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <User size={18} />
            Profile
          </button>
          {user?.teacher && (
            <button
              onClick={() => setActiveTab('earnings')}
              className={`px-4 py-3 font-medium flex items-center gap-2 ${activeTab === 'earnings' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <DollarSign size={18} />
              Earnings
            </button>
          )}
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-3 font-medium flex items-center gap-2 ${activeTab === 'settings' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Shield size={18} />
            Settings
          </button>
        </div>

        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
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

                  <h2 className="text-2xl font-bold text-gray-800 text-center">
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

                  {user?.teacher && (
                    <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm font-medium mt-2">
                      <UserCheck size={16} />
                      Teacher
                    </div>
                  )}

                  <div className="w-full mt-6 space-y-4">
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
                        <span>{user?.phoneNumber}</span>
                      )}
                    </div>

                    {user?.teacher && (
                      <>
                        <div className="flex items-center gap-3 text-gray-600 p-3 bg-gray-50 rounded-xl">
                          <Award size={18} />
                          {isEditing ? (
                            <input
                              type="number"
                              name="yearsOfExperience"
                              value={formData.yearsOfExperience}
                              onChange={handleInputChange}
                              className="flex-1 bg-white rounded-lg px-3 py-1.5 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                          ) : (
                            <span>{user?.yearsOfExperience} years of experience</span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 text-gray-600 p-3 bg-gray-50 rounded-xl">
                          <BookOpen size={18} />
                          {isEditing ? (
                            <select
                              name="teachingLevel"
                              value={formData.teachingLevel}
                              onChange={handleInputChange}
                              className="flex-1 bg-white rounded-lg px-3 py-1.5 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                              <option value="HIGHSCHOOL">High School</option>
                              <option value="MIDDLESCHOOL">Middle School</option>
                              <option value="ELEMENTARY">Elementary</option>
                              <option value="COLLEGE">College</option>
                            </select>
                          ) : (
                            <span>{user?.teachingLevel}</span>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Bio Section */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Briefcase size={20} />
                  Biography
                </h3>

                {isEditing ? (
                  <textarea
                    name="shortBio"
                    value={formData.shortBio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-gray-50 rounded-xl p-4 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-gray-700">{user?.shortBio || 'No biography added yet.'}</p>
                )}
              </div>

              {/* Teaching Subjects (for teachers) */}
              {user?.teacher && (
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <BookOpen size={20} />
                    Teaching Subjects
                  </h3>

                  {isEditing ? (
                    <div>
                      <div className="flex gap-2 mb-4">
                        <input
                          type="text"
                          value={newSubject}
                          onChange={(e) => setNewSubject(e.target.value)}
                          placeholder="Add a subject"
                          className="flex-1 bg-gray-50 rounded-xl px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                          onClick={handleAddSubject}
                          className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-4 py-2 rounded-xl"
                        >
                          Add
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {formData.teachingSubjects.map((subject, index) => (
                          <div key={index} className="bg-green-100 text-green-800 px-3 py-1.5 rounded-full flex items-center gap-2">
                            {subject}
                            <button
                              onClick={() => handleRemoveSubject(subject)}
                              className="text-green-800 hover:text-green-900"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {user.teachingSubjects.length > 0 ? (
                        user.teachingSubjects.map((subject, index) => (
                          <span key={index} className="bg-green-100 text-green-800 px-3 py-1.5 rounded-full">
                            {subject}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-600">No subjects added yet.</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Social Links */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Globe size={20} />
                  Social Links
                </h3>

                {isEditing ? (
                  <input
                    type="text"
                    name="socialLink"
                    value={formData.socialLink}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 rounded-xl px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Add your social media profile URL"
                  />
                ) : (
                  <div>
                    {user?.socialLink ? (
                      <a
                        href={user.socialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline flex items-center gap-2"
                      >
                        <LinkIcon size={18} />
                        {user.socialLink}
                      </a>
                    ) : (
                      <p className="text-gray-600">No social links added yet.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Bank Details (for teachers) */}
              {user?.teacher && (
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <CreditCard size={20} />
                    Bank Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="bankName"
                          value={formData.bankName}
                          onChange={handleInputChange}
                          className="w-full bg-gray-50 rounded-xl px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      ) : (
                        <p className="text-gray-800">{user?.bankName || 'Not provided'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="bankAccount"
                          value={formData.bankAccount}
                          onChange={handleInputChange}
                          className="w-full bg-gray-50 rounded-xl px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      ) : (
                        <p className="text-gray-800">{user?.bankAccount || 'Not provided'}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'earnings' && user?.teacher && (
          <div className="space-y-6">
            {/* Overview cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-600">Total Earnings</p>
                    <h3 className="text-3xl font-bold text-gray-800 mt-1">₦{earningsData.totalEarnings.toLocaleString()}</h3>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg"><LucideNairaIcon /></div>
                </div>
                <p className="text-green-600 text-sm font-medium mt-3 flex items-center">
                  <TrendingUp size={16} className="mr-1" /> 
                  +12.5% from last month
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-600">Available Balance</p>
                    <h3 className="text-3xl font-bold text-gray-800 mt-1">₦{earningsData.availableBalance.toLocaleString()}</h3>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg"><Download className="text-blue-600" size={24} /></div>
                </div>
                <button className="text-blue-600 text-sm font-medium mt-3 flex items-center">Withdraw Funds</button>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-600">Amount Withdrawn</p>
                    <h3 className="text-3xl font-bold text-gray-800 mt-1">₦{earningsData.AmountWithdrawn.toLocaleString()}</h3>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-lg"><LucideNairaIcon/></div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-600">Classrooms This Month</p>
                    <h3 className="text-3xl font-bold text-gray-800 mt-1">{earningsData.sessionsThisMonth}</h3>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg"><Calendar className="text-purple-600" size={24} /></div>
                </div>
                <p className="text-gray-600 text-sm mt-3">+3 from last week</p>
              </div>
            </div>

            {/* Charts */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Earnings Overview</h3>
                <select className="bg-gray-100 rounded-xl px-3 py-2 text-sm">
                  <option>Last 6 Months</option>
                  <option>Last 12 Months</option>
                </select>
              </div>

              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyEarningsWithSessions} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="earnings" fill="#8884d8" name="Earnings (₦)" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="right" dataKey="sessions" fill="#82ca9d" name="Classrooms" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Earnings by Classroom</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie 
                        data={subjectDistributionData} 
                        cx="50%" 
                        cy="50%" 
                        labelLine={false} 
                        outerRadius={80} 
                        fill="#8884d8" 
                        dataKey="value" 
                        label={({ name, percent }) => `${name}: ${((percent as any) * 100).toFixed(0)}%`}
                      >
                        {subjectDistributionData.map((index:any ) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`₦${Number(value).toLocaleString()}`, 'Amount']} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Earnings Trend</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyEarningsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₦${Number(value).toLocaleString()}`, 'Earnings']} />
                      <Legend />
                      <Line type="monotone" dataKey="earnings" stroke="#8884d8" name="Earnings (₦)" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Recent Transactions</h3>
                <button className="text-green-600 text-sm font-medium flex items-center">View All</button>
              </div>

              <div className="space-y-4">
                {earningsData.transactions.map(transaction => (
                  <div key={transaction.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-800">{transaction.classroomName}</p>
                      <p className="text-sm text-gray-600">{transaction.date}</p>
                      <p className="text-sm text-gray-500">Buyer: {transaction.studentName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">₦{transaction.amount.toLocaleString()}</p>
                      <p className={`text-xs ${transaction.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {transaction.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Account Settings</h3>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <Bell className="text-gray-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Notifications</h4>
                    <p className="text-sm text-gray-600">Manage your notification preferences</p>
                  </div>
                </div>
                <button className="text-green-600 font-medium">Configure</button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <Shield className="text-gray-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Privacy & Security</h4>
                    <p className="text-sm text-gray-600">Manage your privacy and security settings</p>
                  </div>
                </div>
                <button className="text-green-600 font-medium">Configure</button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <Zap className="text-gray-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Appearance</h4>
                    <p className="text-sm text-gray-600">Customize the appearance of the app</p>
                  </div>
                </div>
                <button className="text-green-600 font-medium">Configure</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;