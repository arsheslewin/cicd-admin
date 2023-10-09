export enum COMMENT_FORM {
  KEYWORD = 'keyword',
  CREATED_DATE = 'createdDate',
}

export enum COMMENT_QUERY {
  KEYWORD = 'keyword',
  SORT_FIELD = 'sortField',
  SORT_TYPE = 'sortType',
  LIMIT = 'limit',
  OFFSET = 'offset',
  CREATOR = 'videoId',
  CURSOR_COMMENT_ID = 'cursorCommentId',
  CREATE_START_DATE = 'startDate',
  CREATE_END_DATE = 'endDate',
}

export enum DELETE_COMMENT_STATE {
  NOT_DELETE = 'not-delete',
  DELETING = 'deleting',
  DELETED = 'deleted',
}
