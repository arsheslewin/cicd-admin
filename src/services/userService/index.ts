import ApiService from 'services/apiService';

import { UserListType, UserSettingType } from './types';

class UserService extends ApiService {
  constructor() {
    super();
  }

  getListUser(params: UserListType) {
    return this.get('/admin/user', params);
  }

  getUserDetail(id: string) {
    return this.get(`/admin/user/${id}`);
  }

  patchBlockUser(id: string) {
    return this.patch(`/admin/user/${id}/block`);
  }

  patchSettingUser(params: UserSettingType) {
    const { id, ...param } = params || {};
    return this.patch(`/admin/user-setting/${id}`, param);
  }
}

export const userService = new UserService();
