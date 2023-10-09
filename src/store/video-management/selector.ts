import useUserStore from './useVideoStore';

export const useVideoActions = () => useUserStore((state: any) => state.actions);
