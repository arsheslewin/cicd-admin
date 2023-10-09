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
    title: t('column.joined_date'),
    width: '8%',
    sorter: true,
    render: (value: any) => (value ? <DateTime value={value} /> : '--'),
  },
  {
    dataIndex: 'lastLogin',
    title: t('column.last_login'),
    width: '8%',
    sorter: true,
    render: (value: any) => (value ? <DateTime value={value} /> : '--'),
  },
  {
    dataIndex: 'user',
    title: t('column.user'),
    width: '18%',
    sorter: true,
    render: (user: any) => (
      <div className='column-user'>
        <img src={user?.avatar ? getFullUrl(user?.avatar) : AvatarDefault} alt='' className='w-10 h-10' />
        <div>
          <div className='displayname'>{user?.displayname}</div>
          <div className='username'>@{user?.username}</div>
        </div>
      </div>
    ),
  },
  {
    dataIndex: 'email',
    title: t('column.email'),
    width: '17%',
    sorter: true,
    render: (email: string) => <div className='column-ellipsis'>{email ? email : '--'}</div>,
  },
  {
    dataIndex: 'totalVideos',
    title: t('column.total_videos'),
    width: '7%',
    sorter: true,
    render: (total: string) => <NumericFormat displayType='text' value={total || 0} thousandSeparator />,
  },
  {
    dataIndex: 'totalLikes',
    title: t('column.total_likes'),
    width: '7%',
    sorter: true,
    render: (total: string) => <NumericFormat displayType='text' value={total || 0} thousandSeparator />,
  },
  {
    dataIndex: 'totalFollowers',
    title: t('column.total_followers'),
    width: '7%',
    sorter: true,
    render: (total: string) => <NumericFormat displayType='text' value={total || 0} thousandSeparator />,
  },
  {
    dataIndex: 'totalFollowings',
    title: t('column.total_following'),
    width: '7%',
    sorter: true,
    render: (total: string) => <NumericFormat displayType='text' value={total || 0} thousandSeparator />,
  },
  {
    dataIndex: 'userStatus',
    title: t('column.status'),
    width: '7%',
    align: 'center' as any,
    render: (value: any) => <StatusLabel type='user' status={value} />,
  },
  {
    dataIndex: 'action',
    title: t('column.actions'),
    width: '7%',
    align: 'center' as any,
    render: (action: any) => (
      <Link to={`/user/${action?.userId}`}>
        <div className='column-action'>{t('common.view_details')}</div>
      </Link>
    ),
  },
];

export default columns;
