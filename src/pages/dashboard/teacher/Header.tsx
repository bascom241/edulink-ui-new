import { useAuthStore } from "../../../store/useAuthStore";
import { CircleUserRound } from "lucide-react"
import NotificationIcon from "../../../icons/NotificationIcon";

const Header = () => {
  const { user } = useAuthStore();



  return (
    <header className='flex justify-end gap-2 items-center'>
      <div className='flex justify-between gap-4 items-center'>
        <div className='flex items-center gap-2'>

          <NotificationIcon />
        </div>

        <div className='flex items-center gap-2'>
          <CircleUserRound className=' ' color='green' />
          <p>
            {user ? user.firstName + " " + user.lastName : "Dear User"}
          </p>
        </div>
      </div>
    </header>
  )
}

export default Header
