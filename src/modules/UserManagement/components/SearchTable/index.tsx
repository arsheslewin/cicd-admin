import { Dispatch, FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import type { SorterResult } from 'antd/lib/table/interface';

import TableCommon from 'components/Table';
import useTable from 'hooks/searchContainer/useTable';
import columns from 'modules/UserManagement/constants/columns';

import { DEFAULT_SEARCH_PARAMS } from 'constant';

interface IProps {
  total?: number;
  isLoading: boolean;
  dataSource?: any;
  sort?: SorterResult<any>;
  searchParams?: any;
  setSort?: Dispatch<any>;
  setSearchParams?: Dispatch<any>;
}

const UserSearchTable: FC<IProps> = ({ total, isLoading, dataSource, searchParams, setSort, setSearchParams }) => {
  const { t } = useTranslation();

  const { handleChangePageParams, handleChangeSortParams } = useTable({
    searchParams,
    setSearchParams,
    setSort,
    defaultSearchParams: DEFAULT_SEARCH_PARAMS,
  });

  return (
    <TableCommon
      current={searchParams?.page || DEFAULT_SEARCH_PARAMS.page}
      pageSize={searchParams?.limit || DEFAULT_SEARCH_PARAMS.limit}
      onChangePagination={handleChangePageParams}
      onChange={handleChangeSortParams}
      total={total || dataSource?.length}
      dataSource={dataSource}
      columns={columns(t)}
      rowKey='index'
      tableLayout='fixed'
      scroll={{ x: 1400 }}
      loading={isLoading}
    />
  );
};

export default memo(UserSearchTable);
