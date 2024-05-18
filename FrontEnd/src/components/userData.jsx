import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import zustymiddleware from 'zustymiddleware';
// Define the store without middleware
const baseStore = set => ({
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
});
// Wrap the base store with zustymiddleware and then persist
export const useStore = create(persist(zustymiddleware(baseStore), {
   name: 'user-data',
}));