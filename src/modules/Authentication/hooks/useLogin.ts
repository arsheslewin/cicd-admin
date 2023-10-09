import { useState } from 'react';

import { authService } from 'services/authService';
import { useGetAuthenticationActions } from 'store/authentication/selector';

import { HTTP_STATUS_SUCCESS, STORAGE_KEY } from 'constant/index';
import { stripEmptyValue } from 'utils';

import type { IForgotPassword, ILogin } from '../constants';

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthenticationToken, setProfile } = useGetAuthenticationActions();

  const login = async (formData: ILogin) => {
    try {
      const response = await authService.login<ILogin>(stripEmptyValue<ILogin>(formData));

      if (HTTP_STATUS_SUCCESS.includes(response?.status)) {
        const res = response?.data?.data;
        setAuthenticationToken(res?.accessToken);
        localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, res?.accessToken);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (formData: IForgotPassword) => {
    try {
      const response = await authService.forgotPassword<IForgotPassword>(stripEmptyValue<IForgotPassword>(formData));

      if (HTTP_STATUS_SUCCESS.includes(response?.status)) {
        return response?.data;
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async (formData: IForgotPassword) => {
    try {
      const response = await authService.forgotPassword<IForgotPassword>(stripEmptyValue<IForgotPassword>(formData));

      if (HTTP_STATUS_SUCCESS.includes(response?.status)) {
        return response?.data;
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (params: any) => {
    try {
      const response = await authService.resetPassword<any>(stripEmptyValue<any>(params));

      if (HTTP_STATUS_SUCCESS.includes(response?.status)) {
        return response?.data;
      }
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (params: any) => {
    try {
      const response = await authService.changePassword<any>(stripEmptyValue<any>(params));

      if (HTTP_STATUS_SUCCESS.includes(response?.status)) {
        return response?.data;
      }
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const getProfile = async () => {
    try {
      const response = await authService.profile();

      if (HTTP_STATUS_SUCCESS.includes(response?.status)) {
        setProfile(response?.data?.data);
      }
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    login,
    forgotPassword,
    resendOTP,
    resetPassword,
    changePassword,
    getProfile,
  };
};

export default useLogin;
