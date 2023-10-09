import { useState } from 'react';

import { reportService } from 'services/reportService';
import { ReportListType } from 'services/reportService/types';

import { HTTP_STATUS_SUCCESS } from 'constant';

const useFetchReport = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchReport = async (params: ReportListType) => {
    setIsLoading(true);
    try {
      const response = await reportService.getListReport(params);

      if (HTTP_STATUS_SUCCESS?.includes(response?.status)) {
        return response?.data?.data;
      }
    } catch (error) {
      console.log('err', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    fetchReport,
  };
};

export default useFetchReport;
