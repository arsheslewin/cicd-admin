import { USER_STATUS } from 'constant';

export enum USER_FORM {
  KEYWORD = 'keyword',
  JOINED_DATE = 'joinedDate',
  LAST_LOGIN = 'lastLogin',
  STATUS = 'status',
  REPORTED = 'reported',
}

export enum USER_QUERY {
  KEYWORD = 'keyword',
  SORT_FIELD = 'sortField',
  SORT_TYPE = 'sortType',
  LIMIT = 'limit',
  OFFSET = 'offset',
  JOINED_START_DATE = 'joinedStartDate',
  JOINED_END_DATE = 'joinedEndDate',
  LOGIN_START_DATE = 'loginStartDate',
  LOGIN_END_DATE = 'loginEndDate',
  STATUS = 'status',
  REPORTED_USER = 'reportedUser',
}

export const USER_FORM_DEFAULT_VALUE = {
  [USER_FORM.KEYWORD]: null,
  [USER_FORM.JOINED_DATE]: [],
  [USER_FORM.LAST_LOGIN]: [],
};

export const USER_STATUS_OPTION = [
  {
    value: null,
    name: 'status.all',
  },
  {
    value: USER_STATUS.UNVERIFIED,
    name: 'status.unverified',
  },
  {
    value: USER_STATUS.ACTIVE,
    name: 'status.active',
  },

  {
    value: USER_STATUS.BLOCKED,
    name: 'status.blocked',
  },
  {
    value: USER_STATUS.DELETED,
    name: 'status.deleted',
  },
  {
    value: USER_STATUS.PENDING,
    name: 'status.pending',
  },
];
