import type {Config} from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

let colors = {
    'accent_900': '#234E99',
    'accent_700': '#2F68CC',
    'accent_500': '#397DF6',
    'accent_300': '#4C8DFF',
    'accent_100': '#73A5FF',
    'danger_900': '#660A1D',
    'danger_700': '#990F2B',
    'danger_500': '#CC1439',
    'danger_300': '#F23D61',
    'danger_100': '#FF8099',
    'warning_900': '#664400',
    'warning_700': '#996600',
    'warning_500': '#D99000',
    'warning_300': '#E5AC39',
    'warning_100': '#FFD073',
    'success_900': '#0A6638',
    'success_700': '#0F9954',
    'success_500': '#14CC70',
    'success_300': '#22E584',
    'success_100': '#80FFBF',
    'dark_900': '#000000',
    'dark_700': '#0D0D0D',
    'dark_500': '#171717',
    'dark_300': '#333333',
    'dark_100': '#4C4C4C',
    'light_900': '#8D9094',
    'light_700': '#D5DAE0',
    'light_500': '#EDF3FA',
    'light_300': '#F7FBFF',
    'light_100': '#FFFFFF'
}

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            screens: {
                sm: '480px',
                md: '768px',
                lg: '976px',
                xl: '1440px',
            },
            colors: colors,
            textColors: colors,
            backgroundColors: colors,
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        }
    },
    plugins: [
        plugin(function({ addUtilities }) {
            const newUtilities = {
                '.text-large': {
                    fontSize: '26px',
                    fontWeight: '600',
                    lineHeight: '36px',
                },
                '.text-h1': {
                    fontWeight: '700',
                    fontSize: '20px',
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
                '.text-regular-16': {
                    fontSize: '16px',
                    fontWeight: '400',
                    lineHeight: '24px',
                },
                '.text-bold-16': {
                    fontSize: '16px',
                    fontWeight: '700',
                    lineHeight: '24px',
                },
                '.text-regular-14': {
                    fontSize: '14px',
                    fontWeight: '400',
                    lineHeight: '24px',
                },
                '.text-medium-14': {
                    fontSize: '14px',
                    fontWeight: '500',
                    lineHeight: '24px',
                },
                '.text-bold-14': {
                    fontSize: '14px',
                    fontWeight: '700',
                    lineHeight: '24px',
                },
                '.text-small': {
                    fontSize: '12px',
                    fontWeight: '400',
                    lineHeight: '16px',
                },
                '.text-semibold-small': {
                    fontSize: '12px',
                    fontWeight: '600',
                    lineHeight: '16px',
                },
                '.text-regular-link': {
                    fontSize: '14px',
                    fontWeight: '400',
                    lineHeight: '24px',
                    color: colors.accent_500,
                    textDecoration: 'underline'
                },
                '.text-small-link': {
                    fontSize: '12px',
                    fontWeight: '400',
                    lineHeight: '16px',
                    color: colors.accent_500,
                    textDecoration: 'underline'
                },
            }
            addUtilities(newUtilities)
        })
    ],
}

export default config