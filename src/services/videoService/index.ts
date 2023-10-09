import ApiService from 'services/apiService';

import { CommentListType, SubCommentListType, VideoListType } from './types';

class VideoService extends ApiService {
  constructor() {
    super();
  }

  getListVideo(params: VideoListType) {
    return this.get('/admin/video', params);
  }

  getVideoDetail(id: string) {
    return this.get(`/admin/video/${id}`);
  }

  getComments(params: CommentListType) {
    return this.get('/admin/list-comment-video', params);
  }

  getSubComments(params: SubCommentListType) {
    const { parentId, ...param } = params;
    return this.get(`/admin/${parentId}/child-comments`, param);
  }

  deleteComment(id: string) {
    return this.delete(`/admin/comment/${id}`);
  }

  deleteVideo(id: string) {
    return this.delete(`/admin/video/${id}`);
  }

  publicVideo(id: string) {
    return this.patch(`/admin/video-public/${id}`);
  }

  activeDownloadVideo(id: string) {
    return this.patch(`/admin/video-download/${id}`);
  }
}

export const videoService = new VideoService();
