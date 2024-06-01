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
    goalWeight: 165,
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
    userId: 1,
    
    setInfo: (info, value) => set({ [info]: value })
}), {
    name: 'user-data',
}));