import { type FC, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { Layout } from 'antd';
import { DEFAULT_PAGE, ROUTE_URL } from 'routes';

import useLogin from 'modules/Authentication/hooks/useLogin';
import { useGetAuthenticationToken } from 'store/authentication/selector';

import LayoutContent from './Content';
import Header from './Header';
import PrivateSider from './Sider';

const PrivateLayout: FC = () => {
  const authenticationToken = useGetAuthenticationToken();
  const { getProfile } = useLogin();

  const location = useLocation();
  const isHome = location.pathname === ROUTE_URL.HOME;

  useEffect(() => {
    if (authenticationToken) {
      getProfile();
    }
  }, [authenticationToken]);

  if (!authenticationToken) return <Navigate to={ROUTE_URL.LOGIN} />;

  return (
    <Layout className='app-layout'>
      <PrivateSider />
      <Layout>
        <Header />
        <LayoutContent>{isHome ? <Navigate to={DEFAULT_PAGE} /> : <Outlet />}</LayoutContent>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
