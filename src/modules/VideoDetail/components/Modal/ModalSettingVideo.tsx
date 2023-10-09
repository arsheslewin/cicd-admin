import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Switch } from 'antd';

import showMessage from 'components/Message';
import ModalComponent from 'components/Modal';
import useFetchVideo from 'modules/VideoDetail/hooks/useFetchVideo';
import useVideoStore from 'store/video-management/useVideoStore';

import { TYPE_CONSTANTS } from 'constant';

interface IProps {
  open: boolean;
  onToggleModal: () => void;
}

const ModalSettingVideo: React.FC<IProps> = ({ open, onToggleModal }) => {
  const { t } = useTranslation();
  const { detail } = useVideoStore();
  const { fetchVideoDetail: refetchDetail, activeDownloadVideo } = useFetchVideo();

  const [checked, setChecked] = useState(false);

  const onChange = (checked: boolean) => setChecked(checked);

  const onConfirm = async () => {
    if (checked !== detail?.isDownloadable) {
      try {
        await activeDownloadVideo(detail?.id);
        await refetchDetail(detail?.id);
      } catch (error) {
        console.log('err', error);
      }
    }

    onToggleModal();
    showMessage(TYPE_CONSTANTS.MESSAGE.SUCCESS, 'message.S15');
  };

  return (
    <ModalComponent open={open} title={t('modal.setting_video')} onClose={onToggleModal}>
      <div className='modal-setting'>
        <div className='switch-label'>
          <p dangerouslySetInnerHTML={{ __html: t('modal.setting_video_desc', { title: detail?.title }) }}></p>
          <Switch defaultChecked={detail?.isDownloadable} onChange={onChange} />
        </div>
        <Button className='app-button w-full' htmlType='button' onClick={onConfirm}>
          {t('common.save_changes')}
        </Button>
      </div>
    </ModalComponent>
  );
};

export default ModalSettingVideo;
