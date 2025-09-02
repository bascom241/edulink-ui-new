import React, { useState } from 'react';
import { 
  Home, 
  PlusCircle, 
  BookOpen, 
  Building2, 
  Users, 
  Settings, 
  UserCog, 
  User, 
  Bell,
  ChevronRight,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');
  
  const dashBoardContent = [
    {
      title: 'Dashboard',
      link: "/dashboard",
      icon: <Home size={20} />
    },
    {
      title: 'Create ClassRoom',
      link: "/add-room",
      icon: <PlusCircle size={20} />
    },
    {
      title: 'Start a Lesson',
      link: "/start-lesson",
      icon: <BookOpen size={20} />
    },
    {
      title: 'My Rooms',
      link: "/my-rooms",
      icon: <Building2 size={20} />
    },
    {
      title: 'Students',
      link: "/students",
      icon: <Users size={20} />
    },
    {
      title: 'Manage Students',
      link: "/manage-students",
      icon: <UserCog size={20} />
    },
    {
      title: 'Profile',
      link: "/profile",
      icon: <User size={20} />
    },
    {
      title: 'Notifications',
      link: "/notifications",
      icon: <Bell size={20} />
    },
    {
      title: 'Settings',
      link: "/settings",
      icon: <Settings size={20} />
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg bg-green-600 text-white shadow-lg"
        >
          {isCollapsed ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsCollapsed(false)}
        ></div>
      )}

      <aside className={`
        fixed lg:sticky top-0 left-0 
        flex flex-col justify-between 
        w-80 lg:w-72 h-screen 
        bg-gradient-to-b from-green-600 to-green-700
        p-6 
        shadow-2xl
        z-50
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        glass-morphism
      `}>
        
        {/* Toggle button for desktop */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3 top-20 bg-white p-1 rounded-full shadow-md text-green-600 hover:bg-green-50 transition-colors"
        >
          <ChevronRight size={20} className={`transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>

        {/* Header with logo */}
        <div className="mb-10">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
              <BookOpen className="text-green-600" size={24} />
            </div>
            <h1 className="text-white text-xl font-bold">EduLink</h1>
          </div>
          <p className="text-green-100 text-sm">Student Room</p>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar">
          <ul className="space-y-2">
            {dashBoardContent.map((item, index) => (
              <li key={index}>
                <a
                  href={item.link}
                  className={`
                    flex items-center space-x-3 p-3 
                    transition-all duration-300 rounded-xl 
                    cursor-pointer
                    ${activeItem === item.title 
                      ? 'bg-white text-green-700 shadow-lg' 
                      : 'text-white hover:bg-green-500 hover:shadow-md'
                    }
                  `}
                  onClick={() => setActiveItem(item.title)}
                >
                  <span className={activeItem === item.title ? 'text-green-700' : 'text-white'}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.title}</span>
                  {activeItem === item.title && (
                    <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* User profile and logout */}
        <div className="pt-6 border-t border-green-500 mt-4">
          <div className="flex items-center space-x-3 mb-4 p-3 rounded-xl hover:bg-green-500 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <User className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-white font-medium">John Doe</p>
              <p className="text-green-100 text-sm">Professor</p>
            </div>
          </div>
          
          <button className="
            flex items-center space-x-3 w-full p-3 
            text-white rounded-xl 
            hover:bg-green-500 
            transition-colors
          ">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <style>{`
        .glass-morphism {
          background: rgba(21, 128, 61, 0.8);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </>
  );
};

export default SideBar;