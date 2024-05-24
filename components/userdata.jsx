import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import zustymiddleware from 'zustymiddleware';

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
    keto: false,
    vegan: false,
    lowCarb: false,
    Fish: false,
    Soy: false,
    Milk: false,
    Shellfish: false,
    Nuts: false,
    Eggs: false,
    Wheat: false,
    Sesame: false,
    activityLevel: 'Moderate',
    
    setInfo: (info, value) => set({ [info]: value }),
    saveUserDataToDB: async (userData) => {
        try {
            const response = await fetch('/api/user',)
        }
    }
}), {
    name: 'user-data',
}));