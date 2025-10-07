import { create } from "zustand";

import axiosInstance from "../lib/axios";


export interface CurrentSession {
    id: number
    sessionId: number;
    topic: string;
    status: string;
    durationInMinutes: number;
    startTime: string;
    endTime: string;
    allowAnyOneToJoin: boolean;
    creatorFirstName?: string;
    creatorLastName?: string;
    classroomName?: string
}
interface SessionInterface {
    // For Student Ui api
    getCurrentSession: (studentEmail: string) => Promise<void>;
    currentSession: CurrentSession[] | null;
    setCurrentSession?: (session: CurrentSession | null) => void;
    fetchingCurrentSession: boolean;
    error?: string | null;

    getAllStudentSessions: (studentEmail: string) => Promise<void>
    allStudentSessionsContainer: CurrentSession[]
    fetchingStudentSessions: boolean



    // For Teacher Ui api 
    sessionsAllContainer?: CurrentSession[]
    singleSessionContainer?: CurrentSession | null
    creatingSession: boolean,
    getAllInstructorSessions: (teacherEmail: string) => Promise<void>
    fetchingAllInstructorSessions?: boolean
    fetchSingleSession: (teacherEmail: string, sessionId: number) => Promise<void>
    fetchinSingleInstructorSession: boolean
    getCurrentTeacherSession: (teacherEmail: string) => Promise<void>
    fetchingTeacherCurrentSession: boolean
    currentTeacherSession: CurrentSession[] | null
    createSession: (userId: number, topic: string, durationInMinutes: number, allowAnyOneToJoin: boolean, sessionPassword: string, requirePassword: boolean, classroomId: number) => Promise<void>


}





export const useSessionStore = create<SessionInterface>((set) => ({
    fetchinSingleInstructorSession: false,
    currentSession: null,
    singleSessionContainer: null,
    fetchingCurrentSession: false,
    fetchingTeacherCurrentSession: false,
    currentTeacherSession: null,
    creatingSession: false,
    fetchingAllInstructorSessions: false,
    allStudentSessionsContainer: [],
    fetchingStudentSessions: false,


    getAllStudentSessions: async (studentEmail: string) =>{
     set({ fetchingStudentSessions: true});
        try {
            const response = await axiosInstance.get(`/sessions/sessions?studentEmail=${studentEmail}`);
            set({ singleSessionContainer: response.data, fetchingStudentSessions: false });
        } catch (error) {
            console.error("Error fetching current session:", error);
            set({ error: "Failed to fetch current session", fetchingStudentSessions: false });
        }
    },
   

    getCurrentSession: async (studentEmail: string) => {
        set({ fetchingCurrentSession: true, error: null });
        try {
            const response = await axiosInstance.get(`/sessions/sessions?studentEmail=${studentEmail}`);
            set({ currentSession: response.data, fetchingCurrentSession: false, error: null });
        } catch (error) {
            console.error("Error fetching current session:", error);
            set({ error: "Failed to fetch current session", fetchingCurrentSession: false });
        }
    },
    getCurrentTeacherSession: async (teacherEmail: string) => {
        set({ fetchingTeacherCurrentSession: true })
        try {
            const response = await axiosInstance.get(`/sessions/instructor-sessions?teacherEmail=${teacherEmail}`);
            console.log(response)

            set({ currentTeacherSession: response.data, fetchingTeacherCurrentSession: false })
        } catch (error: any) {
            set({ fetchingTeacherCurrentSession: false })
            console.log(error)
            // toast.error(error?.message)
        }
    },
    createSession: async (userId: number, topic: string, durationInMinutes: number, allowAnyoneToJoin: boolean, sessionPassword: string, requirePassword: boolean, classroomId: number) => {
        set({ creatingSession: true })
        try {
            const response = await axiosInstance.post(`/sessions/create?userId=${userId}&topic=${topic}&durationInMinutes=${durationInMinutes}&allowAnyoneToJoin=${allowAnyoneToJoin}&sessionPassword=${sessionPassword}&requirePassword=${requirePassword}&classroomId=${classroomId}`)
            console.log(response);
            set({ creatingSession: false })

        } catch (error) {
            set({ creatingSession: false })
            console.log(error)
        }
    },
    getAllInstructorSessions: async (teacherEmail: string) => {
        set({ fetchingAllInstructorSessions: true })
        try {

            const response = await axiosInstance.get(`/sessions/all-instructor-sessions?teacherEmail=${teacherEmail}`);
            set({ sessionsAllContainer: response.data, fetchingAllInstructorSessions: false })
            console.log(response)

        } catch (error) {
            set({ fetchingAllInstructorSessions: false })
            console.log(error)
        }
    },
    fetchSingleSession: async (teacherEmail: string, sessionId: number) => {
        set({ fetchinSingleInstructorSession: true })
        try {
            const response = await axiosInstance.get(`/sessions/instructor/${sessionId}?teacherEmail=${teacherEmail}`);
            console.log(response)
            set({ fetchinSingleInstructorSession: false, singleSessionContainer: response.data })
        } catch (error) {
            set({ fetchinSingleInstructorSession: false })
            console.log(error)
        }
    }

}))