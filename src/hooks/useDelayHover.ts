import { useTimeout } from './useTimeout';

const useDelayHover = <T>(callback: (args: T[]) => void, threshold: number) => {
  const handler = useTimeout(callback, threshold);

  const onMouseEnter = (args: T[]) => () => {
    handler.start<T[] | Record<string, T[]>>(threshold, args);
  };

  return {
    getMouseEvent(...args: T[]) {
      return {
        onMouseEnter: onMouseEnter([...args]),
      };
    },
  };
};

export default useDelayHover;
