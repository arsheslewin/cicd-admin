import ApiService from 'services/apiService';

import { ReportListType } from './types';

class ReportService extends ApiService {
  constructor() {
    super();
  }

  getListReport(params: ReportListType) {
    return this.get('/admin/list-reports', params);
  }

  getDetailReport(id: string) {
    return this.get(`/admin/detail-reports/${id}`);
  }
}

export const reportService = new ReportService();
