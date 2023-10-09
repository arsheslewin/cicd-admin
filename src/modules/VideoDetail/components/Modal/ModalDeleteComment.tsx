import React from 'react';
import { useTranslation } from 'react-i18next';

import showMessage from 'components/Message';
import ModalConfirm from 'components/Modal/ModalConfirm';
import { DELETE_COMMENT_STATE } from 'modules/VideoDetail/constants';
import useFetchVideo from 'modules/VideoDetail/hooks/useFetchVideo';
import { useVideoActions } from 'store/video-management/selector';

import { TYPE_CONSTANTS } from 'constant';

interface IProps {
  comment: any;
  open: boolean;
  onToggleModal: () => void;
}

const ModalDeleteComment: React.FC<IProps> = ({ comment, open, onToggleModal }) => {
  const { t } = useTranslation();
  const { deleteComment } = useFetchVideo();
  const { setDeleteComment } = useVideoActions();

  const onDeleteComment = async () => {
    try {
      const data = await deleteComment(comment?.id);
      if (data) {
        setDeleteComment(DELETE_COMMENT_STATE.DELETED);
        showMessage(TYPE_CONSTANTS.MESSAGE.SUCCESS, 'message.S14');
      }
    } catch (error) {
      console.log('err', error);
      setDeleteComment(DELETE_COMMENT_STATE.NOT_DELETE);
    } finally {
      onToggleModal();
    }
  };

  return (
    <ModalConfirm
      open={open}
      onClose={onToggleModal}
      onConfirm={onDeleteComment}
      title={t('modal.delete_comment')}
      description={t('modal.delete_comment_desc', { name: comment?.user?.displayname })}
      confirmTextButton={t('common.delete')}
    />
  );
};

export default ModalDeleteComment;
