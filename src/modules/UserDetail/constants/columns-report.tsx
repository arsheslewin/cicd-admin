import { TFunction } from 'react-i18next';
import { Link } from 'react-router-dom';

import DateTime from 'components/DateTime';

import AvatarDefault from 'resources/image/avatar-default.svg';
import { getFullUrl } from 'utils';

const columnsReport = (t: TFunction, fetchReportDetail: Function, onToggleModal: Function) => [
  {
    dataIndex: 'no',
    title: t('column.no'),
    width: '15%',
    render: (text: any, record: any, index: any) => <>{index + 1}</>,
  },
  {
    dataIndex: 'createdAt',
    title: t('column.reported_date'),
    width: '20%',
    sorter: true,
    render: (value: any) => <DateTime value={value} />,
  },
  {
    dataIndex: 'displayname',
    title: t('column.user'),
    width: '45%',
    sorter: true,
    render: (user: any) => {
      if (user?.guest) {
        return <span>{user?.guest}</span>;
      }

      return (
        <Link to={`/user/${user?.id}`} target='_blank'>
          <div className='column-user'>
            <img src={user?.avatar ? getFullUrl(user?.avatar) : AvatarDefault} alt='' className='w-10 h-10' />
            <div>
              <div className='displayname'>{user?.displayname}</div>
              <div className='username'>@{user?.username}</div>
            </div>
          </div>
        </Link>
      );
    },
  },
  {
    dataIndex: 'action',
    title: t('column.actions'),
    width: '20%',
    align: 'center' as any,
    render: (action: any) => (
      <div className='column-action' onClick={() => fetchReportDetail(action?.reportId, onToggleModal)}>
        {t('common.view_details')}
      </div>
    ),
  },
];

export default columnsReport;
