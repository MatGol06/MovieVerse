import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

// Generate a random UUID-like string for simple anonymous login
const generateId = () => Math.random().toString(36).substring(2, 15);

export const useUserStore = create(
  persist(
    (set, get) => ({
      userId: null,
      email: null,
      initializeUser: async () => {
        if (get().userId) return; // Already initialized

        const fakeEmail = `guest_${generateId()}@movieverse.com`;
        try {
          // Register user on our custom backend
          const res = await axios.post('http://localhost:5000/api/users', { email: fakeEmail });
          set({ userId: res.data.data.id, email: res.data.data.email });
        } catch (error) {
          console.error("Failed to initialize user:", error);
        }
      }
    }),
    {
      name: 'movieverse-user-storage', // saves to local storage
    }
  )
);
