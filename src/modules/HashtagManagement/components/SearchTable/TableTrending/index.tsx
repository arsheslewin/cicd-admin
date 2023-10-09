import React, { Dispatch, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import TableCommon from 'components/Table';
import useTable from 'hooks/searchContainer/useTable';
import { useModal } from 'hooks/useModal';
import { HIGHLIGHT_DISPLAY } from 'modules/HashtagManagement/constants';
import columnsTrending from 'modules/HashtagManagement/constants/columns-trending';
import useHashtagStore from 'store/hashtag-management/useHashtagStore';

import { DEFAULT_SEARCH_PARAMS } from 'constant';

import ModalHighlight from '../../Modal/ModalHighlight';

interface IProps {
  isLoading: boolean;
  searchParams?: any;
  setSearchParams?: Dispatch<any>;
  setSort?: Dispatch<any>;
}

const TableTrending: React.FC<IProps> = ({ isLoading, searchParams, setSearchParams, setSort }) => {
  const { t } = useTranslation();

  const { trending } = useHashtagStore();
  const { list, total } = trending || {};

  const [dataSource, setDataSource] = useState<any>([]);
  const [hashtag, setHashtag] = useState({});

  const { open, onToggleModal } = useModal();

  const onHighlight = (record: any) => {
    setHashtag(record);
    onToggleModal();
  };

  const onUpdateTrending = (id: string) => {
    const newList = dataSource?.map((item: any) => {
      if (item?.id !== id) return item;

      return {
        ...item,
        isHighlight: HIGHLIGHT_DISPLAY.YES,
      };
    });

    setDataSource(newList);
  };

  const { handleChangePageParams, handleChangeSortParams } = useTable({
    searchParams,
    setSearchParams,
    setSort,
    defaultSearchParams: DEFAULT_SEARCH_PARAMS,
  });

  useEffect(() => {
    setDataSource(list);
  }, [list]);

  return (
    <>
      <TableCommon
        current={searchParams?.page || DEFAULT_SEARCH_PARAMS.page}
        pageSize={searchParams?.limit || DEFAULT_SEARCH_PARAMS.limit}
        onChangePagination={handleChangePageParams}
        onChange={handleChangeSortParams}
        total={total || dataSource?.length}
        dataSource={dataSource}
        columns={columnsTrending(t, onHighlight)}
        rowKey='index'
        tableLayout='fixed'
        scroll={{ x: 1000 }}
        loading={isLoading}
      />
      <ModalHighlight open={open} onToggleModal={onToggleModal} data={hashtag} onUpdateTrending={onUpdateTrending} />
    </>
  );
};

export default TableTrending;
