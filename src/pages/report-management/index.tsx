import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';

import { Typography } from 'antd';

import SearchContainer from 'components/SearchContainer';
import { useModal } from 'hooks/useModal';
import ModalReportDetail from 'modules/ReportManagement/components/ModaDetail';
import SearchGroup from 'modules/ReportManagement/components/SearchGroup';
import SearchTable from 'modules/ReportManagement/components/SearchTable';
import useFetchDetailReport from 'modules/ReportManagement/hooks/useFetchDetailReport';
import useGetReportList from 'modules/ReportManagement/hooks/useGetReportList';

import { DEFAULT_SEARCH_PARAMS } from 'constant';

const { Title } = Typography;

interface IProps {
  creatorId?: string;
}

const ReportManagement: FC<IProps> = ({ creatorId }) => {
  const { t } = useTranslation();
  const [sort, setSort] = useState({});
  const { open, onToggleModal } = useModal();

  const [searchParams, setSearchParams] = useState({ ...DEFAULT_SEARCH_PARAMS, userId: creatorId });

  const { total, reportList, isLoading } = useGetReportList(searchParams);
  const { report, fetchReportDetail } = useFetchDetailReport();

  const dataSource = useMemo(
    () =>
      reportList?.map((item: any) => ({
        ...item,
        creator: {
          avatar: item?.avatar,
          displayname: item?.displayname,
          username: item?.username,
        },
        action: {
          reportId: item?.id,
        },
      })),
    [reportList],
  );

  return (
    <div className='video-management'>
      {!creatorId && <Title level={1}>{t('common.report_management')}</Title>}
      <div className='container'>
        {creatorId && <div className='h5 color-black mb-12'>{t('common.report_list')}</div>}
        <SearchContainer sort={sort} searchParams={searchParams} setSort={setSort} setSearchParams={setSearchParams}>
          <SearchGroup />
          <span>
            <Title level={5}>
              {t('common.total_report')}: <NumericFormat displayType='text' value={total} thousandSeparator />
            </Title>
          </span>
          <SearchTable
            hideCreator={!!creatorId}
            total={total}
            dataSource={dataSource}
            isLoading={isLoading}
            fetchReportDetail={fetchReportDetail}
            onToggleModal={onToggleModal}
          />
        </SearchContainer>
        {open && <ModalReportDetail open={open} onClose={onToggleModal} report={report} />}
      </div>
    </div>
  );
};

export default ReportManagement;
