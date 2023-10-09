import { MutableRefObject, useEffect, useMemo, useRef } from 'react';

export function useTimeout(callback: Function, timeout = 0) {
  const timeoutId: MutableRefObject<null | number> = useRef(null);

  const handler = useMemo(() => {
    return {
      start<T>(overrideTimeout = 0, ...args: T[]): void {
        handler.stop();
        timeoutId.current = setTimeout(
          args?.length > 0 ? () => callback(...args) : callback,
          timeout || overrideTimeout,
        );
      },

      stop(): void {
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }
      },

      restart(): void {
        handler.stop();
        handler.start();
      },
    };
  }, [callback, timeout]);

  useEffect(() => {
    return () => {
      handler.stop();
    };
  }, []);

  return handler;
}
