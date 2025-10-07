import { create } from "zustand"
import axiosInstance from "../lib/axios"
import toast from "react-hot-toast"


interface TransactionData {

    id: number,
    date: string,
    amount: number
    status: string,
    studentName: string

}
interface UserWallet {
    walletId: number
    balance: number
    withdrawn: number
    totalEarnings: number
    transactions: TransactionData[]
}

interface WalletStore {
    fethcingUserWallet?: boolean
    fetchUserWallet: (userId: number) => Promise<void>
    userWallet?: UserWallet | null
}
export const useWalletStore = create<WalletStore>((set) => ({
    fethcingUserWallet: false,
    userWallet: null,
    fetchUserWallet: async (userId) => {
        set({ fethcingUserWallet: true })
        try {
            const response = await axiosInstance.get(`/wallet/user-wallet/${userId}`)
            console.log(response.data)
            set({ userWallet: response.data, fethcingUserWallet: false })
        } catch (error: any) {
            toast.error(error?.message)
            set({ userWallet: null, fethcingUserWallet: false })
        }
    }
}))