import { DEFAULT_SEARCH_PARAMS } from 'constant';

export const MAX_UNREAD_NOTIFICATION = 99;

export const NOTIFICATION_PARAMS = {
  ...DEFAULT_SEARCH_PARAMS,
};

export type NOTIFICATION_PARAMS_TYPE = typeof NOTIFICATION_PARAMS;

export type NOTIFICATION_CONTENT_TYPE = {
  isLoading: boolean;
  totalDocs: number;
  listNotifications: INotification[];
  handleLoadMore: () => void;
  onClickNotification: (notification: INotification) => void;
};

export interface INotification {
  _id: string;
  createdAt: string;
  updatedAt: string;
  type: NOTIFICATION_TYPE;
  isRead: boolean;
}

export enum NOTIFICATION_TYPE {}
