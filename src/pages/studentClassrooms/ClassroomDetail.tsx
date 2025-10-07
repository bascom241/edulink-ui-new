import { useEffect, useState } from "react";
import { useClassRoomStore } from "../../store/useClassRoom";

import { ArrowLeft,  Video,  Clock, Calendar, User } from "lucide-react";

import StudentContentTab from "../../components/skeletons/StudentContentTab";

interface ClassroomDetailProps {
    id: number;
    goBack: () => void;
    instructorEmail: string;
}

const ClassroomDetail = ({ id, goBack, instructorEmail }: ClassroomDetailProps) => {
    const { singleClassroom, fetchingSingleClassroom, fetchSingleClassroom } = useClassRoomStore();
  

    const [activeTab, setActiveTab] = useState<"overview" | "sessions" | "content">("overview");

    // Fetch classroom details for student
    useEffect(() => {
        if (fetchSingleClassroom && instructorEmail) {
            fetchSingleClassroom(instructorEmail, id);
        }
    }, [fetchSingleClassroom, instructorEmail, id]);

    if (fetchingSingleClassroom) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Loading classroom...
            </div>
        );
    }

    if (!singleClassroom) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-gray-600">
                <p className="mb-4">Classroom not found.</p>
                <button
                    onClick={goBack}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Classrooms
                </button>
            </div>
        );
    }

    const { className, classDescription,  sessions } =
        singleClassroom;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{className}</h1>
                        <p className="text-gray-600 mt-2">{classDescription}</p>
                    </div>
                    <button
                        onClick={goBack}
                        className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </button>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl p-1.5 shadow-sm mb-8 flex flex-wrap justify-center">
                    {["overview", "sessions", "content"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as "overview" | "sessions" | "content")}
                            className={`px-5 py-2.5 text-sm font-medium rounded-lg mx-1 transition-all ${activeTab === tab
                                ? "bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 shadow-sm"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Overview Tab */}
                {activeTab === "overview" && (
                    <div className="bg-white rounded-2xl shadow-sm p-8 w-full">
                        {/* Header */}
                        <h2 className="text-2xl font-semibold text-indigo-700 mb-6">About this Classroom</h2>

                        {/* Class Description */}
                        <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                            {classDescription}
                        </p>

                        {/* Grid Information Section */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-gray-50 rounded-xl border border-gray-100 p-5">
                                <p className="text-sm text-gray-500">Duration</p>
                                <p className="text-lg font-semibold text-gray-800 mt-1">
                                    {singleClassroom.classDurationInDays} days
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-xl border border-gray-100 p-5">
                                <p className="text-sm text-gray-500">Delivery Model</p>
                                <p className="text-lg font-semibold text-gray-800 mt-1 capitalize">
                                    {singleClassroom.classDeliveryModel}
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-xl border border-gray-100 p-5">
                                <p className="text-sm text-gray-500">Location</p>
                                <p className="text-lg font-semibold text-gray-800 mt-1">
                                    {singleClassroom.classLocation || "Online"}
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-xl border border-gray-100 p-5">
                                <p className="text-sm text-gray-500">Price</p>
                                <p className="text-lg font-semibold text-green-600 mt-1">
                                    {singleClassroom.classroomPrice > 0
                                        ? `₦${singleClassroom.classroomPrice.toLocaleString()}`
                                        : "Free"}
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-xl border border-gray-100 p-5">
                                <p className="text-sm text-gray-500">Start Date</p>
                                <p className="text-lg font-semibold text-gray-800 mt-1">
                                    {new Date(singleClassroom.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-xl border border-gray-100 p-5">
                                <p className="text-sm text-gray-500">Expires On</p>
                                <p className="text-lg font-semibold text-red-600 mt-1">
                                    {new Date(singleClassroom.expiresAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        {/* Target Audience */}
                        <div className="mt-10 bg-indigo-50 border border-indigo-100 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-indigo-800 mb-2">Who is this class for?</h3>
                            <p className="text-gray-700 text-base">
                                {singleClassroom.targetAudience || "Perfect for students and professionals who want to grow their skills."}
                            </p>
                        </div>

                        {/* Availability + CTA */}
                        <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <p
                                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${singleClassroom.classroomFull
                                        ? "bg-red-100 text-red-600"
                                        : "bg-green-100 text-green-600"
                                    }`}
                            >
                                {singleClassroom.classroomFull ? "Class is Full" : "Seats Available"}
                            </p>

                        </div>
                    </div>
                )}

                {/* Sessions Tab */}
                {activeTab === "sessions" && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-semibold mb-4">Class Sessions</h2>
                        {sessions && sessions.length > 0 ? (
                            <div className="space-y-4">
                                {sessions.map((session) => (
                                    <div
                                        key={session.sessionId}
                                        className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-semibold text-gray-800 text-lg">{session.topic}</h3>
                                                <p className="text-sm text-gray-600">
                                                    By {session.creatorFirstName} {session.creatorLastName}
                                                </p>
                                            </div>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${session.status === "COMPLETED"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-blue-100 text-blue-800"
                                                    }`}
                                            >
                                                {session.status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <Clock className="h-4 w-4 mr-2 text-indigo-500" />
                                                {session.durationInMinutes} min
                                            </div>
                                            <div className="flex items-center">
                                                <Calendar className="h-4 w-4 mr-2 text-indigo-500" />
                                                {session.startTime
                                                    ? new Date(session.startTime).toLocaleDateString()
                                                    : "Not started"}
                                            </div>
                                            <div className="flex items-center">
                                                <User className="h-4 w-4 mr-2 text-indigo-500" />
                                                ID: {session.sessionId}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 text-gray-500">
                                <Video className="h-10 w-10 mx-auto text-gray-400 mb-3" />
                                <p>No sessions available yet.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Content Tab */}
                {activeTab === "content" && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <StudentContentTab
                            resources={singleClassroom?.resources || []}
                            tasks={singleClassroom?.tasks || []}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClassroomDetail;
