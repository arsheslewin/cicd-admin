import presetUno from '@unocss/preset-uno';

import { defineConfig } from 'unocss';

export default defineConfig({
  theme: {
    fontSize: {
      xs: '14px',
      sm: '16px',
      base: '18px',
      xl: '20px',
      '2xl': '26px',
      '3xl': '34px',
      '4xl': '42px',
      '5xl': '56px',
      '6xl': '70px',
    },
    lineHeight: {
      base: '150%',
      xl: '120%',
    },
    boxShadow: {
      sm: 'box-shadow: 0px 2px 12px -4px rgba(22, 34, 51, 0.08)',
      base: 'box-shadow: 0px 4px 16px -4px rgba(22, 34, 51, 0.08)',
      xl: 'box-shadow: 0px 6px 24px -4px rgba(22, 34, 51, 0.12)',
    },
    colors: {
      white: '#ffffff',
      black: '#23262F',
      primary: '#374BFF',
      'border-color': '#3F3F3F',
    },
  },
  rules: [
    [/^m-([.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
    [/^mt-([.\d]+)$/, ([_, num]) => ({ 'margin-top': `${num}px` })],
    [/^mb-([.\d]+)$/, ([_, num]) => ({ 'margin-bottom': `${num}px` })],
    [/^mx-([.\d]+)$/, ([_, num]) => ({ 'margin-left': `${num}px`, 'margin-right': `${num}px` })],
    [/^my-([.\d]+)$/, ([_, num]) => ({ 'margin-top': `${num}px`, 'margin-bottom': `${num}px` })],
    [/^p-([.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })],
    [/^pt-([.\d]+)$/, ([_, num]) => ({ 'padding-top': `${num}px` })],
    [/^pb-([.\d]+)$/, ([_, num]) => ({ 'padding-bottom': `${num}px` })],
    [/^px-([.\d]+)$/, ([_, num]) => ({ 'padding-left': `${num}px`, 'padding-right': `${num}px` })],
    [/^py-([.\d]+)$/, ([_, num]) => ({ 'padding-top': `${num}px`, 'padding-bottom': `${num}px` })],
  ],
  shortcuts: [
    {
      h1: 'text-6xl leading-xl font-600',
      h2: 'text-5xl leading-xl font-600',
      h3: 'text-4xl leading-base font-600',
      h4: 'text-3xl leading-base font-600',
      h5: 'text-2xl leading-base font-600',
      h6: 'text-xl leading-base font-600',
      'sub-heading': 'text-base leading-base font-600',
      body: 'text-sm leading-base font-500',
      'body-sm': 'text-xs leading-base font-500',
      button:
        'bg-primary color-white hover:bg-primary hover:color-white focus:bg-primary focus:color-white active:bg-primary active:color-white',
      'button--large': 'p-24 w-100%',
    },
  ],
  presets: [presetUno()],
});
