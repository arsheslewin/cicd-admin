import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface IUser {
  detail: any;
}

interface IUserAction {
  actions: {
    setUserDetail: (profile: IUser['detail']) => void;
  };
}

const initialState = {
  detail: {},
};

const useUserStore = create<IUser & IUserAction>()(
  immer((set) => ({
    //States
    ...initialState,

    //Actions
    actions: {
      setUserDetail: (detail) => set({ detail }),
    },
  })),
);

export default useUserStore;
