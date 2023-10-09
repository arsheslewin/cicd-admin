import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Col, Row } from 'antd';

import { useModal } from 'hooks/useModal';
import ModalDeleteVideo from 'modules/VideoDetail/components/Modal/ModalDeleteVideo';
import ModalPublishVideo from 'modules/VideoDetail/components/Modal/ModalPublishVideo';
import ModalSettingVideo from 'modules/VideoDetail/components/Modal/ModalSettingVideo';
import PageHead from 'modules/VideoDetail/components/PageHeader';
import VideoComment from 'modules/VideoDetail/components/VideoComment';
import VideoInfo from 'modules/VideoDetail/components/VideoInfo';
import VideoMedia from 'modules/VideoDetail/components/VideoMedia';
import useFetchVideo from 'modules/VideoDetail/hooks/useFetchVideo';

const VideoDetail: React.FC = () => {
  const { id } = useParams();
  const { fetchVideoDetail } = useFetchVideo();
  const { open, onToggleModal } = useModal();
  const { open: openSetting, onToggleModal: onToggleSetting } = useModal();
  const { open: openDelete, onToggleModal: onToggleDelete } = useModal();

  useEffect(() => {
    if (id) {
      fetchVideoDetail(id);
    }
  }, [id]);

  return (
    <div className='video-detail'>
      <PageHead onPublish={onToggleModal} onSetting={onToggleSetting} onDeleteVideo={onToggleDelete} />
      <Row gutter={30}>
        <Col span={6}>
          <section className='container sticky'>
            <VideoMedia />
          </section>
        </Col>
        <Col span={18}>
          <section className='container'>
            <VideoInfo />
          </section>
          <section className='container mt-24'>
            <VideoComment videoId={id as string} />
          </section>
        </Col>
      </Row>
      <ModalPublishVideo open={open} onToggleModal={onToggleModal} />
      <ModalSettingVideo open={openSetting} onToggleModal={onToggleSetting} />
      <ModalDeleteVideo open={openDelete} onToggleModal={onToggleDelete} />
    </div>
  );
};

export default VideoDetail;
