import { useEffect, useState } from 'react';

import { videoService } from 'services/videoService';
import { VideoListType } from 'services/videoService/types';

import { HTTP_STATUS_SUCCESS } from 'constant';
import { convertRangeDateToUTC, stripEmptyValue } from 'utils';

import { VIDEO_QUERY } from '../constants';

const useGetVideoList = (searchParams: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [videoList, setVideoList] = useState([]);

  const setDefaultValue = () => {
    setVideoList([]);
    setTotal(0);
  };

  const transformSearchParams = (searchParams: any) => {
    const { keyword, sortField, sortType, limit, page, createdDate, status, reported, userId } = searchParams || {};

    const createdDateUTC = convertRangeDateToUTC(createdDate);

    const query = {
      [VIDEO_QUERY.KEYWORD]: keyword,
      [VIDEO_QUERY.SORT_FIELD]: sortField === 'creator' ? 'displayname' : sortField,
      [VIDEO_QUERY.SORT_TYPE]: sortType,
      [VIDEO_QUERY.LIMIT]: limit,
      [VIDEO_QUERY.OFFSET]: (page - 1) * limit,
      [VIDEO_QUERY.CREATE_START_DATE]: createdDateUTC?.startTime,
      [VIDEO_QUERY.CREATE_END_DATE]: createdDateUTC?.endTime,
      [VIDEO_QUERY.STATUS]: status,
      [VIDEO_QUERY.REPORTED]: reported,
      [VIDEO_QUERY.CREATOR]: userId,
    };

    return stripEmptyValue(query);
  };

  const getVideoList = async (queryParams: VideoListType) => {
    try {
      const response = await videoService.getListVideo(queryParams);

      if (HTTP_STATUS_SUCCESS?.includes(response?.status)) {
        const { list, total } = response?.data?.data || {};
        setVideoList(list);
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
        getVideoList(transformSearchParams(searchParams));
      }, 1000);
    }
  }, [JSON.stringify(searchParams)]);

  return {
    total,
    videoList,
    isLoading,
  };
};

export default useGetVideoList;
