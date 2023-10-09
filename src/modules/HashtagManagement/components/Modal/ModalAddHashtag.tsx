import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from 'antd';
import { zodResolver } from '@hookform/resolvers/zod';

import FormItem from 'components/FormItem';
import TextInput from 'components/FormItem/components/TextInput';
import showMessage from 'components/Message';
import ModalComponent from 'components/Modal';
import { addHashtagSchema } from 'modules/HashtagManagement/constants/schema';
import useFetchHashtag from 'modules/HashtagManagement/hooks/useFetchHashTag';

import { LENGTH_INPUTS, TYPE_CONSTANTS } from 'constant';

interface IProps {
  open: boolean;
  onToggleModal: Function;
  reloadHighlighted: Function;
}

const ModalAddHashtag: React.FC<IProps> = ({ open, onToggleModal, reloadHighlighted }) => {
  const { t } = useTranslation();

  const methods = useForm({
    defaultValues: {
      hashtag: '',
    },
    resolver: zodResolver(addHashtagSchema(t)),
  });

  const { handleSubmit, reset } = methods;
  const { isLoading, addHashtag } = useFetchHashtag();

  const onClose = () => {
    reset();
    onToggleModal();
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await addHashtag(data?.hashtag);

      if (response) {
        onClose();
        showMessage(TYPE_CONSTANTS.MESSAGE.SUCCESS, 'message.S10');
        reloadHighlighted();
      }
    } catch (error) {
      console.log('err', error);
    }
  };

  const onKeyDown = (e: any) => {
    const SPACE_KEY_CODE = 32;

    if (e?.keyCode === SPACE_KEY_CODE) {
      e?.preventDefault();
    }
  };

  return (
    <ModalComponent title={t('modal.add_hashtag')} open={open} onClose={onClose} width={540}>
      <div className='modal-setting'>
        <div className='modal-setting__desc'>{t('modal.add_hashtag_desc')}</div>
        <FormProvider {...methods}>
          <form className='form-container mt-24' onSubmit={handleSubmit(onSubmit)}>
            <FormItem name={'hashtag'}>
              <TextInput
                placeholder={t('label.add_hashtag_placeholder')}
                maxLength={LENGTH_INPUTS.MAX_30}
                onKeyDown={onKeyDown}
              />
            </FormItem>

            <div className='flex gap-4 mt-24 mb-12'>
              <Button className='app-button-no-bg w-full' onClick={onClose}>
                {t('common.discard')}
              </Button>
              <Button htmlType='submit' loading={isLoading} className='app-button w-full'>
                {t('common.add')}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </ModalComponent>
  );
};

export default ModalAddHashtag;
