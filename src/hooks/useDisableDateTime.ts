import { useCallback } from 'react';

import { endOfDay } from 'date-fns';
import format from 'date-fns/format';
import subDays from 'date-fns/subDays';
import range from 'lodash/range';

import { DATE_FORMAT } from 'constant';

export function useDisableDateTime() {
  const disableBeforeDate = useCallback((current: Date) => {
    const yesterday = endOfDay(subDays(new Date(), 1));
    return current < yesterday;
  }, []);

  const disableTime = useCallback((current: Date | null) => {
    if (current) {
      const currentDate = format(new Date(current), DATE_FORMAT);
      const today = format(new Date(), DATE_FORMAT);

      const currentHour = new Date(current).getHours();
      const currentMinute = new Date(current).getMinutes();

      const hourDisable = new Date().getHours();
      const minuteDisable = new Date().getMinutes();
      const secondsDisable = new Date().getSeconds();

      if (currentDate === today) {
        if (hourDisable < currentHour) {
          return {
            disabledHours: () => range(0, 24).splice(0, hourDisable),
            disabledMinutes: () => [],
            disabledSeconds: () => [],
          };
        }

        if (minuteDisable < currentMinute) {
          return {
            disabledHours: () => range(0, 24).splice(0, hourDisable),
            disabledMinutes: () => range(0, minuteDisable),
            disabledSeconds: () => [],
          };
        }

        return {
          disabledHours: () => range(0, 24).splice(0, hourDisable),
          disabledMinutes: () => range(0, minuteDisable),
          disabledSeconds: () => range(0, secondsDisable),
        };
      }

      return {
        disabledHours: () => [],
        disabledMinutes: () => [],
        disabledSeconds: () => [],
      };
    }
    return {
      disabledHours: () => range(0, 24),
      disabledMinutes: () => range(0, 60),
      disabledSeconds: () => range(0, 60),
    };
  }, []);

  return {
    disableTime,
    disableBeforeDate,
  };
}
