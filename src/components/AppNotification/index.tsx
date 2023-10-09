import { useState } from 'react';

import { Badge, Dropdown } from 'antd';

import NotificationIcon from 'resources/svg/NotificationIcon';

import { useNotifications } from './hooks/useNotifications';
import { NOTIFICATION_PARAMS, NOTIFICATION_PARAMS_TYPE } from './constants';
import NotificationContent from './NotificationContent';

const AppNotification = () => {
  const [handleVisible, setHandleVisible] = useState(false);
  const [searchParams, setSearchParams] = useState<NOTIFICATION_PARAMS_TYPE>(NOTIFICATION_PARAMS);

  const { isLoading, totalDocs, totalUnread, listNotifications, handleLoadMore, onClickNotification } =
    useNotifications(searchParams, setSearchParams);

  const handleVisibleDropdown = (visible: boolean) => {
    setHandleVisible(visible);
  };
  return (
    <Dropdown
      overlay={
        <NotificationContent
          isLoading={isLoading}
          totalDocs={totalDocs}
          listNotifications={listNotifications}
          handleLoadMore={handleLoadMore}
          onClickNotification={onClickNotification}
        />
      }
      trigger={['click']}
      overlayClassName='notification-dropdown'
      open={handleVisible}
      onOpenChange={handleVisibleDropdown}
      getPopupContainer={(trigger: any) => trigger.parentElement}
    >
      <Badge count={totalUnread} className='notification-icon'>
        <NotificationIcon />
      </Badge>
    </Dropdown>
  );
};

export default AppNotification;
