import { useEffect, useState } from 'react';

import { analyticService } from 'services/analyticService';
import { AnalyticsType } from 'services/analyticService/types';

import { HTTP_STATUS_SUCCESS } from 'constant';
import { getRangeDateFromNow } from 'utils';

const useFetchAnalytic = (analyticsDate: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>({});

  const fetchAnalytic = async (params: AnalyticsType) => {
    setIsLoading(true);
    try {
      const response = await analyticService.getAnalytics(params);

      if (HTTP_STATUS_SUCCESS?.includes(response?.status)) {
        setData(response?.data?.data);
      }
    } catch (error) {
      setData({});
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (analyticsDate) {
      const rangeDate = getRangeDateFromNow(analyticsDate);
      const params = {
        analyticsDate,
        startDate: rangeDate?.startTime,
        endDate: rangeDate?.endTime,
      };

      fetchAnalytic(params);
    }
  }, [analyticsDate]);

  return {
    isLoading,
    data,
  };
};

export default useFetchAnalytic;
