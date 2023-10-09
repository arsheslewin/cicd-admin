import { useState } from 'react';

import { userService } from 'services/userService';
import { UserSettingType } from 'services/userService/types';
import { useUserActions } from 'store/user-management/selector';

import { HTTP_STATUS_SUCCESS } from 'constant';

const useFetchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUserDetail } = useUserActions();

  const fetchUserDetail = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await userService.getUserDetail(id);

      if (HTTP_STATUS_SUCCESS?.includes(response?.status)) {
        setUserDetail(response?.data?.data);
      }
    } catch (error) {
      setUserDetail(null);
    } finally {
      setIsLoading(false);
    }
  };

  const blockUser = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await userService.patchBlockUser(id);

      if (HTTP_STATUS_SUCCESS?.includes(response?.status)) {
        return response?.data?.data;
      }
    } catch (error) {
      console.log('err', error);
    } finally {
      setIsLoading(false);
    }
  };

  const settingUser = async (params: UserSettingType) => {
    setIsLoading(true);
    try {
      const response = await userService.patchSettingUser(params);

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
    fetchUserDetail,
    blockUser,
    settingUser,
  };
};

export default useFetchUser;
