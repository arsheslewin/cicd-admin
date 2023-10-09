import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { DELETE_COMMENT_STATE } from 'modules/VideoDetail/constants';

declare const DeleteCommentState: [
  DELETE_COMMENT_STATE.NOT_DELETE,
  DELETE_COMMENT_STATE.DELETING,
  DELETE_COMMENT_STATE.DELETED,
];
declare type IDeleteComment = (typeof DeleteCommentState)[number];

interface IComment {
  records: any;
  total: number;
  hasNext: boolean;
}

interface IVideo {
  detail: any;
  comments: IComment;
  deleteComment: IDeleteComment;
}

interface IVideoAction {
  actions: {
    setVideoDetail: (detail: IVideo['detail']) => void;
    setComments: (comments: IComment) => void;
    setDeleteComment: (deleteComment: IDeleteComment) => void;
  };
}

const initialState = {
  detail: {},
  comments: {
    records: [],
    total: 0,
    hasNext: false,
  },
  deleteComment: DELETE_COMMENT_STATE.NOT_DELETE,
};

const useVideoStore = create<IVideo & IVideoAction>()(
  immer((set) => ({
    //States
    ...initialState,

    //Actions
    actions: {
      setVideoDetail: (detail) => set({ detail }),
      setComments: (comments) => set({ comments }),
      setDeleteComment: (deleteComment) =>
        set((state) => ({
          deleteComment,
          comments: deleteComment === DELETE_COMMENT_STATE.DELETED ? initialState.comments : state.comments,
        })),
    },
  })),
);

export default useVideoStore;
