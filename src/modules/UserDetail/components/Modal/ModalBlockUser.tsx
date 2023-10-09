import React from 'react';
import { useTranslation } from 'react-i18next';

import showMessage from 'components/Message';
import ModalConfirm from 'components/Modal/ModalConfirm';
import useFetchUser from 'modules/UserDetail/hooks/useFetchUser';
import useUserStore from 'store/user-management/useUserStore';

import { TYPE_CONSTANTS, USER_STATUS } from 'constant';

interface IProps {
  open: boolean;
  onToggleModal: () => void;
}

const ModalBlockUser: React.FC<IProps> = ({ open, onToggleModal }) => {
  const { t } = useTranslation();
  const { detail } = useUserStore();
  const { fetchUserDetail: refetchDetail, blockUser } = useFetchUser();
  const isBlocked = USER_STATUS.BLOCKED === detail?.userStatus;

  const onBlockUser = async () => {
    if (detail?.id) {
      try {
        await blockUser(detail?.id);
        await refetchDetail(detail?.id);

        showMessage(TYPE_CONSTANTS.MESSAGE.SUCCESS, isBlocked ? 'message.S12' : 'message.S11');
      } catch (error) {
        console.log('err', error);
      } finally {
        onToggleModal();
      }
    }
  };

  return (
    <ModalConfirm
      open={open}
      onClose={onToggleModal}
      onConfirm={onBlockUser}
      title={isBlocked ? t('modal.unblock_user') : t('modal.block_user')}
      description={
        isBlocked
          ? t('modal.unblock_user_desc', { name: detail?.displayname })
          : t('modal.block_user_desc', { name: detail?.displayname })
      }
      confirmTextButton={isBlocked ? t('common.unblock') : t('common.block')}
    />
  );
};

export default ModalBlockUser;
