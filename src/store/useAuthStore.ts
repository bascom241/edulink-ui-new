import { create } from 'zustand';
import axiosInstance from '../lib/axios';
import toast from 'react-hot-toast';





interface Classroom {
  // Define classroom structure properly if you know it
  [key: string]: any;
}

interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  role: string;
  shortBio: string;
  socialLink: string;
  student: boolean;
  teacher: boolean;
  teachingLevel: string;
  teachingSubjects: string[];
  yearsOfExperience: number;

  bankAccount: string;
  bankCode: string;
  bankName: string;

  certificateImageName: string;
  certificateImageType: string | null;
  certificateUrl: string;

  governmentIdImageName: string;
  governmentIdImageType: string | null;
  governmentIdUrl: string;

  classrooms: Classroom[];
  orders: any[]; // Replace `any` with proper order interface if you have one

  token: string | null;
  tokenExpiry: string | null;
}


const authKey = 'authToken';


export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    loggingIn: boolean;
    error: string | null;
    isRegistering: boolean;
    forgetingPassword: boolean;
    resetingPassword: boolean;
    login: (formData: { email: string; password: string }) => Promise<boolean>;
    registerUser: (FormData: any) => Promise<void>
    forgotPassword: (email: string) => Promise<boolean>
    resetPassword: (token:string, password:string, confirmPassword:string) => Promise<boolean>
    getUser: () => Promise<void>
}
export const useAuthStore = create<AuthState>((set,get) => ({
    isAuthenticated: false,
    user: null,
    token: null,
    loggingIn: false,
    error: null,
    isRegistering : false,
    forgetingPassword:false,
    resetingPassword:false,

    login: async (formData: { email: string; password: string }) => {
        console.log("Logging in with data:", formData);
        set({ loggingIn: true, error: null });
        try {
            const response = await axiosInstance.post("/auth/login", formData);

            const token = response.data;
            localStorage.setItem(authKey, token);
            set({ isAuthenticated: true, token, loggingIn: false });
            toast.success(response.data.message || "Login successful!");
            return true
        } catch (error) {
            console.error("Login error:", error);
            if (error instanceof Error) {
                set({ loggingIn: false, error: error.message });
            }
            return false
        } finally {
            set({ loggingIn: false });
            
        }
    },
    registerUser: async (formData: any) => {
        set({isRegistering:true})
        try {
            const response = await axiosInstance.post("/auth/register", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            set({isRegistering:false})
            console.log(response)
        } catch (error) {
            if (error instanceof Error) {
                console.log((error as any)?.response.data);
            }
            set({isRegistering:false})
        }
    },

    forgotPassword:async (email)=>{
        set({forgetingPassword:true})
        try {
            await axiosInstance.post("/auth/forgot-password", {email},{
                headers:{
                    "Content-Type":"application/json"
                }
            });
            set({forgetingPassword:false})
            return true
        } catch (error) {
            set({forgetingPassword:false})
            return false
        }
    },

    resetPassword: async (token,password, confirmPassword) => {
        set({resetingPassword:true})
        try {
            await axiosInstance.post(`auth/reset-password?token=${token}` , {password, confirmPassword})
            set({resetingPassword:false})
            return true
        } catch (error) {
            set({resetingPassword:false})
            console.log(error)
            return false
        }
    },
    getUser: async () =>{
        try {
         
                const response = await axiosInstance.post("/auth/user");
                set({ user: response.data, isAuthenticated: true });
                toast.success("User data fetched successfully");
                console.log("User data:", response.data);
                const user = get().user;    
                console.log("User:", user);
        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error("Failed to fetch user data");
        }
    }
}))
