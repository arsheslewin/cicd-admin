import { type FC, useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, Col, Row } from 'antd';
import { zodResolver } from '@hookform/resolvers/zod';
import { ROUTE_URL } from 'routes';

import FormItem from 'components/FormItem';
import Number from 'components/FormItem/components/Number';
import TextInput from 'components/FormItem/components/TextInput';
import TextInputPassword from 'components/FormItem/components/TextInputPassword';
import showMessage from 'components/Message';
import {
  FORGOT_PASSWORD_DEFAULT_VALUE,
  FORM,
  IForgotPassword,
  IResetPassword,
  LOGIN_DEFAULT_VALUE,
  MODE,
  RESET_PASSWORD_DEFAULT_VALUE,
} from 'modules/Authentication/constants';
import { forgotPasswordSchema, loginSchema, resetPasswordSchema } from 'modules/Authentication/constants/schema';
import useLogin from 'modules/Authentication/hooks/useLogin';
import { useGetAuthenticationToken } from 'store/authentication/selector';

import { LENGTH_INPUTS, TYPE_CONSTANTS } from 'constant';
import IconArrowLeft from 'resources/svg/IconArrowLeft';

const LoginForm: FC = () => {
  const { t } = useTranslation();
  const [mode, setMode] = useState(MODE.LOGIN);
  const [timer, setTimer] = useState(0);
  const token = useGetAuthenticationToken();
  const navigate = useNavigate();

  const loginFormContext = useForm({
    defaultValues: LOGIN_DEFAULT_VALUE,
    resolver: zodResolver(loginSchema(t)),
  });
  const { handleSubmit: handleLogin } = loginFormContext;

  const forgotPasswordContext = useForm({
    defaultValues: FORGOT_PASSWORD_DEFAULT_VALUE,
    resolver: zodResolver(forgotPasswordSchema(t)),
  });
  const { handleSubmit: handleForgotPassword, watch: watchForgotPassword } = forgotPasswordContext;
  const forgotPasswordEmail = watchForgotPassword(FORM.EMAIL);

  const resetPasswordContext = useForm({
    defaultValues: RESET_PASSWORD_DEFAULT_VALUE,
    resolver: zodResolver(resetPasswordSchema(t)),
  });
  const { handleSubmit: handleResetPassword } = resetPasswordContext;

  const { isLoading, login, forgotPassword, resendOTP, resetPassword } = useLogin();

  const onForgotPassword = async (formData: IForgotPassword) => {
    try {
      const data = await forgotPassword(formData);

      if (data) {
        setMode(MODE.RESET_PASSWORD);
        setTimer(60);
      }
    } catch (e) {
      showMessage(TYPE_CONSTANTS.MESSAGE.ERROR, 'message.E0');
    }
  };

  const onResendOTP = async () => {
    try {
      const data = await resendOTP({ email: forgotPasswordEmail });

      if (data) {
        setTimer(60);
      }
    } catch (e) {
      showMessage(TYPE_CONSTANTS.MESSAGE.ERROR, 'message.E0');
    }
  };

  const onResetPassword = async (formData: IResetPassword) => {
    try {
      const { password, code } = formData;
      const params = { password, code, email: forgotPasswordEmail };
      const data = await resetPassword(params);

      if (data) {
        setMode(MODE.LOGIN);
        showMessage(TYPE_CONSTANTS.MESSAGE.SUCCESS, 'message.reset_password_success');
      }
    } catch (e) {
      showMessage(TYPE_CONSTANTS.MESSAGE.ERROR, 'message.E0');
    }
  };

  const timeOutCallback = useCallback(() => setTimer((currTimer) => currTimer - 1), []);

  useEffect(() => {
    timer > 0 && setTimeout(timeOutCallback, 1000);
  }, [timer, timeOutCallback]);

  useEffect(() => {
    if (token) {
      navigate(ROUTE_URL.HOME);
    }
  }, [token]);

  return (
    <section>
      {mode === MODE.LOGIN && (
        <FormProvider {...loginFormContext}>
          <h5 className='h5 text-center mb-24 color-black'>{t('login.login')}</h5>

          <form className='form-container' onSubmit={handleLogin(login)}>
            <FormItem name={FORM.EMAIL} label={t('label.email')} required containerClassName='mb-48'>
              <TextInput placeholder={t('label.email_placeholder')} maxLength={LENGTH_INPUTS.MAX_256} />
            </FormItem>
            <FormItem name={FORM.PASSWORD} label={t('label.password')} required>
              <TextInputPassword placeholder={t('label.password_placeholder')} maxLength={LENGTH_INPUTS.MAX_18} />
            </FormItem>
            <div className='flex justify-end mt-10'>
              <span className='cursor-pointer color-primary underline' onClick={() => setMode(MODE.FORGOT_PASSWORD)}>
                {t('login.forgot_password')}?
              </span>
            </div>

            <Button loading={isLoading} htmlType='submit' className='app-button w-full mt-48'>
              {t('login.login')}
            </Button>
          </form>
        </FormProvider>
      )}

      {mode === MODE.FORGOT_PASSWORD && (
        <FormProvider {...forgotPasswordContext}>
          <h5 className='h5 color-black'>{t('login.forgot_password')}</h5>
          <p className='mb-24 color-black'>{t('login.forgot_password_desc')}</p>

          <form className='form-container' onSubmit={handleForgotPassword(onForgotPassword)}>
            <FormItem name={FORM.EMAIL} label={t('label.email')} required>
              <TextInput placeholder={t('label.email_placeholder')} maxLength={LENGTH_INPUTS.MAX_256} />
            </FormItem>

            <Button loading={isLoading} htmlType='submit' className='app-button w-full mt-48 mb-24'>
              {t('common.confirm')}
            </Button>

            <div className='color-primary cursor-pointer text-center' onClick={() => setMode(MODE.LOGIN)}>
              <IconArrowLeft /> {t('login.back_to_login')}
            </div>
          </form>
        </FormProvider>
      )}

      {mode === MODE.RESET_PASSWORD && (
        <FormProvider {...resetPasswordContext}>
          <h5 className='h5 color-black'>{t('login.reset_password')}</h5>
          <p className='mb-24 color-black'>{t('login.reset_password_desc_2')}</p>

          <form className='form-container' onSubmit={handleResetPassword(onResetPassword)}>
            <FormItem name={FORM.PASSWORD} label={t('label.new_password')} required containerClassName='mb-24'>
              <TextInputPassword placeholder={t('label.new_password_placeholder')} maxLength={LENGTH_INPUTS.MAX_18} />
            </FormItem>

            <FormItem
              name={FORM.CONFIRM_PASSWORD}
              label={t('label.re_enter_password')}
              required
              containerClassName='mb-24'
            >
              <TextInputPassword
                placeholder={t('label.re_enter_password_placeholder')}
                maxLength={LENGTH_INPUTS.MAX_18}
              />
            </FormItem>

            <p className='form-item__label mb-12 color-black'>{t('label.verification_code')} *</p>
            <p className='mb-12 color-black'>
              <Trans
                i18nKey={'login.reset_password_desc'}
                components={[<span key='0' className='color-primary' />]}
                values={{ email: forgotPasswordEmail }}
              />
            </p>
            <Row gutter={20}>
              <Col span={18}>
                <FormItem name={FORM.CODE} required>
                  <Number placeholder='Enter 4-digit code' maxLength={LENGTH_INPUTS.MAX_4} />
                </FormItem>
              </Col>
              <Col span={6}>
                <Button className='app-button w-full' onClick={onResendOTP} disabled={timer > 0}>
                  {t('login.resend')}
                  {timer > 0 && <span>{`(${timer})`}</span>}
                </Button>
              </Col>
            </Row>

            <Button loading={isLoading} htmlType='submit' className='app-button w-full mt-48 mb-24'>
              {t('login.reset_password')}
            </Button>
          </form>
        </FormProvider>
      )}
    </section>
  );
};

export default LoginForm;
