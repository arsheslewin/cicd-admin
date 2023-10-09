import { TFunction } from 'react-i18next';

import { z } from 'zod';

import { hashtagRegex } from 'constant';

import { MAX_COUNT_HASHTAG } from '.';

export const hashtagCountSchema = (t: TFunction) =>
  z.object({
    hashtagCount: z
      .string()
      .min(1, { message: t('message.E3-1') })
      .refine((val) => Number(val) <= MAX_COUNT_HASHTAG, { message: t('message.E32') }),
  });

export const addHashtagSchema = (t: TFunction) =>
  z.object({
    hashtag: z
      .string()
      .min(1, { message: t('message.E3-1') })
      .regex(hashtagRegex, { message: t('message.E33') }),
  });
