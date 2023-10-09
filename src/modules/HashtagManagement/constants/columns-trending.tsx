import { TFunction } from 'react-i18next';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

import { Button, Tooltip } from 'antd';

import AvatarDefault from 'resources/image/avatar-default.svg';
import IconViewDetail from 'resources/svg/IconViewDetail';
import { getFullUrl } from 'utils';

import { HIGHLIGHT_DISPLAY } from '.';

const columnsTrending = (t: TFunction, onHighlight: Function) => [
  {
    dataIndex: 'tagRank',
    title: t('column.rank'),
    width: '10%',
    sorter: true,
    render: (tagRank: any) => <div className='column-index'>{tagRank}</div>,
  },
  {
    dataIndex: 'hashtag',
    title: t('column.hashtag'),
    width: '20%',
    sorter: true,
    render: (hashtag: string) => <span className='column-ellipsis'>{hashtag}</span>,
  },
  {
    dataIndex: 'totalVideo',
    title: t('column.total_videos'),
    width: '16%',
    sorter: true,
    render: (total: string) => <NumericFormat displayType='text' value={total || 0} thousandSeparator />,
  },
  {
    dataIndex: 'totalView',
    title: t('column.total_views'),
    width: '16%',
    sorter: true,
    render: (total: string) => <NumericFormat displayType='text' value={total || 0} thousandSeparator />,
  },
  {
    dataIndex: 'creators',
    title: t('column.creators'),
    width: '18%',
    render: (creators: any) => (
      <div className='column-creators'>
        {creators?.length === 0 ? (
          <div>No trending creators</div>
        ) : (
          <>
            {creators?.slice(0, 3)?.map((creator: any, index: number) => (
              <Link key={index} to={`/user/${creator?.id}`} target='_blank' className='column-creators__img'>
                <img src={creator?.avatar ? getFullUrl(creator?.avatar) : AvatarDefault} alt='' />
              </Link>
            ))}
          </>
        )}
      </div>
    ),
  },
  {
    dataIndex: 'action',
    title: t('column.actions'),
    width: '20%',
    align: 'center' as any,
    render: (_text: any, record: any) => (
      <div className='column-highlight'>
        {record?.isHighlight === HIGHLIGHT_DISPLAY.YES ? (
          <div className='column-highlight--active'>{t('sidebar.highlighted')}</div>
        ) : (
          <Button className='app-button' onClick={() => onHighlight(record)}>
            {t('common.highlight')}
          </Button>
        )}
        <Tooltip title='View Details'>
          <Link to={`/hashtag/${record?.id}`}>
            <IconViewDetail />
          </Link>
        </Tooltip>
      </div>
    ),
  },
];

export default columnsTrending;
