import type { SortOrder } from 'antd/lib/table/interface';
import { BigNumber } from 'bignumber.js';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';
import isNil from 'lodash/isNil';
import moment from 'moment';

import { trimTrailingZero } from 'components/NumberFormat/utils';

import {
  ALL_OPTIONS,
  DATE_TIME_FORMAT,
  DEFAULT_SEARCH_PARAMS,
  HTTP_STATUS_CONSTANTS,
  MILLISECONDS_PER_DAY,
  urlRegex,
} from 'constant';

export const validateStatus = (status: number): boolean => {
  return status === 200 || status === 201 || status === 400 || status === 401 || status === 500;
};

export const getSortDirection = (order: SortOrder | undefined) => {
  switch (order) {
    case 'descend':
      return -1;
    case 'ascend':
      return 1;
    default:
      return 1;
  }
};

export const convertBackSortDirection = (sortDirection: string) => {
  switch (sortDirection) {
    case 'asc':
      return 'descend';
    case 'desc':
      return 'ascend';
    default:
      return undefined;
  }
};

export const getRowNumber = (index: number, searchParams: Partial<typeof DEFAULT_SEARCH_PARAMS> | null | undefined) => {
  const { limit = DEFAULT_SEARCH_PARAMS.limit, page = DEFAULT_SEARCH_PARAMS.page } = searchParams || {};
  const isNotFirstPage = !!(page > 1);

  return (!isNotFirstPage ? index : index + 1) + (limit * (page - 1) || 1);
};

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const checkSuccessRequest = (response: any) => {
  return response?.status < HTTP_STATUS_CONSTANTS.ERROR;
};

export const checkServerErrorResponse = (response: any) => {
  return response?.status >= HTTP_STATUS_CONSTANTS.SERVER_ERROR_CODE;
};

export const formatNumber = (value: number | string, decimal?: number) => {
  return trimTrailingZero(new BigNumber(value).toFixed(decimal || 0));
};

export const formatInteger = (value: number | string) => {
  if (isNil(value)) return 0;
  return new BigNumber(value).toFormat();
};

export const multipleNumber = (first: string | number | undefined, second: string | number | undefined) => {
  if (isNil(first) || isNil(second)) return 0;
  return new BigNumber(first).multipliedBy(new BigNumber(second)).toString();
};

export const getIpfsLink = (ipfsUrl: string, cid: string) => {
  if (!ipfsUrl || !cid) return '';
  return `${ipfsUrl}/${cid}`;
};

// Custom type guard with predicate
export const isValidStringNumber = (value: number | string | undefined): value is number | string => {
  if (!value && value !== 0) {
    return false;
  }

  return true;
};

export const isLessThan = (first: number | string, second: number | string) => {
  if (!isValidStringNumber(first) || !isValidStringNumber(second)) {
    return true;
  }
  return new BigNumber(first).isLessThan(new BigNumber(second));
};

export const isLessThanOrEqualTo = (first?: number | string, second?: number | string) => {
  if (!isValidStringNumber(first) || !isValidStringNumber(second)) {
    return true;
  }
  return new BigNumber(first).isLessThanOrEqualTo(new BigNumber(second));
};

export const isEqualTo = (first: string | number, second: string | number) => {
  return new BigNumber(first).isEqualTo(new BigNumber(second));
};

export const clearRequestParams = (params?: any) => {
  const newParams = {} as any;
  const cloneParams = { ...params };

  for (const field in cloneParams) {
    if (cloneParams?.[field]?.length === 0) {
      delete cloneParams?.[field];
    }

    if (cloneParams?.[field] || cloneParams?.[field] === 0 || cloneParams?.[field] === false) {
      newParams[field] = cloneParams?.[field];
    }
  }

  return newParams;
};

export const limitMaxLengthNumber =
  (maxLength = 12) =>
  (inputObj: any) => {
    const { value } = inputObj;
    const integerPath = (value || '').split('.')[0];
    return integerPath.length <= maxLength;
  };

export const clearDotValue = (value: string) => {
  const splitValue = value.split('.');
  return splitValue?.[1] ? value : splitValue?.[0];
};

export const stripEmptyValue = <T = {}>(obj: any): T => {
  return Object.entries(obj).reduce((acc, [k, v]) => {
    if (v !== null && v !== undefined && v !== '') {
      return { ...acc, [k]: v };
    }

    return acc;
  }, {} as T);
};

export const stripValues = (obj: any, obj2: any) => {
  return Object.entries(obj).reduce((acc, [k, v]) => {
    if (!(k in obj2)) {
      return { ...acc, [k]: v };
    }

    return acc;
  }, {});
};

export const stripAllOption = (obj: any, keys: string[]) => {
  const cloneObj = { ...obj };
  for (const key of keys) {
    if (key in cloneObj && cloneObj[key] === ALL_OPTIONS) {
      delete cloneObj[key];
    }
  }

  return cloneObj;
};

export const getSearchDateRange = (searchQuery: any, dateFromKey: string, dateToKey: string) => {
  const { [dateFromKey]: dateFrom, [dateToKey]: dateTo } = searchQuery;

  searchQuery[dateFromKey] = dateFrom && startOfDay(dateFrom);
  searchQuery[dateToKey] = dateTo && endOfDay(dateTo);

  return searchQuery;
};

export const isExternalLink = (link: string) => {
  const regex = /^https?:\/\//;

  return regex.test(link);
};

export const getColumnsSetting = <T>(columnsData: T[]) => {
  const filteredColumn = columnsData.filter((value: T) => !!value);

  const firstColumn = filteredColumn.slice(0, Math.ceil(filteredColumn.length / 2));
  const secondColumn = filteredColumn.slice(Math.ceil(filteredColumn.length / 2), filteredColumn.length);

  return { firstColumn, secondColumn };
};

export const getFullUrl = (url: any) => {
  const match = urlRegex.test(url);

  if (match) return url;

  return `${import.meta.env.VITE_CLOUDFRONT}${url}`;
};

export const numberFormatter = (num: number) => {
  if (!num) return 0;
  if (num < 1e3) return num;
  if (num >= 1e3 && num < 1e6) return +(num / 1e3).toFixed(1) + 'K';
  if (num >= 1e6 && num < 1e9) return +(num / 1e6).toFixed(1) + 'M';
  if (num >= 1e9 && num < 1e12) return +(num / 1e9).toFixed(1) + 'B';
  if (num >= 1e12) return +(num / 1e12).toFixed(1) + 'T';
};

export const convertRangeDateToUTC = (dates: any[]) => {
  const startTime = dates && dates[0] && moment(dates[0]).startOf('days').utc().format(DATE_TIME_FORMAT);
  const endTime = dates && dates[1] && moment(dates[1])?.endOf('days').utc().format(DATE_TIME_FORMAT);

  return { startTime, endTime };
};

export const getRangeDateFromNow = (range: number, timeUnit?: number) => {
  const yesterdayTime = new Date().getTime() - MILLISECONDS_PER_DAY;
  const startTime = new Date(yesterdayTime - (range - 1) * (timeUnit || MILLISECONDS_PER_DAY));
  const endTime = new Date(yesterdayTime);

  return convertRangeDateToUTC([startTime, endTime]);
};
