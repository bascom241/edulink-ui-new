import { useAuthStore } from "../../store/useAuthStore"
import TeacherDashboard from "../../components/dashoard/TeacherDashboard";
import StudentDashboard from "../../components/dashoard/StudentDashboard";
import { useEffect } from "react";
const Dashboard = () => {

  const { user, getUser, loadingUser } = useAuthStore();
  useEffect(()=>{

    if(!user){
      getUser()
    }

  }, [user])
  if (loadingUser) {
    return <div>Loading...</div>; // or a spinner
  }

  return (
    <div>
      {user?.teacher  ? <TeacherDashboard /> : <StudentDashboard />}
    </div>
  )
}

export default Dashboard
