import { create } from "zustand";

import axiosInstance from "../lib/axios";


interface SessionInterface {
    getCurrentSession: (studentEmail:string) => Promise<void>;
    currentSession: CurrentSession [] | null;
    setCurrentSession?: (session: CurrentSession | null) => void;
    fetchingCurrentSession: boolean;
    error?: string | null;
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
    creatorFirstName:string;
    creatorLastName:string;
}
export const useSessionStore = create<SessionInterface>((set) => ({
    currentSession: null,
    fetchingCurrentSession: false,
    getCurrentSession: async (studentEmail:string) => {
        set({ fetchingCurrentSession: true, error: null });
        try {
            const response = await axiosInstance.get(`/sessions/sessions?studentEmail=${studentEmail}`);
            set({ currentSession: response.data, fetchingCurrentSession: false , error: null });
        } catch (error) {
            console.error("Error fetching current session:", error);
            set({ error: "Failed to fetch current session", fetchingCurrentSession: false });
        }
    }

}))