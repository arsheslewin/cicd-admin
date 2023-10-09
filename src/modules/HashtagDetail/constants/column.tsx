import { TFunction } from 'react-i18next';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

import AvatarDefault from 'resources/image/avatar-default.svg';
import { getFullUrl } from 'utils';

const columnsCreator = (t: TFunction) => [
  {
    dataIndex: 'creator',
    title: t('column.trending_creator'),
    width: '60%',
    render: (_creator: any, record: any) => (
      <div className='column-user'>
        <Link to={`/user/${record?.id}`} target='_blank' className='column-user'>
          <img
            src={record?.avatar ? getFullUrl(record?.avatar) : AvatarDefault}
            alt=''
            className='column-user--hashtag'
          />
          <div>
            <div className='displayname link'>{record?.displayname}</div>
            <div className='username link'>@{record?.username}</div>
          </div>
        </Link>
      </div>
    ),
  },
  {
    dataIndex: 'totalFollowers',
    title: t('column.total_followers'),
    width: '40%',
    render: (total: string) => <NumericFormat displayType='text' value={total || 0} thousandSeparator />,
  },
];

export default columnsCreator;
