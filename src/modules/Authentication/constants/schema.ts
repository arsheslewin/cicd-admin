import { z } from 'zod';

import { emailRegex, passwordRegex } from 'constant';

export const loginSchema = (t: any) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t('message.E2') })
      .regex(emailRegex, t('message.E11')),
    password: z.string().min(1, { message: t('message.E3') }),
  });

export const forgotPasswordSchema = (t?: any) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t('message.E2') })
      .regex(emailRegex, t('message.E11')),
  });

export const resetPasswordSchema = (t?: any) =>
  z
    .object({
      password: z
        .string()
        .min(1, { message: t('message.E3') })
        .regex(passwordRegex, t('message.E6')),
      confirmPassword: z.string().min(1, { message: t('message.E3') }),
      code: z.string().min(1, { message: t('message.E17') }),
    })
    .refine(({ confirmPassword, password }) => confirmPassword === password, {
      message: t('message.E30'),
      path: ['confirmPassword'],
    });

export const changePasswordSchema = (t?: any) =>
  z
    .object({
      password: z
        .string()
        .min(1, { message: t('message.E3') })
        .regex(passwordRegex, { message: t('message.E6') }),
      newPassword: z
        .string()
        .min(1, { message: t('message.E3') })
        .regex(passwordRegex, { message: t('message.E6') }),
      confirmPassword: z
        .string()
        .min(1, { message: t('message.E3') })
        .regex(passwordRegex, { message: t('message.E6') }),
    })
    .refine((schema: any) => schema.password !== schema.newPassword, {
      message: t('message.E31'),
      path: ['newPassword'],
    })
    .refine((schema: any) => schema.newPassword === schema.confirmPassword, {
      message: t('message.E30'),
      path: ['confirmPassword'],
    });
