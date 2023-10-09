import { Dispatch, useMemo } from 'react';

import type { TablePaginationConfig } from 'antd';
import type { FilterValue, SorterResult, SortOrder } from 'antd/lib/table/interface';
import isEmpty from 'lodash/isEmpty';

import { DEFAULT_SEARCH_PARAMS } from 'constant/index';
import { getSortDirection } from 'utils';

export const stripEmptyValue = (obj: any) => {
  return Object.entries(obj).reduce((acc, [k, v]) => {
    if (v !== null && v !== undefined && v !== '' && !(Array.isArray(v) && isEmpty(v))) {
      return { ...acc, [k]: v };
    }

    return acc;
  }, {});
};

export const stripValues = (obj: any, obj2: any) => {
  return Object.entries(obj).reduce((acc, [k, v]) => {
    if (!(k in obj2)) {
      return { ...acc, [k]: v };
    }

    return acc;
  }, {});
};

const useTable = ({
  searchParams,
  setSearchParams,
  setSort,
  defaultSearchParams,
}: {
  searchParams?: any;
  setSearchParams?: Dispatch<any>;
  setSort?: Dispatch<any>;
  defaultSearchParams: any;
}) => {
  const handleChangePageParams = (page: string | number, pageSize: number) => {
    if (setSearchParams) {
      setSearchParams((prevState: any) => {
        let selectedPage;

        //If doesn't change pageSize before. And previous pageSize equal current pageSize => doesnot change page size => Not reset to first page
        if (!prevState?.limit || pageSize === prevState?.limit) selectedPage = Number(page);
        else if (pageSize !== prevState?.limit) {
          selectedPage = defaultSearchParams?.page;
        }

        return {
          ...prevState,
          limit: pageSize,
          page: selectedPage,
        };
      });
    }
  };

  const handleChangeSortParams = (
    _pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
  ) => {
    if (Array.isArray(sorter)) return;

    const { order, field } = (sorter as { order: SortOrder; field: string }) || {};

    setSort && setSort(sorter);

    if (setSearchParams) {
      if (order) {
        setSearchParams((prevState: any) => ({
          ...defaultSearchParams,
          ...prevState,
          sortField: field,
          sortType: getSortDirection(order),
        }));
      } else {
        setSearchParams((prevState: any) => {
          delete prevState.sortField;
          delete prevState.sortType;
          return { ...prevState };
        });
      }
    }
  };

  const isSearching = useMemo(
    () =>
      !!searchParams && !isEmpty(stripEmptyValue(stripValues(searchParams, { ...DEFAULT_SEARCH_PARAMS, sort: null }))),
    [searchParams],
  );

  return {
    handleChangePageParams,
    handleChangeSortParams,
    isSearching,
  };
};

export default useTable;
