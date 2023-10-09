import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import cx from 'classnames';

import useVideoStore from 'store/video-management/useVideoStore';

import { VIDEO_STATUS } from 'constant';
import IconPlay from 'resources/image/play-icon.svg';
import { getFullUrl } from 'utils';

const VideoMedia: React.FC = () => {
  const { t } = useTranslation();
  const { detail } = useVideoStore();

  const videoRef = useRef<any>();
  const progressRef = useRef<any>();
  const animationRef = useRef<any>();

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const onLoadedData = (e: any) => {
    const _duration = Math.floor(e?.target?.duration);
    progressRef.current.max = _duration;
    setDuration(_duration);
    setIsReady(true);
    onPlayVideo();
  };

  const onPlayVideo = () => {
    setIsPlaying(true);
    videoRef.current.play();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const onPauseVideo = () => {
    setIsPlaying(false);
    videoRef.current.pause();
    cancelAnimationFrame(animationRef.current);
  };

  const toggleVideo = () => {
    if (!isPlaying) {
      onPlayVideo();
    } else {
      onPauseVideo();
    }
  };

  const updateProgress = () => {
    const percentage = (progressRef?.current?.value / progressRef?.current?.max) * 100;
    progressRef?.current?.style?.setProperty('--seek-before-width', `${percentage}%`);
    setCurrentTime(progressRef?.current?.value);
  };

  const whilePlaying = () => {
    if (progressRef?.current?.value) {
      progressRef.current.value = videoRef?.current?.currentTime;
    }

    updateProgress();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const onChangeProgress = () => {
    videoRef.current.currentTime = progressRef?.current?.value;
    updateProgress();
  };

  const calculateTime = (secs: any) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  if (detail?.videoStatus === VIDEO_STATUS.CREATING) {
    return <div className='no-media'>{t('common.video_creating')}</div>;
  }

  if (detail?.videoStatus === VIDEO_STATUS.DELETED) {
    return <div className='no-media'>{t('common.video_deleted')}</div>;
  }

  return (
    <div className='section-video-media'>
      <video
        src={getFullUrl(detail?.url)}
        ref={videoRef}
        loop
        preload='metadata'
        crossOrigin='anonymous'
        onLoadedData={onLoadedData}
        onClick={toggleVideo}
      ></video>
      <img className={cx('icon-play', { 'hide-play': isPlaying })} src={IconPlay} alt='' onClick={toggleVideo} />
      <img
        className={cx('template-thumbnail', { 'hide-thumbnail': isReady })}
        src={getFullUrl(detail?.thumbnail)}
        alt=''
        crossOrigin='anonymous'
      />

      <div className='controller'>
        <div className='progress-bar'>
          <input type='range' defaultValue='0' ref={progressRef} onChange={onChangeProgress} />
        </div>
        <div className='duration'>
          <span>{calculateTime(currentTime)}</span>
          <span>/</span>
          <span>{calculateTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoMedia;
