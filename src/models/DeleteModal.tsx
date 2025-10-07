
import type { Notification } from "../store/useNotifications";

interface DeleteModalInterface {
   
    notificationId: number | null
    onClose: (notificationId:number | null) => void
    onConfirm: (notificationId:number | null ) => void
    notification : Notification | null 
}
const DeleteModal = ({ notificationId , onClose, onConfirm, notification}: DeleteModalInterface) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Delete Notification</h3>
        <p className="mb-6">
          Are you sure you want to delete  notification for Classroom: <span className='font-bold'>{notification?.classroomName}</span>?
          
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => onClose(notificationId)}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(notificationId)}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
