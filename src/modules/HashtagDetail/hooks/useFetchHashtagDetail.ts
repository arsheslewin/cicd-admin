import { useEffect, useState } from 'react';

import { hashtagService } from 'services/hashtagService';
import { HashtagDetailType } from 'services/hashtagService/types';

import { HTTP_STATUS_SUCCESS } from 'constant';
import { getRangeDateFromNow } from 'utils';

const useFetchHashtagDetail = (searchParams: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [detail, setDetail] = useState({});

  const getHashtagDetail = async (params: HashtagDetailType) => {
    setIsLoading(true);
    try {
      const response = await hashtagService.getHashtagDetail(params);

      if (HTTP_STATUS_SUCCESS?.includes(response?.status)) {
        setDetail(response?.data?.data);
      }
    } catch (error) {
      console.log('err', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams?.id) {
      const rangeDate = getRangeDateFromNow(searchParams?.trendingDate);

      // test
      // const TEST_TIME_UNIT = 1000 * 60;
      // const currentTime = new Date();
      // const startTime = new Date(currentTime.getTime() - (searchParams?.trendingDate - 1) * TEST_TIME_UNIT);
      // const rangeDate = {
      //   startTime: moment(startTime).utc().format(DATE_TIME_FORMAT),
      //   endTime: moment(currentTime).utc().format(DATE_TIME_FORMAT),
      // };

      const params = {
        ...searchParams,
        startDate: rangeDate?.startTime,
        endDate: rangeDate?.endTime,
      };

      getHashtagDetail(params);
    }
  }, [searchParams]);

  return {
    isLoading,
    detail,
  };
};

export default useFetchHashtagDetail;
