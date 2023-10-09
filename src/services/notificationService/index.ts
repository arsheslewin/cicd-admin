import ApiService from 'services/apiService';

class NotificationsService extends ApiService {
  constructor() {
    super();
  }

  getNotifications(params?: any) {
    return this.get('/notifications', params);
  }

  updateMarkNotification(id: string) {
    return this.patch(`/notifications/${id}`);
  }
}

export const notificationsService = new NotificationsService();
