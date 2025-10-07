

interface DeleteModaAllInterface {

    onClose: () => void
    onConfirm: () => void

}

const DeleteAllModal = ({ onClose, onConfirm }: DeleteModaAllInterface) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-96">
                <h3 className="text-lg font-bold mb-4">Delete Notification</h3>
                <div className='flex-col gap-1 mb-6'>
                    <p className="">
                        Are you sure you want to delete all notifications ?

                    </p>
                    <span className='font-bold'>Note:</span> This action cannot be undone
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                    >
                        Delete All
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteAllModal
