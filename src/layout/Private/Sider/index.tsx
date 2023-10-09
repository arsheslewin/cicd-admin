import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Image, Layout, Menu } from 'antd';
import classNames from 'classnames';
import { SIDE_BAR_ITEMS } from 'routes';

import Logo from 'resources/image/logo.svg';
import MenuIcon from 'resources/svg/MenuIcon';

const { Sider } = Layout;

type SiderType = {};

const PrivateSider: FC<SiderType> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const handleToggleCollapse = () => setCollapsed((collapse) => !collapse);

  useEffect(() => {
    for (const { key: parentKey, children } of SIDE_BAR_ITEMS) {
      if (parentKey === location.pathname) {
        setOpenKeys([]);
        setSelectedKeys([parentKey]);
        break;
      }

      if (children && children.length > 0) {
        for (const { key } of children) {
          if (key === location.pathname) {
            setOpenKeys([parentKey]);
            setSelectedKeys([key]);
            break;
          }
        }
      }
    }
  }, [location.pathname]);

  return (
    <Sider className='app-sider' width={236} collapsible collapsed={collapsed}>
      <div
        className={classNames('app-sider__top', {
          'justify-center': collapsed,
          'justify-between': !collapsed,
        })}
      >
        {!collapsed && <Image src={Logo} alt='Logo' preview={false} />}
        <MenuIcon onClick={handleToggleCollapse} className='top__bar' />
      </div>
      <Menu
        className='app-sider__menu'
        mode='inline'
        onClick={(e) => navigate(e.key)}
        selectedKeys={selectedKeys}
        items={SIDE_BAR_ITEMS}
        openKeys={openKeys}
        onOpenChange={setOpenKeys}
      />
    </Sider>
  );
};

export default PrivateSider;
