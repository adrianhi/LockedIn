import { create } from "zustand";
import {
  checkUserSession,
  signOut,
  subscribeToAuthChanges,
} from "@services/auth/authService";

interface AuthState {
  isAuthenticated: boolean;
  authenticatedUser: null | { id: string; email: string };
  setUserSession: () => Promise<void>;
  logout: () => Promise<void>;
  initializeAuthListener: () => () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  authenticatedUser: null,

  // Sets the current user session by calling checkUserSession from the service
  setUserSession: async () => {
    const session = await checkUserSession();

    if (session?.user) {
      set({
        isAuthenticated: true,
        authenticatedUser: {
          id: session.user.id,
          email: session.user.email ?? "",
        },
      });
    } else {
      set({
        isAuthenticated: false,
        authenticatedUser: null,
      });
    }
  },

  // Logs out the user using the service's signOut function
  logout: async () => {
    await signOut();
    set({
      isAuthenticated: false,
      authenticatedUser: null,
    });
  },

  // Initializes an auth listener using the subscribeToAuthChanges function
  initializeAuthListener: () => {
    const { data: authListener } = subscribeToAuthChanges((session) => {
      if (session) {
        set({
          isAuthenticated: true,
          authenticatedUser: {
            id: session.user?.id || "",
            email: session.user?.email || "",
          },
        });
      } else {
        set({
          isAuthenticated: false,
          authenticatedUser: null,
        });
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  },
}));

export default useAuthStore;
