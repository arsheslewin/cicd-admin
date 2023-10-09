import { type FC, useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import OTPInput from 'react-otp-input';

import cx from 'classnames';

import { type IForgotPassword, type ISubmitOTP, FORM } from 'modules/Authentication/constants';

const OTP_COUNTDOWN_TIME = 5;
const OTP_LENGTH = 6;

const OTP: FC<{
  email: string;
  resendOTP: (formData: IForgotPassword) => Promise<any>;
  submitOTP: (formData: ISubmitOTP) => Promise<void>;
}> = ({ email: forgotPasswordEmail, resendOTP, submitOTP }) => {
  const { t } = useTranslation();

  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  const [otp, setOtp] = useState('');
  const [countdownTime, setCountdownTime] = useState(OTP_COUNTDOWN_TIME);

  const isDisable = !!countdownTime;

  const startCountdown = () => {
    if (interval.current) {
      return;
    }

    interval.current = setInterval(() => {
      setCountdownTime((prev) => {
        const seconds = prev - 1;

        if (interval.current && seconds === 0) {
          clearInterval(interval.current);
          interval.current = null;

          return 0;
        }

        return seconds;
      });
    }, 1000);
  };

  const onResendOTP = async () => {
    if (interval.current) return;

    try {
      const data = await resendOTP({ email: forgotPasswordEmail });

      if (data) {
        startCountdown();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeOTP = (otp: string) => {
    setOtp(otp);

    if (otp.length === OTP_LENGTH) {
      submitOTP({ [FORM.OTP]: otp });
    }
  };

  useEffect(() => {
    startCountdown();

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    };
  }, []);

  return (
    <>
      <h5 className='h5'>{t('login.reset_password')}</h5>
      <p className='mb-24'>
        <Trans
          i18nKey={'login.reset_password_desc'}
          components={[<span key='0' />]}
          values={{ email: forgotPasswordEmail || '' }}
        />
      </p>
      <OTPInput
        value={otp}
        onChange={onChangeOTP}
        numInputs={OTP_LENGTH}
        containerStyle={{ justifyContent: 'space-between' }}
        renderInput={(props) => (
          <input
            {...props}
            className='py-24 px-12 mx-6 w-100% radius rounded-[12px] border-solid border-border-color color-primary flex-1 max-w-[60px]'
          />
        )}
      />
      <strong className='mt-24 block'>{t('login.otp_desc')}</strong>
      <ul>
        <li>{t('login.otp_step_1')}</li>
        <li>{t('login.otp_step_2')}</li>
        <li>{t('login.otp_step_3')}</li>
        <li>{t('login.otp_step_4')}</li>
      </ul>
      <p
        className={cx({
          'cursor-pointer': !isDisable,
          'cursor-not-allowed': isDisable,
        })}
        onClick={onResendOTP}
      >
        {t('login.resend')}
        {countdownTime > 0 && (
          <>
            {' >>'} ({countdownTime}s)
          </>
        )}
      </p>
    </>
  );
};

export default OTP;
