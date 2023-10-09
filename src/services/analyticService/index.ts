import ApiService from 'services/apiService';

import { AnalyticsType } from './types';

class AnalyticService extends ApiService {
  constructor() {
    super();
  }

  getAnalytics(params: AnalyticsType) {
    return this.get('/admin/analytics', params);
  }
}

export const analyticService = new AnalyticService();
