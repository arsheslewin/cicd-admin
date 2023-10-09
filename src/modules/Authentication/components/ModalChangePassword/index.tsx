import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Form } from 'antd';
import { zodResolver } from '@hookform/resolvers/zod';

import FormItem from 'components/FormItem';
import TextInputPassword from 'components/FormItem/components/TextInputPassword';
import showMessage from 'components/Message';
import ModalComponent from 'components/Modal';
import { CHANGE_PASSWORD_DEFAULT_VALUE, FORM } from 'modules/Authentication/constants';
import { changePasswordSchema } from 'modules/Authentication/constants/schema';
import useLogin from 'modules/Authentication/hooks/useLogin';

import { LENGTH_INPUTS, TYPE_CONSTANTS } from 'constant';

interface IProps {
  open: boolean;
  onClose: Function;
}

const ModalChangePassword: React.FC<IProps> = ({ open, onClose }) => {
  const { t } = useTranslation();

  const methods = useForm({
    defaultValues: CHANGE_PASSWORD_DEFAULT_VALUE,
    resolver: zodResolver(changePasswordSchema(t)),
    mode: 'all',
  });

  const { handleSubmit, reset } = methods;
  const { isLoading, changePassword } = useLogin();

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (formData: any) => {
    const params = {
      currentPassword: formData[FORM.PASSWORD],
      newPassword: formData[FORM.NEW_PASSWORD],
    };

    try {
      const data = await changePassword(params);

      if (data) {
        handleClose();
        showMessage(TYPE_CONSTANTS.MESSAGE.SUCCESS, 'message.S6');
      }
    } catch (e) {
      showMessage(TYPE_CONSTANTS.MESSAGE.ERROR, 'message.E0');
    }
  };

  return (
    <ModalComponent title={t('login.change_password')} open={open} onClose={handleClose} width={488}>
      <FormProvider {...methods}>
        <Form className='form-container' onFinish={handleSubmit(onSubmit)}>
          <FormItem name={FORM.PASSWORD} label={t('label.password')} required containerClassName='mb-20'>
            <TextInputPassword placeholder={t('label.password_placeholder')} maxLength={LENGTH_INPUTS.MAX_18} />
          </FormItem>
          <FormItem name={FORM.NEW_PASSWORD} label={t('label.new_password')} required containerClassName='mb-20'>
            <TextInputPassword placeholder={t('label.new_password_placeholder')} maxLength={LENGTH_INPUTS.MAX_18} />
          </FormItem>
          <FormItem
            name={FORM.CONFIRM_PASSWORD}
            label={t('label.re_enter_password')}
            required
            containerClassName='mb-20'
          >
            <TextInputPassword
              placeholder={t('label.re_enter_password_placeholder')}
              maxLength={LENGTH_INPUTS.MAX_18}
            />
          </FormItem>

          <Button loading={isLoading} htmlType='submit' className='button button--large mt-20 mb-20'>
            {t('login.change_password')}
          </Button>
        </Form>
      </FormProvider>
    </ModalComponent>
  );
};

export default ModalChangePassword;
