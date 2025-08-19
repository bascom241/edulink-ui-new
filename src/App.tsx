
import { Route, Routes } from 'react-router-dom'
import SignIn from './pages/auth/SignIn'
import Layout from './components/Layout'
import Dashboard from './components/dashoard/Dashboard'
import Register from './pages/auth/register'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
function App() {


  return (
    <>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/> 
       
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />

        </Route>
      </Routes>

    </>
  )
}

export default App
