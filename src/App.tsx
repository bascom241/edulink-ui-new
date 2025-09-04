
import { Route,  Routes } from 'react-router-dom'
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
function App() {
  const { getUser } = useAuthStore();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Toaster position='bottom-right' reverseOrder={false} />

   

 
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

        </Route>
      </Routes>
      

    </>
  )
}

export default App
