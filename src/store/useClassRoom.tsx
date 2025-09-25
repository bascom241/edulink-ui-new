import axiosInstance from "../lib/axios";
import { create } from "zustand";
import type { CurrentSession } from "./useSessionStore";
import toast from "react-hot-toast";


export interface ClassMaterial {
    title: string;
    url: string;
    description?: string; // optional
}

export interface Student {
    studentId: number;
    email: string;
    fullName: string;
    joinDate?: string;        // ISO date string - optional
    lastActive?: string;      // ISO date string - optional
    attendanceRate?: number;  // percentage - optional
    progress?: number;        // percentage - optional
    phone?: string;           // optional
    status?: 'active' | 'inactive' | 'pending'; // optional
    avatarUrl?: string;       // optional

}

export interface ClassroomResponseDto {
    classId: number;
    className: string;
    classDescription: string;
    classroomPrice: number;
    classroomFull: boolean;
    classDurationInDays: number;
    createdAt: string;
    expiresAt: string;
    classDeliveryModel: string;
    classLocation: string;
    targetAudience: string;
    classCategory: string;
    sessionOngoing: boolean;
    sessions: CurrentSession[];
    students: Student[];
    resources: ClassMaterial[];
    assignments: ClassMaterial[];
    tasks: ClassMaterial[];
    numberOfStudents: number;
    numberOfSessions: number;
    numberOfQuestions: number;
}


interface ClassRoomInterface {

    instructorClassrooms?: ClassroomResponseDto[];
    fetchingClassrooms?: boolean;
    // For Classroom api
    fetchInstructorClassroomsLength: (instructorEmail: string) => Promise<number>;
    fetchingClassroomsLength?: boolean;
    fetchInstructorClassrooms?: (instructorEmail: string) => Promise<ClassroomResponseDto[]>;

    uploadTasks: (tasks:any , clasId: number | undefined ) => Promise <boolean>
    uploadingTasks: boolean 
    uploadClassResources: (resources: any, classId: number | undefined) => Promise<boolean>
    uploadingResources: boolean
    singleClassroom?: ClassroomResponseDto;
    fetchingSingleClassroom?: boolean;
    fetchSingleClassroom?: (instructorEmail: string, classId: number) => Promise<ClassroomResponseDto>;

    classRoomsLength?: number;
    createClassroom: (formData: FormData, userId: number) => Promise<boolean>
    creatingClassroom: boolean

    generateInviteLink: (classId: number) => Promise<string | undefined>;
    fetchingInviteLink?: boolean;

    // For Students api
    fetchStudentClassroomsLength: (studentEmail: string) => Promise<number>;
    fetchingStudentClassroomsLength?: boolean;
    studentClassRoomsLength?: number;
    myStudentsContainer?: Student[]
    fetchStudentsInClassrooms?: (teacherEmail: string ) => Promise<void>
}
export const useClassRoomStore = create<ClassRoomInterface>((set) => ({

    myStudentsContainer: [],
    uploadingTasks: false, 
    uploadingResources: false,

    fetchingInviteLink: false,
    instructorClassrooms: [],
    singleClassroom: undefined,
    fetchingSingleClassroom: false,
    fetchingClassrooms: false,

    creatingClassroom: false,
    fetchInstructorClassroomsLength: async (instructorEmail: string) => {
        set({ fetchingClassroomsLength: true })
        try {
            const response = await axiosInstance.get(`/classroom/class-count?email=${instructorEmail}`);
            console.log(response)
            set({ classRoomsLength: response.data, fetchingClassroomsLength: false });
            return response.data
        } catch (error: any) {
            console.log(error)
            set({ fetchingClassroomsLength: false })
            toast.error("Failed to fetch classrooms")
            return 0
        }
    },

    fetchStudentClassroomsLength: async (studentEmail: string) => {
        set({ fetchingStudentClassroomsLength: true })
        try {
            const response = await axiosInstance.get(`/classroom/students-count?email=${studentEmail}`);
            console.log(response)
            set({ studentClassRoomsLength: response.data, fetchingStudentClassroomsLength: false });
            return response.data
        } catch (error: any) {
            console.log(error)
            set({ fetchingStudentClassroomsLength: false })

            return 0
        }
    },

    createClassroom: async (formData, userId) => {
        set({ creatingClassroom: true })
        try {
            const response = await axiosInstance.post(`/classroom/create-class/${userId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            set({ creatingClassroom: false })
            console.log(response)
            toast.success("Classroom has been Created");

            return true
        } catch (error: any) {
            set({ creatingClassroom: false })
            console.log(error)
            toast.error(error?.message)
            return false
        }
    },
    // For Instructors Only 
    fetchInstructorClassrooms: async (instructorEmail) => {
        set({ fetchingClassrooms: true })
        try {
            const response = await axiosInstance.get(`/classroom/instructor-classrooms/${instructorEmail}`);
            set({ instructorClassrooms: response.data });
            set({ fetchingClassrooms: false })
            console.log(response.data)
            return response.data
        } catch (error) {
            set({ fetchingClassrooms: false })
            toast.error("Failed to fetch classrooms")
            console.log(error)
        }
    },
    fetchSingleClassroom: async (instructorEmail: string, classId: number) => {
        set({ fetchingSingleClassroom: true })
        try {
            const response = await axiosInstance.get(`/classroom/single-instructor-classroom/${classId}?email=${instructorEmail}`);
            set({ singleClassroom: response.data });
            set({ fetchingSingleClassroom: false })
            console.log(response.data)
            return response.data
        } catch (error) {
            set({ fetchingSingleClassroom: false })
            toast.error("Failed to fetch classrooms")
            console.log(error)
        }
    },
    generateInviteLink: async (classId: number) => {
        set({ fetchingInviteLink: true });
        try {
            const response = await axiosInstance.get(`/classroom/${classId}/invite`);
            set({ fetchingInviteLink: false });
            return response.data.inviteLink as string;
        } catch (error) {
            console.error("Failed to generate invite link: ", error);
            set({ fetchingInviteLink: false });
            return "";
        }
    },
    uploadClassResources: async (formData, classId) => {
        set({uploadingResources: true})
        try {
            // Debug: log what's being sent
            console.log('Sending form data with parts:');
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }



            // Make the request to the server
            const response = await axiosInstance.put(
                `classroom/add-resources/${classId}`,
                formData
            );

         
            // ge the data the server sends to us
            const allResources: ClassMaterial[] = response.data;

            // We Replace entirely the data with the updated Data
            set((state) => ({
                singleClassroom: state.singleClassroom
                    ? {
                        ...state.singleClassroom,
                        resources: allResources, 
                    }
                    : undefined,
            }));
            set({uploadingResources: false })
            return true;
        } catch (error: any) {
            console.log('Upload error:', error);
            if (error.response) {
                console.log('Error response:', error.response.data);
                console.log('Error status:', error.response.status);
            }
              set({uploadingResources: false })
            return false;
        }
    },

    uploadTasks: async (formData:any, classId:any) => {
        set({uploadingTasks:true})
        try {

            // Make the request to the server 
            const response = await axiosInstance.put(`/classroom/add-task/${classId}`, formData); 

            // lopop through the data for debug 
            for (let [key,value] of formData){
                console.log(key, value)
            }

            const allTasks: ClassMaterial[] = response.data; 

            set((state)=> ({
                singleClassroom:state.singleClassroom?{
                    ...state.singleClassroom, 
                    tasks: allTasks
                }: undefined
            }))
            set({uploadingTasks: false })
            return true
        } catch (error: any) {
            console.log(error)
            if(error.response){
                console.log("Error Response:", error.response.data)
                console.log("Error Status:",error.response.status)
            }
            set({uploadingTasks: false })
            return false
        }
    },

    fetchStudentsInClassrooms: async (teacherEmail:string) => {
        try {
            const response = await axiosInstance.get(`classroom/my-students?teacherEmail=${teacherEmail}`)
            console.log(response)
            set({myStudentsContainer: response.data})
        } catch (error) {
            
            console.log(error)
        }
    }
}));