import { Link } from 'react-router-dom';

import { TFunction } from 'i18next';

import DateTime from 'components/DateTime';

import AvatarDefault from 'resources/image/avatar-default.svg';
import { getFullUrl } from 'utils';

const columns = (t: TFunction, fetchReportDetail: any, onToggleModal: any) => [
  {
    dataIndex: 'no',
    title: t('column.no'),
    width: '3%',
    render: (text: any, record: any, index: any) => <>{index + 1}</>,
  },
  {
    dataIndex: 'createdAt',
    title: t('column.reported_date'),
    width: '8%',
    sorter: true,
    render: (value: any) => (value ? <DateTime value={value} /> : '--'),
  },
  {
    dataIndex: 'id',
    title: t('column.reported_id'),
    width: '8%',
    sorter: true,
    render: (id: string) => <>{`#${id}`}</>,
  },
  {
    dataIndex: 'displayname',
    title: t('column.reporter'),
    width: '12%',
    sorter: true,
    render: (displayname: any, row: any) =>
      row?.reporterUserId ? (
        <div className='column-user'>
          <Link to={`/user/${row?.reporterUserId}`} target='_blank' className='column-user'>
            <img src={row?.avatar ? getFullUrl(row?.avatar) : AvatarDefault} alt='' className='w-10 h-10' />
            <div>
              <div className='displayname'>{row?.displayname}</div>
              <div className='username'>@{row?.username}</div>
            </div>
          </Link>
        </div>
      ) : (
        <div>{row?.guest}</div>
      ),
  },
  {
    dataIndex: 'reason',
    title: t('column.reason'),
    width: '10%',
    render: (reason: string) => <div className='column-ellipsis'>{reason ? reason : '--'}</div>,
  },
  {
    dataIndex: 'content',
    title: t('column.comment'),
    width: '10%',
    render: (content: string) => <div className='column-ellipsis'>{content ? content : '--'}</div>,
  },
  {
    dataIndex: 'content',
    title: t('column.reported_object'),
    width: '7%',
    render: (content: string, raw: any) => <>{raw.userId ? t('column.user') : t('column.video')}</>,
  },
  {
    dataIndex: 'action',
    title: t('column.actions'),
    width: '8%',
    align: 'center' as any,
    render: (action: any) => (
      <div className='column-action' onClick={() => fetchReportDetail(action?.reportId, onToggleModal)}>
        {t('common.view_details')}
      </div>
    ),
  },
];

export default columns;
