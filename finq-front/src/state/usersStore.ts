import create from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios'; // This is only used as a fallback for fetching users.
import { User, Name, UserFormValues } from '../types/UserProfile';
import { axiosInstance } from '../api/axiosConfig';

interface UserState {
    users: User[];
    savedUsers: User[];
    fetchUsers: (limit: number) => Promise<void>;
    fetchSavedUsers: () => Promise<void>;
    saveUser: (userId: string, userFormValues: UserFormValues, thumbnail: string, country: string) => Promise<void>;
    deleteUser: (userId: string) => Promise<void>;
    updateUser: (userId: string, updatedName: Name) => Promise<void>;
    getUser: (userId: string) => User | undefined;
    isUserSaved: (userId: string) => boolean;
}

const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            users: [],
            savedUsers: [],

            fetchUsers: async (limit: number) => {
                try {
                    const response = await axiosInstance.get(`/${limit}`);
                    set({ users: response.data });
                } catch (error) {
                    try {
                        const response = await axios.get(`https://randomuser.me/api/?results=${limit}`);
                        set({ users: response.data });
                    } catch (error) {
                        console.error("cant fetch at all");
                    }
                }
            },

            fetchSavedUsers: async () => {
                const response = await axiosInstance.get('/saved-users');
                set({ savedUsers: response.data });
            },

            saveUser: async (userId: string, userFormValues: UserFormValues, thumbnail: string, country: string) => {
                await axiosInstance.post('/save-user', { userId, data: userFormValues, thumbnail, country });
                get().fetchSavedUsers();
            },

            deleteUser: async (userId: string) => {
                await axiosInstance.delete(`/delete-user/${userId}`);
                get().fetchSavedUsers();
            },

            updateUser: async (userId: string, updatedName: Name) => {
                await axiosInstance.put(`/update-user/${userId}`, { ...updatedName });
                get().fetchSavedUsers();
            },

            getUser: (userId: string) => {
                return [...get().users, ...get().savedUsers].find(user => user.login.uuid === userId);
            },
            isUserSaved: (userId: string) => {
                return get().savedUsers.some(savedUser => savedUser.login.uuid === userId);
            }
        }),
        {
            name: 'user-storage', // Corrected the storage name to something more relevant
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);

export default useUserStore;
