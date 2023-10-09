export const MAX_COUNT_HASHTAG = 500;
export const KEY_DRAG_ROW_TABLE = 'sort';

export enum FORM_HIGHLIGHTED {
  KEYWORD = 'keyword',
  CREATED_BY = 'createdBy',
  IS_DISPLAYED = 'isDisplayed',
}

export enum FORM_TRENDING {
  KEYWORD = 'keyword',
  TRENDING_DATE = 'trendingDate',
  IS_HIGHLIGHTED = 'isHighlighted',
}

export enum HIGHLIGHT_CREATOR {
  ADMIN = 1,
  USER = 2,
}

export enum HIGHLIGHT_DISPLAY {
  NO = 0,
  YES = 1,
}

export enum TRENDING_DATE {
  LAST_7_DAYS = 7,
  LAST_30_DAYS = 30,
  LAST_120_DAYS = 120,
}

export const HIGHLIGHT_OPTION = [
  {
    value: 'all',
    name: 'status.all',
  },
  {
    value: HIGHLIGHT_CREATOR.ADMIN,
    name: 'common.admin',
  },
  {
    value: HIGHLIGHT_CREATOR.USER,
    name: 'common.user',
  },
];

export const TRENDING_OPTION = [
  {
    value: TRENDING_DATE.LAST_7_DAYS,
    name: 'common.last_7_day',
  },
  {
    value: TRENDING_DATE.LAST_30_DAYS,
    name: 'common.last_30_day',
  },
  {
    value: TRENDING_DATE.LAST_120_DAYS,
    name: 'common.last_120_day',
  },
];

export const FORM_HIGHLIGHTED_DEFAULT_VALUE = {
  [FORM_HIGHLIGHTED.KEYWORD]: null,
  [FORM_HIGHLIGHTED.IS_DISPLAYED]: null,
};

export const FORM_TRENDING_DEFAULT_VALUE = {
  [FORM_TRENDING.KEYWORD]: null,
  [FORM_TRENDING.TRENDING_DATE]: TRENDING_OPTION[0],
  [FORM_TRENDING.IS_HIGHLIGHTED]: null,
};

export enum HIGHLIGHT_QUERY {
  KEYWORD = 'keyword',
  SORT_FIELD = 'sortField',
  SORT_TYPE = 'sortType',
  LIMIT = 'limit',
  OFFSET = 'offset',
  CREATED_BY = 'createdBy',
  IS_DISPLAYED = 'isDisplayed',
}

export enum TRENDING_QUERY {
  KEYWORD = 'keyword',
  SORT_FIELD = 'sortField',
  SORT_TYPE = 'sortType',
  LIMIT = 'limit',
  OFFSET = 'offset',
  TRENDING_DATE = 'trendingDate',
  IS_HIGHLIGHTED = 'isHighlighted',
  START_DATE = 'startDate',
  END_DATE = 'endDate',
}
