import { z } from 'zod';

export const FORM = {
  EMAIL: 'email',
  PASSWORD: 'password',
  OTP: 'otp',
  CONFIRM_PASSWORD: 'confirmPassword',
  CODE: 'code',
  NEW_PASSWORD: 'newPassword',
} as const;

//Login
const LoginSchema = z.object({
  [FORM.EMAIL]: z.string(),
  [FORM.PASSWORD]: z.string(),
});

export type ILogin = z.infer<typeof LoginSchema>;

export const LOGIN_DEFAULT_VALUE: ILogin = {
  [FORM.EMAIL]: '',
  [FORM.PASSWORD]: '',
};

//Forgot password
const ForgotPasswordSchema = z.object({
  [FORM.EMAIL]: z.string(),
});

export type IForgotPassword = z.infer<typeof ForgotPasswordSchema>;

export const FORGOT_PASSWORD_DEFAULT_VALUE: IForgotPassword = {
  [FORM.EMAIL]: '',
};

//Submit OTP
const SubmitOTP = z.object({
  [FORM.OTP]: z.string(),
});

export type ISubmitOTP = z.infer<typeof SubmitOTP>;

//Reset password
const ResetPasswordSchema = z.object({
  [FORM.PASSWORD]: z.string(),
  [FORM.CONFIRM_PASSWORD]: z.string(),
  [FORM.CODE]: z.string(),
});

export type IResetPassword = z.infer<typeof ResetPasswordSchema>;

export const RESET_PASSWORD_DEFAULT_VALUE: IResetPassword = {
  [FORM.PASSWORD]: '',
  [FORM.CONFIRM_PASSWORD]: '',
  [FORM.CODE]: '',
};

//change password
export const CHANGE_PASSWORD_DEFAULT_VALUE = {
  [FORM.PASSWORD]: '',
  [FORM.NEW_PASSWORD]: '',
  [FORM.CONFIRM_PASSWORD]: '',
};

export const MODE = {
  LOGIN: 'LOGIN',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  OTP: 'OTP',
  RESET_PASSWORD: 'RESET_PASSWORD',
};
