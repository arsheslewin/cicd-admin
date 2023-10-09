export type VideoListType = {
  keyword?: string;
  sortField?: string;
  sortType?: number;
  offset?: number;
  limit?: number;
  userId?: string;
  startDate?: string;
  endDate?: string;
  status?: number;
  reportedUser?: boolean;
};

export type CommentListType = {
  keyword?: string;
  sortField?: string;
  sortType?: number;
  offset?: number;
  limit?: number;
  videoId: string;
  cursorCommentId?: string;
  startDate?: string;
  endDate?: string;
};

export type SubCommentListType = {
  parentId: string;
  keyword?: string;
  sortField?: string;
  sortType?: number;
  offset?: number;
  limit?: number;
  cursorCommentId?: string;
};
