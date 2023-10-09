import React, { Dispatch, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NumericFormat } from 'react-number-format';

import { Empty, Spin } from 'antd';

import { DELETE_COMMENT_STATE } from 'modules/VideoDetail/constants';
import { useVideoActions } from 'store/video-management/selector';
import useVideoStore from 'store/video-management/useVideoStore';

import NoData from 'resources/svg/NoData';

import Comment from '../Comment';
import SkeletonComment from '../Comment/SkeletonComment';
import SubComment from '../Comment/SubComment';

interface IProps {
  isLoading?: boolean;
  searchParams?: any;
  setSearchParams?: Dispatch<any>;
  reloadComment: () => void;
}

const CommentInfinite: React.FC<IProps> = ({ isLoading, searchParams, setSearchParams, reloadComment }) => {
  const { t } = useTranslation();

  const { setComments } = useVideoActions();
  const { comments, deleteComment } = useVideoStore();
  const { records, total, hasNext } = comments || {};
  const { keyword, createdDate } = searchParams || {};

  const [list, setList] = useState<any>([]);

  const fetchNextPage = () => {
    const lastComment = records[records?.length - 1];
    setSearchParams && setSearchParams((prev: any) => ({ ...prev, cursorCommentId: lastComment?.id }));
  };

  const resetData = () => {
    setList([]);
    setComments({
      records: [],
      total: 0,
      hasNext: false,
    });
  };

  useEffect(() => {
    return () => {
      resetData();
    };
  }, []);

  useEffect(() => {
    //when search change clear list
    resetData();
  }, [keyword, JSON.stringify(createdDate)]);

  useEffect(() => {
    if (records?.length > 0) {
      setList((prev: any) => [...prev, ...records]);
    }
  }, [JSON.stringify(records)]);

  useEffect(() => {
    if (deleteComment === DELETE_COMMENT_STATE.DELETED) {
      //reload list
      setList([]);
      reloadComment();
    }
  }, [deleteComment]);

  return (
    <div>
      <h6 className='h6 color-black'>
        {t('column.total_comments')}: <NumericFormat displayType='text' value={total} thousandSeparator />
      </h6>
      {list?.length === 0 && isLoading ? (
        <div className='infinite-loading'>
          <Spin />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={list?.length || 0}
          next={fetchNextPage}
          hasMore={hasNext}
          loader={<SkeletonComment />}
          height={900}
        >
          {list?.map((comment: any, index: number) => (
            <Comment key={index} data={comment}>
              <SubComment data={comment?.children} parentId={comment?.id} />
            </Comment>
          ))}
          {total === 0 && <Empty image={<NoData />} description={t('common.no_data')} />}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default CommentInfinite;
