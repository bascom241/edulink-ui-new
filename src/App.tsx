import { Route, Routes } from 'react-router-dom'
import SignIn from './pages/auth/SignIn'
import Layout from './components/Layout'
import Dashboard from './pages/dashboard/Dashboard'
import Register from './pages/auth/register'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import ProtectedRoute from './components/ProtectedRoute'
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import Classroom from './pages/classroom/Classroom'
import Classrooms from './pages/classroom/classrooms'
import ClassroomDetail from './pages/classroom/classroomDetail'
import Sessions from './pages/sessions/sessions'
import ManageStudents from './pages/ManageStudents'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'



function App() {
  const { getUser } = useAuthStore();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Toaster position='bottom-right' reverseOrder={false} />

      <Routes>
        {/* Redirect root to external landing page */}
        <Route
          path="/"
        
        />

        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/create-classroom" element={<ProtectedRoute><Classroom /></ProtectedRoute>} />
          <Route path="/classrooms" element={<ProtectedRoute><Classrooms /></ProtectedRoute>} />
          <Route path='/sessions' element={<ProtectedRoute><Sessions /></ProtectedRoute>} />
          <Route path='/manage-students' element={<ProtectedRoute><ManageStudents /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/notifications' element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
