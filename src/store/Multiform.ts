import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface FormData {
  student: boolean;
  teacher: boolean;

  // Auth
  email: string;
  password: string;
  confirmPassword: string;
  role: string;

  // Personal
  firstName: string;
  lastName: string;
  phoneNumber: string;

  // Professional
  teachingSubjects: string[];
  teachingLevel: string;
  shortBio: string;
  yearsOfExperience: number;

  // Certificate Image
  certificateUrl: string;
  certificateImageType: string;
  certificateImageName: string;

  // Government ID
  governmentIdUrl: string;
  governmentIdImageName: string;
  governmentIdImageType: string;

  // Other
  socialLink: string;
  bankAccount: string;
  bankName: string;
}

interface MultiformState {
  currentStep: number;
  totalTeacherSteps: number;
  totalStudentSteps: number;
  setCurrentStep: (step: number) => void;
  // setTotalSteps: (total: number) => void;
  setTotalTeacherSteps: (total: number) => void;
  setTotalStudentSteps: (total: number) => void;

  formData: FormData;
  setFormData: (data: Partial<FormData>) => void;
  handleFormDataChange: (field: keyof FormData, value: any) => void;
}

const useMultiformStore = create<MultiformState>()(
  persist(
    (set) => ({
      currentStep: 1,
      totalTeacherSteps: 5,
       totalStudentSteps: 3, // Default total steps

      setCurrentStep: (step: number) => set({ currentStep: step }),
      setTotalTeacherSteps: (total: number) => set({ totalTeacherSteps: total }),
      setTotalStudentSteps: (total: number) => set({ totalStudentSteps: total }),

      formData: {
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        teachingSubjects: [],
        teachingLevel: "",
        shortBio: "",
        yearsOfExperience: 0,
        certificateUrl: "",
        certificateImageType: "",
        certificateImageName: "",
        governmentIdUrl: "",
        governmentIdImageName: "",
        governmentIdImageType: "",
        socialLink: "",
        bankAccount: "",
        bankName: "",
        student: false,
        teacher: false,
      },

      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),

      handleFormDataChange: (field, value) => {
        set((state) => ({
          formData: { ...state.formData, [field]: value },
        }));
      },
    }),
    {
      name: "multi-form-storage", 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);

export default useMultiformStore;
