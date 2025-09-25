import { create } from "zustand";
import axiosInstance from "../lib/axios";


export interface Notification{
   type:string
    content:string
    timestamp: string
    teacherId: number
    classroomName: string
}

interface NotificationIterfaceTeacher{
 notificationContainer: Notification[] | null 
 fetchNotifications: (teacherId: number) => Promise<void> 
 fethingNotification: boolean
 addNotification:(notification:Notification) => void
}

export const useNotificationStore = create<NotificationIterfaceTeacher>((set)=> ({
    fethingNotification:false,
    notificationContainer: null ,
    fetchNotifications: async (teacherId) => {
        set({fethingNotification:true})
        try {
            const response = await axiosInstance.get(`/notifications/teacher/${teacherId}`);
            set({notificationContainer:response.data, fethingNotification: false});
            console.log(response)
        } catch (error) {
            console.log(error)
            set({fethingNotification:false})
        }
    },
    addNotification: (notification)=> {
        set((state)=> ({
            notificationContainer : state.notificationContainer ? [notification,...state.notificationContainer] : [notification]
        }))
    },
}))