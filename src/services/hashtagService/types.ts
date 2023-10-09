export type HashtagHighlightedType = {
  keyword?: string;
  sortField?: string;
  sortType?: number;
  offset?: number;
  limit?: number;
  createdBy?: number;
  isDisplayed?: boolean;
};

export type HashtagTrendingType = {
  keyword?: string;
  sortField?: string;
  sortType?: number;
  offset?: number;
  limit?: number;
  trendingDate?: number;
  isHighlighted?: boolean;
  startDate?: string;
  endDate?: string;
};

export type HashtagOrderType = {
  id: string;
  order: number;
};

export type HashtagDetailType = {
  id: string;
  trendingDate?: number;
  startDate?: string;
  endDate?: string;
};
