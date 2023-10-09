import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Switch } from 'antd';

import showMessage from 'components/Message';
import ModalComponent from 'components/Modal';
import useFetchUser from 'modules/UserDetail/hooks/useFetchUser';
import { UserSettingType } from 'services/userService/types';
import useUserStore from 'store/user-management/useUserStore';

import { TYPE_CONSTANTS } from 'constant';

interface IProps {
  open: boolean;
  onToggleModal: () => void;
}

const SWITCH_FIELD = {
  DOWNLOAD: 'videoDownload',
  CREATE_VIDEO: 'canCreateVideo',
};

const ModalSettingUser: React.FC<IProps> = ({ open, onToggleModal }) => {
  const { t } = useTranslation();
  const { detail } = useUserStore();
  const { videoDownload, canCreateVideo } = detail || {};
  const { fetchUserDetail: refetchDetail, settingUser } = useFetchUser();

  const [checked, setChecked] = useState({
    [SWITCH_FIELD.DOWNLOAD]: false,
    [SWITCH_FIELD.CREATE_VIDEO]: false,
  });

  const onChange = (field: string) => (checked: boolean) => setChecked((prev) => ({ ...prev, [field]: checked }));

  const onConfirm = async () => {
    try {
      const params = { id: detail?.id, ...checked } as UserSettingType;

      const response = await settingUser(params);
      if (response) {
        await refetchDetail(detail?.id);
        onToggleModal();
        showMessage(TYPE_CONSTANTS.MESSAGE.SUCCESS, 'message.S13');
      }
    } catch (error) {
      console.log('err', error);
    }
  };

  useEffect(() => {
    setChecked({ videoDownload, canCreateVideo });
  }, [videoDownload, canCreateVideo]);

  return (
    <ModalComponent open={open} title={t('modal.setting_user')} onClose={onToggleModal}>
      <div className='modal-setting'>
        <label>{t('modal.download_videos')}</label>
        <div className='switch-label'>
          <p dangerouslySetInnerHTML={{ __html: t('modal.download_videos_desc', { name: detail?.displayname }) }}></p>
          <Switch defaultChecked={detail?.videoDownload} onChange={onChange(SWITCH_FIELD.DOWNLOAD)} />
        </div>
        <label>{t('modal.create_videos')}</label>
        <div className='switch-label'>
          <p dangerouslySetInnerHTML={{ __html: t('modal.create_videos_desc', { name: detail?.displayname }) }}></p>
          <Switch defaultChecked={detail?.canCreateVideo} onChange={onChange(SWITCH_FIELD.CREATE_VIDEO)} />
        </div>
        <Button className='app-button w-full' htmlType='button' onClick={onConfirm}>
          {t('common.save_changes')}
        </Button>
      </div>
    </ModalComponent>
  );
};

export default ModalSettingUser;
