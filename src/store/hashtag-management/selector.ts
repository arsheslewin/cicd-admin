import useHashtagStore from './useHashtagStore';

export const useHashtagActions = () => useHashtagStore((state) => state.actions);
