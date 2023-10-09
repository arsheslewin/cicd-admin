import React from 'react';
import { useTranslation } from 'react-i18next';

import showMessage from 'components/Message';
import ModalConfirm from 'components/Modal/ModalConfirm';
import useFetchHashtag from 'modules/HashtagManagement/hooks/useFetchHashTag';

import { TYPE_CONSTANTS } from 'constant';

interface IProps {
  data: any;
  open: boolean;
  onToggleModal: () => void;
  onUpdateTrending: (id: string) => void;
}

const ModalHighlight: React.FC<IProps> = ({ data, open, onToggleModal, onUpdateTrending }) => {
  const { t } = useTranslation();
  const { setHighlight } = useFetchHashtag();

  const onHighlight = async () => {
    if (data?.id) {
      try {
        const res = await setHighlight(data?.id);

        if (res) {
          onToggleModal();
          onUpdateTrending(data?.id);
          showMessage(TYPE_CONSTANTS.MESSAGE.SUCCESS, 'message.S9');
        }
      } catch (error) {
        console.log('err', error);
      }
    }
  };

  return (
    <ModalConfirm
      open={open}
      onClose={onToggleModal}
      onConfirm={onHighlight}
      title={t('modal.highlight_hashtag')}
      description={t('modal.highlight_hashtag_desc', { hashtag: data?.hashtag })}
      confirmTextButton={t('common.highlight')}
    />
  );
};

export default ModalHighlight;
