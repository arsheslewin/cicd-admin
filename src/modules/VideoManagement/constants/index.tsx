import { VIDEO_STATUS } from 'constant';

export enum VIDEO_FORM {
  KEYWORD = 'keyword',
  CREATED_DATE = 'createdDate',
  STATUS = 'status',
  REPORTED = 'reported',
}

export enum VIDEO_QUERY {
  KEYWORD = 'keyword',
  SORT_FIELD = 'sortField',
  SORT_TYPE = 'sortType',
  LIMIT = 'limit',
  OFFSET = 'offset',
  CREATE_START_DATE = 'startDate',
  CREATE_END_DATE = 'endDate',
  STATUS = 'status',
  REPORTED = 'reportedVideo',
  CREATOR = 'userId',
}

export const VIDEO_FORM_DEFAULT_VALUE = {
  [VIDEO_FORM.KEYWORD]: null,
  [VIDEO_FORM.CREATED_DATE]: [],
};

export const VIDEO_STATUS_OPTION = [
  {
    value: null,
    name: 'status.all',
  },
  {
    value: VIDEO_STATUS.CREATING,
    name: 'status.creating',
  },
  {
    value: VIDEO_STATUS.PRIVATE,
    name: 'status.private',
  },

  {
    value: VIDEO_STATUS.PUBLIC,
    name: 'status.public',
  },
  {
    value: VIDEO_STATUS.DELETED,
    name: 'status.deleted',
  },
];
