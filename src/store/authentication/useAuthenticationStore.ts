import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface Authentication {
  profile: any;
  authenticationToken: string;
}

interface AuthenticationAction {
  actions: {
    setProfile: (profile: Authentication['profile']) => void;
    setAuthenticationToken: (authenticationToken: Authentication['authenticationToken']) => void;
  };
}

const initialState = {
  profile: {},
  authenticationToken: '',
};

const useAuthenticationStore = create<Authentication & AuthenticationAction>()(
  persist(
    immer((set) => ({
      //States
      ...initialState,

      //Actions
      actions: {
        setProfile: (profile) => set({ profile }),
        setAuthenticationToken: (authenticationToken) => set({ authenticationToken }),
      },
    })),
    {
      name: 'Authentication',
      partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => !['actions'].includes(key))),
    },
  ),
);

export default useAuthenticationStore;
