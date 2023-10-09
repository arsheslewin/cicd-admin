import React from 'react';
import { useTranslation } from 'react-i18next';

import { USER_STATUS, VIDEO_STATUS } from 'constant';

interface IProps {
  type?: 'user' | 'video';
  status: number;
}

const StatusLabel: React.FC<IProps> = ({ type = 'user', status }) => {
  const { t } = useTranslation();

  const renderStatusUser = () => {
    switch (status) {
      case USER_STATUS.ACTIVE:
        return <label className='status-label status--active'>{t('status.active')}</label>;
      case USER_STATUS.UNVERIFIED:
        return <label className='status-label status--unverified'>{t('status.unverified')}</label>;
      case USER_STATUS.BLOCKED:
        return <label className='status-label status--blocked'>{t('status.blocked')}</label>;
      case USER_STATUS.DELETED:
        return <label className='status-label status--deleted'>{t('status.deleted')}</label>;
      case USER_STATUS.PENDING:
        return <label className='status-label status--pending'>{t('status.pending')}</label>;
      default:
        return <label className='status-label status--active'>{t('status.active')}</label>;
    }
  };

  const renderStatusVideo = () => {
    switch (status) {
      case VIDEO_STATUS.CREATING:
        return <label className='status-label status--creating'>{t('status.creating')}</label>;
      case VIDEO_STATUS.PRIVATE:
        return <label className='status-label status--private'>{t('status.private')}</label>;
      case VIDEO_STATUS.PUBLIC:
        return <label className='status-label status--public'>{t('status.public')}</label>;
      case VIDEO_STATUS.DELETED:
        return <label className='status-label status--deleted'>{t('status.deleted')}</label>;
      default:
        return <label className='status-label status--pending'>{t('status.creating')}</label>;
    }
  };

  const renderStatus = () => {
    switch (type) {
      case 'user':
        return renderStatusUser();
      case 'video':
        return renderStatusVideo();
      default:
        return renderStatusUser();
    }
  };

  return <>{renderStatus()}</>;
};

export default StatusLabel;
