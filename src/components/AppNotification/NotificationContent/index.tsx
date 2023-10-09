import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';
import { format, parseISO } from 'date-fns';

import { DATE_TIME_FORMAT } from 'constant';
import NoData from 'resources/svg/NoData';
import { isExternalLink } from 'utils';

import { INotification, MAX_UNREAD_NOTIFICATION, NOTIFICATION_CONTENT_TYPE } from '../constants';
const { Paragraph } = Typography;

const renderNotificationContent = (notification: INotification) => {
  const { type } = notification || {};

  switch (type) {
    // case NOTIFICATION_TYPE.WHITELIST_ROUND_OPENED: {
    //   return {
    //     route: ROUTE_URL.MARKETPLACE_DROP,
    //     target: '_blank',
    //     content: <Trans i18nKey='notification.P1' />,
    //   };
    // }

    default:
      return {
        route: '#',
        content: '',
      };
  }
};

const NotificationContent: FC<NOTIFICATION_CONTENT_TYPE> = ({
  totalDocs,
  listNotifications,
  handleLoadMore,
  onClickNotification,
}) => {
  const { t } = useTranslation();

  return (
    <div className='notification-card'>
      <p className='title'>
        {t('notification.title')}&nbsp;(
        {totalDocs > MAX_UNREAD_NOTIFICATION ? `${MAX_UNREAD_NOTIFICATION}+` : totalDocs})
      </p>
      {totalDocs > 0 ? (
        <InfiniteScroll
          dataLength={listNotifications?.length}
          next={handleLoadMore}
          hasMore={listNotifications?.length < totalDocs}
          loader={null}
          height='100%'
        >
          {listNotifications?.map((notification) => {
            const { createdAt, _id } = notification || {};
            const { content, route } = renderNotificationContent(notification);
            return (
              <div className='wrapper' key={_id} onClick={() => onClickNotification(notification)}>
                <Link to={route} {...(isExternalLink(route) && { target: '_blank', rel: 'noreferrer' })}>
                  <div className='group'>
                    <div className='content'>
                      <div className='text-wrapper'>
                        <Paragraph
                          className='text'
                          ellipsis={{
                            rows: 2,
                            tooltip: true,
                          }}
                        >
                          {content}
                        </Paragraph>
                        <p className='sub-text'>
                          <span>{createdAt ? format(parseISO(createdAt), DATE_TIME_FORMAT) : '--'}</span>
                        </p>
                      </div>
                    </div>
                    <div className='effect'>{!notification?.isRead ? <div className='dot' /> : null}</div>
                  </div>
                </Link>
              </div>
            );
          })}
        </InfiniteScroll>
      ) : (
        <div className='notification-empty-text'>
          <NoData height={48} width={48} />
          <span>{t('notification.no_data_title')}</span>
          <span>{t('notification.no_data_content')}</span>
        </div>
      )}
    </div>
  );
};

export default NotificationContent;
