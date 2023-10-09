export const TYPE_CONSTANTS = {
  MESSAGE: {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    IMG_DONE: 'done',
  } as const,
};

export const HTTP_STATUS_CONSTANTS = {
  OK: 200,
  CREATE_SUCCESS: 201,
  ERROR_CODE_401: 401,
  SERVER_ERROR: 'E0',
  ERROR: 400,
  SERVER_ERROR_CODE: 500,
};

export const HTTP_STATUS_SUCCESS = [HTTP_STATUS_CONSTANTS.OK, HTTP_STATUS_CONSTANTS.CREATE_SUCCESS];

export const LENGTH_CONSTANTS = {
  DEFAULT_PAGE: 1,
  DEFAULT_TOTAL: 0,
  DEFAULT_TEXTAREA_ROWS: 4,
  MAX_LENGTH_INPUT: 256,
  DEFAULT_PAGE_SIZE: 10,
  MAX_LENGTH_DESCRIPTION: 320,
  DEFAULT_PAGE_SIZE_OPTIONS: ['10', '20', '50'],
};

export const DEFAULT_SEARCH_PARAMS = {
  limit: 10,
  page: 1,
};

export const PAGE_SIZE_OPTIONS = ['10', '20', '50'];
export const PAGE_SIZE_DEFAULT = 10;

export const DEFAULT_SEARCH_DATE_FORMAT = 'DD/MM/YYYY';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DATE_FORMAT = 'dd-MM-yyyy';
export const TIME_FORMAT = 'HH:mm:ss';

export const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);
export const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>? ])[a-zA-Z\d!@#$%^&*()_\-+=<>? ]{8,20}$/,
);
export const urlRegex = new RegExp('^(http|https)://');

export const hashtagRegex = new RegExp('^#[A-Za-z0-9ぁ-んァ-ン一-龯_]+$');

export const ALL_OPTIONS = 'all';

export type SORT_PARAMS = {
  sort?: {
    [x: string]: 'desc' | 'asc' | undefined;
  };
};
export const THOUSAND_VALUE = 1000;
export const MAX_DATE_RANGE = 90;
export const MIN_COLUMNS_DEFAULT = 2;
export const SEARCH_TIME = 2000;
export const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

export const LENGTH_INPUTS = {
  MAX_3: 3,
  MAX_4: 4,
  MAX_15: 15,
  MAX_18: 18,
  MAX_20: 20,
  MAX_24: 24,
  MAX_30: 30,
  MAX_50: 50,
  MAX_150: 150,
  MAX_250: 250,
  MAX_256: 256,
  MAX_300: 300,
  MAX_600: 600,
};

export enum STORAGE_KEY {
  ACCESS_TOKEN = '8_beat_admin_token',
}

export enum USER_STATUS {
  UNVERIFIED = 1,
  ACTIVE = 2,
  BLOCKED = 3,
  PENDING = 4,
  DELETED = 5,
}

export enum VIDEO_STATUS {
  CREATING = 1,
  PRIVATE = 2,
  PUBLIC = 3,
  DELETED = 4,
}

export enum ACCESS_METHOD_TYPE {
  EMAIL = 1,
  FACEBOOK = 2,
  GOOGLE = 3,
  TWITTER = 4,
  APPLE = 5,
  LINE = 6,
}
