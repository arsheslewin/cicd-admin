import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';

import { Typography } from 'antd';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import ModalComponent from 'components/Modal';
import StatusLabel from 'components/StatusLabel';
import { useModal } from 'hooks/useModal';
import { REPORTED_OBJECTS } from 'modules/ReportManagement/constants';
import ReportTable from 'modules/UserDetail/components/ReportTable';
import useVideoStore from 'store/video-management/useVideoStore';

import { DATE_FORMAT, TIME_FORMAT } from 'constant';
import AvatarDefault from 'resources/image/avatar-default.svg';
import { getFullUrl } from 'utils';

const { Paragraph } = Typography;

const VideoInfo: React.FC = () => {
  const { t } = useTranslation();
  const { detail } = useVideoStore();

  const { open, onToggleModal } = useModal();

  const listHashtag = detail?.hashtag || [];
  const metadata = detail?.metadata && JSON.parse(detail?.metadata);
  const { template } = metadata || {};

  const handleHashtag = (text: string) => {
    const arraySpace = text?.split(/#[^\s\xE3!-/:-@[-^`{-~#]+/g);
    const regex = text?.match(/#[^\s\xE3!-/:-@[-^`{-~#]+/g);

    return arraySpace?.map((item, index) => {
      const hashtagId = listHashtag?.find(
        (e: any) => e?.hashtag === regex?.[index]?.toLocaleLowerCase().normalize('NFKC'),
      )?.id;

      return (
        <Fragment key={index}>
          {item}
          <span
            onClick={() => {
              window.open(`${import.meta.env.VITE_DOMAIN}/hashtag/${hashtagId}`, '_blank');
            }}
            className='tag'
          >
            {`${regex?.[index] ? regex[index] : ''}`}
          </span>
        </Fragment>
      );
    });
  };

  const redirectUserDetail = () => window.open(`${import.meta.env.VITE_DOMAIN}/user/${detail?.user?.id}`, '_blank');
  const redirectOriginUrl = () => window.open(getFullUrl(detail?.sourceUrl), '_blank');

  return (
    <div className='section-video-info'>
      <div className='video__title'>
        <span>{detail?.title}</span>
        <StatusLabel type='video' status={detail?.videoStatus} />
      </div>
      <div className='video__date'>
        <span>{t('common.created_at')}</span>
        <span>{detail?.createdAt && format(parseISO(detail?.createdAt), DATE_FORMAT)}</span>
        <span>{detail?.createdAt && format(parseISO(detail?.createdAt), TIME_FORMAT)}</span>
      </div>
      <div className='video__list-other'>
        <div className='other-item'>
          <span>{t('column.creator')}</span>
          <div className='creator' onClick={redirectUserDetail}>
            <img src={detail?.user?.avatar ? getFullUrl(detail?.user?.avatar) : AvatarDefault} alt='' />
            <span>{detail?.user?.displayname}</span>
          </div>
        </div>
        <div className='other-item'>
          <span>{t('common.template')}</span>
          <span>{template?.name}</span>
        </div>
        <div className='other-item'>
          <span>{t('column.total_views')}</span>
          <NumericFormat displayType='text' value={detail?.view} thousandSeparator />
        </div>
        <div className='other-item'>
          <span>{t('column.total_likes')}</span>
          <NumericFormat displayType='text' value={detail?.likedCount} thousandSeparator />
        </div>
        <div className='other-item'>
          <span>{t('column.total_comments')}</span>
          <NumericFormat displayType='text' value={detail?.commentCount} thousandSeparator />
        </div>
        <div className='other-item'>
          <span>{t('column.total_downloads')}</span>
          <NumericFormat displayType='text' value={detail?.download} thousandSeparator />
        </div>
        <div className='other-item other-item--report'>
          <span>{t('column.total_reports')}</span>
          <NumericFormat
            displayType='text'
            value={detail?.reportCount || 0}
            thousandSeparator
            onClick={onToggleModal}
          />
        </div>
        <div className='other-item'>
          <span>{t('column.source_url')}</span>
          <Paragraph copyable onClick={redirectOriginUrl}>
            {getFullUrl(detail?.sourceUrl)}
          </Paragraph>
        </div>
      </div>
      <div className='video__description'>
        <div>{t('common.description')}</div>
        <div>{handleHashtag(detail?.caption)}</div>
      </div>
      <ModalComponent
        title={t('modal.video_reports')}
        open={open}
        onClose={onToggleModal}
        width={640}
        wrapClassName='modal-report'
      >
        <ReportTable type={REPORTED_OBJECTS.VIDEO} detail={detail} />
      </ModalComponent>
    </div>
  );
};

export default VideoInfo;
