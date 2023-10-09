import ApiService from 'services/apiService';

import { HashtagDetailType, HashtagHighlightedType, HashtagOrderType, HashtagTrendingType } from './types';

class HashtagService extends ApiService {
  constructor() {
    super();
  }

  getHashtagHighlighted(params: HashtagHighlightedType) {
    return this.get('/admin/list-hashtag-highlighted', params);
  }

  getHashtagTrending(params: HashtagTrendingType) {
    return this.get('/admin/list-hashtag-trending', params);
  }

  getHashtagDetail(params: HashtagDetailType) {
    const { id, ...param } = params || {};
    return this.get(`/admin/hashtag-detail/${id}`, param);
  }

  patchHashtagHighlight(id: string) {
    return this.patch(`/admin/hashtag-highlight/${id}`);
  }

  patchHashtagDisplay(id: string) {
    return this.patch(`/admin/hashtag-display/${id}`);
  }

  postHashtag(hashtag: string) {
    return this.post('/admin/hashtag', { hashtag });
  }

  putHashtagOrder(params: HashtagOrderType[]) {
    return this.put('/admin/hashtag-order', [...params]);
  }

  putHashtagCountSetting(hashtagCount: number) {
    return this.put('/admin/hashtag-count-setting', { hashtagCount });
  }

  getHashtagCountSetting() {
    return this.get('/admin/setting-hashtag');
  }
}

export const hashtagService = new HashtagService();
