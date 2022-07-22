/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'light-gray': '#f6f7f9',
        'primary-yellow': '#ffe14c',
        'dark-gray': '#2a3751',
      },
      backgroundImage: {
        'login-bg': "url('/src/assets/images/login_bg.svg')",
      },
    },
  },
  plugins: [],
};
