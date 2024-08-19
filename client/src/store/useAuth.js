import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"; // Use curly braces for named import

export const useAuth = create(
  persist(
    (set) => ({
      loginResponse: null,
      setLoginResponse: (response) => set({ loginResponse: response }),
      setLogOut: () => set({ loginResponse: null }),
    }),
    {
      name: "user", // Nama untuk penyimpanan lokal
      storage: createJSONStorage(() => localStorage),
    }
  )
);
