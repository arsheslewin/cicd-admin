import { useCallback } from 'react';
import type { FieldValues, UseFormGetValues } from 'react-hook-form';

import addDays from 'date-fns/addDays';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';
import subDays from 'date-fns/subDays';

const useDisableDateRange = <T extends FieldValues>(
  getValues: UseFormGetValues<T>,
  fromKey: string,
  toKey: string,
  disableCurrentDate?: boolean,
  maxDateRange = 0,
) => {
  const disableStartDate = useCallback((current: Date) => {
    const to = getValues()?.[toKey];
    if (to) {
      const dateMinusDateRange = startOfDay(subDays(to, maxDateRange));

      return (maxDateRange && current < dateMinusDateRange) || current > endOfDay(to);
    }

    const currentDate = endOfDay(new Date());
    if (disableCurrentDate) return current > currentDate;

    return false;
  }, []);

  const disableEndDate = useCallback((current: Date) => {
    const from = getValues()?.[fromKey];
    const currentDate = endOfDay(new Date());

    if (disableCurrentDate) {
      if (from) {
        const dateAddDateRange = endOfDay(addDays(from, maxDateRange));
        return (maxDateRange && current > dateAddDateRange) || current < from || current > currentDate;
      }
      return current > currentDate;
    } else {
      if (from) {
        const dateAddDateRange = endOfDay(addDays(from, maxDateRange));
        return (maxDateRange && current > dateAddDateRange) || current < startOfDay(from);
      }
    }

    return false;
  }, []);

  return {
    disableStartDate,
    disableEndDate,
  };
};

export default useDisableDateRange;
