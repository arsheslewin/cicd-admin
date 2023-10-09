import React from 'react';
import { useTranslation } from 'react-i18next';

import showMessage from 'components/Message';
import ModalConfirm from 'components/Modal/ModalConfirm';
import useFetchVideo from 'modules/VideoDetail/hooks/useFetchVideo';
import useVideoStore from 'store/video-management/useVideoStore';

import { TYPE_CONSTANTS, VIDEO_STATUS } from 'constant';

interface IProps {
  open: boolean;
  onToggleModal: () => void;
}

const ModalPublishVideo: React.FC<IProps> = ({ open, onToggleModal }) => {
  const { t } = useTranslation();
  const { detail } = useVideoStore();
  const { fetchVideoDetail: refetchDetail, publishVideo } = useFetchVideo();

  const isPublished = detail?.videoStatus === VIDEO_STATUS.PUBLIC;

  const onPublish = async () => {
    if (detail?.id) {
      try {
        await publishVideo(detail?.id);
        await refetchDetail(detail?.id);
        showMessage(TYPE_CONSTANTS.MESSAGE.SUCCESS, isPublished ? 'message.S17' : 'message.S16');
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
      onConfirm={onPublish}
      title={isPublished ? t('modal.un_publish_video') : t('modal.publish_video')}
      description={
        isPublished
          ? t('modal.un_publish_video_desc', { title: detail?.title })
          : t('modal.publish_video_desc', { title: detail?.title })
      }
      confirmTextButton={isPublished ? t('common.un_publish') : t('common.publish')}
    />
  );
};

export default ModalPublishVideo;
