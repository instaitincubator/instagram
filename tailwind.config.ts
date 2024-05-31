import type { Config } from 'tailwindcss'

import plugin from 'tailwindcss/plugin'

const colors = {
  accent_100: '#73A5FF',
  accent_300: '#4C8DFF',
  accent_500: '#397DF6',
  accent_700: '#2F68CC',
  accent_900: '#234E99',
  danger_100: '#FF8099',
  danger_300: '#F23D61',
  danger_500: '#CC1439',
  danger_700: '#990F2B',
  danger_900: '#660A1D',
  dark_100: '#4C4C4C',
  dark_300: '#333333',
  dark_500: '#171717',
  dark_700: '#0D0D0D',
  dark_900: '#000000',
  light_100: '#FFFFFF',
  light_300: '#F7FBFF',
  light_500: '#EDF3FA',
  light_700: '#D5DAE0',
  light_900: '#8D9094',
  success_100: '#80FFBF',
  success_300: '#22E584',
  success_500: '#14CC70',
  success_700: '#0F9954',
  success_900: '#0A6638',
  warning_100: '#FFD073',
  warning_300: '#E5AC39',
  warning_500: '#D99000',
  warning_700: '#996600',
  warning_900: '#664400',
}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.text-bold-14': {
          fontSize: '14px',
          fontWeight: '700',
          lineHeight: '24px',
        },
        '.text-bold-16': {
          fontSize: '16px',
          fontWeight: '700',
          lineHeight: '24px',
        },
        '.text-h1': {
          fontSize: '20px',
          fontWeight: '700',
          lineHeight: '36px',
        },
        '.text-h2': {
          fontSize: '18px',
          fontWeight: '700',
          lineHeight: '24px',
        },
        '.text-h3': {
          fontSize: '16px',
          fontWeight: '600',
          lineHeight: '24px',
        },
        '.text-large': {
          fontSize: '26px',
          fontWeight: '600',
          lineHeight: '36px',
        },
        '.text-medium-14': {
          fontSize: '14px',
          fontWeight: '500',
          lineHeight: '24px',
        },
        '.text-regular-14': {
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: '24px',
        },
        '.text-regular-16': {
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '24px',
        },
        '.text-regular-link': {
          color: colors.accent_500,
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: '24px',
          textDecoration: 'underline',
        },
        '.text-semibold-small': {
          fontSize: '12px',
          fontWeight: '600',
          lineHeight: '16px',
        },
        '.text-small': {
          fontSize: '12px',
          fontWeight: '400',
          lineHeight: '16px',
        },
        '.text-small-link': {
          color: colors.accent_500,
          fontSize: '12px',
          fontWeight: '400',
          lineHeight: '16px',
          textDecoration: 'underline',
        },
      }

      addUtilities(newUtilities)
    }),
  ],
  theme: {
    extend: {
      backgroundColors: colors,
      colors: colors,
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      screens: {
        lg: '976px',
        md: '768px',
        sm: '480px',
        xl: '1440px',
      },
      textColors: colors,
    },
  },
}

export default config
