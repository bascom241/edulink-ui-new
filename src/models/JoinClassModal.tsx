import { useClassRoomStore } from "../store/useClassRoom";
import { motion } from "framer-motion";
import type { ClassroomResponseDto } from "../store/useClassRoom";
import { useAuthStore } from "../store/useAuthStore";

interface JoinModalInterface {
  classroom: ClassroomResponseDto;
  handleCloseJoinModal: () => void;
}

const JoinClassModal = ({ classroom, handleCloseJoinModal }: JoinModalInterface) => {
  const { user } = useAuthStore() || {};
  const { email = "", firstName = "", lastName = "" } = user || {};
  const fullName = `${firstName} ${lastName}`.trim();

  const { joinClassroom, joiningClassroom } = useClassRoomStore();

  const handleJoin = async () => {
   await joinClassroom(
      classroom.classId,
      classroom.instructorId,
      classroom.classroomOwnerEmail,
      classroom.classroomPrice,
      email,
      fullName
    );


   
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden p-6 text-center space-y-6"
      >
        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-800">
          Join <span className="text-blue-600">{classroom.className}</span>
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed">
          You’re about to join <strong>{classroom.classroomOwnerFirstName}’s</strong> classroom.
          <br />
          Please note that the joining process may take a few seconds.
        </p>

        {/* Price Section */}
        <div
          className={`px-5 py-2 text-sm font-medium rounded-full ${
            classroom.classroomPrice > 0
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {classroom.classroomPrice === 0
            ? "Free to Join"
            : `₦${classroom.classroomPrice.toLocaleString()}`}
        </div>

        {/* Warning */}
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-xl px-4 py-3 text-sm">
          ⚠️ Joining a classroom may take up to a few seconds.
          <br />
          Please don’t close this window while processing.
        </div>

        {/* Buttons */}
        <div className="flex justify-between w-full gap-4 mt-4">
          <button
            onClick={handleCloseJoinModal}
            className="w-1/2 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleJoin}
            disabled={joiningClassroom}
            className={`w-1/2 py-2 rounded-full text-white transition ${
              joiningClassroom
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {joiningClassroom ? "Processing..." : "Join Now"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default JoinClassModal;
