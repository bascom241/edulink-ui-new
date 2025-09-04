import { useSessionStore } from "../../store/useSessionStore";
import TodaySessionSkeleton from "../../components/skeletons/TodaySessionSkeleton";
import type { CurrentSession } from "../../store/useSessionStore";

const TodaySession = () => {
  const { currentSession, fetchingCurrentSession } = useSessionStore();

  if (fetchingCurrentSession) {
    return <TodaySessionSkeleton />;
  }

  // ✅ Filter ONGOING sessions only
  const ongoingSessions =
    currentSession
      ?.filter((session: CurrentSession) => session.status === "ONGOING")
      .map((session: CurrentSession) => {
        let progress = Math.min(
          100,
          Math.floor(
            ((new Date().getTime() -
              new Date(session.startTime).getTime()) /
              (session.durationInMinutes * 60000)) *
              100
          )
        );

        return { ...session, progress };
      }) || [];

  return (
    <div className="w-full  p-6 bg-white rounded-2xl shadow-lg border border-gray-100 transition-all hover:shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Ongoing Sessions</h2>
        <span className="text-xs font-medium px-2 py-1 bg-green-50 text-green-600 rounded-full">
          {ongoingSessions.length} ongoing
        </span>
      </div>

      {ongoingSessions.length === 0 ? (
        <p className="text-sm text-gray-500 text-center">
          No ongoing session right now.
        </p>
      ) : (
        <div className="space-y-4">
          {ongoingSessions.map((session) => (
            <div
              key={session.sessionId}
              className="p-4 rounded-xl border border-gray-100 bg-gradient-to-r from-white to-gray-50 transition-all hover:border-green-100 hover:shadow-sm"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-800">{session.topic}</h3>
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              </div>

              {/* Creator */}
              <p className="text-sm text-gray-500 mt-1">
                by {session.creatorFirstName} {session.creatorLastName}
              </p>

              {/* Time */}
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                {new Date(session.startTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                -{" "}
                {new Date(session.endTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${session.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Progress</span>
                  <span>{session.progress}%</span>
                </div>
              </div>

              <button className="mt-3 text-xs text-green-600 font-medium hover:text-green-800 transition-colors">
                View details →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodaySession;
