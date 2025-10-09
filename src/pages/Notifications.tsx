import { useEffect, useRef } from "react";
import type { Notification } from "../store/useNotifications";
import { useNotificationStore } from "../store/useNotifications";
import { useAuthStore } from "../store/useAuthStore";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useState } from "react";
import toast from "react-hot-toast";
import { DeleteIcon } from "lucide-react"
import DeleteModal from "../models/DeleteModal";
import DeleteAllModal from "../models/DeleteAllModal";
const Notifications = () => {

  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; notificationId: number | null }>({ isOpen: false, notificationId: null })
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const [deleteAllModal, setDeleteAllModal] = useState<{isOpen:boolean }>({isOpen:false })

  console.log(setSelectedNotification)
  
  const { user } = useAuthStore();
  const {
    fetchNotifications,
    notificationContainer,
    addNotification,
    markNotificationAsRead,
    deleteNotification,
    deleteAllNotifications
  } = useNotificationStore();

  console.log(notificationContainer)


  console.log(deleteModal.notificationId)

  const userId = user?.userId;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!userId) return;

    const initNotifications = async () => {
      await fetchNotifications(userId);  // fetch first
      await markNotificationAsRead(userId);  // then mark read
    };
    initNotifications();

    connect(userId);

    return () => {
      clientRef.current?.deactivate();
    };
  }, [userId]);

  const connect = (userId: number) => {
    const client = new Client({
      webSocketFactory: () => new SockJS("https://edulink-v1.onrender.com/ws"),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ Connected to websocket via SockJS");

        client.subscribe(`/topic/classroom.${userId}`, (message) => {
          const notification: Notification = JSON.parse(message.body);
          console.log("📩 New Notification:", notification);

          if (audioRef.current) {
            audioRef.current.play().catch((err) => {
              console.warn("⚠️ Audio play blocked by browser:", err);
            });
          }

          addNotification(notification); // adds and increments unread count
        });
      },
      onStompError: (frame) => {
        console.error("❌ Broker error:", frame.headers["message"]);
      },
    });

    client.activate();
    clientRef.current = client;
  };

  const getNotificationConfig = (type: string) => {
    switch (type) {
      case "STUDENT JOINED":
      case "STUDENT_JOINED":
        return {
          icon: "👋",
          color: "bg-emerald-50 border-emerald-200",
          textColor: "text-emerald-700",
          badgeColor: "bg-emerald-500",
        };
      case "ASSIGNMENT_SUBMITTED":
        return {
          icon: "📝",
          color: "bg-blue-50 border-blue-200",
          textColor: "text-blue-700",
          badgeColor: "bg-blue-500",
        };
      case "ANNOUNCEMENT":
        return {
          icon: "📢",
          color: "bg-purple-50 border-purple-200",
          textColor: "text-purple-700",
          badgeColor: "bg-purple-500",
        };
      default:
        return {
          icon: "🔔",
          color: "bg-gray-50 border-gray-200",
          textColor: "text-gray-700",
          badgeColor: "bg-gray-500",
        };
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };


  // for single notification delete 
  const handleDeleteModal = (notificationId: number) => {
    setDeleteModal({
      isOpen: true,
      notificationId
    })
 
  }

  const handleCloseModal = () => {
    setDeleteModal({
      isOpen: false,
      notificationId: null
    })
  }

  const handleConfirmDelete = async (notificationId: number | null) => {
    if (!notificationId) {
      toast.error("please seleect a notification to delete ")
      return;
    }
    if (userId) {
      await deleteNotification(userId, notificationId)
      setDeleteModal({
        isOpen: false,
        notificationId: null
      })
    } else {
      toast.error("Please Login to Perform this action")
    }

  }

  // for mutiple notification delete 
  const handleDeleteAllModal = () => {
   setDeleteAllModal({
    isOpen:true
   })
  }

    const handleCloseModalForDeleteAll = () => {
    setDeleteAllModal({
      isOpen: false,
  
    })
  }

    const handleConfirmDeleteAll = async () => {
   
    if (userId) {
      await deleteAllNotifications(userId)
      setDeleteAllModal({
      isOpen: false,
  
    })
    } else {
      toast.error("Please Login to Perform this action")
    }

  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {
        deleteModal.isOpen && (
          <DeleteModal
            notificationId={deleteModal.notificationId}
            onClose={handleCloseModal}
            onConfirm={handleConfirmDelete}
            notification={selectedNotification}
          />
        )
      }

      {
        deleteAllModal.isOpen && (
          <DeleteAllModal
          onClose={handleCloseModalForDeleteAll}
          onConfirm={handleConfirmDeleteAll}
          />
        )
      }
      <audio ref={audioRef} src="/notification.wav" preload="auto" />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-1">Real-time classroom updates</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow-sm border">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Live</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border">
              <span className="text-sm font-medium text-gray-700">
                {notificationContainer?.length || 0} notifications
              </span>
            </div>
            {notificationContainer && notificationContainer?.length > 0 && (
              <button
                onClick={handleDeleteAllModal}
                className="px-4 py-2 rounded-lg bg-red-500 text-white shadow-sm hover:bg-red-600"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notificationContainer?.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border">
              <div className="text-6xl mb-4">🔔</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No notifications yet</h3>
              <p className="text-gray-500">Student join notifications will appear here in real-time</p>
            </div>
          ) : (
            notificationContainer?.map((nt, idx) => {
              const config = getNotificationConfig(nt.type);
              return (
                <div
                  key={idx}
                  className={`group bg-white rounded-xl shadow-sm transition-all duration-300 border-2 ${!nt.isRead ? "border-red-400" : "border-gray-200"
                    } hover:shadow-md transform hover:-translate-y-0.5`}
                >


                  <div className="p-6 flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${config.color} border-2 flex items-center justify-center`}>
                      <span className="text-2xl">{config.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between space-x-3 mb-2">

                        <div className=" flex items-center space-x-3">

                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color} ${config.textColor} border`}
                          >
                            {nt.type.replace(/_/g, " ")}
                          </span>


                          <span className="text-sm text-gray-500">{formatTime(nt.timestamp)}</span>
                        </div>
                        <span>
                          <DeleteIcon
                            onClick={() => handleDeleteModal(nt.id)}
                          />
                        </span>
                      </div>
                      <p className="text-gray-900 font-medium text-lg leading-relaxed">{nt.content}</p>
                      {nt.classroomName && (
                        <div className="flex items-center space-x-2 text-sm mt-2">
                          <span className="text-gray-500">Classroom:</span>
                          <span className="font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">{nt.classroomName}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
