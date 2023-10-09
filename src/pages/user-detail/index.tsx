import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useModal } from 'hooks/useModal';
import ModalBlockUser from 'modules/UserDetail/components/Modal/ModalBlockUser';
import ModalSettingUser from 'modules/UserDetail/components/Modal/ModalSettingUser';
import PageHead from 'modules/UserDetail/components/PageHeader';
import UserInfo from 'modules/UserDetail/components/UserInfo';
import useFetchUser from 'modules/UserDetail/hooks/useFetchUser';
import VideoManagement from 'pages/video-management';

const UserDetail: React.FC = () => {
  const { id } = useParams();
  const { fetchUserDetail } = useFetchUser();

  const { open, onToggleModal } = useModal();
  const { open: openSetting, onToggleModal: onToggleSetting } = useModal();

  useEffect(() => {
    if (id) {
      fetchUserDetail(id);
    }
  }, [id]);

  return (
    <div className='user-detail'>
      <PageHead onBlock={onToggleModal} onSetting={onToggleSetting} />
      <section className='container'>
        <UserInfo />
      </section>
      <section className='mt-24'>
        <VideoManagement creatorId={id} />
      </section>
      <ModalBlockUser open={open} onToggleModal={onToggleModal} />
      <ModalSettingUser open={openSetting} onToggleModal={onToggleSetting} />
    </div>
  );
};

export default UserDetail;
