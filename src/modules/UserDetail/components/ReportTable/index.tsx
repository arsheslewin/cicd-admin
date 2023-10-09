import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';

import { Table } from 'antd';
import { throttle } from 'lodash';

import { useModal } from 'hooks/useModal';
import ModalReportDetail from 'modules/ReportManagement/components/ModaDetail';
import { REPORTED_OBJECTS } from 'modules/ReportManagement/constants';
import useFetchDetailReport from 'modules/ReportManagement/hooks/useFetchDetailReport';
import columnsReport from 'modules/UserDetail/constants/columns-report';
import useFetchReport from 'modules/UserDetail/hooks/useFetchReport';

import { getSortDirection } from 'utils';

interface IProps {
  type?: REPORTED_OBJECTS.USER | REPORTED_OBJECTS.VIDEO;
  detail?: any;
}

const DEFAULT_PARAMS = {
  limit: 10,
  offset: 0,
};

const ReportTable: React.FC<IProps> = ({ type, detail }) => {
  const { t } = useTranslation();
  const tableRef = useRef<any>(null);
  const scrollParent = tableRef?.current?.querySelector('.ant-table-body');

  const defaultParams =
    type === REPORTED_OBJECTS.USER
      ? { ...DEFAULT_PARAMS, userId: detail?.id }
      : { ...DEFAULT_PARAMS, videoId: detail?.id };

  const [searchParams, setSearchParams] = useState<any>(defaultParams);
  const [list, setList] = useState<any>([]);
  const [total, setTotal] = useState(0);

  const { open, onToggleModal } = useModal();

  const { isLoading, fetchReport } = useFetchReport();
  const { report: reportDetail, fetchReportDetail } = useFetchDetailReport();

  const dataSource = useMemo(
    () =>
      list?.map((item: any) => ({
        ...item,
        displayname: {
          id: item?.reporterUserId,
          avatar: item?.avatar,
          displayname: item?.displayname,
          username: item?.username,
          guest: item?.guest,
        },
        action: {
          reportId: item?.id,
        },
      })),
    [list],
  );

  const handleFetchReport = async (params: any) => {
    try {
      const response = await fetchReport(params);
      if (response) {
        const { list, total } = response || {};
        setList((prev: any) => [...prev, ...list]);
        setTotal(total);
      }
    } catch (error) {
      console.log('err', error);
    }
  };

  const checkLoadMore = throttle((e: any) => {
    const clientHeight = e?.target?.clientHeight;
    const scrollHeight = e?.target?.scrollHeight;
    const scrollTop = e?.target?.scrollTop;
    const isNearTheBottom = clientHeight + scrollTop >= (9 / 10) * scrollHeight;

    if (isNearTheBottom && total > list?.length) {
      //load more data
      setSearchParams((prev: any) => ({ ...prev, offset: prev?.offset + DEFAULT_PARAMS.limit }));
    }
  }, 1000);

  const onTableChange = (_pagination: any, _filters: any, sorter: any) => {
    //clear data
    setList([]);
    setTotal(0);

    const { order, field } = sorter || {};

    if (!order) {
      setSearchParams(defaultParams);
      return;
    }

    setSearchParams({
      ...defaultParams,
      sortField: field,
      sortType: getSortDirection(order),
    });
  };

  useEffect(() => {
    if (searchParams) {
      handleFetchReport(searchParams);
    }
  }, [JSON.stringify(searchParams)]);

  useEffect(() => {
    if (scrollParent) {
      scrollParent?.addEventListener('scroll', checkLoadMore);
    }

    return () => {
      scrollParent?.removeEventListener('scroll', checkLoadMore);
      checkLoadMore.cancel();
    };
  }, [scrollParent, dataSource, searchParams]);

  return (
    <div className='report-table'>
      <div className='report-table__object'>{type === REPORTED_OBJECTS.USER ? detail?.displayname : detail?.title}</div>
      <div className='report-table__total'>
        {t('column.total_reports')}: <NumericFormat displayType='text' value={total} thousandSeparator />
      </div>
      <Table
        ref={tableRef}
        pagination={false}
        dataSource={dataSource}
        columns={columnsReport(t, fetchReportDetail, onToggleModal)}
        onChange={onTableChange}
        scroll={{ y: 360 }}
        loading={isLoading}
        showSorterTooltip={false}
      />
      {open && <ModalReportDetail open={open} onClose={onToggleModal} report={reportDetail} />}
    </div>
  );
};

export default ReportTable;
