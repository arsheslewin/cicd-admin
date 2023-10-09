import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface IHashtag {
  highlighted: any;
  trending: any;
}

interface IHashtagAction {
  actions: {
    setHighlighted: (highlighted: IHashtag['highlighted']) => void;
    setTrending: (trending: IHashtag['trending']) => void;
  };
}

const initialState = {
  highlighted: {
    list: [],
    total: 0,
  },
  trending: {
    list: [],
    total: 0,
  },
};

const useHashtagStore = create<IHashtag & IHashtagAction>()(
  immer((set) => ({
    //States
    ...initialState,

    //Actions
    actions: {
      setHighlighted: (highlighted) => set({ highlighted }),
      setTrending: (trending) => set({ trending }),
    },
  })),
);

export default useHashtagStore;
