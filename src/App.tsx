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

import Sessions from './pages/sessions/sessions'
import ManageStudents from './pages/ManageStudents'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'
import AllstudentSessions from './pages/studentSessions/all-studentSessions'
import StudentClassrooms from './pages/studentClassrooms/classrooms'
import PaymentSucces from './pages/payments/PaymentSucces'
import MyClasses from './pages/studentClassrooms/MyClasses'
import StudentProfile from './pages/StudentProfile'
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
          element={<SignIn/>}
        />

        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path='/initialize/success' element={<PaymentSucces />} />
        <Route element={<Layout />}>
          {/* Teachers Dashboard  */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/create-classroom" element={<ProtectedRoute><Classroom /></ProtectedRoute>} />
          <Route path="/classrooms" element={<ProtectedRoute><Classrooms /></ProtectedRoute>} />
          <Route path='/sessions' element={<ProtectedRoute><Sessions /></ProtectedRoute>} />
          <Route path='/manage-students' element={<ProtectedRoute><ManageStudents /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/notifications' element={<ProtectedRoute><Notifications /></ProtectedRoute>} />

          {/* Students Dashboard  */}
          <Route path='/my-sessions' element={<ProtectedRoute> <AllstudentSessions /></ProtectedRoute>} />
          <Route path='/my-classes' element={<ProtectedRoute><StudentClassrooms /></ProtectedRoute>} />
          <Route path='/personal-classes' element={<ProtectedRoute><MyClasses/></ProtectedRoute>}/>
          <Route path='/my-profile' element={<ProtectedRoute><StudentProfile/></ProtectedRoute>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
