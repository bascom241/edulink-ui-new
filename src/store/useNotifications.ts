import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export interface Notification {
  id:number 
  type: string;
  content: string;
  timestamp: string;
  teacherId: number;
  classroomName: string;
  isRead?: boolean;
}

interface NotificationInterfaceTeacher {
  notificationContainer: Notification[] | null;
  fetchNotifications: (teacherId: number) => Promise<void>;
  fethingNotification: boolean;
  addNotification: (notification: Notification) => void;
  unreadCount: number;
  resetUnreadCount: () => void;
  markNotificationAsRead: (teacherId: number) => Promise<void>;
  deleteNotification: (teacherId: number, notificationId:number) => Promise<void>
  deleteAllNotifications : (teacherId:number) => Promise<void>
}

export const useNotificationStore = create<NotificationInterfaceTeacher>((set) => ({
  unreadCount: 0,
  fethingNotification: false,
  notificationContainer: null,

  fetchNotifications: async (teacherId) => {
    set({ fethingNotification: true });
    try {
      const response = await axiosInstance.get(`/notifications/teacher/${teacherId}`);
      const notifications = response.data.map((notif: Notification) => ({
        ...notif,
        isRead: notif.isRead ?? false,
      }));

      const unread = notifications.filter((n:any) => !n.isRead).length;

      set({
        notificationContainer: notifications,
        fethingNotification: false,
        unreadCount: unread,
      });
    } catch (error) {
      console.log(error);
      set({ fethingNotification: false });
    }
  },

  addNotification: (notification) => {
    set((state) => ({
      notificationContainer: state.notificationContainer
        ? [{ ...notification, isRead: false }, ...state.notificationContainer]
        : [{ ...notification, isRead: false }],
      unreadCount: (state.unreadCount ?? 0) + 1,
    }));
  },

  resetUnreadCount: () => set({ unreadCount: 0 }),

  markNotificationAsRead: async (teacherId) => {
    try {
      await axiosInstance.put(`/notifications/teacher/${teacherId}/read`);

      set((state) => ({
        notificationContainer:
          state.notificationContainer?.map((nc) => ({ ...nc, isRead: true })) || [],
        unreadCount: 0,
      }));
    } catch (error) {
      console.log("Failed to mark notifications as read:", error);
    }
  },

  deleteNotification:async(teacherId, notificationId) => {
    try {
      const response = await axiosInstance.delete(`/notifications/teacher/${teacherId}/${notificationId}/delete}`)
      set((state)=> ({
        notificationContainer: state.notificationContainer?.filter((nc)=>nc.id !== notificationId) || [],
        unreadCount: state.notificationContainer?.some(nc => nc.id === notificationId && !nc.isRead)? 
        state.unreadCount - 1 : state.unreadCount
      }))
      toast.success(response.data)

    } catch (error:any) {
      console.log(error)
    }
  },
  deleteAllNotifications: async (teacherId) => {
    try {
      const response = await axiosInstance.delete(`notifications/teacher/${teacherId}/delete-all`)
      set(()=> ({
        notificationContainer: [],
        unreadCount: 0
      }))
      toast.success(response.data)
    } catch (error) {
       console.log(error)
    }
  }
}));
