import { useEffect, useState } from "react";
import { useClassRoomStore } from "../../store/useClassRoom";
import { ChatModal } from "../../models/ChartModal";
import { ClassroomCard } from "../../cards/ClassroomCard";



const StudentClassrooms = () => {
  const { studentsClassrooms, fetchAllCassrooms, loadingAllClassrooms, loadMore, hasMore } = useClassRoomStore();
  const [showChat, setShowChat] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  useEffect(() => {
    if (!studentsClassrooms || studentsClassrooms.length === 0) {
      fetchAllCassrooms?.();
    }
  }, []);

  return (
    <main className="pt-20 px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48 pb-10 bg-gray-50 min-h-screen">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Explore Classrooms
        </h1>
        <p className="text-gray-600 text-lg">Join conversations, share knowledge, and connect with peers.</p>
      </header>

      <section className="flex flex-col gap-6">
        {studentsClassrooms?.length ? (
          studentsClassrooms.map((c) => <ClassroomCard key={c.classId} classroom={c} onChat={(inst) => { setSelectedInstructor(inst); setShowChat(true); }} />)
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm">No classrooms available</div>
        )}
      </section>

      {hasMore && (
        <div className="text-center mt-12">
          <button
            onClick={loadMore}
            disabled={loadingAllClassrooms}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl shadow-lg hover:scale-105 transition"
          >
            {loadingAllClassrooms ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {showChat && <ChatModal instructor={selectedInstructor} onClose={() => setShowChat(false)} />}
    </main>
  );
};

export default StudentClassrooms;
