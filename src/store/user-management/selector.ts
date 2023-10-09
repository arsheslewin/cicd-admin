import useUserStore from './useUserStore';

export const useUserActions = () => useUserStore((state) => state.actions);
