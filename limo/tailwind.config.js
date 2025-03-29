/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      lg: { max: '1999.99px' },
      md: { max: '991.99px' },
      small: { max: '767.99px' },
      xs: { max: '479.99px' },
    },
    extend: {
      fontFamily: {
        sans: ['Alumni Sans', 'sans-serif'],
      },

      colors: {
        green: '#B9FF66',
        darkblue: '#191A23',
        grey: '#D9D9D9',
      },
    },
  },
  plugins: [],
}
