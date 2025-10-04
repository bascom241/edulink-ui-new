
import {motion} from "framer-motion"

export const ChatModal = ({ instructor, onClose }: { instructor: any; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white">
          <div className="flex items-center gap-3">
            <img
              src={`https://i.pravatar.cc/50?u=${instructor?.classroomOwnerFirstName}`}
              alt="Instructor"
              className="w-12 h-12 rounded-full border-2 border-white"
            />
            <div>
              <h3 className="font-bold text-lg">Dr. {instructor?.classroomOwnerFirstName || "Sarah"}</h3>
              <p className="text-blue-100">Online • Replies quickly</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="p-6 max-h-96 overflow-y-auto space-y-4">
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4 max-w-xs">
              <p className="text-gray-700">Hi there! How can I help you with the classroom?</p>
              <span className="text-xs text-gray-400 mt-1">2:30 PM</span>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white rounded-2xl rounded-tr-none p-4 max-w-xs">
              <p>I have a question about the course materials</p>
              <span className="text-xs text-blue-100 mt-1">2:31 PM</span>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
          />
          <button className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
            Send
          </button>
        </div>

        {/* Close */}
        <div className="p-4 border-t border-gray-200 flex justify-end">
          <button onClick={onClose} className="px-6 py-2 text-gray-600 hover:text-gray-800">
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
