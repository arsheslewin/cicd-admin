import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { t } from 'i18next';

import ReportManagement from 'pages/report-management';

import SidebarAnalytic from 'resources/svg/sider/SidebarAnalytic';
import SidebarHashTag from 'resources/svg/sider/SidebarHashtag';
import SidebarReport from 'resources/svg/sider/SidebarReport';
import SidebarUser from 'resources/svg/sider/SidebarUser';
import SidebarVideo from 'resources/svg/sider/SidebarVideo';

const PrivateLayout = lazy(() => import('layout/Private'));
const PublicLayout = lazy(() => import('layout/Public'));
const Login = lazy(() => import('pages/login'));
const UserManagement = lazy(() => import('pages/user-management'));
const UserDetail = lazy(() => import('pages/user-detail'));
const VideoManagement = lazy(() => import('pages/video-management'));
const VideoDetail = lazy(() => import('pages/video-detail'));
const HashtagHighlighted = lazy(() => import('pages/hashtag-highlighted'));
const HashtagTrending = lazy(() => import('pages/hashtag-trending'));
const HashtagDetail = lazy(() => import('pages/hashtag-detail'));
const Analytics = lazy(() => import('pages/analytics'));

export const ROUTE_URL = {
  HOME: '/',
  LOGIN: '/login',
  USERS: '/users',
  USER_DETAIL: '/user/:id',
  VIDEOS: '/videos',
  VIDEO_DETAIL: '/video/:id',
  REPORTS: '/reports',
  HASHTAGS: '/hashtags',
  HASHTAGS_HIGHLIGHTED: '/hashtag-highlighted',
  HASHTAGS_TRENDING: '/hashtag-trending',
  HASHTAG_DETAIL: '/hashtag/:id',
  ANALYTICS: '/analytics',
};

export const DEFAULT_PAGE = ROUTE_URL.USERS;

const routes = [
  {
    path: ROUTE_URL.HOME,
    element: <PublicLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <PrivateLayout />,
        children: [
          {
            path: ROUTE_URL.USERS,
            element: <UserManagement />,
          },
          {
            path: ROUTE_URL.USER_DETAIL,
            element: <UserDetail />,
          },
          {
            path: ROUTE_URL.VIDEOS,
            element: <VideoManagement />,
          },
          {
            path: ROUTE_URL.VIDEO_DETAIL,
            element: <VideoDetail />,
          },
          {
            path: ROUTE_URL.REPORTS,
            element: <ReportManagement />,
          },
          {
            path: ROUTE_URL.HASHTAGS_HIGHLIGHTED,
            element: <HashtagHighlighted />,
          },
          {
            path: ROUTE_URL.HASHTAGS_TRENDING,
            element: <HashtagTrending />,
          },
          {
            path: ROUTE_URL.HASHTAG_DETAIL,
            element: <HashtagDetail />,
          },
          {
            path: ROUTE_URL.ANALYTICS,
            element: <Analytics />,
          },
        ],
      },
      { path: ROUTE_URL.LOGIN, element: <Login /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to={ROUTE_URL.LOGIN} />,
  },
];

export const router = createBrowserRouter(routes);

export const SIDE_BAR_ITEMS = [
  {
    key: ROUTE_URL.USERS,
    icon: <SidebarUser />,
    label: t('sidebar.users'),
    children: null,
  },
  {
    key: ROUTE_URL.VIDEOS,
    icon: <SidebarVideo />,
    label: t('sidebar.videos'),
    children: null,
  },
  {
    key: ROUTE_URL.REPORTS,
    icon: <SidebarReport />,
    label: t('sidebar.reports'),
    children: null,
  },
  {
    key: ROUTE_URL.HASHTAGS,
    icon: <SidebarHashTag />,
    label: t('sidebar.hashtags'),
    children: [
      {
        key: ROUTE_URL.HASHTAGS_HIGHLIGHTED,
        label: t('sidebar.highlighted'),
      },
      {
        key: ROUTE_URL.HASHTAGS_TRENDING,
        label: t('sidebar.trending'),
      },
    ],
  },
  {
    key: ROUTE_URL.ANALYTICS,
    icon: <SidebarAnalytic />,
    label: t('sidebar.analytics'),
    children: null,
  },
];
