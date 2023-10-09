import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

import { TFunction } from 'i18next';

import DateTime from 'components/DateTime';
import StatusLabel from 'components/StatusLabel';

import AvatarDefault from 'resources/image/avatar-default.svg';
import IconRedFlag from 'resources/svg/IconRedFlag';
import { getFullUrl } from 'utils';

const columns = (t: TFunction) => [
  {
    dataIndex: 'totalReport',
    width: '4%',
    align: 'center' as any,
    render: (total: any) => total > 0 && <IconRedFlag />,
  },
  {
    dataIndex: 'no',
    title: t('column.no'),
    width: '3%',
    render: (text: any, record: any, index: any) => <>{index + 1}</>,
  },
  {
    dataIndex: 'createdAt',
    title: t('column.created_date'),
    width: '8%',
    sorter: true,
    render: (value: any) => (value ? <DateTime value={value} /> : '--'),
  },
  {
    dataIndex: 'creator',
    title: t('column.creator'),
    width: '17%',
    sorter: true,
    render: (creator: any) => (
      <div className='column-user'>
        <img src={creator?.avatar ? getFullUrl(creator?.avatar) : AvatarDefault} alt='' className='w-10 h-10' />
        <div>
          <div className='displayname'>{creator?.displayname}</div>
          {creator?.username && <div className='username'>@{creator?.username}</div>}
        </div>
      </div>
    ),
  },
  {
    dataIndex: 'title',
    title: t('column.video'),
    width: '18%',
    sorter: true,
    render: (email: string) => <div className='column-ellipsis'>{email ? email : '--'}</div>,
  },
  {
    dataIndex: 'view',
    title: t('column.total_views'),
    width: '8%',
    sorter: true,
    render: (total: string) => <NumericFormat displayType='text' value={total || 0} thousandSeparator />,
  },
  {
    dataIndex: 'totalLike',
    title: t('column.total_likes'),
    width: '8%',
    sorter: true,
    render: (total: string) => <NumericFormat displayType='text' value={total || 0} thousandSeparator />,
  },
  {
    dataIndex: 'totalComment',
    title: t('column.total_comments'),
    width: '8%',
    sorter: true,
    render: (total: string) => <NumericFormat displayType='text' value={total || 0} thousandSeparator />,
  },
  {
    dataIndex: 'videoStatus',
    title: t('column.status'),
    width: '6%',
    render: (value: any) => <StatusLabel type='video' status={value} />,
  },
  {
    dataIndex: 'action',
    title: t('column.actions'),
    width: '8%',
    align: 'center' as any,
    render: (action: any) => (
      <Link to={`/video/${action?.videoId}`}>
        <div className='column-action'>{t('common.view_details')}</div>
      </Link>
    ),
  },
];

export default columns;
