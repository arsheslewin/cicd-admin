import { useState } from 'react';

import { hashtagService } from 'services/hashtagService';

import { HTTP_STATUS_SUCCESS } from 'constant';

const useFetchHashtag = () => {
  const [isLoading, setIsLoading] = useState(false);

  const setHashtagCount = async (hashtagCount: number) => {
    setIsLoading(true);
    try {
      const response = await hashtagService.putHashtagCountSetting(hashtagCount);

      if (HTTP_STATUS_SUCCESS?.includes(response?.status)) {
        return response?.data;
      }
    } catch (error) {
      console.log('err', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getHashtagCount = async () => {
    setIsLoading(true);
    try {
      const response = await hashtagService.getHashtagCountSetting();

      if (HTTP_STATUS_SUCCESS?.includes(response?.status)) {
        return response?.data?.data;
      }
    } catch (error) {
      console.log('err', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addHashtag = async (hashtag: string) => {
    setIsLoading(true);
    try {
      const response = await hashtagService.postHashtag(hashtag);

      if (HTTP_STATUS_SUCCESS?.includes(response?.status)) {
        return response?.data;
      }
    } catch (error) {
      console.log('err', error);
    } finally {
      setIsLoading(false);
    }
  };

  const orderHashtag = async (params: any) => {
    setIsLoading(true);
    try {
      const response = await hashtagService.putHashtagOrder(params);

      if (HTTP_STATUS_SUCCESS?.includes(response?.status)) {
        return response?.data;
      }
    } catch (error) {
      console.log('err', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setDisplayHashtag = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await hashtagService.patchHashtagDisplay(id);

      if (HTTP_STATUS_SUCCESS?.includes(response?.status)) {
        return response?.data;
      }
    } catch (error) {
      console.log('err', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setHighlight = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await hashtagService.patchHashtagHighlight(id);

      if (HTTP_STATUS_SUCCESS?.includes(response?.status)) {
        return response?.data;
      }
    } catch (error) {
      console.log('err', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    setHashtagCount,
    getHashtagCount,
    addHashtag,
    orderHashtag,
    setDisplayHashtag,
    setHighlight,
  };
};

export default useFetchHashtag;
