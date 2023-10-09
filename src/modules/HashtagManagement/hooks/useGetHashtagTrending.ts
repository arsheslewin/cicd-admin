import { useEffect, useState } from 'react';

import { hashtagService } from 'services/hashtagService';
import { HashtagTrendingType } from 'services/hashtagService/types';
import { useHashtagActions } from 'store/hashtag-management/selector';

import { HTTP_STATUS_SUCCESS } from 'constant';
import { getRangeDateFromNow, stripEmptyValue } from 'utils';

import { TRENDING_QUERY } from '../constants';

const useGetHashtagTrending = (searchParams: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const { setTrending } = useHashtagActions();

  const transformSearchParams = (searchParams: any) => {
    const { keyword, sortField, sortType, limit, page, trendingDate, isHighlighted } = searchParams || {};

    const rangeDate = getRangeDateFromNow(trendingDate);

    // test
    // const TEST_TIME_UNIT = 1000 * 60;
    // const currentTime = new Date();
    // const startTime = new Date(currentTime.getTime() - (trendingDate - 1) * TEST_TIME_UNIT);
    // const rangeDate = {
    //   startTime: moment(startTime).utc().format(DATE_TIME_FORMAT),
    //   endTime: moment(currentTime).utc().format(DATE_TIME_FORMAT),
    // };

    const query = {
      [TRENDING_QUERY.KEYWORD]: keyword,
      [TRENDING_QUERY.SORT_FIELD]: sortField,
      [TRENDING_QUERY.SORT_TYPE]: sortType,
      [TRENDING_QUERY.LIMIT]: limit,
      [TRENDING_QUERY.OFFSET]: (page - 1) * limit,
      [TRENDING_QUERY.TRENDING_DATE]: trendingDate,
      [TRENDING_QUERY.IS_HIGHLIGHTED]: isHighlighted,
      [TRENDING_QUERY.START_DATE]: rangeDate?.startTime,
      [TRENDING_QUERY.END_DATE]: rangeDate?.endTime,
    };

    return stripEmptyValue(query);
  };

  const getListTrending = async (queryParams: HashtagTrendingType) => {
    try {
      const response = await hashtagService.getHashtagTrending(queryParams);

      if (HTTP_STATUS_SUCCESS?.includes(response?.status)) {
        const { list, total } = response?.data?.data || {};
        setTrending({ list, total });
      }
    } catch (error) {
      setTrending({ list: [], total: 0 });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams) {
      setIsLoading(true);

      setTimeout(() => {
        getListTrending(transformSearchParams(searchParams));
      }, 1000);
    }
  }, [JSON.stringify(searchParams)]);

  return {
    isLoading,
  };
};

export default useGetHashtagTrending;
