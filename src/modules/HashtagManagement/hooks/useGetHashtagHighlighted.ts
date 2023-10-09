import { useEffect, useState } from 'react';

import { hashtagService } from 'services/hashtagService';
import { HashtagHighlightedType } from 'services/hashtagService/types';
import { useHashtagActions } from 'store/hashtag-management/selector';

import { HTTP_STATUS_SUCCESS } from 'constant';
import { stripEmptyValue } from 'utils';

import { HIGHLIGHT_QUERY } from '../constants';

const useGetHashtagHighlighted = (searchParams: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const { setHighlighted } = useHashtagActions();

  const transformSearchParams = (searchParams: any) => {
    const { keyword, sortField, sortType, limit, page, createdBy, isDisplayed } = searchParams || {};

    const query = {
      [HIGHLIGHT_QUERY.KEYWORD]: keyword,
      [HIGHLIGHT_QUERY.SORT_FIELD]: sortField,
      [HIGHLIGHT_QUERY.SORT_TYPE]: sortType,
      [HIGHLIGHT_QUERY.LIMIT]: limit,
      [HIGHLIGHT_QUERY.OFFSET]: (page - 1) * limit,
      [HIGHLIGHT_QUERY.CREATED_BY]: createdBy === 'all' ? null : createdBy,
      [HIGHLIGHT_QUERY.IS_DISPLAYED]: isDisplayed,
    };

    return stripEmptyValue(query);
  };

  const getListHighlighted = async (queryParams: HashtagHighlightedType) => {
    try {
      const response = await hashtagService.getHashtagHighlighted(queryParams);

      if (HTTP_STATUS_SUCCESS?.includes(response?.status)) {
        const { list, total } = response?.data?.data || {};

        setHighlighted({ list, total });
      }
    } catch (error) {
      setHighlighted({ list: [], total: 0 });
    } finally {
      setIsLoading(false);
    }
  };

  const reload = () => getListHighlighted(transformSearchParams(searchParams));

  useEffect(() => {
    if (searchParams) {
      setIsLoading(true);

      setTimeout(() => {
        getListHighlighted(transformSearchParams(searchParams));
      }, 1000);
    }
  }, [JSON.stringify(searchParams)]);

  return {
    isLoading,
    reload,
  };
};

export default useGetHashtagHighlighted;
