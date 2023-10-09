import useAuthenticationStore from './useAuthenticationStore';

export const useGetAuthenticationToken = () => useAuthenticationStore((state) => state.authenticationToken);
export const useGetProfile = () => useAuthenticationStore((state) => state.profile);

export const useGetAuthenticationActions = () => useAuthenticationStore((state) => state.actions);
