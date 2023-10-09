import { TFunction } from 'react-i18next';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

import { Switch, Tooltip, Typography } from 'antd';

import IconCopy from 'resources/svg/IconCopy';
import IconDeleteOutline from 'resources/svg/IconDeleteOutline';
import IconViewDetail from 'resources/svg/IconViewDetail';

import { HIGHLIGHT_DISPLAY, KEY_DRAG_ROW_TABLE } from '.';

const { Paragraph } = Typography;

const columnsHighlighted = (t: TFunction, handleDisplay: Function, handleDelete: Function) => [
  {
    dataIndex: 'no',
    width: '5%',
    align: 'center' as any,
    render: (_text: any, _record: any, index: any) => <div className='column-index'>{index + 1}</div>,
  },
  {
    key: KEY_DRAG_ROW_TABLE,
    width: '4%',
    align: 'center' as any,
  },
  {
    dataIndex: 'hashtag',
    width: '20%',
    render: (hashtag: string) => (
      <div className='column-label'>
        <div>{t('column.hashtag')}</div>
        <Paragraph copyable={{ icon: <IconCopy />, text: hashtag }}>
          <span>{hashtag}</span>
        </Paragraph>
      </div>
    ),
  },
  {
    dataIndex: 'userId',
    width: '12%',
    render: (userId: string) => {
      const isCreatedByAdmin = !!userId;
      return (
        <div className='column-label'>
          <div>{t('column.created_by')}</div>
          <div>{isCreatedByAdmin ? t('common.admin') : t('common.user')}</div>
        </div>
      );
    },
  },
  {
    dataIndex: 'totalVideo',
    width: '12%',
    render: (total: any) => (
      <div className='column-label'>
        <div>{t('column.total_videos')}</div>
        <NumericFormat displayType='text' value={total || 0} thousandSeparator />
      </div>
    ),
  },
  {
    dataIndex: 'totalView',
    width: '12%',
    render: (total: any) => (
      <div className='column-label'>
        <div>{t('column.total_views')}</div>
        <NumericFormat displayType='text' value={total || 0} thousandSeparator />
      </div>
    ),
  },
  {
    dataIndex: 'isDisplay',
    width: '7%',
    render: (isDisplay: any, record: any) => (
      <div className='column-label'>
        <div>{t('column.display')}</div>
        <div>
          <Switch checked={Number(isDisplay) === HIGHLIGHT_DISPLAY.YES} onClick={handleDisplay(record?.id)} />
        </div>
      </div>
    ),
  },
  {
    dataIndex: 'action',
    width: '6%',
    align: 'center' as any,
    render: (_text: any, record: any) => (
      <div className='column-label'>
        <div>{t('column.actions')}</div>
        <div className='flex justify-center gap-3'>
          <Tooltip title='Remove Highlighted'>
            <div className='cursor-pointer' onClick={() => handleDelete(record?.id)}>
              <IconDeleteOutline />
            </div>
          </Tooltip>
          <Tooltip title='View Details'>
            <Link to={`/hashtag/${record?.id}`}>
              <IconViewDetail />
            </Link>
          </Tooltip>
        </div>
      </div>
    ),
  },
];

export default columnsHighlighted;
