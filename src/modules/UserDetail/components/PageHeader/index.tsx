import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, Dropdown, MenuProps, PageHeader } from 'antd';
import cx from 'classnames';
import { ROUTE_URL } from 'routes';

import useUserStore from 'store/user-management/useUserStore';

import { USER_STATUS } from 'constant';
import IconArrowLeft from 'resources/svg/IconArrowLeft';
import IconDropdown from 'resources/svg/IconDropdown';
import IconLock from 'resources/svg/IconLock';
import IconOpenInNew from 'resources/svg/IconOpenInNew';
import IconSetting from 'resources/svg/IconSetting';
import IconUnLock from 'resources/svg/IconUnLock';

interface IProps {
  onBlock: Function;
  onSetting: Function;
}

const PageHead: React.FC<IProps> = ({ onBlock, onSetting }) => {
  const { t } = useTranslation();
  const { detail } = useUserStore();
  const navigate = useNavigate();

  const isBlocked = detail?.userStatus === USER_STATUS.BLOCKED;
  const isDeleted = detail?.userStatus === USER_STATUS.DELETED;

  const onViewUser = () => {
    const urlUser = `${import.meta.env.VITE_8BEAT_USER_URL}/profile/@${detail?.username}`;
    window.open(urlUser, '_blank');
  };

  const options = [
    {
      icon: <IconSetting />,
      title: t('common.setting_user'),
      callback: () => onSetting(),
    },
    {
      icon: <IconOpenInNew />,
      title: t('common.view_user_web'),
      callback: () => onViewUser(),
    },
    {
      icon: isBlocked ? <IconUnLock /> : <IconLock />,
      title: isBlocked ? t('common.unblock') : t('common.block'),
      customClassName: isBlocked ? 'dropdown-item--unblock' : 'dropdown-item--block',
      callback: () => onBlock(),
    },
  ];

  const items: MenuProps['items'] = options?.map((option, index) => ({
    key: index,
    label: (
      <div className={cx('dropdown-item', option?.customClassName)} onClick={option?.callback}>
        {option?.icon}
        <span>{option?.title}</span>
      </div>
    ),
  }));

  const IconBack = () => (
    <div className='icon-back'>
      <IconArrowLeft />
    </div>
  );

  const extraContent = () => {
    return (
      <Dropdown
        menu={{ items }}
        trigger={['click']}
        getPopupContainer={(trigger: any) => trigger.parentElement}
        disabled={isDeleted}
      >
        <Button className='app-button'>
          <span>{t('common.actions')}</span>
          <IconDropdown className='ml-2 extra-icon' />
        </Button>
      </Dropdown>
    );
  };

  return (
    <PageHeader
      backIcon={IconBack()}
      onBack={() => navigate(ROUTE_URL.USERS)}
      title='User Details'
      extra={extraContent()}
    />
  );
};

export default PageHead;
