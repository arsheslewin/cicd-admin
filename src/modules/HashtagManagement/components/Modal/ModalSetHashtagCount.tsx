import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from 'antd';
import { zodResolver } from '@hookform/resolvers/zod';

import FormItem from 'components/FormItem';
import Number from 'components/FormItem/components/Number';
import ModalComponent from 'components/Modal';
import { hashtagCountSchema } from 'modules/HashtagManagement/constants/schema';
import useFetchHashtag from 'modules/HashtagManagement/hooks/useFetchHashTag';

import { LENGTH_INPUTS } from 'constant';

interface IProps {
  open: boolean;
  onToggleModal: Function;
}

const ModalSetHashtagCount: React.FC<IProps> = ({ open, onToggleModal }) => {
  const { t } = useTranslation();

  const methods = useForm({
    defaultValues: {
      hashtagCount: '',
    },
    resolver: zodResolver(hashtagCountSchema(t)),
    mode: 'all',
  });

  const { handleSubmit, reset, setValue } = methods;
  const { isLoading, setHashtagCount, getHashtagCount } = useFetchHashtag();

  const onClose = () => {
    reset();
    onToggleModal();
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await setHashtagCount(data?.hashtagCount);

      if (response) {
        onClose();
      }
    } catch (error) {
      console.log('err', error);
    }
  };

  const getCountSetting = async () => {
    try {
      const response = await getHashtagCount();

      if (response) {
        setValue('hashtagCount', response?.hashtagCount?.toString());
      }
    } catch (error) {
      console.log('err', error);
    }
  };

  useEffect(() => {
    if (open) {
      getCountSetting();
    }
  }, [open]);

  return (
    <ModalComponent title={t('modal.set_hashtag_count')} open={open} onClose={onClose} width={450}>
      <div className='modal-setting'>
        <div className='modal-setting__desc'>{t('modal.set_hashtag_count_desc')}</div>
        <FormProvider {...methods}>
          <form className='form-container mt-24' onSubmit={handleSubmit(onSubmit)}>
            <FormItem name={'hashtagCount'}>
              <Number placeholder={t('label.hashtag_count_placeholder')} maxLength={LENGTH_INPUTS.MAX_3} />
            </FormItem>

            <Button htmlType='submit' loading={isLoading} className='app-button w-full mt-24 mb-24'>
              {t('common.confirm')}
            </Button>
          </form>
        </FormProvider>
      </div>
    </ModalComponent>
  );
};

export default ModalSetHashtagCount;
