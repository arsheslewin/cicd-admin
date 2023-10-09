export type UserListType = {
  keyword?: string;
  sortField?: string;
  sortType?: number;
  offset?: number;
  limit?: number;
  joinedStartDate?: string;
  joinedEndDate?: string;
  loginStartDate?: string;
  loginEndDate?: string;
  status?: number;
  reportedUser?: boolean;
};

export type UserSettingType = {
  id: string;
  videoDownload: boolean;
  canCreateVideo: boolean;
};
