import React from 'react';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import ModalComponent from 'components/Modal';
import StatusLabel from 'components/StatusLabel';
import { useModal } from 'hooks/useModal';
import { REPORTED_OBJECTS } from 'modules/ReportManagement/constants';
import useUserStore from 'store/user-management/useUserStore';

import { ACCESS_METHOD_TYPE, DATE_FORMAT, TIME_FORMAT } from 'constant';
import AvatarDefault from 'resources/image/avatar-default.svg';
import { getFullUrl } from 'utils';

import ReportTable from '../ReportTable';

const UserInfo: React.FC = () => {
  const { t } = useTranslation();
  const { detail } = useUserStore();

  const { open, onToggleModal } = useModal();

  const accessMethod = detail?.registerFrom ?? ACCESS_METHOD_TYPE.EMAIL;
  const i18nKeyAccessMethod = ACCESS_METHOD_TYPE[accessMethod]?.toLowerCase();

  return (
    <div className='section-user-info'>
      <img src={detail?.avatar ? getFullUrl(detail?.avatar) : AvatarDefault} alt='' className='user__avatar' />
      <div className='w-full'>
        <div className='user__displayname'>
          <span>{detail?.displayname}</span>
          <StatusLabel type='user' status={detail?.userStatus} />
        </div>
        <div className='user__username'>
          <span>@{detail?.username}</span>
          {detail?.email && <span>{detail?.email}</span>}
        </div>
        <div className='user__date'>
          <span>{t('common.joined_at')}</span>
          <span>{detail?.createdAt && format(parseISO(detail?.createdAt), DATE_FORMAT)}</span>
          <span>{detail?.createdAt && format(parseISO(detail?.createdAt), TIME_FORMAT)}</span>
        </div>
        <div className='user__date'>
          <span>{t('common.last_login_at')}</span>
          <span>{detail?.lastLogin && format(parseISO(detail?.lastLogin), DATE_FORMAT)}</span>
          <span>{detail?.lastLogin && format(parseISO(detail?.lastLogin), TIME_FORMAT)}</span>
        </div>
        <div className='user__list-other'>
          <div className='other-item'>
            <span>{t('common.phone_number')}</span>
            <span>{detail?.phone || '--'}</span>
          </div>
          <div className='other-item'>
            <span>{t('common.access_method')}</span>
            <span>{t(`common.${i18nKeyAccessMethod}`)}</span>
          </div>
          <div className='other-item'>
            <span>{t('column.total_videos')}</span>
            <NumericFormat displayType='text' value={detail?.totalVideos || 0} thousandSeparator />
          </div>
          <div className='other-item'>
            <span>{t('column.total_likes')}</span>
            <NumericFormat displayType='text' value={detail?.totalLikes || 0} thousandSeparator />
          </div>
          <div className='other-item'>
            <span>{t('column.total_followers')}</span>
            <NumericFormat displayType='text' value={detail?.totalFollowers || 0} thousandSeparator />
          </div>
          <div className='other-item'>
            <span>{t('column.total_following')}</span>
            <NumericFormat displayType='text' value={detail?.totalFollowings || 0} thousandSeparator />
          </div>
          <div className='other-item'>
            <span>{t('column.total_reports')}</span>
            <NumericFormat
              displayType='text'
              value={detail?.totalReport || 0}
              thousandSeparator
              onClick={onToggleModal}
            />
          </div>
        </div>
      </div>
      <ModalComponent
        title={t('modal.user_reports')}
        open={open}
        onClose={onToggleModal}
        width={640}
        wrapClassName='modal-report'
      >
        <ReportTable type={REPORTED_OBJECTS.USER} detail={detail} />
      </ModalComponent>
    </div>
  );
};

export default UserInfo;
