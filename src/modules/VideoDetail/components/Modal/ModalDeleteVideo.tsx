import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ROUTE_URL } from 'routes';

import showMessage from 'components/Message';
import ModalConfirm from 'components/Modal/ModalConfirm';
import useFetchVideo from 'modules/VideoDetail/hooks/useFetchVideo';
import useVideoStore from 'store/video-management/useVideoStore';

import { TYPE_CONSTANTS } from 'constant';

interface IProps {
  open: boolean;
  onToggleModal: () => void;
}

const ModalDeleteVideo: React.FC<IProps> = ({ open, onToggleModal }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { detail: video } = useVideoStore();
  const { deleteVideo, isLoading } = useFetchVideo();

  const onDeleteVideo = async () => {
    try {
      const data = await deleteVideo(video?.id);
      if (data) {
        navigate(ROUTE_URL.VIDEOS);
        showMessage(TYPE_CONSTANTS.MESSAGE.SUCCESS, 'message.S18');
      }
    } catch (error) {
      console.log('err', error);
    } finally {
      onToggleModal();
    }
  };

  return (
    <ModalConfirm
      open={open}
      onClose={onToggleModal}
      onConfirm={onDeleteVideo}
      title={t('modal.delete_video')}
      description={t('modal.delete_video_desc', { name: video?.title })}
      confirmTextButton={t('common.delete')}
      loading={isLoading}
    />
  );
};

export default ModalDeleteVideo;
