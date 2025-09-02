import { create } from 'zustand';
import axiosInstance from '../lib/axios';


const authKey = 'authToken';
export interface AuthState {
    isAuthenticated: boolean;
    user: any;
    token: string | null;
    loggingIn: boolean;
    error: string | null;
       isRegistering : boolean
    forgetingPassword:boolean
    resetingPassword:boolean
    login: (formData: { email: string; password: string }) => Promise<boolean>;
    registerUser: (FormData: any) => Promise<void>
    forgotPassword: (email: string) => Promise<boolean>
    resetPassword: (token:string, password:string, confirmPassword:string) => Promise<boolean>
}
export const useAuthStore = create<AuthState>((set) => ({
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
    }
}))
