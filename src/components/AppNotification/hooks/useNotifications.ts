import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { notificationsService } from 'services/notificationService';

import { LENGTH_CONSTANTS } from 'constant';
import { checkSuccessRequest } from 'utils';

import type { INotification, NOTIFICATION_PARAMS_TYPE } from '../constants';

export const getNotifications = async (searchParams: NOTIFICATION_PARAMS_TYPE, listNotifications: INotification[]) => {
  const response = await notificationsService.getNotifications(searchParams);

  if (checkSuccessRequest(response)) {
    const { totalDocs, docs = [], totalUnread } = response?.data || {};
    const newListNotifications =
      searchParams?.page === LENGTH_CONSTANTS.DEFAULT_PAGE ? [...docs] : [...listNotifications, ...docs];
    return {
      totalDocs,
      totalUnread,
      docs: newListNotifications,
    };
  }

  return {
    totalDocs: 0,
    totalUnread: 0,
    docs: [],
  };
};

export const useNotifications = (
  searchParams: NOTIFICATION_PARAMS_TYPE,
  setSearchParams: Dispatch<SetStateAction<NOTIFICATION_PARAMS_TYPE>>,
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalDocs, setTotalDocs] = useState(0);
  const [totalUnread, setTotalUnread] = useState(0);
  const [listNotifications, setListNotifications] = useState<INotification[]>([]);

  useEffect(() => {
    if (!searchParams) return;
    const setDefaultValue = () => {
      setListNotifications([]);
      setTotalDocs(0);
      setTotalUnread(0);
    };

    (async () => {
      setIsLoading(true);

      try {
        const { totalDocs, totalUnread, docs } = await getNotifications(searchParams, listNotifications);

        setListNotifications(docs);
        setTotalDocs(totalDocs);
        setTotalUnread(totalUnread);
      } catch (e) {
        console.log(e);
        setDefaultValue();
      } finally {
        setIsLoading(false);
      }
    })();
  }, [searchParams]);

  const handleClickNotification = async (notification: INotification) => {
    if (!notification?.isRead && notification?._id) {
      try {
        const response = await notificationsService.updateMarkNotification(notification._id);
        if (checkSuccessRequest(response)) {
          const newListNotification = listNotifications.map((item: INotification) =>
            notification?._id === item?._id ? { ...notification, isRead: true } : item,
          );
          setTotalUnread((totalUnread) => --totalUnread);
          setListNotifications(newListNotification);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLoadMore = () => {
    setSearchParams((searchParams: NOTIFICATION_PARAMS_TYPE) => {
      return {
        ...searchParams,
        page: ++searchParams.page,
      };
    });
  };

  return {
    isLoading,
    totalDocs,
    totalUnread,
    listNotifications,
    handleLoadMore,
    onClickNotification: handleClickNotification,
  };
};
