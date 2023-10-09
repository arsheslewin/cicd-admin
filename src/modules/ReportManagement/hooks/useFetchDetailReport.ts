import { useState } from 'react';

import { reportService } from 'services/reportService';

import { HTTP_STATUS_SUCCESS } from 'constant';

const useFetchDetailReport = () => {
  const [isLoadingDetail, setIsLoading] = useState(false);
  const [report, setReport] = useState(null);

  const fetchReportDetail = async (id: string, onToggleModal?: any) => {
    setIsLoading(true);
    try {
      const response = await reportService.getDetailReport(id);

      if (HTTP_STATUS_SUCCESS?.includes(response?.status)) {
        setReport(response?.data?.data);
        onToggleModal && onToggleModal();
      }
    } catch (error) {
      setReport(null);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoadingDetail,
    report,
    fetchReportDetail,
  };
};

export default useFetchDetailReport;
