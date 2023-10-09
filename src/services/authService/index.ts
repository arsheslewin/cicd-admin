import ApiService from 'services/apiService';

class AuthService extends ApiService {
  constructor() {
    super();
  }

  login<T>(data: T) {
    return this.post('/auth/login-admin', data);
  }

  forgotPassword<T>(data: T) {
    return this.post('/auth/forgot-password', data);
  }

  resetPassword<T>(data: T) {
    return this.post('/auth/reset-password', data);
  }

  changePassword<T>(data: T) {
    return this.post('/admin/change-password', data);
  }

  profile() {
    return this.get('/user/profile');
  }
}

export const authService = new AuthService();
