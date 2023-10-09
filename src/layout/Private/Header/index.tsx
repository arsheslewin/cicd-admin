import { useTranslation } from 'react-i18next';

import { Dropdown, Layout, MenuProps } from 'antd';

import { useModal } from 'hooks/useModal';
import ModalChangePassword from 'modules/Authentication/components/ModalChangePassword';
import { useGetAuthenticationActions, useGetProfile } from 'store/authentication/selector';

import { STORAGE_KEY } from 'constant';
import IconAvatar from 'resources/svg/IconAvatar';
import IconEdit from 'resources/svg/IconEdit';
import IconLogout from 'resources/svg/IconLogout';
import { getFullUrl } from 'utils';

const { Header: HeaderAntd } = Layout;

const Header = () => {
  const { t } = useTranslation();

  const profile = useGetProfile();
  const { setAuthenticationToken, setProfile } = useGetAuthenticationActions();

  const { open, onToggleModal } = useModal();

  const handleLogout = async () => {
    try {
      setProfile(null);
      setAuthenticationToken('');
      localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
    } catch (e) {
      console.log(e);
    }
  };

  const options = [
    {
      icon: <IconEdit />,
      title: t('login.change_password'),
      callback: () => onToggleModal(),
    },
    {
      icon: <IconLogout />,
      title: t('login.logout'),
      callback: () => handleLogout(),
    },
  ];

  const items: MenuProps['items'] = options?.map((option, index) => ({
    key: index,
    label: (
      <div className='dropdown-item' onClick={option?.callback}>
        {option?.icon}
        <span>{option?.title}</span>
      </div>
    ),
  }));

  return (
    <HeaderAntd className='header-container'>
      <div className='app-header__dropdown'>
        {profile && (
          <>
            {/* <AppNotification /> */}
            <span className='profile'>{profile?.displayname}</span>
            <Dropdown menu={{ items }} trigger={['click']} getPopupContainer={(trigger: any) => trigger.parentElement}>
              <div className='avatar-icon'>
                {profile?.avatar ? <img src={getFullUrl(profile?.avatar)} alt='' /> : <IconAvatar />}
              </div>
            </Dropdown>
          </>
        )}
      </div>
      <ModalChangePassword open={open} onClose={onToggleModal} />
    </HeaderAntd>
  );
};
export default Header;
