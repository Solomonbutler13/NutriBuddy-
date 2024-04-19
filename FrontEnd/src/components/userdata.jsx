import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Create default data and allow user to change it
export const useStore = create(persist(set => ({
    email: '',
    password: '',
    firstName: 'John',
    lastName: 'Doe',
    age: 0,
    gender: 'Male',
    weight: 180,
    height: 60,
    
    setInfo: (info, value) => set({ [info]: value })
}), {
    name: 'user-data',
}));