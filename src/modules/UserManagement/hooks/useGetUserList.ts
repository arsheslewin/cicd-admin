import { useEffect, useState } from 'react';

import { userService } from 'services/userService';
import { UserListType } from 'services/userService/types';

import { HTTP_STATUS_SUCCESS } from 'constant';
import { convertRangeDateToUTC, stripEmptyValue } from 'utils';

import { USER_QUERY } from '../constants';

const useGetUserList = (searchParams: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [userList, setUserList] = useState([]);

  const setDefaultValue = () => {
    setUserList([]);
    setTotal(0);
  };

  const transformSearchParams = (searchParams: any) => {
    const { keyword, sortField, sortType, limit, page, joinedDate, lastLogin, status, reported } = searchParams || {};

    const joinedDateUTC = convertRangeDateToUTC(joinedDate);
    const lastLoginUTC = convertRangeDateToUTC(lastLogin);

    const query = {
      [USER_QUERY.KEYWORD]: keyword,
      [USER_QUERY.SORT_FIELD]: sortField === 'user' ? 'displayname' : sortField,
      [USER_QUERY.SORT_TYPE]: sortType,
      [USER_QUERY.LIMIT]: limit,
      [USER_QUERY.OFFSET]: (page - 1) * limit,
      [USER_QUERY.JOINED_START_DATE]: joinedDateUTC?.startTime,
      [USER_QUERY.JOINED_END_DATE]: joinedDateUTC?.endTime,
      [USER_QUERY.LOGIN_START_DATE]: lastLoginUTC?.startTime,
      [USER_QUERY.LOGIN_END_DATE]: lastLoginUTC?.endTime,
      [USER_QUERY.STATUS]: status,
      [USER_QUERY.REPORTED_USER]: reported,
    };

    return stripEmptyValue(query);
  };

  const getListUser = async (queryParams: UserListType) => {
    try {
      const response = await userService.getListUser(queryParams);

      if (HTTP_STATUS_SUCCESS?.includes(response?.status)) {
        const { list, total } = response?.data?.data || {};
        setUserList(list);
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
        getListUser(transformSearchParams(searchParams));
      }, 1000);
    }
  }, [JSON.stringify(searchParams)]);

  return {
    total,
    userList,
    isLoading,
  };
};

export default useGetUserList;
