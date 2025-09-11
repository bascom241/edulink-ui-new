import { useAuthStore } from "../../store/useAuthStore"
import TeacherDashboard from "../../components/dashoard/TeacherDashboard";
import StudentDashboard from "../../components/dashoard/StudentDashboard";
const Dashboard = () => {

  const { user } = useAuthStore();
  if (!user) {
    return <div>Loading...</div>; // or a spinner
  }

  return (
    <div>
      {user.teacher  ? <TeacherDashboard /> : <StudentDashboard />}
    </div>
  )
}

export default Dashboard
