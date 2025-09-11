import { create } from "zustand";

import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";


interface SessionInterface {
    // For Student Ui api
    getCurrentSession: (studentEmail:string) => Promise<void>;
    currentSession: CurrentSession [] | null;
    setCurrentSession?: (session: CurrentSession | null) => void;
    fetchingCurrentSession: boolean;
    error?: string | null;


    // For Teacher Ui api 
  getCurrentTeacherSession: (teacherEmail: string) => Promise<void>
  fetchingTeacherCurrentSession: boolean
  currentTeacherSession:CurrentSession[] | null


}

export interface CurrentSession {
    id:number
    sessionId: number;
    topic: string;
    status: string;
    durationInMinutes: number;
    startTime: string;
    endTime: string;
    allowAnyOneToJoin: boolean;
    creatorFirstName?:string;
    creatorLastName?:string;
    classroomName?:string

}
export const useSessionStore = create<SessionInterface>((set) => ({
    currentSession: null,
    fetchingCurrentSession: false,
    fetchingTeacherCurrentSession:false,
    currentTeacherSession: null,
    getCurrentSession: async (studentEmail:string) => {
        set({ fetchingCurrentSession: true, error: null });
        try {
            const response = await axiosInstance.get(`/sessions/sessions?studentEmail=${studentEmail}`);
            set({ currentSession: response.data, fetchingCurrentSession: false , error: null });
        } catch (error) {
            console.error("Error fetching current session:", error);
            set({ error: "Failed to fetch current session", fetchingCurrentSession: false });
        }
    },
    getCurrentTeacherSession: async (teacherEmail: string ) => {
        set({fetchingTeacherCurrentSession: true})
        try {
            const response = await axiosInstance.get(`/sessions/instructor-sessions?teacherEmail=${teacherEmail}`);
            console.log(response)

            set({currentTeacherSession: response.data , fetchingTeacherCurrentSession:false})
        } catch (error:any ) {
            set({fetchingTeacherCurrentSession: false})
            console.log(error)
            // toast.error(error?.message)
        }
    }

}))