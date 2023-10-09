import React, { useEffect, useState } from 'react';

import SearchContainer from 'components/SearchContainer';
import { COMMENT_QUERY } from 'modules/VideoDetail/constants';
import useFetchVideo from 'modules/VideoDetail/hooks/useFetchVideo';
import { CommentListType } from 'services/videoService/types';

import { DEFAULT_SEARCH_PARAMS } from 'constant';
import { convertRangeDateToUTC, stripEmptyValue } from 'utils';

import CommentInfinite from '../CommentInfinite';
import CommentSearchGroup from '../CommentSearchGroup';

interface IProps {
  videoId: string;
}

const VideoComment: React.FC<IProps> = ({ videoId }) => {
  const [sort, setSort] = useState({});
  const defaultParams = { ...DEFAULT_SEARCH_PARAMS, videoId };
  const [searchParams, setSearchParams] = useState(defaultParams);

  const { isLoading, fetchComments } = useFetchVideo();

  const transformSearchParams = (searchParams: any): CommentListType => {
    const { keyword, sortField, sortType, limit, page, createdDate, cursorCommentId } = searchParams || {};

    const createdDateUTC = convertRangeDateToUTC(createdDate);

    const query = {
      [COMMENT_QUERY.KEYWORD]: keyword,
      [COMMENT_QUERY.SORT_FIELD]: sortField,
      [COMMENT_QUERY.SORT_TYPE]: sortType,
      [COMMENT_QUERY.LIMIT]: limit,
      [COMMENT_QUERY.OFFSET]: (page - 1) * limit,
      [COMMENT_QUERY.CREATE_START_DATE]: createdDateUTC?.startTime,
      [COMMENT_QUERY.CREATE_END_DATE]: createdDateUTC?.endTime,
      [COMMENT_QUERY.CREATOR]: videoId,
      [COMMENT_QUERY.CURSOR_COMMENT_ID]: cursorCommentId,
    };

    return stripEmptyValue(query);
  };

  const reloadComment = () => {
    setSearchParams(defaultParams);

    if (JSON.stringify(searchParams) === JSON.stringify(defaultParams)) {
      fetchComments(transformSearchParams(defaultParams));
    }
  };

  useEffect(() => {
    if (searchParams) {
      fetchComments(transformSearchParams(searchParams));
    }
  }, [JSON.stringify(searchParams)]);

  return (
    <div className='section-video-comment'>
      <SearchContainer sort={sort} searchParams={searchParams} setSort={setSort} setSearchParams={setSearchParams}>
        <CommentSearchGroup />
        <CommentInfinite isLoading={isLoading} reloadComment={reloadComment} />
      </SearchContainer>
    </div>
  );
};

export default VideoComment;
