import { useAuthStore } from "../../store/useAuthStore"
import { Bell, CircleUserRound } from "lucide-react"


const Header = () => {
  const { user } = useAuthStore();

  

  return (
     <header className='flex justify-end gap-2 items-center'>
        <div className='flex justify-between gap-4 items-center'>
          <div className='relative flex items-center gap-2'>
            <div className=' absolute right-0 -top-0.5 bg-red-600 w-2 h-2 rounded-full flex items-center justify-center'>
            </div>
            <Bell className=' ' />
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
