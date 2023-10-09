import { useEffect, useState } from 'react';

import { reportService } from 'services/reportService';
import { ReportListType } from 'services/reportService/types';

import { HTTP_STATUS_SUCCESS } from 'constant';
import { convertRangeDateToUTC, stripEmptyValue } from 'utils';

import { REPORT_QUERY } from '../constants';

const useGetReportList = (searchParams: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [reportList, setReportList] = useState([]);

  const setDefaultValue = () => {
    setReportList([]);
    setTotal(0);
  };

  const transformSearchParams = (searchParams: any) => {
    const { keyword, sortField, sortType, limit, page, createdDate, reason, reportedObject, userId } =
      searchParams || {};

    const createdDateUTC = convertRangeDateToUTC(createdDate);

    const query = {
      [REPORT_QUERY.KEYWORD]: keyword,
      [REPORT_QUERY.SORT_FIELD]: sortField,
      [REPORT_QUERY.SORT_TYPE]: sortType,
      [REPORT_QUERY.LIMIT]: limit,
      [REPORT_QUERY.OFFSET]: (page - 1) * limit,
      [REPORT_QUERY.CREATE_START_DATE]: createdDateUTC?.startTime,
      [REPORT_QUERY.CREATE_END_DATE]: createdDateUTC?.endTime,
      [REPORT_QUERY.REASON]: reason,
      [REPORT_QUERY.REPORTED_OBJECT]: reportedObject,
      [REPORT_QUERY.USER_ID]: userId,
    };

    return stripEmptyValue(query);
  };

  const getReportList = async (queryParams: ReportListType) => {
    try {
      const response = await reportService.getListReport(queryParams);

      if (HTTP_STATUS_SUCCESS?.includes(response?.status)) {
        const { list, total } = response?.data?.data || {};
        setReportList(list);
        setTotal(total);
      }
    } catch (error) {
      setDefaultValue();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams) {
      setIsLoading(true);

      setTimeout(() => {
        getReportList(transformSearchParams(searchParams));
      }, 1000);
    }
  }, [JSON.stringify(searchParams)]);

  return {
    total,
    reportList,
    isLoading,
  };
};

export default useGetReportList;
