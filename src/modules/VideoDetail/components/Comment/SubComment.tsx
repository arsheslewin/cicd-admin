import React, { useEffect, useState } from 'react';

import useFetchVideo from 'modules/VideoDetail/hooks/useFetchVideo';

import IconArrow from 'resources/svg/IconArrow';

import Comment from '.';

interface IProps {
  data: any;
  parentId: string;
}

const DEFAULT_PARAMS = {
  limit: 5,
  offset: 0,
  cursorCommentId: '',
  viewMore: false,
};

const SubComment: React.FC<IProps> = ({ data, parentId }) => {
  const [params, setParams] = useState({ ...DEFAULT_PARAMS, parentId });
  const [list, setList] = useState<any>([]);
  const [total, setTotal] = useState(data?.total);

  const { fetchSubComments } = useFetchVideo();

  const onViewMore = () => {
    const lastComment = list[list?.length - 1];
    setParams((prev) => ({ ...prev, cursorCommentId: lastComment?.id, viewMore: true }));
  };

  const onFetchSubComment = async (query: any) => {
    try {
      const data = await fetchSubComments(query);
      if (data) {
        const { records, total } = data;
        setList((prev: any) => [...prev, ...records]);
        setTotal(total - records?.length);
      }
    } catch (error) {
      console.log('err', error);
    }
  };

  useEffect(() => {
    const { viewMore, ...param } = params || {};

    if (viewMore) {
      onFetchSubComment(param);
    }
  }, [params]);

  return (
    <div className='sub-comment'>
      {list?.map((subComment: any, index: number) => (
        <Comment key={index} data={subComment} />
      ))}
      {total > 0 && (
        <div className='sub-comment__view-more' onClick={onViewMore}>
          <span>{`View more replies (${total > 99 ? '99+' : total})`}</span>
          <IconArrow />
        </div>
      )}
    </div>
  );
};

export default SubComment;
