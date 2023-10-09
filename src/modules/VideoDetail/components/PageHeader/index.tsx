import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, Dropdown, MenuProps, PageHeader } from 'antd';
import cx from 'classnames';
import { ROUTE_URL } from 'routes';

import useVideoStore from 'store/video-management/useVideoStore';

import { VIDEO_STATUS } from 'constant';
import IconArrowLeft from 'resources/svg/IconArrowLeft';
import IconDeleteOutline from 'resources/svg/IconDeleteOutline';
import IconDropdown from 'resources/svg/IconDropdown';
import IconLock from 'resources/svg/IconLock';
import IconOpenInNew from 'resources/svg/IconOpenInNew';
import IconSetting from 'resources/svg/IconSetting';
import IconUnLock from 'resources/svg/IconUnLock';
interface IProps {
  onPublish: Function;
  onSetting: Function;
  onDeleteVideo: Function;
}

const PageHead: React.FC<IProps> = ({ onPublish, onSetting, onDeleteVideo }) => {
  const { t } = useTranslation();
  const { detail } = useVideoStore();
  const navigate = useNavigate();

  const isCreating = detail?.videoStatus === VIDEO_STATUS.CREATING;
  const isPublished = detail?.videoStatus === VIDEO_STATUS.PUBLIC;
  const isDeleted = detail?.videoStatus === VIDEO_STATUS.DELETED;

  const onViewVideo = () => {
    const urlUser = `${import.meta.env.VITE_8BEAT_USER_URL}/${detail?.id}`;
    window.open(urlUser, '_blank');
  };

  const optionsCommon = [
    {
      icon: isPublished ? <IconUnLock /> : <IconLock />,
      title: isPublished ? t('common.un_publish') : t('common.publish'),
      customClassName: isPublished ? 'dropdown-item--block' : 'dropdown-item--unblock',
      callback: () => onPublish(),
      hide: isCreating,
    },
    {
      icon: <IconSetting />,
      title: t('modal.setting_video'),
      callback: () => onSetting(),
      hide: false,
    },
    {
      icon: <IconOpenInNew />,
      title: t('common.view_user_web'),
      callback: () => onViewVideo(),
      hide: !isPublished,
    },
    {
      icon: <IconDeleteOutline />,
      title: t('common.delete_video'),
      customClassName: 'dropdown-item--block',
      callback: () => onDeleteVideo(),
      hide: false,
    },
  ];

  const items: MenuProps['items'] = optionsCommon
    ?.filter((option) => !option?.hide)
    .map((option, index) => ({
      key: index,
      label: (
        <div className={cx('dropdown-item', option?.customClassName)} onClick={option?.callback}>
          {option?.icon}
          <span>{option?.title}</span>
        </div>
      ),
    }));

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

  const IconBack = () => (
    <div className='icon-back'>
      <IconArrowLeft />
    </div>
  );

  return (
    <PageHeader
      backIcon={IconBack()}
      onBack={() => navigate(ROUTE_URL.VIDEOS)}
      title='Video Details'
      extra={extraContent()}
    />
  );
};

export default PageHead;
