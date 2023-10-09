import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Typography } from 'antd';
import classNames from 'classnames';

import Modal from 'components/Modal';

const { Title } = Typography;

interface IConfirmModal {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  className?: string;
  description?: string | any;
  cancelTextButton?: string;
  confirmTextButton?: string;
  loading?: boolean;
}

const ModalConfirm: FC<IConfirmModal> = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  cancelTextButton = 'common.cancel',
  confirmTextButton = 'common.confirm',
  className,
  loading,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onClose} width={488} {...props}>
      <div className={classNames('confirm-modal', className)}>
        <Title level={1}>{t(title)}</Title>
        {!description ? null : <p className='description' dangerouslySetInnerHTML={{ __html: description }}></p>}
        <div className='group-button'>
          <Button className='app-button-no-bg w-full' htmlType='button' onClick={onClose}>
            {t(cancelTextButton)}
          </Button>
          <Button className='app-button w-full' htmlType='button' loading={loading} onClick={onConfirm}>
            {t(confirmTextButton)}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirm;
