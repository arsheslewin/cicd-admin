import { useState } from 'react';

import { videoService } from 'services/videoService';
import { CommentListType, SubCommentListType } from 'services/videoService/types';
import { useVideoActions } from 'store/video-management/selector';

import { HTTP_STATUS_SUCCESS } from 'constant';

const useFetchVideo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setVideoDetail, setComments } = useVideoActions();

  const fetchVideoDetail = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await videoService.getVideoDetail(id);

      if (HTTP_STATUS_SUCCESS?.includes(response?.status)) {
        setVideoDetail(response?.data?.data);
      }
    } catch (error) {
      setVideoDetail(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchComments = async (params: CommentListType) => {
    setIsLoading(true);

    setTimeout(async () => {
      try {
        const response = await videoService.getComments(params);

        if (HTTP_STATUS_SUCCESS?.includes(response?.status)) {
          setComments(response?.data?.data);
        }
      } catch (error) {
        setComments({
          records: [],
          total: 0,
          hasNext: false,
        });
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  const fetchSubComments = async (params: SubCommentListType) => {
    setIsLoading(true);
    try {
      const response = await videoService.getSubComments(params);

      if (HTTP_STATUS_SUCCESS?.includes(response?.status)) {
        return response?.data?.data;
      }
    } catch (error) {
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const deleteComment = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await videoService.deleteComment(id);

      if (HTTP_STATUS_SUCCESS?.includes(response?.status)) {
        return response?.data?.data;
      }
    } catch (error) {
      console.log('err', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteVideo = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await videoService.deleteVideo(id);

      if (HTTP_STATUS_SUCCESS?.includes(response?.status)) {
        return response?.data;
      }
    } catch (error) {
      console.log('err', error);
    } finally {
      setIsLoading(false);
    }
  };

  const publishVideo = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await videoService.publicVideo(id);

      if (HTTP_STATUS_SUCCESS?.includes(response?.status)) {
        return response?.data?.data;
      }
    } catch (error) {
      console.log('err', error);
    } finally {
      setIsLoading(false);
    }
  };

  const activeDownloadVideo = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await videoService.activeDownloadVideo(id);

      if (HTTP_STATUS_SUCCESS?.includes(response?.status)) {
        return response?.data?.data;
      }
    } catch (error) {
      console.log('err', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    fetchVideoDetail,
    fetchComments,
    fetchSubComments,
    deleteComment,
    deleteVideo,
    publishVideo,
    activeDownloadVideo,
  };
};

export default useFetchVideo;
