import { useNotificationStore } from "../store/useNotifications";

const NotificationIcon = () => {
  const { unreadCount } = useNotificationStore();

  return (
    <div className="relative w-5 h-5">
      <button className="text-xl">🔔</button>
      { unreadCount > 0 && (
        <span className="absolute top-0 right-0 min-w-[16px] h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs px-[2px]">
          {unreadCount}
        </span>
      )}
    </div>
  );
};

export default NotificationIcon;
