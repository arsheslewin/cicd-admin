import React from 'react';

import { useModal } from 'hooks/useModal';
import { DELETE_COMMENT_STATE } from 'modules/VideoDetail/constants';
import { useVideoActions } from 'store/video-management/selector';
import useVideoStore from 'store/video-management/useVideoStore';

import AvatarDefault from 'resources/image/avatar-default.svg';
import IconDelete from 'resources/svg/IconDelete';
import IconHeartBold from 'resources/svg/IconHeartBold';
import { getFullUrl } from 'utils';

import ModalDeleteComment from '../Modal/ModalDeleteComment';

import RelativeTime from './RelativeTime';

interface IProps {
  data: any;
  children?: any;
}

const Comment: React.FC<IProps> = ({ data, children }) => {
  const { user } = data || {};

  const { open, onToggleModal } = useModal();
  const { detail: videoDetail } = useVideoStore();
  const { setDeleteComment } = useVideoActions();

  const isCreator = data?.user?.id === videoDetail?.userId;

  const onDelete = () => {
    //start delete
    setDeleteComment(DELETE_COMMENT_STATE.DELETING);
    onToggleModal();
  };

  const redirectUserDetail = () => window.open(`${import.meta.env.VITE_DOMAIN}/user/${data?.user?.id}`, '_blank');

  return (
    <div className='comment'>
      <div className='comment--wrap'>
        <img
          src={user?.avatar ? getFullUrl(user?.avatar) : AvatarDefault}
          alt=''
          className='comment-avatar'
          onClick={redirectUserDetail}
        />
        <div className='comment-contain'>
          <div className='comment-contain__creator'>
            <span onClick={redirectUserDetail}>{user?.displayname}</span>
            {isCreator && <span className='creator-label'>(Creator)</span>}
          </div>
          <div className='comment-contain__content'>{data?.content}</div>
          <div className='comment-contain__date'>
            <RelativeTime time={data?.createdAt} />
            <div>
              <IconHeartBold className='w-6 h-6' />
              <span>{data?.likedCount}</span>
            </div>
          </div>
        </div>
        <div className='comment-delete' onClick={onDelete}>
          <IconDelete />
        </div>
      </div>
      {children}
      <ModalDeleteComment open={open} onToggleModal={onToggleModal} comment={data} />
    </div>
  );
};

export default Comment;
